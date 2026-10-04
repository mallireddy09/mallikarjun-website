import { companies } from "./companies";

export const PROFILE = {
  name: "Mallikarjun Reddy",
  email: "mallireddy0912@gmail.com",
  location: "United States",
  github: "https://github.com/mallireddy09",
  linkedin: "https://www.linkedin.com/in/mallireddy09/",
  twitter: "https://x.com/mallireddy09",
  resume:
    "https://drive.google.com/file/d/1UppfWTSqy5KcXqWSr9PwjwqOBsqEcQPK/view?usp=sharing",
  leetcode: "https://leetcode.com/u/mallikarjun09/",
};

export const HERO_ROLES = [
  "A Data Engineer",
  "An AI/ML Engineer",
  "A Cloud Platform Engineer",
];

export const HERO_SUMMARY =
  "Data & AI Engineer architecting scalable data pipelines, streaming architectures, and multi-cloud platforms across GCP, AWS, and Azure.";

export const PAST_IMPACT = [companies.nvidia, companies.microsoft, companies.homeDepot, companies.uber];

export const ABOUT_PARAGRAPHS = [
  "I design and optimize high-throughput data infrastructure that makes complex data reliable and useful. My work combines distributed processing with Spark/PySpark, scalable ingestion, and resilient multi-cloud architectures across AWS, GCP, and Azure to support analytics and intelligent systems.",
  "At NVIDIA, I work on the Data & Observability Platform. Prior consulting work at Microsoft and The Home Depot, along with Uber engagements via Nineleaps, informs my approach to performance, data quality, and dependable platforms in demanding production environments.",
  "I hold an M.S. in Data Science from the University at Buffalo. That foundation connects my infrastructure work with statistical thinking, machine learning, and the insights that well-designed data platforms make possible.",
];

export const ABOUT_HIGHLIGHTS = [
  { label: "Degree", value: "M.S. in Data Science", detail: "University at Buffalo (UB)" },
  { label: "Current Role", value: "Data & Observability", detail: "NVIDIA" },
  { label: "Cloud Tech", value: "AWS · GCP · Azure" },
  { label: "Location", value: PROFILE.location },
];
