import { useEffect, useId, useState, type MouseEventHandler } from "react";
import styled from "styled-components";
import { publicAsset } from "../helper/publicAsset";

export default function ProfilePortrait({ onClick, visible }: { onClick: MouseEventHandler<HTMLAnchorElement>; visible: boolean }) {
  const clipId = `portrait-window-${useId().replace(/:/g, "")}`;
  const [reaction, setReaction] = useState({ count: 0, playing: false });
  useEffect(() => {
    if (!reaction.playing) return;
    const timer = setTimeout(() => setReaction(current => ({ ...current, playing: false })), 850);
    return () => clearTimeout(timer);
  }, [reaction]);

  const react = () => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) setReaction(current => ({ count: current.count + 1, playing: true }));
  };
  return <PortraitStyled href="#home" aria-label="Mallikarjun Reddy home" $visible={visible}
    className={reaction.playing ? "portrait-link is-reacting" : "portrait-link"}
    onPointerEnter={event => { if (event.pointerType === "mouse") react(); }}
    onClick={event => {
      react();
      onClick(event);
    }}>
    <span className="portrait-frame" aria-hidden="true" />
    <svg className="portrait-clip" width="0" height="0" aria-hidden="true"><defs><clipPath id={clipId} clipPathUnits="objectBoundingBox"><path d="M0 0H1V.6153846A.5 .3846154 0 0 1 0 .6153846Z"/></clipPath></defs></svg>
    <span className="portrait-window" style={{ clipPath: reaction.playing ? `url(#${clipId})` : "circle(50% at 50% 50%)" }}><span className="portrait-tilt"><span className="portrait-motion" key={reaction.count} onAnimationEnd={event => {
      if (event.animationName === "portrait-emerge") setReaction(current => ({ ...current, playing: false }));
    }}>
      <img src={publicAsset("/images/3d/profile-mallikarjun-3d.png")} alt="Mallikarjun Reddy — 3D portrait" width="130" height="130" />
    </span></span></span>
  </PortraitStyled>;
}

const PortraitStyled = styled.a<{ $visible: boolean }>`
  --portrait-size: clamp(96px, 22vw, 130px);
  display: inline-block; width: var(--portrait-size); height: var(--portrait-size);
  position: relative; border-radius: 50%; -webkit-tap-highlight-color: transparent;
  &:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 8px; }
  .portrait-frame { position: absolute; inset: 0; box-sizing: border-box; border-radius: 50%; border: 3px solid var(--primary-color);
    background: radial-gradient(circle at 35% 25%, rgba(var(--primary-color-rgb), .2), var(--sidebar-dark-color) 75%);
    box-shadow: inset 0 2px 8px rgba(var(--primary-color-rgb), .15), 0 8px 24px rgba(var(--primary-color-rgb), .2); }
  .portrait-clip { position: absolute; pointer-events: none; }
  .portrait-window { position: absolute; inset: 3px; pointer-events: none; }
  &.is-reacting .portrait-window { top: calc(3px - var(--portrait-size) * .3); }
  .portrait-tilt { display: block; position: absolute; inset: auto 0 0; height: calc(var(--portrait-size) - 6px); }
  .portrait-motion { display: block; position: relative; width: 100%; height: 100%; transform-origin: 50% 100%; }
  img { display: block; width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 3px 3px #0003); }
  &.is-reacting .portrait-motion { animation: portrait-emerge .75s ease-in-out; animation-play-state: ${({ $visible }) => $visible ? "running" : "paused"}; }
  @keyframes portrait-emerge { 0%, 100% { transform: translateY(0) scale(1); } 35%, 55% { transform: translateY(-12px) scale(1.16); } 75% { transform: translateY(-3px) scale(1.04); } }
  @media (prefers-reduced-motion: reduce) { &, & *, & *::after { animation: none !important; transition: none !important; transform: none !important; } }
`;
