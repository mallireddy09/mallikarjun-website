import { useId } from "react";
import styled from "styled-components";
import type { SectionId } from "../data/sections";
import { publicAsset } from "../helper/publicAsset";

const positions: Record<SectionId, [number, number]> = {
  home: [0, 0], about: [1, 0], experience: [2, 0],
  projects: [0, 1], skills: [1, 1], certifications: [2, 1],
  education: [0, 2], blogs: [1, 2], contact: [2, 2],
};

// Separate the moving parts of the original artwork so its 3D finish is preserved.
const panels: Partial<Record<SectionId, string>> = {
  home: "M58 67H75V97H58Z",
  experience: "M8 39H89V60L59 70H40L9 61Z",
  projects: "M38 19H72L84 33V85H38Z",
  certifications: "M55 47H92V98H55Z",
  education: "M50 15Q68 3 88 14L91 77Q69 72 50 91Z",
  contact: "M7 20H90L49 61Z",
};

export default function NavigationIcon({ id, reacting }: { id: SectionId; reacting: boolean }) {
  const token = useId().replace(/:/g, "");
  const [column, row] = positions[id];
  const panel = panels[id];
  const artwork = id === "blogs"
    ? <image href={publicAsset("/images/3d/blogs-standalone-3d.webp")} x="0" y="4" width="100" height="92" />
    : <image href={publicAsset("/images/3d/navigation-v3-3d.webp")} x={-column * 100} y={-row * 100} width="300" height="300" />;
  const image = <g clipPath={`url(#${token}-tile)`}>{artwork}</g>;
  return <IconStyled viewBox="0 0 100 100" width="48" height="48" aria-hidden="true" className={`nav-icon${reacting ? " is-reacting" : ""}`} data-icon={id}>
    <defs>
      <clipPath id={`${token}-tile`}><rect width="100" height="100"/></clipPath>
      <clipPath id={`${token}-book`}><path d="M13 18Q30 9 50 24Q70 9 88 18L92 83Q70 77 50 94Q30 78 9 84Z"/></clipPath>
      <mask id={`${token}-body`} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="white"/>{panel && <path d={panel} fill="black"/>}{id === "blogs" && <ellipse cx="53" cy="48" rx="31" ry="20" fill="black"/>}</mask>
      <clipPath id={`${token}-panel`}>{panel && <path d={panel}/>}</clipPath>
      <radialGradient id={`${token}-bubble`} gradientUnits="userSpaceOnUse" cx="47" cy="29" r="48"><stop stopColor="#329ff0"/><stop offset=".55" stopColor="#126fd0"/><stop offset="1" stopColor="#0048b2"/></radialGradient>
      <linearGradient id={`${token}-silver`} x2="1" y2="1"><stop stopColor="#fff"/><stop offset=".5" stopColor="#c8d8e8"/><stop offset="1" stopColor="#647991"/></linearGradient>
    </defs>
    {reacting && <>
      {id === "blogs" && <ellipse cx="53" cy="48" rx="31" ry="20" fill={`url(#${token}-bubble)`}/>}
      {id === "home" && <path d={panel} fill="#102645"/>}
      {id === "experience" && <path d={panel} fill="#112548" stroke="#69a1db" strokeWidth="1"/>}
      {id === "projects" && <path d={panel} fill="#1966cb"/>}
      {id === "contact" && <path d="M7 20H90L49 64Z" fill="#0d3c8b"/>}
    </>}
    <g className="icon-body" mask={reacting && id !== "education" && (panel || id === "blogs") ? `url(#${token}-body)` : undefined}>{image}</g>
    {reacting && id === "contact" && <g className="letter reaction-part"><rect x="24" y="32" width="51" height="37" rx="3" fill="#f2f7ff" stroke="#91b9e6"/><path d="M32 42h34m-34 8h34m-34 8h22" stroke="#4086ce" strokeWidth="3" strokeLinecap="round"/></g>}
    {reacting && panel && <g clipPath={id === "education" ? `url(#${token}-book)` : undefined}><g className="moving-panel reaction-part"><g clipPath={`url(#${token}-panel)`}>{image}</g></g></g>}
    {reacting && id === "blogs" && <g>{[35, 53, 71].map((x, i) => <circle className="typing-dot reaction-part" key={x} cx={x} cy="49" r="6.8" fill={`url(#${token}-silver)`} style={{ animationDelay: `${i * 90}ms` }}/>)}</g>}
    {reacting && id === "skills" && <g className="bulb-rays reaction-part" stroke="#b2e7ff" strokeWidth="3" strokeLinecap="round"><path d="M12 28 4 23m83 5 8-5M22 10l-3-8m59 8 3-8M8 47H1m90 0h8"/></g>}
    {reacting && id === "certifications" && <path className="award-spark reaction-part" d="m82 33 2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#c7eeff"/>}
  </IconStyled>;
}

