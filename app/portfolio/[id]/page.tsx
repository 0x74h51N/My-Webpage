"use client";
import { portfolioPageItems } from "@/constants/portfolioItems";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import { fadeIn, polygonIn, slideIn, textVariant } from "@/utils/motion";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ProjectInfo from "./components/ProjectInfo";
import Image from "next/image";
import Markdown from "react-markdown";
import breaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { generateSpans } from "@/components/GenerateSpans";
import Ticks from "./components/ticks";

const PortfolioPage = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["portfolio"]);
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  useEffect(() => {
    const handleInitialized = () => {
      dispatch(setIsTranslationsLoaded(true));
    };

    if (i18n.isInitialized) {
      handleInitialized();
    } else {
      i18n.on("initialized", handleInitialized);
    }

    return () => {
      i18n.off("initialized", handleInitialized);
    };
  }, [dispatch]);

  if (!isTranslationsLoadedRedux) {
    return null;
  }
  const selectedItem = portfolioPageItems.find(
    (item) => item._id.toLowerCase().replace(/\s+/g, "") == params.id
  );

  if (!selectedItem) {
    return <p>Couldn't find a portfolio item.</p>;
  }

  return (
    <div className="flexCenter min-w-[100svw] min-h-[100svh]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: "some" }}
        variants={polygonIn("screen", "easeInOut", 1, 0.8)}
        className=" flex flex-col items-center h-full w-full max-w-[1300px] min-h-[100svh] p-12 pb-40 px-14 max-sm:px-8 max-xs:px-5"
      >
        {selectedItem.imageTop && (
          <div className="w-full md:h-auto md:min-h-[650px] h-[350px]">
            <Image
              width={1850}
              height={1850}
              quality={100}
              loading="lazy"
              src={selectedItem.imageTop}
              alt={selectedItem.imageAlt}
              className="w-full h-full object-center md:object-contain object-cover bg-gradient-to-br from-neutral-900 to-slate-700"
            />
          </div>
        )}

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: isMobile || isTablet ? 0.28 : 0.8 }}
          className="lg:relative flex flex-wrap w-full h-auto md:items-start md:justify-between justify-start items-center lg:mt-14 sm:mt-6 mt-4"
        >
          <div className="lg:w-2/3 w-full lg:pr-[120px]">
            {selectedItem.title2 && (
              <motion.h2 variants={textVariant(1)} className="h1 half mb-4">
                {isMobile || isTablet
                  ? t(selectedItem.title2)
                  : generateSpans({
                      text: t(selectedItem.title2),
                      colorType: "vibrantColors",
                    })}
              </motion.h2>
            )}
            {selectedItem.description && (
              <motion.div
                variants={textVariant(1.3)}
                className="relative flex flex-row"
              >
                <span className="absolute h2 bold cool top-0 left-0 bg-log-col -rotate-6 hover:rotate-0 transition-all duration-500 ease-in-out rounded-md px-3 py-1">
                  {t(selectedItem.description).charAt(0)}
                </span>
                <Markdown
                  remarkPlugins={[breaks]}
                  rehypePlugins={[rehypeRaw]}
                  className="h4 lg:ml-14 xs:ml-12 ml-10"
                >
                  {t(selectedItem.description).slice(1)}
                </Markdown>
              </motion.div>
            )}
            {selectedItem.description2 && (
              <motion.p variants={textVariant(1.5)} className="p mt-4">
                {t(selectedItem.description2)}
              </motion.p>
            )}
          </div>
          <div className="flex sm:flex-row flex-col max-sm:items-center max-sm:gap-8 w-full mt-6">
            {selectedItem.ticks && (
              <motion.div
                variants={polygonIn("down", "spring", 2, 1.7)}
                className="lg:w-2/3 sm:w-full w-auto xl:pr-0 lg:pr-24 max-sm:mb-6"
              >
                <Ticks ticks={selectedItem.ticks} />
              </motion.div>
            )}
            <motion.div
              variants={slideIn("right", "spring", 1, 1.5)}
              className="lg:absolute right-0 lg:top-0"
            >
              {selectedItem.ProjectInfo && (
                <ProjectInfo
                  ProjectInfo={selectedItem.ProjectInfo}
                  key={selectedItem._id}
                />
              )}
            </motion.div>
          </div>
          <motion.div
            variants={polygonIn("screen", "easeInOut", 1, 1)}
            className="flex md:flex-row flex-col items-center justify-between w-full h-auto mt-24 mb-8 gap-6"
          >
            {selectedItem.imageBoxes &&
              selectedItem.imageBoxes.map((image: string, index: number) => (
                <Image
                  width={1000}
                  height={1000}
                  src={image}
                  alt={selectedItem.imageAlt}
                  key={index}
                  className="flex max-w-[400px] w-full h-auto  object-contain bg-gradient-to-br from-slate-900 to-slate-800"
                />
              ))}
          </motion.div>
        </motion.div>
        {selectedItem.techTitle && selectedItem.techDescription && (
          <>
            <motion.h3
              variants={textVariant(1)}
              className="h3 self-start underline-offset-3 underline"
            >
              {t(selectedItem.techTitle)}
            </motion.h3>

            <motion.p variants={textVariant(1.5)} className="p mt-4 w-full ">
              <Markdown remarkPlugins={[breaks]} rehypePlugins={[rehypeRaw]}>
                {t(selectedItem.techDescription)}
              </Markdown>
            </motion.p>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default PortfolioPage;
