"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import { useState } from "react";
import { logoType } from "@/app/common.types";

interface logoSlideProops {
  logos: logoType[];
}

const LogoSlider = ({ logos }: logoSlideProops) => {
  SwiperCore.use([Autoplay]);

  const breaks = {
    640: {
      slidesPerView: 6,
    },
    768: {
      slidesPerView: 8,
    },
    1024: {
      slidesPerView: 10,
    },
    1280: {
      slidesPerView: 12,
    },
  };
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };
  return (
    <Swiper
      centeredSlides
      loop
      autoplay={{
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
        reverseDirection: true,
      }}
      speed={800}
      slidesPerView={4}
      spaceBetween={0}
      breakpoints={breaks}
      className="w-full h-auto cursor-none"
    >
      {logos.map((item, index) => (
        <SwiperSlide
          key={index}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative w-[84px] h-[84px] max-lg:w-[70px] max-lg:h-[70px] max-sm:w-[55px] max-sm:h-[55px] flex justify-center my-8">
            <Image
              loading="lazy"
              width={100}
              height={100}
              src={item.icon}
              alt={item.text}
              className="h-auto w-full grayscale "
            />
            {hoveredIndex === index && (
              <div className="absolute self-center -bottom-6 rounded-md border-spacing-1 border-cool-gray-700 border-2  w-auto p-1 text-center text-white text-xs bg-cool-gray-400 opacity-80 transition-opacity duration-300 cursor-none pointer-events-none">
                {item.text}
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default LogoSlider;
