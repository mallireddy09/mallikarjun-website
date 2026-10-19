import { publicAsset } from "../helper/publicAsset";
import styled from "styled-components";

const CONNECTIONS = [
  "M100 88 C100 150 300 115 300 170",
  "M300 88 V170",
  "M500 88 C500 150 300 115 300 170",
  "M300 234 V292",
  "M300 360 V418",
  "M300 482 C300 530 160 490 160 548",
  "M300 482 C300 530 440 490 440 548",
];

const NODE_IMAGES = {
  events: publicAsset("/images/3d/hero-events-3d.webp"),
  code: publicAsset("/images/3d/hero-api-3d.webp"),
  database: publicAsset("/images/3d/pipeline-store-3d.webp"),
  ingest: publicAsset("/images/3d/pipeline-ingest-3d.webp"),
  process: publicAsset("/images/3d/pipeline-process-3d.webp"),
  analytics: publicAsset("/images/3d/pipeline-observe-3d.webp"),
  ai: publicAsset("/images/3d/hero-ai-3d.webp"),
};

function Node({ x, y, width, label, icon }: { x: number; y: number; width: number; label: string; icon: "events" | "code" | "database" | "ingest" | "process" | "analytics" | "ai" }) {
  return <g className="pipeline-node" transform={`translate(${x} ${y})`}>
    <rect className="node-face" width={width} height="64" rx="15" />
    <path className="node-highlight" d={`M16 1 H${width - 16}`} />
    <image href={NODE_IMAGES[icon]} x="10" y="8" width="48" height="48" preserveAspectRatio="xMidYMid meet" />
    <text x="66" y="38">{label}</text>
  </g>;
}

export default function LiveDataPipeline() {
  return <DiagramStyled className="hero-art">
    <svg viewBox="0 0 600 630" role="img" aria-labelledby="live-pipeline-title live-pipeline-description">
      <title id="live-pipeline-title">From raw events to reliable intelligence</title>
      <desc id="live-pipeline-description">Events, APIs, and databases flow into ingestion, stream and process, then trusted data, which powers analytics and AI and machine learning. Blue data pulses travel from top to bottom.</desc>
      <defs>
        <linearGradient id="pipeline-node-glass" x2="1" y2="1"><stop stopColor="var(--diagram-face-top)" /><stop offset="1" stopColor="var(--diagram-face-bottom)" /></linearGradient>
      </defs>
      {CONNECTIONS.map((path, index) => <g key={path}>
        <path className="connection" d={path} fill="none" />
        <path className="connection-flow" d={path} fill="none" style={{ animationDelay: `${index * -.35}s` }} />
        <circle className="data-pulse" r="3.5"><animateMotion path={path} dur={index < 3 ? "2.8s" : "2s"} begin={`${index * -.4}s`} repeatCount="indefinite" /></circle>
      </g>)}
      <Node x={20} y={24} width={160} label="EVENTS" icon="events" />
      <Node x={220} y={24} width={160} label="APIs" icon="code" />
      <Node x={415} y={24} width={170} label="DATABASES" icon="database" />
      <Node x={190} y={170} width={220} label="INGESTION" icon="ingest" />
      <Node x={155} y={292} width={290} label="STREAM + PROCESS" icon="process" />
      <Node x={180} y={418} width={240} label="TRUSTED DATA" icon="database" />
      <Node x={60} y={548} width={200} label="ANALYTICS" icon="analytics" />
      <Node x={340} y={548} width={200} label="AI / ML" icon="ai" />
    </svg>
  </DiagramStyled>;
}

const DiagramStyled = styled.div`
  --diagram-face-top: #102846;
  --diagram-face-bottom: #080f1e;
  --diagram-label: #e3f3ff;
  --diagram-accent: #79ccff;
  .light-theme & {
    --diagram-face-top: #f1fbff;
    --diagram-face-bottom: #d4e9ff;
    --diagram-label: #173c64;
    --diagram-accent: #0869da;
  }
  svg { display: block; width: 100%; height: 100%; overflow: visible; }
  .node-face { fill: url(#pipeline-node-glass); stroke: rgba(var(--primary-color-rgb), .8); stroke-width: 1.5; }
  .node-highlight { stroke: var(--diagram-accent); stroke-opacity: .5; fill: none; }
  text { fill: var(--diagram-label); font: 600 17px "Nunito", sans-serif; letter-spacing: .2px; }
  .connection { stroke: rgba(var(--primary-color-rgb), .3); stroke-width: 1.5; }
  .connection-flow { stroke: var(--diagram-accent); stroke-width: 2; stroke-dasharray: 3 22; animation: data-downstream 1.6s linear infinite; }
  .data-pulse { fill: var(--diagram-accent); }
  @keyframes data-downstream { to { stroke-dashoffset: -50; } }
  @media(prefers-reduced-motion: reduce) {
    .connection-flow { animation: none; }
    .data-pulse { display: none; }
  }
`;
