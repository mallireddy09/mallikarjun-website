import { resolveSectionId } from "../data/sections";

export function scrollToSection(id: string, { updateHash = true, behavior = "smooth" }: { updateHash?: boolean; behavior?: ScrollBehavior } = {}) {
  const sectionId = resolveSectionId(id);
  if (!sectionId) return false;
  const element = document.getElementById(sectionId);
  if (!element) return false;

  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: reducedMotion ? "instant" : behavior, block: "start" });
  if (updateHash) {
    window.history.replaceState(null, "", `#${sectionId}`);
  }
  return true;
}
