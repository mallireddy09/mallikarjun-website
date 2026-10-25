import { useLayoutEffect, useState } from "react";

export interface HeroPreviewRegion {
  left: number;
  top: number;
  width: number;
  height: number;
}

/** Reserve the intro area for hover previews; leave navigation, icons and the diagram clear. */
export default function useHeroPreviewRegion(active: boolean) {
  const [region, setRegion] = useState<HeroPreviewRegion | null>(null);
  useLayoutEffect(() => {
    if (!active) return;
    const intro = document.querySelector<HTMLElement>(".hero-intro");
    const social = document.querySelector<HTMLElement>(".hero-intro .social");
    if (!intro || !social) { setRegion(null); return; }
    const update = () => {
      const text = intro.getBoundingClientRect();
      const icons = social.getBoundingClientRect();
      const diagram = document.querySelector(".hero-art")?.getBoundingClientRect();
      const impact = document.querySelector(".impact-bar")?.getBoundingClientRect();
      const sidebar = document.getElementById("site-sidebar");
      const sidebarRight = sidebar?.getAttribute("aria-hidden") === "false" ? sidebar.getBoundingClientRect().right + 16 : 16;
      const left = Math.max(16, text.left, sidebarRight);
      const right = Math.min(innerWidth - 16, text.right, diagram && diagram.left > text.left + 100 ? diagram.left - 20 : innerWidth - 16);
      const aboveBottom = Math.min(innerHeight - 16, icons.top - 24);
      const belowTop = Math.max(16, icons.bottom + 24, (impact?.bottom ?? icons.bottom) + 24);
      const top = aboveBottom - 16 >= 140 ? 16 : belowTop;
      const bottom = top === 16 ? aboveBottom : innerHeight - 16;
      const next = right - left >= 180 && bottom - top >= 100 ? { left, top, width: right - left, height: bottom - top } : null;
      setRegion(current => JSON.stringify(current) === JSON.stringify(next) ? current : next);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(intro);
    observer.observe(social);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [active]);
  return active ? region : null;
}
