import { useCallback, useMemo } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";
import type { IParticlesProps } from "react-particles";
import type { Theme, ThemeProps } from "../types/portfolio";

function getParticleOptions(theme: Theme): NonNullable<IParticlesProps["options"]> {
  const color = theme === "light-theme" ? "#007bff" : "#ffffff";
  const isMobile =
    typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return {
    fpsLimit: isMobile ? 60 : 120,
    interactivity: {
      events: {
        onClick: { enable: !isMobile, mode: "push" },
        onHover: { enable: !isMobile && !prefersReduced, mode: "repulse" },
        resize: true,
      },
      modes: {
        push: { quantity: 3 },
        repulse: { distance: 150, duration: 0.4 },
      },
    },
    particles: {
      color: { value: color },
      links: {
        color,
        distance: 140,
        enable: !prefersReduced,
        opacity: 0.6,
        width: 0.8,
      },
      move: {
        direction: "none",
        enable: !prefersReduced,
        outModes: { default: "bounce" },
        random: false,
        speed: isMobile ? 1.5 : 3,
        straight: false,
      },
      number: {
        density: { enable: true, area: 1600 },
        value: prefersReduced ? 16 : isMobile ? 28 : 55,
      },
      opacity: { value: 0.6 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: isMobile ? 2.5 : 3.5 } },
    },
    detectRetina: true,
  };
}

function Particle({ theme }: ThemeProps) {
  const particlesInit = useCallback<NonNullable<IParticlesProps["init"]>>(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(() => getParticleOptions(theme), [theme]);

  return (
    <Particles
      width="100%"
      height="100%"
      id="tsparticles"
      init={particlesInit}
      options={options}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

export default Particle;
