import { useEffect, useState } from "react";

function StageTypedText({ text, animate, duration = 1100, delay = 0 }: { text: string; animate: boolean; duration?: number; delay?: number }) {
  const [length, setLength] = useState(text.length);
  useEffect(() => {
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!animate || !preference || preference.matches) { setLength(text.length); return; }
    setLength(0);
    let timer: number | undefined;
    const startTimer = window.setTimeout(() => {
      let elapsed = 0;
      timer = window.setInterval(() => {
        elapsed += 20;
        const position = Math.min(text.length, Math.ceil(elapsed * text.length / Math.max(duration, 20)));
        setLength(position);
        if (position === text.length) window.clearInterval(timer);
      }, 20);
    }, delay);
    const onPreferenceChange = () => {
      if (preference.matches) { window.clearTimeout(startTimer); window.clearInterval(timer); setLength(text.length); }
    };
    preference.addEventListener("change", onPreferenceChange);
    return () => { window.clearTimeout(startTimer); window.clearInterval(timer); preference.removeEventListener("change", onPreferenceChange); };
  }, [text, animate, duration, delay]);
  return <span className="typed-text">
    <span className="type-accessible">{text}</span>
    <span className="type-reserve" aria-hidden="true">{text}</span>
    <span className="type-visible" aria-hidden="true" data-typing={length < text.length}>{text.slice(0, length)}{length < text.length && <span className="typing-caret" />}</span>
  </span>;
}
export default StageTypedText;
