import { useId } from "react";
import styled from "styled-components";
import { publicAsset } from "../helper/publicAsset";

const images = {
  events: "hero-events-3d.webp", api: "hero-api-3d.webp", database: "pipeline-store-3d.webp",
  ingest: "pipeline-ingest-3d.webp", process: "pipeline-process-3d.webp", observe: "pipeline-observe-3d.webp", ai: "hero-ai-3d.webp",
};
export type PipelineArtworkKind = keyof typeof images | "trusted";

function gearOutline(radius: number, teeth: number) {
  return Array.from({ length: teeth * 4 }, (_, i) => {
    const angle = i / (teeth * 4) * Math.PI * 2;
    const r = i % 4 === 1 || i % 4 === 2 ? radius : radius * .81;
    return `${i === 0 ? "M" : "L"}${(Math.cos(angle) * r).toFixed(2)} ${(Math.sin(angle) * r).toFixed(2)}`;
  }).join(" ") + "Z";
}

/** Artwork uses a 100 × 100 coordinate space in both the hero SVG and Skills tabs. */
export default function PipelineArtwork({ kind }: { kind: PipelineArtworkKind }) {
  const token = `pipeline-art-${useId().replace(/:/g, "")}`;
  const silver = `url(#${token}-silver)`, blue = `url(#${token}-blue)`;
  return <ArtworkStyled className="pipeline-artwork" data-artwork={kind} aria-hidden="true">
    <defs>
      <linearGradient id={`${token}-silver`} x2=".8" y2="1"><stop stopColor="#f1faff"/><stop offset=".3" stopColor="#8aaec8"/><stop offset=".52" stopColor="#e5f4ff"/><stop offset="1" stopColor="#536e8c"/></linearGradient>
      <linearGradient id={`${token}-blue`} x2=".6" y2="1"><stop stopColor="#5ccbff"/><stop offset=".45" stopColor="#0875f0"/><stop offset="1" stopColor="#00368f"/></linearGradient>
    </defs>
    {kind === "trusted" ? <g className="trusted-shield art-motion">
      <ellipse cx="51" cy="91" rx="28" ry="5" fill="#001d4d" opacity=".22"/>
      <path d="M52 9 86 22v29Q85 76 52 94 19 76 18 51V22Z" fill="#00316e" stroke="#588bb6" strokeWidth="2"/>
      <path d="M47 5 81 18v29Q80 72 47 90 14 72 13 47V18Z" fill={silver} stroke="#c9efff" strokeWidth="1.5"/>
      <path d="m47 14 25 10v23Q71 65 47 80 23 65 22 47V24Z" fill={blue} stroke="#15559d" strokeWidth="2"/>
      <path d="m25 27 22-9v54Q29 61 25 46Z" fill="#8ce4ff" opacity=".2"/>
      <path d="m32 47 11 12 22-26" fill="none" stroke="#00346f" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" transform="translate(1 3)"/>
      <path className="trusted-check art-motion" d="m32 47 11 12 22-26" fill="none" stroke="#d3fffa" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" pathLength="1"/>
      <path d="m77 9 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="#b6faff"/>
    </g> : kind === "process" ? <>
      {[{x:36,y:41,r:28,teeth:12,small:false},{x:69,y:67,r:22,teeth:10,small:true}].map(gear => <g key={gear.x} transform={`translate(${gear.x} ${gear.y})`}>
        <g className={`gear-wheel art-motion${gear.small ? " gear-counter" : ""}`}>
          <rect x={-gear.r-4} y={-gear.r-4} width={gear.r*2+8} height={gear.r*2+8} fill="transparent"/>
          <path d={gearOutline(gear.r, gear.teeth)} transform="translate(2 3)" fill="#03449d" stroke="#063478"/>
          <path d={gearOutline(gear.r, gear.teeth)} fill={silver} stroke="#a9ddff" strokeWidth=".8"/>
          <circle r={gear.r*.69} fill={blue} stroke="#0e4d9a" strokeWidth="2"/>
          <circle r={gear.r*.54} fill="#102b4f" stroke="#9bcbec" strokeWidth="1.4"/>
          {[0,120,240].map(angle => <path key={angle} transform={`rotate(${angle})`} d={`M-2 -${gear.r*.23} -4 -${gear.r*.51} 3 -${gear.r*.55} 4 -${gear.r*.24}Z`} fill={silver}/>)}
          <circle r={gear.r*.27} fill={silver} stroke="#1f65a7"/><circle r={gear.r*.15} fill={blue}/>
        </g>
      </g>)}
      {[{x:77,y:16},{x:89,y:32},{x:16,y:79}].map(({x,y}, i) => <g className="gear-cube art-motion" key={x} style={{animationDelay:`${i * -.7}s`}}><path d={`m${x} ${y-6} 6 3v7l-6 4-6-4v-7z`} fill={blue} stroke="#80ceff" strokeWidth=".8"/><path d={`m${x-6} ${y-3} 6 4 6-4m-6 4v7`} fill="none" stroke="#80ceff" strokeWidth=".7"/></g>)}
    </> : kind === "observe" ? <>
      <ellipse cx="47" cy="87" rx="31" ry="6" fill="#001d4d" opacity=".2"/>
      <g className="monitor-body"><path d="m38 63 15 3-3 15 13 6-7 5-32-10 7-4 7 2z" fill={silver} stroke="#8db2cc"/>
      <path d="m8 18 65 10v45L8 63z" fill={silver} stroke="#b9dcf5" strokeWidth="1.4"/>
      <path d="m14 25 53 8v30l-53-8z" fill="#103367" stroke="#6798c6"/>
      <path d="m17 49 9-8 7 4 10-10 9 7 12-3" fill="none" stroke="#60c4ff" strokeWidth="2.2" strokeLinejoin="round"/>
      <path d="m17 29 20 3-20 15z" fill="#e1f5ff" opacity=".12"/></g>
      <g className="scan-glass art-motion">
        <path d="m73 58 21 22-6 6-21-22z" fill={blue} stroke="#94c9ef" strokeWidth="1.1"/>
        <path d="m77 64 13 14" stroke="#d2f0ff" strokeWidth="1.5"/>
        <circle cx="62" cy="46" r="20" fill="#83d4ff" fillOpacity=".12" stroke="#004997" strokeWidth="2"/>
        <circle cx="62" cy="46" r="17.5" fill="none" stroke={silver} strokeWidth="3"/>
        <circle cx="62" cy="46" r="14.5" fill="#83d4ff" fillOpacity=".25" stroke="#125a9a" strokeWidth="1.5"/>
        <path d="m52 51 7-9 6 5 8-10" stroke="#bcefff" fill="none" strokeWidth="1.7"/>
        <path d="M51 42a12 12 0 0 1 14-7" stroke="#fff" opacity=".85" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      </g>
    </> : <image className={`artwork-image ${kind === "events" ? "event-lift art-motion" : kind === "api" ? "api-pulse art-motion" : kind === "ai" ? "brain-pulse art-motion" : ""}`} href={publicAsset(`/images/3d/${images[kind]}`)} width="100" height="100" preserveAspectRatio="xMidYMid meet"/>}
    {kind === "ingest" && ["M18 19Q50 25 50 50V87","M50 10V87","M82 19Q50 25 50 50V87"].map((path, i) => <circle className="ingestion-packet art-motion" key={path} r="2.3" fill="#a4efff" style={{offsetPath:`path("${path}")`,animationDelay:`${i * -.65}s`}}/>)}
    {kind === "events" && <circle className="event-ring art-motion" cx="77" cy="20" r="6" fill="none" stroke="#9de6ff" strokeWidth="1.5"/>}
    {kind === "api" && <g className="api-signal art-motion" fill="none" stroke="#b8f2ff" strokeWidth="2" strokeLinecap="round"><path d="m8 43-4 4 4 4m84-8 4 4-4 4"/></g>}
    {kind === "database" && <g>{[0,1,2].map(i => <path className="storage-light art-motion" key={i} d={`m72 ${69+i*7} 11-3`} stroke="#a5edff" strokeWidth="2.5" strokeLinecap="round" style={{animationDelay:`${i*-.45}s`}}/>)}</g>}
    {kind === "ai" && <g fill="#baf5ff">{[{x:60,y:26},{x:77,y:48},{x:61,y:72}].map(({x,y},i)=><circle className="neural-signal art-motion" key={x+y} cx={x} cy={y} r="2.2" style={{animationDelay:`${i*-.5}s`}}/>)}</g>}
  </ArtworkStyled>;
}

