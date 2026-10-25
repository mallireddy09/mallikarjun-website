import { memo, useId, useState, type CSSProperties } from "react";
import styled from "styled-components";
import useProjectPlayback from "../hooks/useProjectPlayback";
import { EXPENSE_CATEGORIES, PHONE_DEMO_TABS, PHONE_SCREEN_DURATION, phoneDemoTab, flightFrame, moneyFrame } from "../data/projectDemo";
import { publicAsset } from "../helper/publicAsset";
import portrait from "../img/arjun_image.jpg";

const dollars = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
function wedge(start: number, end: number, radius: number) {
  const point = (angle: number) => `${Math.cos(angle) * radius} ${Math.sin(angle) * radius}`;
  return `M0 0L${point(start)}A${radius} ${radius} 0 ${end - start > Math.PI ? 1 : 0} 1 ${point(end)}Z`;
}

function FinancePhoneScreen({ tab, rows, total }: { tab: number; rows: ReturnType<typeof moneyFrame>["screens"][number]; total: number }) {
  return <g className="phone-demo-screen" data-screen={PHONE_DEMO_TABS[tab]} key={tab}>
    <text className="phone-screen-title" x="23" y="218" fontSize="13" fontWeight="800" fill="#173b5a">{PHONE_DEMO_TABS[tab]}</text>
    <text className="phone-bill-total" x="208" y="217" textAnchor="end" fontSize="7" fontWeight="700" fill="#197c6b">Total bill {dollars.format(total)}</text>
    {rows.map((row, i) => <g className="phone-demo-row" data-amount={row.amount} key={row.name} transform={`translate(22 ${232 + i * (tab === 0 ? 32 : 41)})`}>
      <rect width="188" height={tab === 0 ? 29 : 36} rx="8" fill="#fff"/>
      <circle cx="16" cy={tab === 0 ? 15 : 18} r="11" fill={EXPENSE_CATEGORIES[i].color} fillOpacity=".15"/>
      {tab === 0 ? <text x="16" y="18" textAnchor="middle" fontSize="9" fontWeight="800" fill={EXPENSE_CATEGORIES[i].depth}>{row.name[0]}</text>
        : tab === 1 ? <g transform="translate(8 10)" fill="none" stroke={EXPENSE_CATEGORIES[i].depth} strokeWidth="1.3" strokeLinejoin="round">
          <path d={i === 0 ? "m0 7 8-7 8 7m-13-2v11h10V5M6 16v-6h4v6" : i === 1 ? "M1 4h14l-1 12H2ZM5 5V3a3 3 0 0 1 6 0v2" : "M0 11h16M3 11l3-8h4l3 8M8 0v3m-6-1 2 2m10-2-2 2M3 15h10"}/>
        </g> : <path d="m11 18 3 3 7-7" fill="none" stroke={EXPENSE_CATEGORIES[i].depth} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>}
      <text className="phone-row-name" x="33" y={tab === 0 ? 12 : 15} fontSize="9.4" fontWeight="700" fill="#27465f">{row.name}</text>
      <text x="33" y={tab === 0 ? 23 : 27} fontSize="6.4" fill="#7890a3">{row.detail}</text>
      <text className="phone-row-amount" x="180" y={tab === 0 ? 18 : 22} textAnchor="end" fontSize="9.5" fontWeight="800" fill="#197c6b">{dollars.format(row.amount)}</text>
    </g>)}
  </g>;
}

