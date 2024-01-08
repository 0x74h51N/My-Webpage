import { LogoComponent } from "@/utils/logoComponent";
import Image from "next/image";
import { useState } from "react";

interface LogoImageProps {
  logoKey: string;
  index: number;
}

const LogoImage = ({ logoKey, index }: LogoImageProps) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const item = LogoComponent({ key: logoKey });
  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  return (
    <>
      <Image
        loading="lazy"
        fill
        src={item.icon}
        alt={item.text}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        className="h-auto w-full "
      />
      {hoveredIndex === index && (
        <div className="fixed self-center -bottom-7 rounded-md border-spacing-1 border-cool-gray-700 border-2 w-auto p-1 text-center text-white text-xs bg-cool-gray-400 opacity-80 transition-opacity duration-300 cursor-none pointer-events-none">
          {item.text}
        </div>
      )}
    </>
  );
};

export default LogoImage;
