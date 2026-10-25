import styled, { css } from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, Popper } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { PIPELINE_EXAMPLES, type PipelineStageId } from "../data/pipeline";
import PipelineExample from "./PipelineExample";
import PipelineArtwork, { type PipelineArtworkKind } from "./PipelineArtwork";
import { HOVER_PREVIEW_QUERY } from "../styles/media";
import useHeroPreviewRegion from "../hooks/useHeroPreviewRegion";

const CONNECTIONS = [
  "M100 88 C100 150 300 115 300 170",
  "M300 88 V170",
  "M500 88 C500 150 300 115 300 170",
  "M300 234 V292",
  "M300 360 V418",
  "M300 482 C300 530 160 490 160 548",
  "M300 482 C300 530 440 490 440 548",
];

const NODES: { id: PipelineStageId; x: number; y: number; width: number; label: string; icon: PipelineArtworkKind }[] = [
  { id: "events", x: 20, y: 24, width: 160, label: "EVENTS", icon: "events" },
  { id: "api", x: 220, y: 24, width: 160, label: "APIs", icon: "api" },
  { id: "databases", x: 410, y: 24, width: 180, label: "DATABASES", icon: "database" },
  { id: "ingestion", x: 190, y: 170, width: 220, label: "INGESTION", icon: "ingest" },
  { id: "processing", x: 155, y: 292, width: 290, label: "STREAM + PROCESS", icon: "process" },
  { id: "trusted", x: 180, y: 418, width: 240, label: "TRUSTED DATA", icon: "trusted" },
  { id: "analytics", x: 60, y: 548, width: 200, label: "ANALYTICS", icon: "observe" },
  { id: "ai", x: 340, y: 548, width: 200, label: "AI / ML", icon: "ai" },
];

function Node({ x, y, width, label, icon, id, onSelect, onHover, onLeave, onKeyboardActivate }: typeof NODES[number] & {
  onSelect: (id: PipelineStageId) => void;
  onHover: (id: PipelineStageId, element: SVGGElement, moved?: boolean) => void;
  onLeave: () => void;
  onKeyboardActivate: () => void;
}) {
  return <g className="pipeline-node" transform={`translate(${x} ${y})`} role="button" tabIndex={0}
    aria-label={PIPELINE_EXAMPLES[id].title} aria-haspopup="dialog" onClick={() => onSelect(id)}
    onPointerEnter={event => { if (event.pointerType === "mouse") onHover(id, event.currentTarget); }}
    onPointerMove={event => { if (event.pointerType === "mouse") onHover(id, event.currentTarget, true); }}
    onPointerLeave={onLeave}
    onKeyDown={event => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onKeyboardActivate(); onSelect(id); }
    }}>
    <g className="node-visual">
      <rect className="node-depth" y="8" width={width} height="64" rx="15" />
      <rect className="node-face" width={width} height="64" rx="15" />
      <rect className="node-sheen" x="2" y="2" width={width - 4} height="29" rx="13" />
      <rect className="node-bevel" x="2" y="2" width={width - 4} height="60" rx="13" />
      <path className="node-highlight" d={`M16 1 H${width - 16}`} />
      <g transform="translate(10 8) scale(.48)"><PipelineArtwork kind={icon} /></g>
      <text x="66" y="38">{label}</text>
    </g>
    <rect className="node-hit-area" y="-8" width={width} height="80" />
  </g>;
}

function ExampleContent({ id, prefix, onClose, autoFocus = false }: {
  id: PipelineStageId; prefix: string; onClose: () => void; autoFocus?: boolean;
}) {
  const example = PIPELINE_EXAMPLES[id];
  return <>
    <DialogTitle id={`${prefix}-heading`} className="example-title">
      <span id={`${prefix}-title`}>{example.title}</span>
      <IconButton onClick={onClose} aria-label="Close example" autoFocus={autoFocus}><CloseRoundedIcon /></IconButton>
    </DialogTitle>
    <DialogContent>
      <p id={`${prefix}-definition`} className="example-definition">{example.definition}</p>
      <h3 className="example-format">Example <span>{example.format}</span></h3>
      <PipelineExample example={example.example} />
    </DialogContent>
  </>;
}