const FinanceScene = memo(function FinanceScene({ time }: { time: number }) {
  const id = `money-${useId().replace(/:/g, "")}`;
  const values = moneyFrame(time);
  const tab = phoneDemoTab(time);
  let angle = -Math.PI / 2;
  const slices = values.pie.map(category => {
    const end = angle + category.amount / values.spent * Math.PI * 2;
    const middle = (angle + end) / 2;
    const slice = { ...category, start: angle, end, path: wedge(angle, end, 92), offset: `${Math.cos(middle) * 3} ${Math.sin(middle) * 3}` };
    angle = end;
    return slice;
  });
  return <svg className="finance-scene" viewBox="0 0 720 480" focusable="false">
    <defs>
      <clipPath id={`${id}-avatar`}><circle cx="195" cy="67" r="13"/></clipPath>
      <linearGradient id={`${id}-back`} x2="1" y2="1"><stop stopColor="#e4f5ff"/><stop offset="1" stopColor="#a9d0f5"/></linearGradient>
      <linearGradient id={`${id}-phone`} x2="1" y2=".5"><stop stopColor="#080e18"/><stop offset=".55" stopColor="#7b8b9c"/><stop offset=".65" stopColor="#1d2e42"/><stop offset="1" stopColor="#070b12"/></linearGradient>
      <linearGradient id={`${id}-balance`} x2=".7" y2="1"><stop stopColor="#18334b"/><stop offset="1" stopColor="#07131e"/></linearGradient>
      <linearGradient id={`${id}-pie-sheen`} x2=".3" y2="1"><stop stopColor="#ffffff" stopOpacity=".3"/><stop offset=".5" stopColor="#fff" stopOpacity="0"/><stop offset="1" stopColor="#00133d" stopOpacity=".12"/></linearGradient>
      <linearGradient id={`${id}-nav`} x2="0" y2="1"><stop stopColor="#50565c"/><stop offset="1" stopColor="#2e343a"/></linearGradient>
      <linearGradient id={`${id}-expense`} x2=".4" y2="1"><stop stopColor="#23c6a3"/><stop offset="1" stopColor="#099a7e"/></linearGradient>
      <radialGradient id={`${id}-light`}><stop stopColor="#fff" stopOpacity=".7"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient>
    </defs>
    <path d="M0 0h720v480H0z" fill={`url(#${id}-back)`}/>
    <ellipse cx="160" cy="180" rx="340" ry="260" fill={`url(#${id}-light)`}/>
    <rect x="32" y="24" width="112" height="24" rx="12" fill="#fff" fillOpacity=".7"/><circle className="demo-dot" cx="45" cy="36" r="3" fill="#15957d"/><text x="55" y="40" fontSize="9" fill="#315671" letterSpacing=".8">DEMO UPDATES</text>
    <text x="34" y="81" fontSize="17" fontWeight="700" fill="#315671">Monthly snapshot</text>
    <text x="34" y="105" fontSize="11" fill="#537591">Total bill amount</text>
    <text className="metric-balance" x="32" y="148" fontSize="40" fontWeight="800" fill="#08243d">{dollars.format(values.balance)}</text>
    <g fill="#fff" fillOpacity=".7" stroke="#fff" strokeOpacity=".65"><rect x="34" y="169" width="148" height="70" rx="13"/><rect x="194" y="169" width="148" height="70" rx="13"/></g>
    <text x="48" y="191" fontSize="10" fill="#4c6d86">INCOME</text><text className="metric-income" x="48" y="220" fontSize="22" fontWeight="700" fill="#176a68">{dollars.format(values.income)}</text>
    <text x="208" y="191" fontSize="10" fill="#4c6d86">TOTAL BILLS</text><text className="metric-spent" x="208" y="220" fontSize="22" fontWeight="700" fill="#173b5a">{dollars.format(values.spent)}</text>
    <text x="35" y="273" fontSize="14" fontWeight="700" fill="#315671">Spending mix</text>
    <text x="342" y="273" textAnchor="end" fontSize="11" fill="#187b69">{Math.round(values.saved / values.income * 100)}% saved</text>
    <ellipse cx="187" cy="417" rx="111" ry="16" fill="#34649e" opacity=".18"/>
    <g className="spending-pie" data-mix={values.pie.map(slice => slice.amount).join(",")} transform="translate(187 350) scale(1 .66)">
      {/* Paint every extrusion before any top face so rear slices cannot cover their neighbours. */}
      <g className="pie-depths">{Array.from({ length: 18 }, (_, layer) => 18 - layer).map(depth => <g key={depth} transform={`translate(0 ${depth})`}>
        {slices.map(slice => <path key={slice.name} d={slice.path} transform={`translate(${slice.offset})`} fill={slice.depth}/>)}
      </g>)}</g>
      <g className="pie-tops">{slices.map(slice => <g key={slice.name} data-category={slice.name} transform={`translate(${slice.offset})`}>
        <path className="spending-slice" data-amount={slice.amount} data-start={slice.start} data-end={slice.end} d={slice.path} fill={slice.color} stroke="#eef7ff" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d={slice.path} fill={`url(#${id}-pie-sheen)`}/>
      </g>)}</g>
    </g>
    {values.pie.map((category, i) => <g key={category.name} transform={`translate(${36 + (i % 2) * 160} ${439 + Math.floor(i / 2) * 19})`}><circle r="4" fill={category.color}/><text x="9" y="3" fontSize="9.5" fill="#315671">{category.name} {category.percentage}%</text></g>)}
    <ellipse cx="527" cy="460" rx="112" ry="13" fill="#315b89" opacity=".22"/>
    <g className="finance-phone" transform="translate(535 241) rotate(10) translate(-116 -219)">
      <rect className="phone-metal-edge" x="8" y="6" width="232" height="438" rx="38" fill={`url(#${id}-phone)`} stroke="#8095a9" strokeWidth="2"/>
      <rect width="232" height="438" rx="38" fill="#09111a" stroke="#445a6e" strokeWidth="2"/>
      <path d="M36 3h157q36 0 36 36v350" fill="none" stroke="#bfdae8" strokeOpacity=".5" strokeWidth="1.2"/>
      <rect x="9" y="9" width="214" height="420" rx="30" fill="#f8fbff"/>
      <path d="M-1 101v27m0 9v24m235-51v35" stroke="#65798c" strokeWidth="3" strokeLinecap="round"/>
      <rect x="78" y="15" width="77" height="15" rx="8" fill="#080e15"/>
      <text x="25" y="29" fontSize="8" fontWeight="700" fill="#1c334b">9:41</text>
      <path d="M175 24v4m4-6v6m4-8v8" stroke="#182e44" strokeWidth="2"/><rect x="191" y="21" width="14" height="7" rx="2" fill="none" stroke="#182e44"/><path d="M193 23h9v3h-9z" fill="#182e44"/>
      <text x="23" y="61" fontSize="9" fill="#6a8096">Good afternoon,</text><text x="23" y="79" fontSize="14" fontWeight="800" fill="#13304c">Mallikarjun</text>
      <image className="phone-profile-photo" href={portrait} x="182" y="54" width="26" height="26" preserveAspectRatio="xMidYMid slice" clipPath={`url(#${id}-avatar)`}/><circle cx="195" cy="67" r="13" fill="none" stroke="#9cc9ec" strokeWidth="1"/>
      <rect x="21" y="99" width="190" height="95" rx="12" fill={`url(#${id}-balance)`}/>
      <text x="34" y="120" fontSize="9" fill="#b7cedd">Total balance</text><text className="phone-balance" x="33" y="149" fontSize="23" fontWeight="800" fill="#fff">{dollars.format(values.balance)}</text>
      <text className="phone-saved" x="34" y="177" fontSize="8" fill="#57d0b2">Saved {dollars.format(values.saved)}</text>
      <path d={`M131 178 145 ${171 - values.expenses[1] / 60} 159 174 175 ${160 - values.expenses[2] / 45} 198 163`} fill="none" stroke="#5cc8ff" strokeWidth="1.6"/>
      <FinancePhoneScreen tab={tab} rows={values.screens[tab]} total={values.spent}/>
      <g className="phone-add-expense" transform="translate(111 365)">
        <rect y="2" width="99" height="18" rx="9" fill="#087c68" opacity=".35"/>
        <rect width="99" height="18" rx="9" fill={`url(#${id}-expense)`} stroke="#74ddc1" strokeWidth=".5"/>
        <path d="m9 5 1-1 1 1 1-1 1 1 1-1v10l-1-1-1 1-1-1-1 1-1-1Zm2 2h2m-2 2h2m-2 2h2" fill="none" stroke="#fff" strokeWidth=".7"/>
        <text x="21" y="12" fontSize="8" fontWeight="700" fill="#fff">Add expense</text>
      </g>
      <g className="phone-bottom-nav" data-active-tab={PHONE_DEMO_TABS[tab]} transform="translate(19 389)">
        <rect y="2" width="194" height="30" rx="15" fill="#141a20" opacity=".3"/>
        <rect width="194" height="30" rx="15" fill={`url(#${id}-nav)`} stroke="#747c84" strokeWidth=".7"/>
        <rect className="phone-nav-selection" style={{ transform: `translateX(${tab * 48.3}px)` }} x="2" y="2" width="47" height="26" rx="13" fill="#20272c" stroke="#535d64" strokeWidth=".5"/>
        <g fill="#fff"><circle cx="25" cy="9" r="2.6"/><path d="M20 17q0-6 5-6t5 6Z"/></g>
        <g fill="none" stroke="#fff" strokeWidth="1.1" strokeLinecap="round"><circle cx="71" cy="9" r="2.4"/><circle cx="77" cy="8" r="2.6"/><path d="M66 17q0-6 5-6m1 6q0-6 5-6t5 6Z"/>
        <rect x="117" y="5" width="11" height="12" rx="2"/><path d="m118 12 3-3 2 4 4-5"/></g>
        <g className="phone-search-icon" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"><circle cx="169" cy="10" r="4.2"/><path d="m172 13 4 4"/></g>
        {["Friends", "Groups", "Activity", "Search"].map((label, i) => <text key={label} x={25 + i * 48.3} y="25" textAnchor="middle" fontSize="6.7" fill="#fff">{label}</text>)}
      </g>
      <path d="M85 424h63" stroke="#152a3f" strokeWidth="3" strokeLinecap="round"/>
    </g>
  </svg>;
});

