import { useEffect, useMemo, useState } from "react";
import Particles, { ParticlesProvider, type IParticlesProps } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Theme, ThemeProps } from "../types/portfolio";

function getParticleOptions(theme: Theme, prefersReduced: boolean): NonNullable<IParticlesProps["options"]> {
  const isLight = theme === "light-theme";
  const color = isLight ? "#2770b5" : "#accbff";
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  return {
    fullScreen: { enable: false },
    fpsLimit: isMobile ? 30 : 45,
    interactivity: {
      detectsOn: "window",
      events: { onClick: { enable: false }, onHover: { enable: !prefersReduced, mode: "repulse" } },
      modes: { repulse: { distance: 130, duration: .5, speed: 1, maxSpeed: 4, factor: 60 } },
    },
    particles: {
      color: { value: color },
      links: { color, distance: isMobile ? 110 : 155, enable: true, opacity: isLight ? .24 : .32, width: .8 },
      move: { direction: "none", enable: !prefersReduced, outModes: { default: "bounce" }, random: false, speed: .45, straight: false },
      number: { density: { enable: true, width: 1200, height: 1000 }, value: prefersReduced ? 32 : isMobile ? 28 : 50 },
      opacity: { value: isLight ? .36 : .42 },
      shape: { type: "circle" },
      size: { value: { min: .8, max: 2 } },
    },
    detectRetina: true,
    resize: { enable: true },
  };
}

function Particle({ theme }: ThemeProps) {
  const [prefersReduced, setPrefersReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReduced(preference.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  const options = useMemo(() => getParticleOptions(theme, prefersReduced), [theme, prefersReduced]);
  return <ParticlesProvider init={loadSlim}><Particles id="tsparticles" options={options} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} /></ParticlesProvider>;
}
export default Particle;
