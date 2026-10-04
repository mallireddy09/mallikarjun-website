import React from "react";
import styled from "styled-components";
import { PROFILE, ABOUT_PARAGRAPHS, ABOUT_HIGHLIGHTS } from "../data/profile";
import { glassCard, gradientText } from "../styles/shared";

function ImageSection() {
  return (
    <ImageSectionStyled>
      <div className="about-narrative">
        <h3>I am <span>{PROFILE.name}</span></h3>
        <h4>Data Engineer | AI Engineer</h4>
        {ABOUT_PARAGRAPHS.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <aside className="highlights-card" aria-labelledby="highlights-title">
        <h3 id="highlights-title">Key Highlights</h3>
        <dl>
          {ABOUT_HIGHLIGHTS.map(({ label, value, detail }) => (
            <div className="highlight" key={label}>
              <dt>{label}</dt>
              <dd>
                <span className="highlight-pill">{value}</span>
                {detail && <span className="highlight-detail">{detail}</span>}
              </dd>
            </div>
          ))}
        </dl>
      </aside>
    </ImageSectionStyled>
  );
}

const ImageSectionStyled = styled.div`
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
  align-items: start;
  gap: 2rem;

  .about-narrative {
    min-width: 0;
    h3 {
      font-size: clamp(1.4rem, 3vw, 2rem);
      color: var(--white-color);
      span { ${gradientText} }
    }
    h4 {
      margin-top: 0.4rem;
      font-size: 1rem;
      color: var(--primary-color);
    }
    p {
      margin-top: 1rem;
      text-align: left;
      line-height: 1.8;
      color: var(--font-light-color);
      font-size: 0.95rem;
    }
  }

  .highlights-card {
    ${glassCard}
    padding: 1.5rem;
    box-shadow: var(--card-shadow);
    min-width: 0;
    h3 {
      font-size: 1.15rem;
      color: var(--white-color);
      margin-bottom: 1.25rem;
    }
    dl { display: grid; gap: 1.25rem; }
    dt {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 0.4rem;
      color: var(--font-light-color);
    }
    .highlight-pill {
      display: inline-block;
      border: 1px solid var(--border-color);
      border-radius: 50px;
      padding: 0.4rem 0.85rem;
      background: var(--background-light-color-2);
      color: var(--white-color);
      font-size: 0.85rem;
      font-weight: 600;
      max-width: 100%;
    }
    .highlight-detail {
      display: block;
      margin-top: 0.35rem;
      font-size: 0.85rem;
      color: var(--font-light-color);
    }
  }

  @media screen and (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
    .highlights-card dl { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  @media screen and (max-width: 480px) {
    .highlights-card {
      padding: 1.25rem;
      dl { grid-template-columns: minmax(0, 1fr); }
    }
  }
`;

export default ImageSection;
