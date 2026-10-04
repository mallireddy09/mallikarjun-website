import type { TimelineEntry } from "../types/portfolio";
import { companies } from "./companies";

const { nvidia, homeDepot, microsoft, buffalo, buffaloDining, nineleaps, uber } =
  companies;

const experience: TimelineEntry[] = [
  {
    year: "Jun 8, 2026 - Present",
    title:
      "Data Engineer (Software Engineer – Data and Observability Platform)",
    company: nvidia,
  },
  {
    year: "May 4, 2026 - Jun 5, 2026",
    title: "Data Engineer",
    company: homeDepot,
    text: "Consultant via Insight Global, LLC",
  },
  {
    year: "Apr 8, 2026 - Apr 23, 2026",
    title: "Data Engineer II",
    company: microsoft,
    text: "Consultant via Randstad Digital LLC",
  },
  {
    year: "Jan 2, 2026 - Apr 7, 2026",
    title: "Data Engineer",
    company: microsoft,
    text: "Consultant via IGATE Solutions LLC",
  },
  {
    year: "Mar 3, 2025 - Dec 31, 2025",
    title: "Machine Learning Engineer Intern / Data Engineer",
    company: microsoft,
    text: "Consultant via Y STEM and Chess Inc",
  },
  {
    year: "Aug 26, 2024 - Jan 15, 2025",
    title: "Data Engineer",
    company: buffalo,
    text: "Student Assistant State Employee",
  },
  {
    year: "Oct 7, 2023 - Feb 23, 2024",
    title: "Data Engineer",
    company: buffaloDining,
    text: "Student Assistant",
  },
  {
    year: "Aug 17, 2022 - Apr 3, 2023",
    title: "Data Engineer (Member of Technical Staff II)",
    company: uber,
    text: "Consultant via Nineleaps",
  },
  {
    year: "Jan 17, 2022 - Aug 16, 2022",
    title: "Graduate Engineering Intern",
    company: nineleaps,
    text: "Client: Tim Hortons",
  },
];

export default experience;