const ArtworkStyled = styled.g`
  pointer-events: none;
  .gear-wheel { transform-box: fill-box; transform-origin: center; animation: pipeline-gear-turn 10s linear infinite; filter: drop-shadow(0 2px 1px #001b4866); }
  .gear-counter { animation-direction: reverse; animation-duration: 8.333s; }
  .gear-cube { animation: pipeline-cube-float 3s ease-in-out infinite; }
  .scan-glass { transform-box: view-box; transform-origin: 62px 46px; animation: pipeline-glass-scan 3.6s ease-in-out infinite; }
  .ingestion-packet { animation: pipeline-ingest-drop 2s linear infinite; filter: drop-shadow(0 0 2px #9de9ff); }
  .event-lift { transform-box: view-box; transform-origin: 50px 50px; animation: pipeline-event-lift 2.4s ease-in-out infinite; }
  .event-ring { transform-box: view-box; transform-origin: 77px 20px; animation: pipeline-event-ring 2.4s ease-out infinite; }
  .api-pulse { transform-box: view-box; transform-origin: 50px 50px; animation: pipeline-api-pulse 2.4s ease-in-out infinite; }
  .api-signal, .storage-light, .neural-signal { animation: pipeline-signal 1.8s ease-in-out infinite; }
  .brain-pulse { transform-box: view-box; transform-origin: 50px 50px; animation: pipeline-brain-glow 2.8s ease-in-out infinite; }
  .trusted-check { stroke-dasharray: 1; animation: pipeline-check-draw 3.4s ease-in-out infinite; }
  @keyframes pipeline-gear-turn { to { transform: rotate(360deg); } }
  @keyframes pipeline-glass-scan { 0%, 100% { transform: translate(-4px, 2px) rotate(-4deg); } 50% { transform: translate(4px, -3px) rotate(4deg); } }
  @keyframes pipeline-cube-float { 50% { transform: translateY(-2px); } }
  @keyframes pipeline-ingest-drop { 0% { offset-distance: 0%; opacity: 0; } 15%, 85% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
  @keyframes pipeline-event-lift { 0%, 100% { transform: translateY(3px) rotate(-6deg); } 50% { transform: translateY(-7px) rotate(6deg); } }
  @keyframes pipeline-event-ring { 0% { opacity: .8; transform: scale(.8); } 100% { opacity: 0; transform: scale(1.8); } }
  @keyframes pipeline-api-pulse { 0%, 100% { transform: translateX(-3px) rotate(-8deg) scale(.96); } 50% { transform: translateX(3px) rotate(8deg) scale(1.08); } }
  @keyframes pipeline-signal { 50% { opacity: .25; } }
  @keyframes pipeline-brain-glow { 0%, 100% { transform: translateY(3px) rotate(-5deg); filter: drop-shadow(0 0 1px #53b5ff55); } 50% { transform: translateY(-6px) rotate(5deg); filter: drop-shadow(0 0 5px #53b5ffcc); } }
  @keyframes pipeline-check-draw { 0%, 12% { stroke-dashoffset: 1; opacity: .3; } 45%, 85% { stroke-dashoffset: 0; opacity: 1; } 100% { stroke-dashoffset: 0; opacity: .3; } }
  @media (prefers-reduced-motion: reduce) { &, & * { animation: none !important; } .ingestion-packet, .event-ring { opacity: 0; } }
`;
