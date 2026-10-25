import { useId, useState } from "react";
import { ClickAwayListener, Tooltip, useMediaQuery, type TooltipProps } from "@mui/material";
import styled from "styled-components";
import CompanyLogo from "./CompanyLogo";
import { HOVER_PREVIEW_QUERY } from "../styles/media";

const scenes = {
  NVIDIA: { kind: "gpu", color: "#76b900" },
  Microsoft: { kind: "cloud", color: "#35b6ff" },
  "The Home Depot": { kind: "home", color: "#ff861c" },
  Uber: { kind: "ride", color: "#c2e5ef" },
} as const;

type CompanyName = keyof typeof scenes;

const UBER_ROUTE = "M35 134H105Q119 134 119 120V88Q119 74 133 74H187Q201 74 201 60V42Q201 28 215 28H260";

function CompanyScene({ name }: { name: CompanyName }) {
  const { kind, color } = scenes[name];
  const id = useId().replace(/:/g, "");
  const metal = `${id}-metal`, glass = `${id}-glass`, orange = `${id}-orange`;
  return <Scene viewBox="0 0 300 170" aria-hidden="true" data-scene={kind} style={{ color }}>
    <defs>
      <linearGradient id={metal} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c5d5e3"/><stop offset=".28" stopColor="#56677a"/><stop offset=".55" stopColor="#202c3c"/><stop offset="1" stopColor="#0b111d"/></linearGradient>
      <linearGradient id={glass} x2="0" y2="1"><stop stopColor="#c9edff"/><stop offset="1" stopColor="#3976a0"/></linearGradient>
      <linearGradient id={orange} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ffc079"/><stop offset=".2" stopColor="#ff952d"/><stop offset=".6" stopColor="#f27719"/><stop offset="1" stopColor="#ae4911"/></linearGradient>
    </defs>
    <ellipse cx="150" cy="145" rx="120" ry="17" fill="currentColor" opacity=".09"/>
    {kind === "ride" ? <>
      <g className="uber-map">
        <rect x="3" y="3" width="294" height="164" rx="12" fill="#e9e7df" stroke="#ccd1c9"/>
        <path d="M258 4h26l-16 36 10 32-15 33 23 61h-25l-23-59 14-34-10-32z" fill="#a7d9ed"/>
        <g fill="#d8d4ca" stroke="#dedbd3" strokeWidth="1"><path d="M13 13h38v37H13zm49 0h44v37H62zm68 0h51v37h-51zm-117 51h38v51H13zm49 0h44v51H62zm68 23h51v28h-51zm0 58h51v13h-51zm64-58h34v29h-34zm0 58h48v13h-48z"/></g>
        <path d="M14 144h36v14H14zM132 12h48v38h-48zM213 87h25v29h-25z" fill="#bcd5a4"/>
        <g stroke="#d1cfc6" strokeWidth="13" fill="none"><path d="M5 58h240M5 134h239M56 6v157M119 6v157M188 6v157M7 79h234"/></g>
        <g stroke="#fffdf7" strokeWidth="10" fill="none"><path d="M5 58h240M5 134h239M56 6v157M119 6v157M188 6v157M7 79h234"/></g>
        <path d={UBER_ROUTE} stroke="#fff" strokeWidth="10" fill="none" strokeLinecap="round"/>
        <path className="map-route" d={UBER_ROUTE} stroke="#1688f8" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <path className="map-progress scene-motion" d={UBER_ROUTE} stroke="#a4d8ff" strokeWidth="2" strokeDasharray="5 25" fill="none"/>
        <circle cx="35" cy="134" r="6" fill="#fff" stroke="#1688f8" strokeWidth="3"/>
        <text x="18" y="122" fill="#58707b" fontSize="6" fontFamily="Arial">Pickup</text>
        <text x="135" y="30" fill="#5e7d4b" fontSize="6" fontFamily="Arial">Riverside</text><text x="142" y="38" fill="#5e7d4b" fontSize="6" fontFamily="Arial">Park</text>
        <text x="67" y="66" fill="#88877f" fontSize="5.5" fontFamily="Arial">Oak Street</text><text x="136" y="143" fill="#88877f" fontSize="5.5" fontFamily="Arial">River Road</text>
        <g className="destination scene-motion"><ellipse cx="260" cy="30" rx="9" ry="3" fill="#5b879b" opacity=".25"/><path d="M260 30s-10-10-10-17a10 10 0 0 1 20 0c0 7-10 17-10 17" fill="#ee514c" stroke="#fff" strokeWidth="1.5"/><circle cx="260" cy="13" r="3" fill="#fff"/></g>
        <g transform="translate(276 137)"><circle r="10" fill="#fff" stroke="#d5d8d7"/><path d="m0-7 4 11-4-2-4 2z" fill="#ed615a"/><text x="0" y="21" textAnchor="middle" fontSize="5" fill="#667c86" fontFamily="Arial">N</text></g>
        <g className="uber-car scene-motion" style={{ offsetPath: `path("${UBER_ROUTE}")` }}>
          <g transform="scale(.29) translate(-150 -125)">
        <ellipse cx="150" cy="133" rx="108" ry="10" fill="#000" opacity=".45"/>
        <path d="m35 103 23-10 29-27q5-5 16-5h65q12 0 22 11l22 22 40 9q12 3 14 14l-4 12H39l-8-12z" fill={`url(#${metal})`} stroke="#8493a4"/>
        <path d="m59 94 35-27h72q10 0 18 9l18 18z" fill="#101b28" stroke="#c4d0db" strokeWidth="1.2"/>
        <path d="m71 91 27-21h26v21zm60-21h33q8 0 15 8l12 13h-60z" fill={`url(#${glass})`}/>
        <path d="m95 73 20-1-30 18H74zm45 0h19l19 16h-10z" fill="#e5f6ff" opacity=".32"/>
        <path d="m41 102 61-5h94l52 10M49 120h195" fill="none" stroke="#d4e0ed" strokeOpacity=".6"/>
        <path d="m102 98-2 26m90-26 5 26" stroke="#0a111b" fill="none"/>
        <path d="M109 104h12m54 0h10" stroke="#c5d3e1" strokeWidth="2" strokeLinecap="round"/>
        <path d="m189 90 12-2 6 7-15 1z" fill="#576a7c" stroke="#a0b5c5" strokeWidth=".7"/>
        <path d="m237 105 20 5-1 5-19-3z" fill="#e3f6ff"/><path d="m35 108 8-3v8l-9 4z" fill="#ff605c"/>
        <path d="m250 119 12-1-2 7-10 1z" fill="#080d13" stroke="#8b9aa8" strokeWidth=".6"/>
        <path d="m258 109 30 6-1 12-29-12z" fill="#d9efff" opacity=".08"/>
        <text x="140" y="117" textAnchor="middle" fill="#e9f3fc" fontSize="10" fontFamily="Arial" letterSpacing="1">Uber Black</text>
        {[80, 218].map(x => <g key={x} transform={`translate(${x} 125)`}>
          <circle r="17" fill="#080b10" stroke="#263240" strokeWidth="2"/>
          <circle r="12" fill="#293747" stroke="#b9c8d5" strokeWidth="1.5"/>
          <g className="wheel-spokes scene-motion"><circle r="10" fill="none" stroke="#65788a"/>
            {[0, 60, 120, 180, 240, 300].map(angle => <path key={angle} d="M-1-3 0-10 3-10 2-3z" transform={`rotate(${angle})`} fill="#e2eaf1"/>)}
          </g><circle r="3" fill="#cbd9e4"/><circle r="1" fill="#1a2939"/>
        </g>)}
          </g></g></g>
    </> : kind === "gpu" ? <>
      <g stroke="#76b900" fill="none" opacity=".6"><path d="M7 39h53l20 15m220-15h-50l-23 15M7 119h38l19-13m236 13h-40l-16-13"/></g>
      <path className="processing-flow scene-motion" d="M7 39h53l20 15m220-15h-50l-23 15M7 119h38l19-13m236 13h-40l-16-13" stroke="#b0ed57" strokeWidth="2.5" strokeDasharray="3 25" fill="none"/>
      <g className="gpu-card">
        <ellipse cx="150" cy="125" rx="113" ry="10" fill="#000" opacity=".4"/>
        <path d="m39 43 211-5 15 15-5 68-215 8-12-14z" fill="#10151d" stroke="#8b98a5"/>
        <path d="m39 43 211-5 15 15-216 6z" fill={`url(#${metal})`}/>
        <path d="m250 38 15 15-5 68-12-12z" fill="#28333c"/>
        <path d="m45 59 207-6-4 56-203 7z" fill="#222c36" stroke="#566472"/>
        {Array.from({length: 30}, (_, i) => <path key={i} d={`M${48+i*6.5} 61v49`} stroke="#56616a" strokeWidth="1" opacity=".5"/>)}
        <path d="m39 43 10 16-4 57-12-1z" fill="#74838f"/><path d="M36 53v17m0 7v17m0 7v8" stroke="#222e38" strokeWidth="2"/>
        <path d="m63 115 169-5v8l-169 6z" fill="#142b20"/>
        {Array.from({length: 25}, (_, i) => <path key={i} d={`m${73+i*5} ${117-i*.17}v6`} stroke="#c6a34c" strokeWidth="3"/>)}
        <path d="m48 58 28 1 18 26-18 28-29 2m203-61-28 2-20 27 18 28 28-2" fill="#37434e" stroke="#84939e" strokeWidth="1.5"/>
        {[88, 151, 214].map(x => <g key={x} transform={`translate(${x} 85)`}>
          <circle r="26" fill="#070c12" stroke="#81909c" strokeWidth="1.5"/><circle r="23" fill="#131e28" stroke="#3b4955"/>
          <g className="gpu-fan-rotor scene-motion"><circle r="21" fill="transparent"/>
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => <path key={angle} d="M3-5C1-13 7-22 16-14 12-13 13-4 6-2z" transform={`rotate(${angle})`} fill={`url(#${metal})`} stroke="#667886" strokeWidth=".4"/>)}
          </g><circle r="7" fill="#283b35" stroke="#719e51"/><circle r="3" fill="#9acd61"/>
        </g>)}
        <path d="m60 49 170-5" stroke="#a8e354" strokeWidth="2"/>
        <text x="152" y="51" textAnchor="middle" fill="#dce7e6" fontSize="5.5" fontFamily="Arial" letterSpacing="1.5">NVIDIA · GEFORCE RTX</text>
        <circle className="gpu-status scene-motion" cx="249" cy="112" r="2" fill="#a9ed53"/>
      </g>
      <g transform="translate(68 141)"><text x="0" y="0" fill="#94b77b" fontFamily="Arial" fontSize="6" letterSpacing="1.2">PARALLEL WORKLOAD</text>
        {Array.from({length: 12}, (_, i) => <rect className="compute-bar scene-motion" key={i} x={i*14} y="6" width="10" height="5" rx="1" fill="#8dd434" style={{ animationDelay: `${i*.12}s` }}/>)}</g>
    </> : kind === "cloud" ? <>
      <g className="cloud-network" fill="none" stroke="#2782bc" strokeWidth="2"><path d="M150 53v14H67v17m83-17v17m0-17h83v17"/></g>
      <path className="cloud-data-flow scene-motion" d="M150 53v14H67v17m83-17v17m0-17h83v17" fill="none" stroke="#a3e6ff" strokeWidth="2.5" strokeDasharray="3 15"/>
      {[34, 116, 198].map((x, rack) => <g className="server-rack" key={x}>
        <path d={`m${x} 78 10-6h59l-10 6z`} fill="#61778a"/><path d={`m${x+59} 78 10-6v76l-10 7z`} fill="#1a2c3e"/>
        <rect x={x} y="78" width="59" height="77" rx="3" fill={`url(#${metal})`} stroke="#8599a8"/>
        <rect x={x+5} y="83" width="49" height="66" rx="2" fill="#101c29"/>
        {[0,1,2,3,4,5].map(row => <g key={row}>
          <rect x={x+8} y={86+row*10} width="43" height="8" rx="1" fill="#2c3e50" stroke="#465d71" strokeWidth=".4"/>
          <path d={`M${x+11} ${89+row*10}h20m-20 2h20`} stroke="#172330" strokeWidth="1.2"/>
          <circle className="server-light scene-motion" cx={x+44} cy={90+row*10} r="1.5" fill={row%2 ? "#63bfff" : "#7cf4b8"} style={{animationDelay: `${(row+rack)*.19}s`}}/>
          <circle cx={x+38} cy={90+row*10} r="1" fill="#71889c"/>
        </g>)}
        <path d={`M${x+14} 152h31`} stroke="#7599b1"/><circle cx={x+51} cy="81" r="1" fill="#bed9e9"/>
      </g>)}
      <g className="azure-cloud scene-motion" transform="translate(0 -4)">
        <path d="M107 56c-20 0-24-25-6-32 3-19 28-24 39-10 14-9 31 0 33 13 21-1 27 29 6 29z" fill="#096ec1" transform="translate(5 6)"/>
        <path d="M107 56c-20 0-24-25-6-32 3-19 28-24 39-10 14-9 31 0 33 13 21-1 27 29 6 29z" fill={`url(#${glass})`} stroke="#d1f1ff"/>
        <path d="m133 25-12 22h13l-4-5h-2l8-17zm7 0 14 25h-25l17-5-9-15z" fill="#0875c9"/>
      </g>
      <g transform="translate(221 15)"><rect width="37" height="30" rx="4" fill="#213a50" stroke="#6389a8"/>
        <rect x="8" y="5" width="9" height="9" fill="#f35325"/><rect x="19" y="5" width="9" height="9" fill="#81bc06"/><rect x="8" y="16" width="9" height="9" fill="#05a6f0"/><rect x="19" y="16" width="9" height="9" fill="#ffba08"/>
      </g>
      <text x="42" y="167" fill="#72adcf" fontSize="6" fontFamily="Arial" letterSpacing="1.4">APPS</text><text x="128" y="167" fill="#72adcf" fontSize="6" fontFamily="Arial" letterSpacing="1.4">DATA</text><text x="204" y="167" fill="#72adcf" fontSize="6" fontFamily="Arial" letterSpacing="1.4">COMPUTE</text>
    </> : <>
      <g className="depot-store">
        <path d="m14 48 17-10 112 2-14 10z" fill="#9a9d9f"/><path d="m129 50 14-10v69l-14 8z" fill="#9c4015"/>
        <path d="M14 49h115v68H14z" fill="#db631b" stroke="#ffab65"/>
        <path d="M14 51h115v29H14z" fill="#f77b22"/>
        <rect x="43" y="45" width="49" height="36" fill="#ed6817" stroke="#ffb375"/>
        <text x="68" y="57" textAnchor="middle" fill="white" fontWeight="bold" fontSize="8" fontFamily="Georgia">THE</text><text x="68" y="67" textAnchor="middle" fill="white" fontWeight="bold" fontSize="9" fontFamily="Georgia">HOME</text><text x="68" y="77" textAnchor="middle" fill="white" fontWeight="bold" fontSize="9" fontFamily="Georgia">DEPOT</text>
        <path d="M18 86h106v30H18z" fill="#253e4b"/>
        {[22, 43, 84, 105].map(x => <g key={x}><rect x={x} y="89" width="16" height="23" fill={`url(#${glass})`}/><path d={`m${x+2} 91 9 0-9 12z`} fill="#e4f4ff" opacity=".4"/></g>)}
        <path d="M62 87h18v30H62z" fill="#172e3b" stroke="#c1ccce"/><path d="M71 88v28m-7-14h14" stroke="#a6c1cf" strokeWidth=".8"/>
        <path d="M10 116h125v5H10z" fill="#7d8b94"/>
        <g fill="#dbaa71" stroke="#855b34" strokeWidth=".7"><path d="M20 112h28v4H20zm2-4h24v4H22zm3-4h19v4H25z"/></g>
      </g>
      <g className="delivery-home"><path d="M222 69h60v51h-60z" fill="#d3dbe0"/><path d="m212 71 39-33 40 33-7 7-33-28-33 28z" fill="#586f85" stroke="#a5bac8"/>
        <path d="M263 41h10v15l-10-8z" fill="#a5b5c3"/><path d="M242 93h15v27h-15z" fill="#52677b"/><circle cx="254" cy="107" r="1" fill="#e8c98b"/>
        {[228, 263].map(x => <g key={x}><rect x={x} y="82" width="12" height="16" fill={`url(#${glass})`} stroke="#f4fafc"/><path d={`M${x+6} 82v16m-6-8h12`} stroke="#f4fafc" strokeWidth=".7"/></g>)}
        <path d="M220 120h64v4h-64z" fill="#82919c"/><path d="M244 124v11" stroke="#b9bdc0" strokeWidth="12"/>
        <g fill="#3c7052"><circle cx="222" cy="115" r="6"/><circle cx="279" cy="115" r="7"/></g>
      </g>
      <path d="M0 145h300" stroke="#374553" strokeWidth="26"/><path className="delivery-trail" d="M-20 152h340" stroke="#d7af89" strokeWidth="1.5" strokeDasharray="10 12"/>
      <g className="delivery-van scene-motion">
        <ellipse cx="161" cy="144" rx="61" ry="6" fill="#000" opacity=".35"/>
        <path d="M107 106q0-11 11-12h58q10 0 16 10l11 16 14 3q7 2 7 8v9H107z" fill={`url(#${orange})`} stroke="#f9b777" strokeWidth=".8"/>
        <path d="M112 104q0-7 8-7h53q9 0 14 8" fill="none" stroke="#ffe1b6" strokeWidth="1.2"/>
        <path d="M176 102h7l14 19h-21z" fill={`url(#${glass})`} stroke="#36454b" strokeWidth="1.2"/>
        <path d="M180 104h3l10 14h-4z" fill="#e6f7ff" opacity=".5"/>
        <path d="M199 117h4l4 5-8 1z" fill="#334a55" stroke="#95acb7" strokeWidth=".5"/>
        <path d="M113 108h56v25h-56z" fill="#ed7418" stroke="#ce6215" strokeWidth=".6"/>
        <path d="M171 102v33m4-11h24v11m-65-27v25" stroke="#a74d15" fill="none" strokeWidth=".7"/>
        <path d="M160 119h5m16 6h6" stroke="#fff0da" strokeWidth="1.3" strokeLinecap="round"/>
        <path d="M109 135h111v6H109z" fill="#293b47"/><path d="M113 133h102" stroke="#ffbb75" strokeWidth=".7"/>
        <path d="m213 125 9 3v4l-9-1z" fill="#eaf7ff"/><path d="M108 120h3v9h-3z" fill="#b52c1e"/>
        <path d="M214 134h9v5h-9z" fill="#152630"/><path d="M216 135h6m-6 2h6" stroke="#7c929f" strokeWidth=".6"/>
        <text x="140" y="117" textAnchor="middle" fill="white" fontWeight="bold" fontSize="6.5" fontFamily="Georgia">THE HOME DEPOT</text>
        <text x="140" y="126" textAnchor="middle" fill="#ffe8cd" fontSize="4.5" fontFamily="Arial" letterSpacing=".6">PROJECT DELIVERY</text>
        {[126, 202].map(x => <g key={x} transform={`translate(${x} 139)`}>
          <path d="M-11 1a11 11 0 0 1 22 0" fill="#14222d"/>
          <circle r="9" fill="#0a1118" stroke="#445c6c" strokeWidth="1.2"/>
          <g className="wheel-spokes scene-motion"><circle r="5.7" fill="#687e90" stroke="#bfced9"/>
            {[0,60,120,180,240,300].map(angle => <path key={angle} transform={`rotate(${angle})`} d="m-1-2 0-3 2-1 0 4z" fill="#e7f1f8"/>)}
          </g><circle r="1.6" fill="#344858"/>
        </g>)}
      </g>
    </>}
  </Scene>;
}

