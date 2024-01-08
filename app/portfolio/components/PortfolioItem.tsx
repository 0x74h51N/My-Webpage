import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import { slideIn, staggerContainer } from "@/utils/motion";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { FaAnglesRight } from "react-icons/fa6";
import { clickableChange } from "@/store/redux/isClickable";
import { useRouter } from "next/navigation";
import { PortfolioItemProps } from "@/app/common.types";

const PortfolioItem = ({
  _id,
  image,
  imageAlt,
  title,
  projectType,
}: PortfolioItemProps) => {
  const router = useRouter();
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const originalWidth = 630;
  const originalHeight = 500;
  const mobileWidth = 320;
  const mobileHeight = (mobileWidth / originalWidth) * originalHeight;
  const id = _id.toLowerCase().replace(/\s+/g, "");
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const dispatch = useDispatch();
  const { t } = useTranslation(["portfolio"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  useEffect(() => {
    if (i18n.isInitialized) {
      dispatch(setIsTranslationsLoaded(true));
    } else {
      i18n.on("initialized", () => {
        dispatch(setIsTranslationsLoaded(true));
      });
    }
  }, [i18n, dispatch]);
  if (!isTranslationsLoadedRedux) {
    return null;
  }
  const handleMouseEnter = () => {
    if (isClickable == false) {
      dispatch(clickableChange(true));
    }
  };
  const handleMouseLeave = () => {
    if (isClickable == true) {
      dispatch(clickableChange(false));
    }
  };
  const onClickHandler = () => {
    () => router.push(`/portfolio/${id}`);
    if (isClickable == true) {
      dispatch(clickableChange(false));
    }
  };
  return (
    <div
      className="relative flex flex-col items-center justify-between overflow-hidden"
      style={{
        height: isMobile ? 320 : 600,
      }}
    >
      <motion.div
        initial="hidden"
        whileHover="show"
        className="group relative flex justify-center items-center w-[630px] h-[500px] rounded-xl bg-gradient-to-br to-cool-gray-700 from-slate-800 z-10"
        style={{
          width: isMobile ? mobileWidth : originalWidth,
          height: isMobile ? mobileHeight : originalHeight,
        }}
      >
        <Image
          src={image}
          alt={imageAlt}
          width={isMobile ? 400 : 600}
          height={isMobile ? 300 : 500}
          objectPosition="center center"
          className=" object-cover w-full h-full rounded-xl"
        />
        <div className="absolute w-full h-full  group-hover:backdrop-filter group-hover:backdrop-blur-sm bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 ease-in-out rounded-xl " />
        <motion.div
          variants={slideIn("up", "spring", 0.2, 0.75)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute flex justify-center items-center rounded-full bg-log-col opacity-0 group-hover:opacity-70 w-[70px] h-[70px]"
        >
          <Link
            href={`/portfolio/${id}`}
            passHref
            className="cursor-none"
            onClick={onClickHandler}
          >
            <FaAnglesRight className="text-white text-2xl -rotate-45" />
          </Link>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-0  rounded-b-lg z-0 w-full flex justify-start">
        <Link
          href={`/portfolio/${id}`}
          passHref
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="w-auto md:py-9 px-5 p-6 md:h-32 h-20 text-stone-200 cursor-none"
          onClick={onClickHandler}
        >
          <h2 className="md:text-lg text-sm text-log-col">
            {t(`${projectType}`)}
          </h2>
          <h1 className="md:text-[35px] text-[22px] font-bold">
            {t(`${title}`)}
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default PortfolioItem;
