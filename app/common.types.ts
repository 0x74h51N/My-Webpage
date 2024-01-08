import { Dispatch } from "react";

export type Links = {
  href: string;
  key: string;
  text: string;
};

export type Policy = {
  title?: string;
  mainTitle?: string;
  description?: string;
  subTitles?: SubTitles[];
};

export type SubTitles = {
  title?: string;
  description?: string;
};

export type SectionData = {
  name?: string;
  className?: string;
  image?: string;
  textStyle?: string;
  children?: React.ReactNode;
  parallax?: boolean | false;
  parallaxImageSrc?: string;
  parallaxImageAlt?: string;
  background?: string;
  topImage?: string;
  smoothScroll?: boolean | false;
};

export type HandleScroll = {
  event: WheelEvent;
  currentSectionIndex: number;
  sectionsData: SectionData[];
  sectionRefs: React.RefObject<HTMLDivElement>[];
  smoothScroll?: boolean;
  scrollY?: number;
  duration?: number;
  dispatchSetIndex: Dispatch<number>;
};

export type slide = {
  id: any;
  slideImage?: string;
  slideDescription?: string;
  imageAlt?: string;
  imageUrl?: string;
  imageUrlV?: string;
  imageUrlH?: string;
  title?: string;
  description?: string;
  left?: boolean;
  active?: boolean;
  children?: React.ReactNode | React.ReactElement<{ active: boolean }>;
  box?: boolean;
  githubLink?: string;
  icons?: Icon[];
  labels?: string[];
  projectInfo?: ProjectInfo;
};

export type CardSections = {
  title?: string;
  description?: string;
  icon?: Icon;
  icons?: Icon[];
  index?: number;
  colorFulBorder?: boolean;
  image?: string;
  list?: string[];
};

export type ColorPacks = {
  [key: string]: string[];
};

export type ColorType = keyof ColorPacks;

export type generateSpanType = {
  text: string;
  colorType?: ColorType;
  zeroColor?: string;
  randomCount?: number;
  _className?: string;
};

export type ColorfulHoverType = {
  char?: string;
  icon?: Icon;
  initial?: any;
  style?: React.CSSProperties;
  className?: string;
  key?: string | number;
  span?: boolean;
  onClick?: () => void;
  _colorType?: ColorType;
  randomCount?: number;
  zeroColor?: string;
};

export type Icon = {
  type?: string;
  link?: string;
  size?: number;
  color?: string;
  alt?: string;
  substance?: string;
  svg?: boolean | false;
  src?: string;
};

export type logoType = {
  text: string;
  icon: string;
};

export type PortfolioItemProps = {
  _id: string;
  slideImage: string;
  image: string;
  imageAlt: string;
  title: string;
  projectType: string;
  slideDescription: string;
  description?: string;
  description2?: string;
  description3?: string;
  githubLink?: string;
  icons?: Icon[];
  labels?: string[];
  ProjectInfo?: ProjectInfo;
};

export type ProjectInfo = {
  category: string;
  client: string;
  location: string;
  date: string;
  tech: string[];
};
