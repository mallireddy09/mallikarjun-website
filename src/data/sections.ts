export const SECTIONS = [
  { id: "home", path: "/", label: "Home" },
  { id: "about", path: "/about", label: "About" },
  { id: "experience", path: "/experience", label: "Experience" },
  { id: "projects", path: "/projects", label: "Projects" },
  { id: "skills", path: "/skills", label: "Skills" },
  { id: "certifications", path: "/certifications", label: "Certifications" },
  { id: "education", path: "/education", label: "Education" },
  { id: "blogs", path: "/blogs", label: "Blogs" },
  { id: "contact", path: "/contact", label: "Contact" },
] as const;

export type SectionId = typeof SECTIONS[number]["id"];

export function resolveSectionId(value: string): SectionId | undefined {
  const id = value === "certification" ? "certifications" : value;
  return SECTIONS.find((section) => section.id === id)?.id;
}
