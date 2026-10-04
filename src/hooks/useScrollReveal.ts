import { useEffect, useRef, useState } from "react";

/**
 * Reveals when any part of the element enters the viewport.
 * Uses threshold 0 so tall sections (e.g. certification grids) still show.
 */
export function useScrollReveal(options: Pick<IntersectionObserverInit, "threshold" | "rootMargin"> = {}) {
  const { threshold = 0, rootMargin = "0px 0px -8% 0px" } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    // Already in view on mount (e.g. first sections)
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible] as const;
}

export default useScrollReveal;
