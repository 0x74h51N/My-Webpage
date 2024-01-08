"use client";
import { portfolioPageItems } from "@/constants/portfolioItems";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import { polygonIn } from "@/utils/motion";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ProjectInfo from "./components/ProjectInfo";
import Image from "next/image";

const PortfolioPage = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation(["portfolio"]);
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
        variants={polygonIn("screen", "easeInOut", 0.5, 1)}
        className="flex flex-col items-center h-full w-full max-w-[1850px] min-h-[100svh] p-20 lg:px-36 md:px-12 px-0"
      >
        <div className="w-full h-[550px]">
          <Image
            width={1550}
            height={1500}
            quality={100}
            loading="lazy"
            src={selectedItem.image}
            alt={selectedItem.imageAlt}
            className="w-full h-full object-center object-cover"
          />
        </div>
        <h1>{t(selectedItem.title)}</h1>
        <div className="flex md:flex-row flex-col w-full h-auto items-center md:justify-between justify-center">
          <div className="md:w-2/3 w-full"></div>
          {selectedItem.ProjectInfo && (
            <ProjectInfo
              ProjectInfo={selectedItem.ProjectInfo}
              key={selectedItem._id}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioPage;
