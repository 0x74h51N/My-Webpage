import { PortfolioItemProps } from "@/app/common.types";

import { Icon, slide } from "@/app/common.types";

const commonIcons: Record<string, Icon> = {
  github: {
    type: "github",
    size: 24,
    color: "#FFFFFF",
  },
  web: {
    type: "web",
    size: 24,
    color: "#FFFFFF",
  },
};

export const portfolioPageItems: PortfolioItemProps[] = [
  {
    _id: "crunchypix",
    slideImage: "/PortfolioSlides/crunchypix.jpg",
    image: "/portfolioItems/crunchypix.png",
    imageAlt: "CrunchyPix",
    title: "items.0.title",
    slideDescription: "items.0.slideDescription",
    projectType: "items.0.projectType",
    ProjectInfo: {
      category: "items.0.projectType",
      client: "items.0.client",
      location: "items.0.location",
      date: "March 1,2024",
      tech: ["TypeScript", "Next.js", "Tailwind", "React", "Redux"],
    },
    icons: [
      {
        ...commonIcons.github,
        link: "https://github.com/0x74h51N/My-Webpage",
      },
      {
        ...commonIcons.web,
        link: "https://crunchypix.vercel.app/",
      },
    ],
  },
  {
    _id: "KYK_Electric",
    slideImage: "/PortfolioSlides/kykelectric.jpg",
    image: "/PortfolioSlides/kykelectric.jpg",
    imageAlt: "Kyk Electric",
    title: "items.3.title",
    slideDescription: "items.3.slideDescription",
    projectType: "items.3.projectType",
    ProjectInfo: {
      category: "items.3.projectType",
      client: "items.3.client",
      location: "items.3.location",
      date: "July 15,2019",
      tech: ["HTML", "CSS", "JavaScript", "WordPress"],
    },
    icons: [
      {
        ...commonIcons.github,
        link: "https://github.com/0x74h51N/",
      },
      {
        ...commonIcons.web,
        link: "https://kykelektrik.com/",
      },
    ],
  },
  {
    _id: "CC_Order",
    slideImage: "/PortfolioSlides/ccorder.jpg",
    image: "/portfolioItems/ccorder.png",
    imageAlt: "CC Order",
    title: "items.1.title",
    slideDescription: "items.1.slideDescription",
    projectType: "items.1.projectType",
    ProjectInfo: {
      category: "items.1.projectType",
      client: "items.1.client",
      location: "items.1.location",
      date: "September 28 ,2023",
      tech: ["TypeScript", "Next.js", "CSS", "React", "Redux"],
    },
    icons: [
      {
        ...commonIcons.github,
        link: "https://github.com/0x74h51N/",
      },
      {
        ...commonIcons.web,
        link: "https://signup-project-rosy.vercel.app/",
      },
    ],
  },
  {
    _id: "Minting_UI",
    slideImage: "/PortfolioSlides/mintingui.jpg",
    image: "/portfolioItems/mintingui.png",
    imageAlt: "MintingUI",
    title: "items.2.title",
    slideDescription: "items.2.slideDescription",
    projectType: "items.2.projectType",
    ProjectInfo: {
      category: "items.2.projectType",
      client: "items.2.client",
      location: "items.2.location",
      date: "Agust 24 ,2023",
      tech: ["TypeScript", "Next.js", "Tailwind", "Hardhat", "React"],
    },
    icons: [
      {
        ...commonIcons.github,
        link: "https://github.com/0x74h51N/SEth2-minting-N",
      },
      {
        ...commonIcons.web,
        link: "https://minting-ui.vercel.app/",
      },
    ],
  },
];
