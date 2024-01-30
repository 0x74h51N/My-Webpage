"use client";
import { portfolioPageItems } from "@/constants/portfolioItems";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import { polygonIn, slideIn, textVariant } from "@/utils/motion";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Markdown from "react-markdown";
import breaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { generateSpans } from "@/components/GenerateSpans";
import { sliderChange } from "@/store/redux/isSlider";
import { PortfolioItemProps } from "@/app/common.types";
import ProjectSlide from "./ProjectSlide";
import TopImage from "./TopImage";
import Ticks from "./ticks";
import ProjectInfo from "./ProjectInfo";
import CatalogueViewer from "./CatalogueViewer";
import { disableCursor } from "@/store/redux/cursorDisabled";

const Catalogue = ({ Item }: { Item: PortfolioItemProps }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["portfolio"]);
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const screenWidth = useSelector(
    (state: RootState) => state.screenWidth.width
  );
  const cursorDisabled = useSelector(
    (state: RootState) => state.cursorDisabled.disabled
  );
  const handleMouseEnter = () => {
    if (cursorDisabled === false) {
      dispatch(disableCursor(true));
    }
  };
  const handleMouseLeave = () => {
    if (cursorDisabled === true) {
      dispatch(disableCursor(false));
    }
  };
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
  const hoverStart = () => {
    dispatch(sliderChange(true));
  };
  const hoverEnd = () => {
    dispatch(sliderChange(false));
  };

  return (
    <div className="flexCenter min-w-[100svw] min-h-[100svh] overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: "some" }}
        variants={polygonIn("screen", "easeInOut", 0.7, 0.8)}
        className="flex flex-col items-center h-full w-full max-w-[1300px] min-h-[100svh] py-20 px-8"
      >
        {Item.imageTop && (
          <TopImage
            imageTop={Item.imageTop}
            imageAlt={Item.imageAlt}
            icons={Item.icons && Item.icons}
          />
        )}

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: "some",
          }}
          className="lg:relative flex flex-wrap w-full h-auto lg:min-h-[590px] md:items-start md:justify-between justify-start items-center lg:mt-14 sm:mt-6 mt-4"
        >
          <div className="lg:w-2/3 w-full lg:pr-[120px] ">
            {Item.title2 && (
              <motion.h2 variants={textVariant(1)} className="h1 half mb-4">
                {isMobile || isTablet
                  ? t(Item.title2)
                  : generateSpans({
                      text: t(Item.title2),
                      colorType: "vibrantColors",
                    })}
              </motion.h2>
            )}
            {Item.description && (
              <motion.div
                variants={textVariant(1.5)}
                className="relative flex flex-row"
              >
                <span className="absolute h2 bold cool top-0 left-0 bg-log-col -rotate-6 hover:rotate-0 transition-all duration-500 ease-in-out rounded-md px-3 py-1">
                  {t(Item.description).charAt(0)}
                </span>
                <Markdown
                  remarkPlugins={[breaks]}
                  rehypePlugins={[rehypeRaw]}
                  className="h4 lg:ml-14 xs:ml-12 ml-10"
                >
                  {t(Item.description).slice(1)}
                </Markdown>
              </motion.div>
            )}
            {Item.description2 && (
              <motion.p variants={textVariant(2.2)} className="p lg:mt-8 mt-4">
                {t(Item.description2)}
              </motion.p>
            )}
          </div>
          <div className="flex sm:flex-row flex-col max-sm:items-center max-sm:gap-8 w-full mt-6">
            {Item.ticks && (
              <motion.div
                variants={polygonIn("down", "spring", 2.5, 1.7)}
                className="lg:w-2/3 sm:w-full w-auto xl:pr-0 lg:pr-24 max-sm:mb-6"
              >
                <Ticks ticks={Item.ticks} />
              </motion.div>
            )}
            <motion.div
              variants={slideIn("right", "spring", 1.5, 1.5)}
              className="lg:absolute right-0 lg:top-0"
            >
              {Item.ProjectInfo && (
                <ProjectInfo ProjectInfo={Item.ProjectInfo} key={Item._id} />
              )}
            </motion.div>
          </div>
        </motion.div>
        {Item.catalogue && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: "some" }}
            variants={slideIn("down", "spring", 1.5, 1.5)}
            className="w-full my-14 cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CatalogueViewer Item={Item.catalogue} />
          </motion.div>
        )}
        {Item.techDescription && (
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: "some" }}
          >
            <motion.h3 variants={textVariant(1)} className="h3 self-start">
              {t("page.designTitle")}
            </motion.h3>
            <motion.div variants={textVariant(1.3)} className="p mt-4 w-full ">
              <Markdown remarkPlugins={[breaks]} rehypePlugins={[rehypeRaw]}>
                {t(Item.techDescription)}
              </Markdown>
            </motion.div>
          </motion.div>
        )}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: "some" }}
          variants={polygonIn("screen", "spring", 1, 1.5)}
          className="flex flex-col items-center w-full max-w-[1300px] h-auto max-h-[400px] my-24"
          onHoverStart={hoverStart}
          onHoverEnd={hoverEnd}
        >
          <motion.div variants={slideIn("up", "easeInOut", 1.5, 1)}>
            <h2 className="h1 half w-full mb-2">{t("page.otherProjects")}</h2>
          </motion.div>
          {isTranslationsLoadedRedux && (
            <ProjectSlide Items={portfolioPageItems} />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Catalogue;