const IconStyled = styled.svg`
  display: inline-block; width: 48px; height: 48px; flex-shrink: 0; margin-right: 10px;
  vertical-align: middle; overflow: visible; isolation: isolate;
  .moving-panel, .icon-body, .letter { transform-box: view-box; }
  &[data-icon="home"] .moving-panel { transform-origin: 58px 82px; animation: door-open .75s ease-in-out; }
  &[data-icon="experience"] .moving-panel { transform-origin: 50px 39px; animation: bag-open .75s ease-in-out; }
  &[data-icon="projects"] .moving-panel { transform-origin: 38px 52px; animation: project-fan .75s ease-in-out; }
  &[data-icon="education"] .moving-panel { transform-origin: 50px 50px; animation: page-turn .75s ease-in-out; }
  &[data-icon="contact"] .moving-panel { transform-origin: 49px 20px; animation: envelope-open .75s ease-in-out; }
  &[data-icon="certifications"] .moving-panel { transform-origin: 73px 68px; animation: award-pop .75s ease-in-out; }
  &[data-icon="about"].is-reacting .icon-body { transform-origin: 50px 50px; animation: info-spin .75s ease-in-out; }
  &[data-icon="skills"].is-reacting .icon-body { transform-origin: 50px 50px; animation: bulb-light .75s ease-in-out; }
  .typing-dot { transform-box: view-box; animation: typing .6s ease-in-out; }
  .letter { animation: letter-rise .75s ease-in-out; }
  .bulb-rays, .award-spark { animation: sparkle .75s ease-in-out; opacity: 0; }
  @keyframes door-open { 0%, 100% { transform: perspective(160px) rotateY(0); } 40%, 65% { transform: perspective(160px) rotateY(-78deg); } }
  @keyframes bag-open { 0%, 100% { transform: perspective(160px) rotateX(0); } 40%, 65% { transform: perspective(160px) rotateX(115deg); } }
  @keyframes project-fan { 0%, 100% { transform: rotate(0) translateY(0); } 45%, 65% { transform: rotate(13deg) translateY(-7px); } }
  @keyframes page-turn { 0%, 100% { transform: perspective(180px) rotateY(0); } 45%, 65% { transform: perspective(180px) rotateY(-155deg); } }
  @keyframes envelope-open { 0%, 100% { transform: perspective(160px) rotateX(0); } 35%, 70% { transform: perspective(160px) rotateX(160deg); } }
  @keyframes letter-rise { 0%, 15%, 100% { transform: translateY(0); opacity: 0; } 45%, 65% { transform: translateY(-15px); opacity: 1; } }
  @keyframes award-pop { 0%, 100% { transform: scale(1); } 45% { transform: scale(1.2) rotate(-10deg); } 65% { transform: scale(1.1) rotate(6deg); } }
  @keyframes info-spin { 0%, 100% { transform: perspective(180px) rotateY(0); } 65% { transform: perspective(180px) rotateY(360deg); } }
  @keyframes bulb-light { 0%, 100% { filter: drop-shadow(0 0 0 #83d9ff00); } 45%, 65% { filter: drop-shadow(0 0 9px #83d9ff); } }
  @keyframes typing { 0%, 100% { transform: translateY(0); } 45% { transform: translateY(-10px); } }
  @keyframes sparkle { 0%, 100% { opacity: 0; } 35%, 65% { opacity: 1; } }
  @media (prefers-reduced-motion: reduce) { &, & * { animation: none !important; transition: none !important; } }
`;