export default function LiveDataPipeline() {
  const [selectedId, setSelectedId] = useState<PipelineStageId | null>(null);
  const [keyboardInput, setKeyboardInput] = useState(false);
  useEffect(() => {
    const pointer = () => setKeyboardInput(false);
    const keyboard = (event: KeyboardEvent) => { if (event.key === "Tab") setKeyboardInput(true); };
    window.addEventListener("pointerdown", pointer, true);
    window.addEventListener("keydown", keyboard, true);
    return () => {
      window.removeEventListener("pointerdown", pointer, true);
      window.removeEventListener("keydown", keyboard, true);
    };
  }, []);
  const [hovered, setHovered] = useState<{ id: PipelineStageId; element: SVGGElement } | null>(null);
  const previewRegion = useHeroPreviewRegion(hovered !== null);
  const closeTimer = useRef<number | undefined>(undefined);
  const hoverEnabled = useRef(true);
  const cancelHoverClose = () => window.clearTimeout(closeTimer.current);
  const scheduleHoverClose = () => {
    cancelHoverClose();
    closeTimer.current = window.setTimeout(() => setHovered(null), 250);
  };
  const showHover = (id: PipelineStageId, element: SVGGElement, moved = false) => {
    if (!window.matchMedia(HOVER_PREVIEW_QUERY).matches) return;
    cancelHoverClose();
    if (moved) hoverEnabled.current = true;
    if (selectedId === null && hoverEnabled.current) {
      setHovered(current => current?.id === id && current.element === element ? current : { id, element });
    }
  };
  const openExample = (id: PipelineStageId) => {
    cancelHoverClose();
    // Closing a modal must not open a preview beneath a stationary pointer.
    hoverEnabled.current = false;
    setHovered(null);
    setSelectedId(id);
  };
  const closeExample = () => setSelectedId(null);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);
  useEffect(() => {
    const closeHoverOnResize = () => {
      window.clearTimeout(closeTimer.current);
      setHovered(null);
    };
    window.addEventListener("resize", closeHoverOnResize);
    return () => window.removeEventListener("resize", closeHoverOnResize);
  }, []);
  useEffect(() => {
    if (!hovered) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        hoverEnabled.current = false;
        setHovered(null);
      }
    };
    document.addEventListener("keydown", escape, true);
    return () => document.removeEventListener("keydown", escape, true);
  }, [hovered]);
  return <><DiagramStyled className="hero-art" data-input={keyboardInput ? "keyboard" : "pointer"}>
    <svg viewBox="0 0 600 630" role="group" aria-label="From raw events to reliable intelligence" aria-describedby="live-pipeline-description">
      <desc id="live-pipeline-description">Events, APIs, and databases flow into ingestion, stream and process, then trusted data, which powers analytics and AI and machine learning. Hover over a stage for a definition and example, or select it using touch or the keyboard.</desc>
      <defs>
        <linearGradient id="pipeline-node-glass" x2=".6" y2="1">
          <stop stopColor="var(--diagram-face-top)" /><stop offset=".45" stopColor="var(--diagram-face-middle)" /><stop offset="1" stopColor="var(--diagram-face-bottom)" />
        </linearGradient>
        <linearGradient id="pipeline-node-depth" x2="0" y2="1"><stop stopColor="var(--diagram-depth-top)" /><stop offset="1" stopColor="var(--diagram-depth-bottom)" /></linearGradient>
        <linearGradient id="pipeline-node-sheen" x2=".2" y2="1"><stop stopColor="#fff" stopOpacity=".2" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <linearGradient id="pipeline-node-bevel" x2=".8" y2="1"><stop stopColor="var(--diagram-accent)" stopOpacity=".85" /><stop offset=".45" stopColor="#fff" stopOpacity=".08" /><stop offset="1" stopColor="var(--diagram-accent)" stopOpacity=".35" /></linearGradient>
      </defs>
      {CONNECTIONS.map((path, index) => <g key={path}>
        <path className="connection-depth" d={path} fill="none" />
        <path className="connection" d={path} fill="none" />
        <path className="connection-flow" d={path} fill="none" style={{ animationDelay: `${index * -.35}s` }} />
        <circle className="data-pulse" r="4"><animateMotion path={path} dur={index < 3 ? "2.8s" : "2s"} begin={`${index * -.4}s`} repeatCount="indefinite" /></circle>
      </g>)}
      {NODES.map(node => <Node key={node.id} {...node} onSelect={openExample} onHover={showHover} onLeave={scheduleHoverClose} onKeyboardActivate={() => setKeyboardInput(true)} />)}
    </svg>
  </DiagramStyled>
    <HoverExample open={hovered !== null && previewRegion !== null} anchorEl={previewRegion ? {
      getBoundingClientRect: () => new DOMRect(previewRegion.left, previewRegion.top + previewRegion.height, previewRegion.width, 0),
      contextElement: hovered?.element,
    } : null} placement="top-end" popperOptions={{ strategy: "fixed" }} role="dialog" aria-labelledby="pipeline-hover-title" aria-describedby="pipeline-hover-definition"
      style={previewRegion ? { "--preview-width": `${Math.min(360, previewRegion.width)}px`, "--preview-height": `${previewRegion.height}px` } as React.CSSProperties : undefined}
      modifiers={[
        { name: "flip", enabled: false },
        { name: "preventOverflow", options: { altAxis: true, tether: false, padding: 16, rootBoundary: "viewport" } },
      ]}
      onPointerEnter={cancelHoverClose} onPointerLeave={scheduleHoverClose}>
      {hovered && <div className="example-surface"><ExampleContent id={hovered.id} prefix="pipeline-hover" onClose={() => setHovered(null)} /></div>}
    </HoverExample>
    <ExampleDialog open={selectedId !== null} onClose={closeExample} fullWidth maxWidth="sm" scroll="paper"
      aria-labelledby="pipeline-example-title" aria-describedby="pipeline-example-definition">
      {selectedId !== null && <ExampleContent id={selectedId} prefix="pipeline-example" onClose={closeExample} autoFocus />}
    </ExampleDialog>
  </>;
}

