import { useEffect, useLayoutEffect, useRef, useState } from "react";

/** Pause demo updates off screen, in background tabs, and for reduced motion. */
export default function useProjectPlayback(ready = true, smooth = false) {
  const ref = useRef<HTMLDivElement>(null);
  const elapsed = useRef(0);
  const [time, setTime] = useState(0);
  const [eligible, setEligible] = useState(false);
  const running = eligible && ready;
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const update = () => {
      setReducedMotion(media.matches);
      setEligible(visible && !media.matches && !document.hidden);
    };
    const observer = new IntersectionObserver(entries => { visible = entries[0]?.isIntersecting ?? false; update(); }, { threshold: .12 });
    if (ref.current) observer.observe(ref.current);
    media.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      media.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  useLayoutEffect(() => {
    if (!running) return;
    let previous = performance.now();
    const tick = () => {
      const now = performance.now();
      elapsed.current += Math.max(0, now - previous);
      previous = now;
      setTime(elapsed.current);
    };
    let frame = 0;
    const animate = () => { tick(); frame = requestAnimationFrame(animate); };
    const timer = smooth ? undefined : setInterval(tick, 100);
    if (smooth) frame = requestAnimationFrame(animate);
    return () => {
      clearInterval(timer);
      cancelAnimationFrame(frame);
      elapsed.current += Math.max(0, performance.now() - previous);
    };
  }, [running, smooth]);
  useEffect(() => {
    if (reducedMotion) { elapsed.current = 0; setTime(0); }
  }, [reducedMotion]);
  return { ref, running, time: reducedMotion ? 0 : time };
}
