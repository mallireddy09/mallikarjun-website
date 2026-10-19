import type { TimelineEntry } from "../types/portfolio";
import { companies } from "./companies";

const education: TimelineEntry[] = [
  {
    year: "August 2023 – January 2025",
    title: "Master of Science in Data Science",
    company: companies.buffalo,
    text: "GPA: 3.86/4.0",
  },
  {
    year: "June 2018 – April 2022",
    title: "Bachelor of Technology in Computer Science and Engineering",
    company: companies.gitam,
    text: "GPA: 3.6/4.0",
  },
];

export default education;