const exampleStyles = css`
  .example-title { display: flex; align-items: center; justify-content: space-between; gap: 16px; font-weight: 700; }
  .example-title span, .example-title button { color: inherit; }
  .example-definition { color: var(--font-light-color); line-height: 1.7; margin-bottom: 24px; }
  .example-format { display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px 16px; font-size: 16px; margin-bottom: 12px; }
  .example-format span { font-size: 13px; font-weight: 500; color: var(--primary-color); }
  pre { max-width: 100%; overflow-x: auto; padding: 20px; margin-bottom: 8px; border-radius: 14px; border: 1px solid var(--border-color); background: var(--background-dark-grey); color: var(--white-color); font-size: 13px; line-height: 1.7; tab-size: 2; }
  code { font-family: "Source Code Pro", monospace; }
  @media(max-width: 480px) { pre { padding: 14px; font-size: 12px; } }
`;

const ExampleDialog = styled(Dialog)`
  .MuiDialogContent-root { overscroll-behavior: contain; -webkit-overflow-scrolling: touch; }
  .MuiDialog-paper { margin: 16px; width: calc(100% - 32px); max-width: min(600px, calc(100vw - 32px)); max-height: calc(100dvh - 32px); border-radius: 24px; border: 1px solid var(--border-color); background: var(--background-dark-color); color: var(--white-color); box-shadow: 0 20px 80px rgba(0, 0, 0, .35); }
  ${exampleStyles}
`;