export default function ProjectPreview({ kind, image }: { kind: "finance" | "rocket"; image: string }) {
  const [loadedAssets, setLoadedAssets] = useState(0);
  const assetLoaded = () => setLoadedAssets(count => Math.min(2, count + 1));
  const { ref, running, time } = useProjectPlayback(kind === "finance" || loadedAssets === 2, kind === "rocket");
  const flight = flightFrame(time);
  return <PreviewStyled ref={ref} className="project-preview" data-preview={kind} data-running={running} aria-hidden="true" style={{ "--project-play-state": running ? "running" : "paused" } as CSSProperties}>
    {kind === "finance" ? <FinanceScene time={Math.floor(time / PHONE_SCREEN_DURATION) * PHONE_SCREEN_DURATION}/> : <>
      <img className="flight-backdrop" onLoad={assetLoaded} src={image} alt="" loading="lazy" decoding="async"/>
      <div className="flight-shade"/>
      <div className="rocket-rig" style={{ transform: `translate(-50%, ${-135 * flight.height}%)` }}>
        <span className="rocket-flame" style={{ opacity: flight.engine, transform: `scaleY(${.3 + flight.engine})` }}/>
        <img className="rocket-cutout" onLoad={assetLoaded} src={publicAsset("/images/3d/spacex-rocket-live.png")} alt="" loading="lazy" decoding="async"/>
      </div>
      {[-1, 1].map(direction => <div key={direction} className={`pad-smoke ${direction < 0 ? "smoke-left" : "smoke-right"}`} style={{ opacity: flight.smoke, transform: `translateX(${direction * (60 - flight.smoke * 40)}%) scale(${2 - flight.smoke})` }}/>)}
      <span className="flight-demo">FLIGHT DEMO</span><span className="flight-phase" data-phase={flight.phase}>{flight.phase}</span>
      <div className="flight-metrics"><div><small>ALTITUDE</small><strong className="flight-altitude">{flight.altitude.toLocaleString()} <span>m</span></strong></div><div><small>VERTICAL SPEED</small><strong className="flight-speed">{flight.speed} <span>m/s</span></strong></div></div>
      <div className="flight-progress"><span style={{ width: `${flight.progress * 100}%` }}/></div>
    </>}
  </PreviewStyled>;
}

