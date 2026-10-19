import { resolveSectionId } from "../data/sections";

export function scrollToSection(id: string, { updateHash = true, behavior = "smooth" }: { updateHash?: boolean; behavior?: ScrollBehavior } = {}) {
  const sectionId = resolveSectionId(id);
  if (!sectionId) return false;
  const element = document.getElementById(sectionId);
  if (!element) return false;

  element.scrollIntoView({ behavior, block: "start" });
  if (updateHash) {
    window.history.replaceState(null, "", `#${sectionId}`);
  }
  return true;
}
