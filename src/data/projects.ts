import { publicAsset } from "../helper/publicAsset";
import type { Project } from "../types/portfolio";


const projects: Project[] = [
  {
    id: 1,
    category: "React Native / App Development",
    image: publicAsset("/images/3d/track-money-3d.webp"),
    store: "https://play.google.com/store/apps/details?id=com.ksk_expense_manager",
    title: "Track My Money",
  },
  {
    id: 2,
    category: "Machine Learning",
    image:
      publicAsset("/images/3d/spacex-3d.webp"),
    github:
      "https://github.com/mallireddy09/IBM-Applied-Data-Science-Capstone-Project/tree/main/IBM-Data-Science-Capstone-SpaceX-main",
    title: "Space X Falcon 9 First Stage Landing Prediction",
  },
];

export default projects;
