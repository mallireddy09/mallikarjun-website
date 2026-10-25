import type { ReactNode } from "react";
import styled from "styled-components";
import type { PipelineExample as Example } from "../data/pipeline";

export default function PipelineExample({ example }: { example: Example }) {
  let content: ReactNode;
  switch (example.kind) {
    case "event":
      content = <>
        <div className="activity-row"><span className="activity-dot" aria-hidden="true" /><div><strong>{example.action}</strong><small>{example.time}</small></div><span className="sample-badge">Event</span></div>
        <pre tabIndex={0}><code>{example.payload}</code></pre>
      </>;
      break;
    case "api":
      content = <>
        <div className="mini-heading">Request</div>
        <div className="request-line"><span className="sample-badge">{example.method}</span><code>{example.endpoint}</code></div>
        <div className="mini-heading response-heading">Response <span className="success-badge">{example.status}</span></div>
        <pre tabIndex={0}><code>{example.response}</code></pre>
      </>;
      break;
    case "table":
      content = <>
        <div className="mini-heading">Table: <code>{example.name}</code></div>
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Customer records"><table><caption className="visually-hidden">Customer database records</caption><thead><tr>{example.columns.map(column => <th key={column} scope="col">{column}</th>)}</tr></thead><tbody>{example.rows.map(row => <tr key={row[0]}>{row.map((value, index) => <td key={index}>{value}</td>)}</tr>)}</tbody></table></div>
        <pre tabIndex={0}><code>{example.query}</code></pre>
      </>;
      break;
    case "ingestion":
      content = <div className="ingestion-example">
        <div className="source-list">{example.sources.map(source => <span key={source}>{source}</span>)}</div>
        <div className="flow-arrow" aria-hidden="true">↓</div>
        <div className="landing-zone"><strong>{example.destination}</strong><code>{example.path}</code><span className="success-badge">{example.status}</span></div>
        <p className="sample-note">{example.note}</p>
      </div>;
      break;
    case "processing":
      content = <>
        <div className="comparison-grid">{[{ label: "Before", fields: example.before }, { label: "After", fields: example.after }].map(({ label, fields }) => <div className="record-card" key={label}><div className="mini-heading">{label}</div><dl>{fields.map(([key, value]) => <div key={key}><dt>{key}</dt><dd><code>{value}</code></dd></div>)}</dl></div>)}</div>
        <ul className="transform-steps">{example.steps.map(step => <li key={step}>{step}</li>)}</ul>
      </>;
      break;
    case "quality":
      content = <div className="quality-example">
        <div className="dataset-heading"><code>{example.dataset}</code><span className="success-badge">Ready to use</span></div>
        <div className="dataset-meta"><span>{example.records}</span><span>{example.freshness}</span></div>
        <div className="mini-heading">Quality checks</div>
        <ul className="quality-checks">{example.checks.map(check => <li key={check}><span aria-hidden="true">✓</span>{check}</li>)}</ul>
        <p className="sample-note">{example.owner}</p>
      </div>;
      break;
    case "analytics": {
      const maximum = Math.max(...example.series.map(point => point.value));
      content = <div className="dashboard-example">
        <div className="dashboard-heading"><strong>{example.title}</strong><span>{example.period}</span></div>
        <dl className="metric-grid">{example.metrics.map(metric => <div key={metric.label}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}</dl>
        <div className="mini-heading">Orders by day</div>
        <div role="img" aria-label={`Orders by day: ${example.series.map(point => `${point.day} ${point.value}`).join(", ")}`} className="mini-chart"><div className="chart-columns" aria-hidden="true">{example.series.map(point => <div className="chart-column" key={point.day}><div className="bar-track"><span className="chart-bar" style={{ height: `${point.value / maximum * 100}%` }} title={`${point.day}: ${point.value} orders`} /></div><span>{point.day}</span></div>)}</div></div>
        <p className="dashboard-insight">{example.insight}</p>
      </div>;
      break;
    }
    case "ai":
      content = <>
        <section className="ai-assistant" aria-label="AI assistant example"><div className="mini-heading">AI assistant <span className="sample-badge">Generate text</span></div><div className="chat-message user-message"><small>You</small><p>{example.prompt}</p></div><div className="chat-message assistant-message"><small>Assistant</small><p>{example.answer}</p></div></section>
        <section className="prediction-example" aria-label="Machine learning prediction example"><div className="mini-heading">ML prediction</div><p className="learning-path">{example.learning}</p><div className="feature-list" aria-label="Model inputs">{example.features.map(feature => <span key={feature}>{feature}</span>)}</div><div className="prediction-result">{example.prediction}</div></section>
      </>;
      break;
  }
  return <ExampleStyled data-example-kind={example.kind}>{content}</ExampleStyled>;
}

const ExampleStyled = styled.div`
  min-width: 0;
  color: var(--white-color);
  strong { font-weight: 700; }
  small { display: block; font-size: 11px; color: var(--font-light-color); }
  .mini-heading { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; font-size: 13px; font-weight: 700; }
  .sample-badge, .success-badge { display: inline-flex; align-items: center; border-radius: 7px; padding: 4px 7px; font-size: 10px; font-weight: 700; }
  .sample-badge { color: var(--primary-color); background: rgba(var(--primary-color-rgb), .12); }
  .success-badge { color: #83e1b1; background: rgba(47, 176, 117, .14); }
  .light-theme & .success-badge { color: #186342; }
  .activity-row { display: flex; align-items: center; gap: 10px; padding: 12px; border: 1px solid var(--border-color); border-radius: 12px; font-size: 12px; }
  .activity-row > div { flex: 1; min-width: 0; }
  .activity-dot { flex: 0 0 9px; height: 9px; border-radius: 50%; background: var(--primary-color); box-shadow: 0 0 0 4px rgba(var(--primary-color-rgb), .12); }
  .activity-row small { margin-top: 4px; }
  .request-line { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 12px; border: 1px solid var(--border-color); border-radius: 10px; font-size: 11px; }
  .request-line code { overflow-wrap: anywhere; }
  .response-heading { margin-top: 18px; }
  .table-scroll { max-width: 100%; overflow-x: auto; border: 1px solid var(--border-color); border-radius: 10px; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; text-align: left; }
  th, td { padding: 10px 12px; border-bottom: 1px solid var(--border-color); }
  th { background: rgba(var(--primary-color-rgb), .1); font-weight: 700; }
  tr:last-child td { border-bottom: 0; }
  .visually-hidden { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
  .source-list, .feature-list { display: flex; flex-wrap: wrap; gap: 7px; }
  .source-list { justify-content: center; }
  .source-list span, .feature-list span { padding: 7px 9px; border: 1px solid var(--border-color); border-radius: 8px; font-size: 11px; color: var(--font-light-color); }
  .flow-arrow { text-align: center; color: var(--primary-color); font-size: 27px; line-height: 1.8; }
  .landing-zone { display: flex; align-items: center; flex-direction: column; gap: 9px; padding: 18px 12px; border: 1px solid rgba(var(--primary-color-rgb), .35); background: rgba(var(--primary-color-rgb), .08); border-radius: 13px; font-size: 13px; }
  .landing-zone code { color: var(--font-light-color); font-size: 12px; }
  .sample-note { margin-top: 12px; font-size: 11px; line-height: 1.6; color: var(--font-light-color); }
  .comparison-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; }
  .record-card { min-width: 0; padding: 12px; border: 1px solid var(--border-color); border-radius: 11px; background: var(--background-dark-grey); }
  .record-card dt { color: var(--font-light-color); font-size: 10px; overflow-wrap: anywhere; }
  .record-card dd { margin: 3px 0 10px; font-size: 12px; }
  .record-card dl > div:last-child dd { margin-bottom: 0; }
  .transform-steps { display: grid; gap: 6px; margin-top: 12px; font-size: 11px; color: var(--font-light-color); }
  .transform-steps li::before { content: "→ "; color: var(--primary-color); }
  .dataset-heading { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; justify-content: space-between; font-size: 12px; }
  .dataset-meta { display: flex; flex-wrap: wrap; gap: 5px 16px; margin: 10px 0 20px; font-size: 11px; color: var(--font-light-color); }
  .quality-checks { display: grid; gap: 11px; font-size: 12px; }
  .quality-checks li { display: flex; align-items: baseline; gap: 8px; }
  .quality-checks span { color: #83e1b1; }
  .light-theme & .quality-checks span { color: #186342; }
  .dashboard-heading { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; font-size: 13px; }
  .dashboard-heading > span { font-size: 10px; color: var(--font-light-color); }
  .metric-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin: 14px 0 20px; }
  .metric-grid > div { padding: 12px; border: 1px solid var(--border-color); border-radius: 11px; background: rgba(var(--primary-color-rgb), .07); }
  .metric-grid dt { color: var(--font-light-color); font-size: 11px; }
  .metric-grid dd { margin: 4px 0 0; font-size: clamp(19px, 4vw, 26px); font-weight: 700; letter-spacing: -.04em; }
  .chart-columns { display: flex; gap: 9px; }
  .chart-column { flex: 1; min-width: 0; display: grid; gap: 8px; text-align: center; color: var(--font-light-color); font-size: 9px; }
  .bar-track { height: 90px; display: flex; align-items: flex-end; border-bottom: 1px solid var(--border-color); }
  .chart-bar { display: block; width: 100%; border-radius: 5px 5px 0 0; background: var(--gradient-primary); }
  .dashboard-insight { margin-top: 14px; padding: 10px 12px; border-left: 2px solid var(--primary-color); background: rgba(var(--primary-color-rgb), .06); border-radius: 0 8px 8px 0; font-size: 11px; line-height: 1.6; color: var(--font-light-color); }
  .chat-message { padding: 10px 12px; border: 1px solid var(--border-color); border-radius: 11px; }
  .chat-message p { font-size: 12px; line-height: 1.6; margin-top: 4px; }
  .user-message { margin: 10px 0 8px 18px; background: rgba(var(--primary-color-rgb), .08); }
  .assistant-message { margin-right: 18px; background: var(--background-dark-grey); }
  .prediction-example { margin-top: 18px; padding-top: 12px; border-top: 1px solid var(--border-color); }
  .learning-path { color: var(--font-light-color); font-size: 11px; margin: 8px 0 10px; }
  .prediction-result { margin-top: 12px; padding: 12px; border-radius: 11px; border: 1px solid rgba(var(--primary-color-rgb), .35); color: var(--primary-color); background: rgba(var(--primary-color-rgb), .09); font-size: 14px; font-weight: 700; }
`;
