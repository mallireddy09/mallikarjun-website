import { useEffect, type RefObject } from "react";

const TARGETS = ".about-narrative > p, .highlights-card, .grid-item, .gallery-item, .resume-content > *, .pipeline, .skill-groups > details, .contact-banner, .skills-heading-row";

/** One observer for the page, including cards added by project filters. */
export default function useContentReveal(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root || !window.IntersectionObserver || !Element.prototype.animate) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const seen = new WeakSet<Element>();
    const animations = new Set<Animation>();
    const show = (element: Element, animate: boolean) => {
      element.classList.remove("scroll-reveal-pending");
      element.setAttribute("data-scroll-revealed", "true");
      observer.unobserve(element);
      if (!animate || preference.matches) return;
      const animation = element.animate([
        { opacity: 0, translate: "0 18px" },
        { opacity: 1, translate: "0 0" },
      ], { duration: 600, easing: "cubic-bezier(.2,.7,.2,1)" });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) show(entry.target, true); });
    }, { threshold: 0, rootMargin: "0px 0px -24px 0px" });
    const register = () => {
      root.querySelectorAll(TARGETS).forEach(element => {
        if (seen.has(element)) return;
        seen.add(element);
        const rect = element.getBoundingClientRect();
        if (preference.matches || (rect.top < innerHeight && rect.bottom > 0)) {
          show(element, false);
        } else {
          element.classList.add("scroll-reveal-pending");
          observer.observe(element);
        }
      });
    };
    const focus = (event: FocusEvent) => {
      if (event.target instanceof Element) {
        const target = event.target.closest(".scroll-reveal-pending");
        if (target) show(target, false);
      }
    };
    const reduceMotion = () => {
      if (!preference.matches) return;
      animations.forEach(animation => animation.cancel());
      animations.clear();
      root.querySelectorAll(".scroll-reveal-pending").forEach(element => show(element, false));
    };
    register();
    const mutations = new MutationObserver(records => {
      if (records.some(record => [...record.addedNodes].some(node => node instanceof Element))) register();
    });
    mutations.observe(root, { childList: true, subtree: true });
    root.addEventListener("focusin", focus);
    preference.addEventListener("change", reduceMotion);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      animations.forEach(animation => animation.cancel());
      root.querySelectorAll(".scroll-reveal-pending").forEach(element => element.classList.remove("scroll-reveal-pending"));
      root.removeEventListener("focusin", focus);
      preference.removeEventListener("change", reduceMotion);
    };
  }, [ref]);
}
