import { publicAsset } from "../helper/publicAsset";
import type { Company } from "../types/portfolio";
const gitamLogo = publicAsset("images/3d/gitam-brand-clear.png");
const nvidiaLogo = publicAsset("/images/3d/nvidia-brand-render.webp");
const homeDepotLogo = publicAsset("/images/3d/home-depot-brand-render.webp");
const microsoftLogo = publicAsset("/images/3d/microsoft-brand-render.webp");
const buffaloLogo = publicAsset("/images/3d/buffalo-brand-render.webp");
const nineleapsLogo = publicAsset("/images/3d/nineleaps-brand-render.webp");
const uberLogo = publicAsset("/images/3d/uber-brand-render.webp");

export const companies = {
  nvidia: {
    name: "NVIDIA",
    url: "https://www.nvidia.com/",
    logo: nvidiaLogo,
  },
  homeDepot: {
    name: "The Home Depot",
    url: "https://www.homedepot.com/",
    logo: homeDepotLogo,
  },
  microsoft: {
    name: "Microsoft",
    url: "https://www.microsoft.com/",
    logo: microsoftLogo,
  },
  buffalo: {
    name: "University at Buffalo",
    url: "https://www.buffalo.edu/",
    logo: buffaloLogo,
  },
  buffaloDining: {
    name: "University at Buffalo Campus Dining & Shops",
    url: "https://www.buffalo.edu/campusliving/dining.html",
    logo: buffaloLogo,
  },
  nineleaps: {
    name: "Nineleaps",
    url: "https://www.nineleaps.com/",
    logo: nineleapsLogo,
  },
  uber: {
    name: "Uber",
    url: "https://www.uber.com/",
    logo: uberLogo,
  },
  gitam: {
    name: "GITAM University",
    url: "https://www.gitam.edu/",
    logo: gitamLogo,
  },
} satisfies Record<string, Company>;
