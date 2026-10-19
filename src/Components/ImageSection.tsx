import styled from "styled-components";
import { ABOUT_PARAGRAPHS, ENGINEERING_PRINCIPLES } from "../data/profile";
import { liquidGlassSurface, liquidGlassSelected } from "../styles/shared";

function ImageSection() {
  return (
    <ImageSectionStyled>
      <div className="about-narrative">
        <h3>Building high-scale data platforms &amp; intelligent systems</h3>
        {ABOUT_PARAGRAPHS.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <aside className="highlights-card" aria-labelledby="highlights-title">
        <h3 id="highlights-title">The Engineer Behind the Pipelines</h3>
        <p className="principles-intro">What I care about beyond making the job run.</p>
        <ol className="principles-list">
          {ENGINEERING_PRINCIPLES.map(({ title, text }, index) => (
            <li key={title}>
              <h4><span className="principle-number">{String(index + 1).padStart(2, "0")} / </span>{title}</h4>
              <p>{text}</p>
            </li>
          ))}
        </ol>
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
      font-size: clamp(1.3rem, 2.2vw, 1.75rem);
      line-height: 1.4;
      color: var(--white-color);
    }
    p {
      margin-top: 1.25rem;
      text-align: left;
      line-height: 1.8;
      color: var(--font-light-color);
      font-size: 0.95rem;
    }
  }

  .highlights-card {
    ${liquidGlassSurface}
    ${liquidGlassSelected}
    position: relative;
    padding: clamp(1.25rem, 2vw, 1.75rem);
    border-radius: 24px;
    min-width: 0;
    h3 {
      font-size: clamp(1.2rem, 1.8vw, 1.5rem);
      line-height: 1.35;
      color: var(--white-color);
      letter-spacing: -.02em;
    }
    .principles-intro {
      margin-top: .6rem;
      color: var(--font-light-color);
      font-size: .85rem;
      line-height: 1.6;
    }
    .principles-list {
      display: grid;
      gap: 0;
      margin: 1.5rem 0 0;
      padding: 0;
      list-style: none;
    }
    li {
      padding: 1.1rem 0;
      border-top: 1px solid rgba(var(--primary-color-rgb), .2);
      min-width: 0;
    }
    li:last-child { padding-bottom: 0; }
    h4 {
      font-size: .72rem;
      font-weight: 700;
      line-height: 1.65;
      letter-spacing: .055em;
      text-transform: uppercase;
      color: var(--white-color);
    }
    .principle-number { color: var(--primary-color); white-space: nowrap; }
    li p {
      margin-top: .5rem;
      color: var(--font-light-color);
      font-size: .88rem;
      line-height: 1.7;
    }
  }

  @media screen and (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;

  }

  @media screen and (max-width: 480px) {
    .highlights-card {
      padding: 1.25rem;

    }
  }
`;

export default ImageSection;
