import { RootState } from "@/store";
import { clearSlide } from "@/store/redux/selectedSlide";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../../../Buttons/IconButton";
import Label from "../../../Labels";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Loading from "@/components/Loading";
import Link from "next/link";
import CancelButton from "@/components/Buttons/CancelButton";

const SlideModal = () => {
  const [imageLoading, setImageLoading] = useState(true);
  const { t } = useTranslation(["portfolio"]);
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);

  const dispatch = useDispatch();
  const selectedSlide = useSelector(
    (state: RootState) => state.selectedSlide.selectedSlide
  );
  const isScrolled = useSelector(
    (state: RootState) => state.isScrolled.scrolled
  );
  const closeModal = () => {
    dispatch(clearSlide());
    setTimeout(() => {
      setImageLoading(true);
    }, 300);
  };
  const id =
    selectedSlide && selectedSlide._id.toLowerCase().replace(/\s+/g, "");
  useEffect(() => {
    if (isScrolled) {
      closeModal();
    }
  }, [isScrolled]);
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <AnimatePresence>
      {selectedSlide && (
        <div
          className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-lg"
          onClick={closeModal}
        >
          <div
            className={`absolute flex justify-center items-center top-1/2 left-1/2  md:w-[70svw] md:h-[63svh] w-[95svw] h-[65svh] translate-x-[-50%] translate-y-[-50%] outline-none`}
          >
            <motion.div
              className="relative flex justify-center md:h-auto h-full"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={modalVariants}
              onClick={closeModal}
            >
              <button
                onClick={closeModal}
                className="absolute -top-2 -right-4 z-40 cursor-none"
              >
                <CancelButton />
              </button>
              <Image
                loading="lazy"
                src={selectedSlide.slideImage || ""}
                alt={selectedSlide.title || ""}
                width={1800}
                height={1800}
                style={{ objectFit: isMobile ? "cover" : "contain" }}
                quality={100}
                className="w-full h-full"
                placeholder="empty"
                onLoad={() => {
                  setImageLoading(false);
                }}
              />
              {imageLoading ? (
                <Loading />
              ) : (
                <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-stone-200">
                  <h2 className="text-lg font-bold">
                    {t(`${selectedSlide.title}`)}
                  </h2>
                  <p
                    className={`font-extralight overflow-hidden overflow-ellipsis line-clamp-1 ${
                      isMobile ? "text-[10px]" : "text-[13px]"
                    }`}
                  >
                    {t(`${selectedSlide.slideDescription}`)}
                  </p>
                  <Link
                    href={`/portfolio/${id}`}
                    key={"portfolio"}
                    title={t("projectSlides.title2")}
                    className={`font-extralight hover:text-log-col underline underline-offset-2 cursor-none ${
                      isMobile ? "text-[10px]" : "text-[13px]"
                    } `}
                  >
                    {t("projectSlides.click")}
                  </Link>
                  <div className="flex">
                    <div className="flex flex-wrap items-start mr-auto">
                      {selectedSlide.labels &&
                        selectedSlide.labels.map((label, labelIndex) => (
                          <Label key={labelIndex} text={label} />
                        ))}
                    </div>
                    <div className="flex items-end gap-2">
                      {selectedSlide.icons &&
                        selectedSlide.icons.map((icon, iconIndex) => (
                          <IconButton key={iconIndex} icon={icon} />
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SlideModal;
