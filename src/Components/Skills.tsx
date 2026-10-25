import { useRef, useState } from "react";
import styled from "styled-components";
import Title from "./Title";
import SkillSphere from "./SkillSphere";
import StageTypedText from "./StageTypedText";
import PipelineArtwork from "./PipelineArtwork";
import skillsSections from "../data/skills";
import ExternalLink from "./ExternalLink";
import { liquidGlassSurface, liquidGlassSelected } from "../styles/shared";

const STAGES = [
  { name: "Ingest", artwork: "ingest" as const, title: "Start with the right signal.", text: "Bring application events, database changes, and messages into a dependable ingestion layer.", tools: "Kafka · Pub/Sub · Python" },
  { name: "Process", artwork: "process" as const, title: "Turn data into something useful.", text: "Transform raw events into trusted datasets with scalable processing and dependable orchestration.", tools: "Spark · Flink · Airflow · dbt" },
  { name: "Store", artwork: "database" as const, title: "Give every dataset a home.", text: "Design warehouses, lakehouses, and search systems around how people need to use their data.", tools: "Snowflake · Databricks · OpenSearch" },
  { name: "Observe", artwork: "observe" as const, title: "Know how your platform performs.", text: "Make reliability visible with monitoring, data quality checks, and dashboards that help teams act.", tools: "Grafana · Kibana · Azure Monitor" },
];

function Skills() {
  const [active, setActive] = useState(0);
  const [glassTrigger, setGlassTrigger] = useState({ index: -1, count: 0 });
  const [arrowTrigger, setArrowTrigger] = useState({ index: -1, count: 0 });
  const selectStage = (index: number) => {
    setActive(index);
    setGlassTrigger(current => ({ index, count: current.count + 1 }));
    setArrowTrigger(current => current.index === index ? current : { index, count: current.count + 1 });
  };
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const stage = STAGES[active];
  return <SkillsStyled>
    <div className="skills-heading-row">
      <Title title="Skills" span="skills" animated />
      <div className="skills-ball" role="img" aria-label="Rotating sphere of technology logos"><SkillSphere /></div>
    </div>
    <div className="pipeline">
      <p>Explore how I think about a data platform.</p>
      <div className="stage-tabs" role="tablist" aria-label="Data platform stages">
        {STAGES.map((item, index) => <button key={item.name} className={glassTrigger.index === index ? "stage-clicked" : undefined} ref={el => { tabs.current[index] = el; }} role="tab" id={`stage-${index}`} aria-selected={active === index} aria-controls="stage-panel" tabIndex={active === index ? 0 : -1} onClick={() => selectStage(index)} onKeyDown={event => {
          const next = event.key === "ArrowRight" ? (index + 1) % 4 : event.key === "ArrowLeft" ? (index + 3) % 4 : event.key === "Home" ? 0 : event.key === "End" ? 3 : undefined;
          if (next !== undefined) { event.preventDefault(); selectStage(next); tabs.current[next]?.focus(); }
        }}><span key={glassTrigger.index === index ? glassTrigger.count : 0} className="stage-sheen" aria-hidden="true" /><svg className="stage-image" viewBox="0 0 100 100" width="64" height="64" aria-hidden="true"><PipelineArtwork kind={item.artwork} /></svg><span className="stage-name">{item.name}</span><span key={`${index}-${arrowTrigger.index === index ? arrowTrigger.count : 0}`} className={`stage-arrow${arrowTrigger.index === index ? " is-moving" : ""}`} aria-hidden="true">{index === 3 ? "↗" : "→"}</span></button>)}
      </div>
      <div className="pipeline-flow" aria-hidden="true">
        <div className="flow-track"><span className="flow-packet" /></div>
        {STAGES.map((item, index) => <span key={item.name} className={`flow-node${active === index ? " is-active" : ""}`} />)}
      </div>
      <div key={active} id="stage-panel" role="tabpanel" aria-labelledby={`stage-${active}`} className="stage-content" tabIndex={0}>
        <h3><StageTypedText text={stage.title} animate={arrowTrigger.index !== -1} duration={650} /></h3>
        <div className="stage-description">
          <p><StageTypedText text={stage.text} animate={arrowTrigger.index !== -1} /></p>
          <ul className="stage-tools" aria-label={`${stage.name} technologies`}>
            {stage.tools.split(" · ").map((tool, index) => <li key={tool}><StageTypedText text={tool} animate={arrowTrigger.index !== -1} duration={Math.max(260, tool.length * 40)} delay={index * 180 + 40} /></li>)}
          </ul>
        </div>
      </div>
    </div>
    <div className="skill-groups">{skillsSections.map(section => <details key={section.heading}>
      <summary>{section.heading}<span aria-hidden="true" className="expand">+</span></summary>
      <div className="categories">{section.categories.map(category => <div className="skill-category" key={category.label}>
        <h4>{category.label}</h4><div className="skill-links">{category.items.map(item => <ExternalLink key={item.label} href={item.url}>{item.label}</ExternalLink>)}</div>
      </div>)}</div>
    </details>)}</div>
  </SkillsStyled>;
}