export default function CompanyImpactPreview({ company }: { company: { name: string; logo: string } }) {
  const [open, setOpen] = useState(false);
  const canHover = useMediaQuery(HOVER_PREVIEW_QUERY);
  const name = company.name as CompanyName;
  const scene = scenes[name];
  if (!scene) return <span className="impact-company"><CompanyLogo src={company.logo} eager />{company.name}</span>;
  return <ClickAwayListener onClickAway={() => setOpen(false)}><span className="company-preview-trigger"><PreviewTooltip
    open={open} describeChild disableTouchListener disableHoverListener={!canHover} enterDelay={180} leaveDelay={150} placement="top"
    onOpen={event => { if (window.matchMedia(HOVER_PREVIEW_QUERY).matches || (event.type === "focus" && event.currentTarget.matches(":focus-visible"))) setOpen(true); }}
    onClose={event => { setOpen(false); if (event.type === "keydown") event.stopPropagation(); }}
    slotProps={{ popper: { popperOptions: { strategy: "fixed" }, modifiers: [{ name: "preventOverflow", options: { altAxis: true, tether: false, padding: 16 } }] } }}
    title={<div className="company-preview" data-company={name}>
      <div className="company-preview-brand"><CompanyLogo src={company.logo} eager /><strong>{company.name}</strong></div>
      <CompanyScene name={name}/>
    </div>}>
    <CompanyButton type="button" className="impact-company" aria-label={`Preview ${company.name}`} aria-expanded={open} onClick={() => setOpen(current => window.matchMedia(HOVER_PREVIEW_QUERY).matches ? true : !current)}>
      <CompanyLogo src={company.logo} eager />{company.name}
    </CompanyButton>
  </PreviewTooltip></span></ClickAwayListener>;
}