const HoverExample = styled(Popper)`
  z-index: 10;
  .example-surface { width: min(var(--preview-width, 360px), calc(100vw - 32px)); max-height: min(var(--preview-height, 560px), 560px, calc(100dvh - 32px)); overflow: auto; scrollbar-width: thin; scrollbar-color: var(--border-color) transparent; border-radius: 20px; border: 1px solid var(--border-color); background: var(--background-dark-color); color: var(--white-color); box-shadow: 0 16px 48px rgba(0, 0, 0, .35); }
  .example-surface .example-title { padding: 14px 20px; font-size: 18px; }
  .example-surface .MuiDialogContent-root { padding: 0 20px 16px; }
  .example-surface .example-definition { font-size: 14px; line-height: 1.6; margin-bottom: 18px; }
  .example-surface pre { white-space: pre-wrap; overflow-wrap: anywhere; }
  ${exampleStyles}
`;

const DiagramStyled = styled.div`
  --diagram-face-top: #315d89;
  --diagram-face-middle: #163653;
  --diagram-face-bottom: #0b192d;
  --diagram-depth-top: #173f6b;
  --diagram-depth-bottom: #061024;
  --diagram-label: #f0f8ff;
  --diagram-accent: #8cdaff;
  --diagram-shadow: rgba(0, 5, 18, .6);
  --diagram-rail: #30689b;
  --diagram-rail-shadow: #081b30;
  .light-theme & {
    --diagram-face-top: #fff;
    --diagram-face-middle: #e3f3ff;
    --diagram-face-bottom: #b4d9fa;
    --diagram-depth-top: #8cbdeb;
    --diagram-depth-bottom: #4b80b9;
    --diagram-label: #12365b;
    --diagram-accent: #0869da;
    --diagram-shadow: rgba(32, 86, 150, .22);
    --diagram-rail: #4689cf;
    --diagram-rail-shadow: #b7d1ed;
  }
  svg { display: block; width: 100%; height: 100%; overflow: visible; }
  .pipeline-node { cursor: pointer; }
  .pipeline-node:focus { outline: none; }
  .node-visual { transition: transform .25s ease; }
  .pipeline-node:hover .node-visual, &[data-input="keyboard"] .pipeline-node:focus .node-visual { transform: translateY(-5px); }
  .node-hit-area { fill: transparent; }
  .pipeline-node:hover .node-face, &[data-input="keyboard"] .pipeline-node:focus .node-face { stroke: var(--diagram-accent); stroke-width: 3; }
  &[data-input="keyboard"] .pipeline-node:focus { outline: 2px solid var(--diagram-accent); outline-offset: 4px; }
  .node-depth { filter: drop-shadow(0 7px 8px var(--diagram-shadow)); fill: url(#pipeline-node-depth); stroke: rgba(var(--primary-color-rgb), .65); stroke-width: 1.5; }
  .node-face { fill: url(#pipeline-node-glass); stroke: rgba(var(--primary-color-rgb), .95); stroke-width: 1.8; }
  .node-sheen { fill: url(#pipeline-node-sheen); }
  .node-bevel { fill: none; stroke: url(#pipeline-node-bevel); stroke-width: 1; }
  .node-highlight { stroke: var(--diagram-accent); stroke-opacity: .85; stroke-width: 1.5; fill: none; }
  .pipeline-node image { filter: drop-shadow(0 3px 2px var(--diagram-shadow)); }
  text { fill: var(--diagram-label); font: 700 17px "Nunito", sans-serif; letter-spacing: .2px; }
  .connection-depth { stroke: var(--diagram-rail-shadow); stroke-width: 5; transform: translateY(3px); }
  .connection { stroke: var(--diagram-rail); stroke-width: 2.5; }
  .connection-flow { stroke: var(--diagram-accent); stroke-width: 2.5; stroke-linecap: round; stroke-dasharray: 3 22; animation: data-downstream 1.6s linear infinite; }
  .data-pulse { fill: var(--diagram-accent); filter: drop-shadow(0 0 3px var(--diagram-accent)); }
  @keyframes data-downstream { to { stroke-dashoffset: -50; } }
  @media(prefers-reduced-motion: reduce) {
    .node-visual { transition: none; }
    .pipeline-node:hover .node-visual, &[data-input="keyboard"] .pipeline-node:focus .node-visual { transform: none; }
    .connection-flow { animation: none; }
    .data-pulse { display: none; }
  }
`;