const SkillsStyled = styled.div`
  .skills-heading-row { display: flex; align-items: center; justify-content: flex-start; gap: 28px; }
  .skills-heading-row > .reveal { flex: 0 1 auto; min-width: 0; }
  .skills-ball { width: 150px; max-width: 100%; flex: 0 0 150px; }
  .skills-ball #mainSphereContainer { width: 100%; }
  .skills-ball #myCanvas { width: 100%; height: auto; aspect-ratio: 1; }
  @media(max-width: 480px) {
    .skills-heading-row { gap: 16px; }
    .skills-ball { width: 110px; flex-basis: 110px; }
  }

  .pipeline { margin-top: 2rem; padding: clamp(20px, 3vw, 40px); background: linear-gradient(145deg, rgba(var(--primary-color-rgb), .07), transparent 60%), var(--background-dark-grey); border: 1px solid var(--glass-border); border-radius: 24px; }
  .pipeline > p { color: var(--font-light-color); margin-bottom: 28px; }
  .stage-tabs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; }
  .stage-tabs button { position: relative; isolation: isolate; overflow: hidden; display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 12px 8px; background: linear-gradient(145deg, rgba(var(--primary-color-rgb), .14), rgba(var(--primary-color-rgb), .04)); color: var(--white-color); border: 1px solid rgba(var(--primary-color-rgb), .18); border-radius: 20px; padding: 20px; font: inherit; font-size: clamp(20px, 2.1vw, 29px); cursor: pointer; text-align: left; box-shadow: inset 0 1px 0 rgba(225, 244, 255, .12); backdrop-filter: blur(12px); transition: transform .25s, box-shadow .25s, border-color .25s; }
  .stage-tabs button[aria-selected="true"] { background: linear-gradient(135deg, rgba(155, 216, 255, .4), rgba(66, 143, 250, .3) 48%, rgba(30, 81, 157, .25)); color: #deefff; border-color: rgba(145, 210, 255, .7); box-shadow: inset 0 1px 0 rgba(235, 250, 255, .6), inset 0 -1px 0 rgba(121, 190, 255, .2), 0 8px 24px rgba(38, 125, 246, .23); transform: translateY(-2px); }
  .light-theme & .stage-tabs button[aria-selected="true"] { background: linear-gradient(135deg, rgba(244, 253, 255, .96), rgba(177, 220, 255, .7) 55%, rgba(128, 185, 251, .55)); color: #123c66; border-color: rgba(67, 139, 225, .5); box-shadow: inset 0 1px 0 #fff, 0 8px 24px rgba(38, 125, 246, .16); }
  .stage-sheen { position: absolute; inset: -40% auto -40% 0; width: 40%; z-index: -1; pointer-events: none; opacity: 0; background: linear-gradient(90deg, transparent, rgba(227, 248, 255, .4), transparent); transform: translateX(-170%) skewX(-20deg); }
  .stage-clicked .stage-sheen { animation: stage-glass-sweep .75s ease-out 1; }
  @keyframes stage-glass-sweep { 0% { transform: translateX(-170%) skewX(-20deg); opacity: 0; } 25% { opacity: 1; } 100% { transform: translateX(400%) skewX(-20deg); opacity: 0; } }
  @media(prefers-reduced-motion: reduce) { .stage-clicked .stage-sheen { animation: none; } }
  .stage-tabs button span { color: inherit; }
  .stage-image { display: block; grid-column: 1 / -1; width: 64px; height: 64px; object-fit: contain; }
  .stage-name { min-width: 0; }
  .stage-arrow { display: inline-block; font-size: 26px; }
  .stage-arrow.is-moving { animation: stage-arrow-flow .6s ease-in-out 1 forwards; }
  .stage-tabs button:last-child .stage-arrow { --arrow-rise: -8px; }
  @keyframes stage-arrow-flow {
    0% { transform: translate(0, 0); opacity: 1; }
    40% { transform: translate(8px, var(--arrow-rise, 0px)); opacity: 1; }
    100% { transform: translate(20px, var(--arrow-rise, 0px)); opacity: 0; }
  }
  @media(prefers-reduced-motion: reduce) { .stage-arrow.is-moving { animation: none; opacity: 0; } }


  .stage-tabs button:hover { transform: translateY(-4px); border-color: rgba(var(--primary-color-rgb), .6); }
  .stage-tabs button:active { transform: translateY(-1px) scale(.985); }
  .pipeline-flow { position: relative; display: flex; align-items: center; justify-content: space-around; height: 28px; margin: 18px 0 0; }
  .flow-track { position: absolute; left: 12.5%; right: 12.5%; top: 12px; height: 4px; overflow: hidden; border-radius: 100px; background: var(--background-light-color-2); }
  .flow-packet { position: absolute; inset: 0 auto 0 0; width: 18%; border-radius: inherit; background: var(--gradient-primary); animation: pipeline-stream 3.6s linear infinite; }
  .flow-node { position: relative; z-index: 1; width: 10px; height: 10px; border-radius: 50%; background: var(--primary-color); }
  .flow-node.is-active { outline: 5px solid var(--background-light-color-2); }
  @keyframes pipeline-stream { from { transform: translateX(-110%); } to { transform: translateX(660%); } }
  @media(prefers-reduced-motion: reduce) { .flow-packet { animation: none; left: 40%; } .stage-tabs button { transition: none; } }
  .stage-content { position: relative; isolation: isolate; overflow: hidden; display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); align-items: start; gap: 32px; margin-top: 18px; padding: 28px; border-radius: 16px; border: 1px solid rgba(var(--primary-color-rgb), .16); border-left: 3px solid var(--primary-color); background: linear-gradient(135deg, rgba(var(--primary-color-rgb), .06), transparent 70%), var(--background-dark-color); min-height: 180px; }
  .stage-content::before { content: ""; position: absolute; z-index: -1; inset: -25%; border-radius: inherit; pointer-events: none; background: radial-gradient(ellipse at 20% 50%, rgba(var(--primary-color-rgb), .1), transparent 60%); }

  .typed-text { display: block; position: relative; color: inherit; }
  .type-accessible { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  .type-reserve { display: block; visibility: hidden; color: inherit; }
  .type-visible { position: absolute; inset: 0; color: inherit; }
  .typing-caret { display: inline-block; height: .9em; width: 2px; margin-left: 2px; vertical-align: -.08em; background: var(--primary-color); animation: typing-blink .6s steps(1) infinite; }
  @keyframes typing-blink { 50% { opacity: 0; } }
  @media(prefers-reduced-motion: reduce) { .typing-caret { animation: none; } }
  .stage-content h3 { color: var(--white-color); font-size: clamp(24px, 2.5vw, 34px); letter-spacing: -.04em; line-height: 1.2; font-weight: 500; }
  .stage-description { min-width: 0; }
  .stage-content p { font-size: 16px; line-height: 1.7; max-width: 60ch; }
  .stage-tools { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; padding: 0; list-style: none; }
  .stage-tools li { display: flex; align-items: center; justify-content: center; min-height: 44px; padding: 10px 16px; border: 1px solid rgba(var(--primary-color-rgb), .25); border-radius: 10px; background: var(--background-light-color-2); color: var(--white-color); font-size: 15px; font-weight: 600; line-height: 1.4; }


  .skill-groups { display: grid; grid-template-columns: 1fr 1fr; align-items: start; gap: 16px 28px; margin-top: 40px; }
  details { border-radius: 20px; }
  details > summary { ${liquidGlassSurface} border-radius: 20px; transition: border-color .25s, box-shadow .25s; }
  details > summary:hover, details > summary:focus-visible, details[open] > summary { ${liquidGlassSelected} }
  summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 28px 24px; cursor: pointer; color: var(--white-color); font-size: 19px; list-style: none; }
  summary::-webkit-details-marker { display: none; }
  .expand { color: inherit; font-size: 26px; }
  details[open] .expand { transform: rotate(45deg); }
  details[open] { grid-column: 1 / -1; background: transparent; }
  details[open] > summary { position: relative; padding: 24px; margin-bottom: 20px; font-weight: 700; }
  .categories { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; padding-bottom: 20px; }
  .skill-category { ${liquidGlassSurface} min-width: 0; padding: 26px; border-radius: 16px; }
  .categories h4 { display: flex; align-items: center; gap: 10px; color: var(--primary-color); margin-bottom: 18px; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; }
  .categories h4::before { content: ""; flex: 0 0 3px; height: 16px; border-radius: 3px; background: var(--gradient-primary); }
  .skill-links { display: flex; flex-wrap: wrap; gap: 10px; }
  .skill-links a { display: inline-flex; align-items: center; min-height: 44px; padding: 8px 16px; border: 1px solid var(--border-color); border-radius: 100px; color: var(--font-light-color); font-size: 16px; transition: color .2s, border-color .2s, background-color .2s; }
  .skill-links a:hover, .skill-links a:focus-visible { color: var(--primary-color); border-color: var(--primary-color); background: var(--background-light-color-2); }

  @media(prefers-reduced-motion: reduce) { details > summary { transition: none; } }

  @media(max-width: 800px) {
    .stage-tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media(max-width: 650px) {
    .stage-tabs { grid-template-columns: 1fr 1fr; gap: 8px; }
    .stage-tabs button { padding: 16px 14px; font-size: 20px; }
    .stage-image { width: 52px; height: 52px; }
    .stage-arrow { font-size: 22px; }
    .stage-content { grid-template-columns: 1fr; gap: 18px; min-height: 0; padding: 22px 18px; }
    .stage-tools { gap: 8px; margin-top: 18px; }
    .stage-tools li { padding: 10px 14px; }
    .skill-groups { grid-template-columns: 1fr; gap: 12px; margin-top: 24px; }
    summary { padding: 22px 20px; font-size: 17px; }
    .categories { grid-template-columns: 1fr; gap: 14px; }
    .skill-category { padding: 22px 20px; }
  }

  @media(max-width: 400px) {
    .stage-tabs button { grid-template-columns: minmax(0, 1fr); }
    .stage-image { grid-area: 1 / 1; }
    .stage-arrow { grid-area: 1 / 1; justify-self: end; }
    .stage-name { grid-area: 2 / 1; }
  }
`;
export default Skills;
