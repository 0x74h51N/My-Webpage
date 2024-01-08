"use client";
import CarouselSlider from "../../Slider/Portfolio Slider/CarouselSlider";
import SlideModal from "../../Slider/Portfolio Slider/Child/SlideModal";
import { motion } from "framer-motion";
import { generateSpans } from "../../GenerateSpans";
import { slideIn } from "@/utils/motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import { RootState } from "@/store";
import { portfolioPageItems } from "@/constants/portfolioItems";

const PortfolioSect = () => {
  const { t, i18n } = useTranslation(["portfolio"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const dispatch = useDispatch();
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
  return (
    <div className="h-auto flex flex-col items-center justify-center w-full">
      <div className="flex flex-col text-center">
        <motion.h1
          variants={slideIn("up", "spring", 0.5, 1.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: "all" }}
          className="text-stone-200 font-black md:text-[55x] sm:text-[50px] xs:text-[40px] text-[30px] max-w-2xl leading-[60px] z-auto"
        >
          {generateSpans({
            text: `${t("projectSlides.title")}`,
            colorType: "vibrantColors",
            zeroColor: "#FFFFFF",
          })}
        </motion.h1>
      </div>
      <div className="w-full h-auto min-w-[100sv] z-0 bg-cool-gray-800 pt-10 pb-14 mt-3 overflow-visible">
        <CarouselSlider slides={portfolioPageItems} />
      </div>
      <div className="z-50">
        <SlideModal />
      </div>
    </div>
  );
};

export default PortfolioSect;
