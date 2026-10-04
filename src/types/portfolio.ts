export type Theme = "dark-theme" | "light-theme";

export interface ThemeProps {
  theme: Theme;
}

export interface Company {
  name: string;
  url: string;
  logo: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  company: Company;
  text?: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  link: string;
  image?: string;
  by?: string;
  month?: string;
  date?: string;
}

export interface Project {
  id: number;
  category: string;
  image: string;
  title: string;
  text: string;
  github?: string;
  demo?: string;
  store?: string;
}

export interface Skill {
  label: string;
  url: string;
}

export interface SkillSection {
  heading: string;
  categories: { label: string; items: Skill[] }[];
}
