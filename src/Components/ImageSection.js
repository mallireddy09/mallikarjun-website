import React from "react";
import styled from "styled-components";

function ImageSection() {
  return (
    <ImageSectionStyled>
      <div className="right-content">
        <h4>
          I am <span>Mallikarjun Reddy</span>
        </h4>
        <h2>Data Engineer | AI/ML Engineer | 6+ Years of Experience</h2>
        <p className="paragraph">
          I'm Mallikarjun Reddy, and I've spent over 6 years working as a Data
          Engineer and Data Scientist. Right now, I'm pursuing a Master's in
          Data Science at the University at Buffalo (SUNY). Over the years,
          I've had the chance to work at companies like Y STEM and Chess (Client: Albertsons), University at Buffalo, Nineleaps (Client: Uber), Sparklex solutions (Client: Meijer),
          Samsung R&amp;D Institute India, and Dhyanahitha Organization, where
          I've developed my skills in Data Engineering, AI/ML, and
          software development. I'm always focused on growing my skill set and
          pushing myself professionally. What excites me most is finding
          innovative solutions that can make a real difference for the
          organizations I work with. Outside of work, I'm passionate about
          adventure sports and love keeping up with the latest tech trends.
        </p>

        <div className="about-info">
          <div className="info-card">
            <span className="info-label">Full Name</span>
            <span className="info-value">Mallikarjun Reddy Reddy</span>
          </div>
          {/* <div className="info-card">
            <span className="info-label">Age</span>
            <span className="info-value">25</span>
          </div>
          <div className="info-card">
            <span className="info-label">Nationality</span>
            <span className="info-value">Indian</span>
          </div>
          <div className="info-card">
            <span className="info-label">Languages</span>
            <span className="info-value">English, Telugu, Hindi</span>
          </div> */}
          <div className="info-card">
            <span className="info-label">Location</span>
            <span className="info-value">United States</span>
          </div>
          {/* <div className="info-card full-width">
            <span className="info-label">Profile</span>
            <span className="info-value">
              Aspiring Data Engineer | AI Engineer | Data Scientist | Data Analyst | Software
              Developer
            </span>
          </div> */}
        </div>
      </div>
    </ImageSectionStyled>
  );
}

const ImageSectionStyled = styled.div`
  margin-top: 5rem;
  display: flex;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
  .right-content {
    width: 100%;
    h4 {
      font-size: 2rem;
      color: var(--white-color);
      span {
        font-size: 2rem;
        background: var(--gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }
    h2 {
      margin-top: 0.3rem;
      @media screen and (max-width: 502px) {
        font-size: 1.3rem;
      }
    }
    .paragraph {
      padding: 1rem 0;
      text-align: justify;
      line-height: 1.8;
      color: var(--font-light-color);
    }
    .about-info {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      padding-bottom: 1.4rem;
      @media screen and (max-width: 600px) {
        grid-template-columns: 1fr;
      }
      .info-card {
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        padding: 1rem 1.2rem;
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        &:hover {
          border-color: var(--primary-color);
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(var(--primary-color-rgb), 0.1);
        }
        .info-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--primary-color);
          font-weight: 600;
        }
        .info-value {
          color: var(--white-color);
          font-weight: 500;
        }
        &.full-width {
          grid-column: 1 / -1;
        }
      }
    }
  }
`;
export default ImageSection;