const PreviewStyled = styled.div`
  position: relative; width: 100%; height: 100%; overflow: hidden; isolation: isolate; background: #c7e5ff;
  &, & *, & *::before, & *::after { animation-play-state: var(--project-play-state, paused) !important; }
  svg { display: block; width: 100%; height: 100%; }
  .finance-scene text { font-family: "Nunito", sans-serif; font-variant-numeric: tabular-nums; }
  .phone-demo-screen { animation: phone-screen-appear .4s ease-out both; }
  .phone-nav-selection { transition: transform .4s ease-in-out; }
  @keyframes phone-screen-appear { from { opacity: 0; } to { opacity: 1; } }
  .demo-dot { animation: project-demo-pulse 2s ease-in-out infinite; }
  .flight-backdrop { display: block; width: 100%; height: 100%; object-fit: cover; }
  .flight-shade { position: absolute; inset: 0; background: linear-gradient(transparent 65%, #041d3c80); pointer-events: none; }
  .rocket-rig { position: absolute; left: 50%; top: 3%; width: 36%; height: 76%; transform: translateX(-50%); }
  .rocket-cutout { display: block; position: relative; z-index: 1; width: 100%; height: 100%; object-fit: contain; }
  .rocket-flame { position: absolute; left: 44%; top: 89%; width: 12%; height: 20%; transform-origin: center top; border-radius: 45% 45% 50% 50%; background: radial-gradient(ellipse at 50% 10%, #fff 15%, #ffec8b 36%, #ffae27 60%, #ff7d0800 75%); filter: drop-shadow(0 0 8px #ffbb48); opacity: 0; }
  .pad-smoke { position: absolute; top: 71%; left: 44%; width: 20%; height: 11%; border-radius: 50%; background: radial-gradient(ellipse, #fff9, #edf4ff44 45%, transparent 72%); filter: blur(3px); opacity: 0; pointer-events: none; }
  .flight-demo, .flight-phase { position: absolute; top: 16px; padding: 6px 9px; border: 1px solid #ffffff55; border-radius: 9px; font-size: clamp(8px, 1vw, 11px); line-height: 1.2; color: #fff; background: #09284999; backdrop-filter: blur(8px); }
  .flight-demo { left: 16px; letter-spacing: .1em; } .flight-phase { right: 16px; }
  .flight-metrics { position: absolute; top: 52px; left: 16px; display: flex; flex-direction: column; gap: 10px; padding: 10px 12px; border: 1px solid #ffffff55; border-radius: 10px; background: #09284999; backdrop-filter: blur(8px); color: #fff; text-shadow: 0 1px 4px #00234c99; }
  .flight-metrics small { display: block; font-size: clamp(7px, .75vw, 10px); letter-spacing: .11em; color: #d2ecff; }
  .flight-metrics strong { display: block; font-size: clamp(15px, 1.6vw, 23px); font-weight: 700; line-height: 1.25; font-variant-numeric: tabular-nums; color: #fff; }
  .flight-metrics strong span { color: #d2ecff; font-size: .55em; }
  .flight-progress { position: absolute; bottom: 0; height: 3px; width: 100%; background: #ffffff25; } .flight-progress span { display: block; height: 100%; background: #b6e6ff; }
  @keyframes project-demo-pulse { 50% { opacity: .35; } }
  @media (prefers-reduced-motion: reduce) { &, & *, & *::before, & *::after { animation: none !important; transition: none !important; } .rocket-rig { transform: translateX(-50%); } .rocket-flame, .pad-smoke { opacity: 0; } }
`;
