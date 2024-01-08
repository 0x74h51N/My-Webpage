import { Icon } from "@/app/common.types";
import { IconType } from "react-icons";
import {
  FaDesktop,
  FaMobileAlt,
  FaCode,
  FaPaintBrush,
  FaGithub,
  FaGlobe,
  FaTelegram,
  FaInstagram,
  FaEnvelope,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaYoutube,
  FaLinkedinIn,
  FaCoffee,
  FaBook,
  FaHeart,
  FaSearch,
  FaPuzzlePiece,
  FaLightbulb,
  FaRocket,
  FaBroom,
  FaSync,
  FaBolt,
  FaFile,
  FaChartBar,
} from "react-icons/fa";
import { MdAccessibility, MdTouchApp } from "react-icons/md";
import { DiResponsive } from "react-icons/di";
import { TfiLayoutAccordionList } from "react-icons/tfi";
import { clickableChange } from "@/store/redux/isClickable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

const iconComponents: { [key: string]: IconType } = {
  github: FaGithub,
  web: FaGlobe,
  telegram: FaTelegram,
  instagram: FaInstagram,
  mail: FaEnvelope,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  facebook: FaFacebook,
  youtube: FaYoutube,
  linkedinIn: FaLinkedinIn,
  coffee: FaCoffee,
  book: FaBook,
  heart: FaHeart,
  desktop: FaDesktop,
  mobile: FaMobileAlt,
  code: FaCode,
  brush: FaPaintBrush,
  search: FaSearch,
  puzzle: FaPuzzlePiece,
  light: FaLightbulb,
  rocket: FaRocket,
  broom: FaBroom,
  sync: FaSync,
  bold: FaBolt,
  file: FaFile,
  touch: MdTouchApp,
  access: MdAccessibility,
  responsive: DiResponsive,
  layout: TfiLayoutAccordionList,
  chart: FaChartBar,
};

const IconButton = ({ icon, size }: { icon: Icon; size?: number }) => {
  const dispatch = useDispatch();
  const iconType = icon.type && icon.type.toLowerCase();
  const isClickable = useSelector(
    (state: RootState) => state.isClickable.clickable
  );
  const IconComponent = icon.type && iconType && iconComponents[iconType];
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
  if (!icon.type && icon.svg && icon.src) {
    return (
      <div
        className="relative group cursor-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={icon.src}
          alt={icon.alt}
          onClick={() => icon.link && window.open(icon.link, "_blank")}
          className={`w-auto ${
            icon.size ? `h-[${icon.size}px]` : "h-[25px]"
          } object-fit`}
        />
        {icon.alt && (
          <span className="absolute self-center rounded-md border-spacing-1 border-cool-gray-700 border-2 w-auto p-[2px] text-center text-white text-xs bg-cool-gray-400 opacity-0 transition-opacity group-hover:opacity-80 ease-in-out duration-300 pointer-events-none cursor-none">
            {icon.alt}
          </span>
        )}
      </div>
    );
  }

  if (iconType && IconComponent) {
    return (
      <div
        className="relative group cursor-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <a
          href={icon.link && icon.link}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-none"
        >
          <IconComponent
            size={icon.size ? icon.size : size}
            color={icon.color}
          />
          {icon.alt && (
            <span className="absolute self-center rounded-md border-spacing-1 border-cool-gray-700 border-2 w-auto p-[2px] text-center text-white text-xs bg-cool-gray-400 opacity-0 transition-opacity group-hover:opacity-80 ease-in-out duration-300 pointer-events-none cursor-none">
              {icon.alt}
            </span>
          )}
        </a>
      </div>
    );
  }

  console.error(`Invalid icon type: ${icon.type}`);
  return null;
};

export default IconButton;