const CompanyButton = styled.button`
  border: 0; background: transparent; padding: 0; cursor: pointer; color: var(--primary-color);
  font: inherit; letter-spacing: inherit; text-transform: inherit; border-radius: 10px;
  &:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 5px; }
`;

const PreviewTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }}/>)`
  z-index: 1400;
  .MuiTooltip-tooltip { padding: 8px; max-width: min(320px, calc(100vw - 32px)); background: transparent; }
  .company-preview { width: min(300px, calc(100vw - 48px)); box-sizing: border-box; background: var(--background-dark-color); color: var(--white-color); border: 1px solid var(--border-color); border-radius: 18px; padding: 14px; box-shadow: 3px 5px 0 var(--border-color), 8px 18px 32px #0004, inset 0 1px 0 #ffffff30; font: 12px/1.5 "Nunito", sans-serif; }
  .company-preview-brand { display: flex; align-items: center; gap: 8px; font-size: 14px; }
  .company-preview-brand > span { width: 32px; height: 32px; margin: 0; }
`;

const Scene = styled.svg`
  width: 100%; height: auto; display: block; overflow: hidden;
  border-radius: 12px; margin: 10px 0; background: radial-gradient(ellipse at 50% 65%, #6584ad16, transparent 75%);
  .uber-car { offset-distance: 0%; offset-rotate: auto; animation: map-drive 10s linear infinite; }
  .wheel-spokes, .gpu-fan-rotor { transform-box: fill-box; transform-origin: center; animation: rotor-spin .7s linear infinite; }
  .gpu-fan-rotor { animation-duration: 1.15s; }
  .processing-flow { animation: processing-flow 1.8s linear infinite; }
  .compute-bar { animation: compute-work 1.6s ease-in-out infinite; }
  .gpu-status { animation: spark 1s ease-in-out infinite; }
  .road-dashes { animation: road-flow 1.8s linear infinite; }
  .destination { animation: pin-pulse 2s ease-in-out infinite; transform-origin: 260px 65px; }
  .azure-cloud { animation: gpu-float 4s ease-in-out infinite; }
  .cloud-data-flow, .map-progress { animation: processing-flow 1.8s linear infinite; }
  .server-light { animation: spark 1.6s ease-in-out infinite; }
  .delivery-van { animation: delivery 6s ease-in-out infinite; }
  .delivery-trail { animation: road-flow 2s linear infinite; }
  @keyframes map-drive { 0%, 5% { offset-distance: 0%; opacity: 1; } 88%, 94% { offset-distance: 100%; opacity: 1; } 97% { offset-distance: 100%; opacity: 0; } 98% { offset-distance: 0%; opacity: 0; } 100% { offset-distance: 0%; opacity: 1; } }
  @keyframes rotor-spin { to { transform: rotate(360deg); } }
  @keyframes processing-flow { to { stroke-dashoffset: -56; } }
  @keyframes compute-work { 0%, 100% { opacity: .2; } 45% { opacity: 1; } }
  @keyframes road-flow { to { stroke-dashoffset: -30; } }
  @keyframes pin-pulse { 50% { transform: translateY(-4px); } }
  @keyframes gpu-float { 50% { transform: translateY(-5px); } }
  @keyframes spark { 50% { opacity: .25; } }
  @keyframes delivery { 0%, 8% { transform: translate(-28px, 0); } 80%, 88% { transform: translate(38px, 0); opacity: 1; } 95% { transform: translate(45px, 0); opacity: 0; } 96% { transform: translate(-28px, 0); opacity: 0; } 100% { transform: translate(-28px, 0); opacity: 1; } }
  @media (prefers-reduced-motion: reduce) { &, & * { animation: none !important; } }
`;
