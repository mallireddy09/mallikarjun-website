export function scrollToSection(id, { updateHash = true } = {}) {
  const element = document.getElementById(id);
  if (!element) return false;

  element.scrollIntoView({ behavior: "smooth", block: "start" });
  if (updateHash) {
    window.history.replaceState(null, "", `#${id}`);
  }
  return true;
}
