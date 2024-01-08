"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import Label from "../../Labels";
import { PortfolioItemProps } from "@/app/common.types";
import { useDispatch, useSelector } from "react-redux";
import { setSlide } from "@/store/redux/selectedSlide";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { RootState } from "@/store";
import { setIsTranslationsLoaded } from "@/store/redux/language";
import i18n from "@/utils/i18n";
import { memo, useEffect, useState } from "react";
import IconButton from "@/components/Buttons/IconButton";
import { sliderChange } from "@/store/redux/isSlider";
import { motion } from "framer-motion";

SwiperCore.use([Autoplay, EffectCoverflow]);

interface CarouselSliderProps {
  slides: PortfolioItemProps[];
}

const CarouselSlider = memo(({ slides }: { slides: PortfolioItemProps[] }) => {
  const [activeIndex, setActiveIndex] = useState(() => {
    return 0;
  });
  const dispatch = useDispatch();
  const { t } = useTranslation(["portfolio"]);
  const isTranslationsLoadedRedux = useSelector(
    (state: RootState) => state.language.isTranslationsLoaded
  );
  const isMobile = useSelector((state: RootState) => state.isMobile.mobile);
  const isTablet = useSelector((state: RootState) => state.isTablet.tablet);
  const _selectedSlide = (_slide: PortfolioItemProps) => {
    dispatch(setSlide(_slide));
  };
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

  const onSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };
  const hoverStart = () => {
    dispatch(sliderChange(true));
  };
  const hoverEnd = () => {
    dispatch(sliderChange(false));
  };

  return (
    <motion.div
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
      className="h-auto overflow-visible z-50"
    >
      <Swiper
        effect="coverflow"
        centeredSlides
        slidesPerView={isMobile ? 1.2 : isTablet ? 1.5 : 2}
        spaceBetween={0}
        loop
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 150,
          modifier: 3,
          slideShadows: false,
        }}
        onSlideChange={onSlideChange}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        className="h-auto min-h-[500px] cursor-none overflow-visible"
      >
        {slides.map((slide: PortfolioItemProps, index: number) => (
          <SwiperSlide key={index + 1}>
            <div
              className={`relative overflow-visible ${
                isTablet && !isMobile ? "h-[340px]" : "h-[485px]"
              } w-auto shadow-2xl shadow-black`}
              onClick={() => index === activeIndex && _selectedSlide(slide)}
            >
              <Image
                loading="lazy"
                src={slide.slideImage || ""}
                alt={slide.imageAlt || ""}
                width="1000"
                height="1000"
                className="object-cover w-full h-full my-5"
                quality={100}
              />
              <div className="absolute bottom-0 bg-black bg-opacity-50 w-full p-4 text-stone-200">
                <h2 className="text-lg font-bold">{t(`${slide.title}`)}</h2>
                <div className="flex">
                  <div className="flex flex-wrap items-start mr-auto">
                    {slide.ProjectInfo &&
                      slide.ProjectInfo.tech.map((label, labelIndex) => (
                        <Label
                          key={`label-${index}-${labelIndex}`}
                          text={label}
                        />
                      ))}
                  </div>
                  <div className="flex items-end gap-2">
                    {slide.icons &&
                      slide.icons.map((icon, iconIndex) => (
                        <IconButton
                          key={`icon-${index}-${iconIndex}`}
                          icon={icon}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
});

export default CarouselSlider;
