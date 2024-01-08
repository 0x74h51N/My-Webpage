import { logoType } from "@/app/common.types";

export const LogoComponent = ({ key }: { key: string }) => {
  const normalizedKey = key.toLowerCase().replace(/\./g, "");
  const logo: logoType = {
    icon: `/logoSlides/${normalizedKey}.svg`,
    text: key,
  };

  return logo;
};
