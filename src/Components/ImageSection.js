import React from "react";
import styled from "styled-components";
import { PROFILE, ABOUT_SUMMARY } from "../data/profile";
import { glassSurface, gradientText } from "../styles/shared";

function ImageSection() {
  return (
    <ImageSectionStyled>
      <div className="right-content">
        <h4>
          I am <span>{PROFILE.name}</span>
        </h4>
        <h2>Data Engineer | AI Engineer</h2>
        <p className="paragraph">{ABOUT_SUMMARY}</p>
        <div className="about-info">
          <div className="info-card">
            <span className="info-label">Location</span>
            <span className="info-value">{PROFILE.location}</span>
          </div>
        </div>
      </div>
    </ImageSectionStyled>
  );
}

const ImageSectionStyled = styled.div`
  margin-top: 1.5rem;
  display: flex;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }

  .right-content {
    width: 100%;

    h4 {
      font-size: clamp(1.4rem, 3vw, 2rem);
      color: var(--white-color);

      span {
        font-size: inherit;
        ${gradientText}
      }
    }

    h2 {
      margin-top: 0.3rem;
      font-size: clamp(1.15rem, 2.5vw, 1.5rem);
    }

    .paragraph {
      padding: 1rem 0;
      text-align: left;
      line-height: 1.8;
      color: var(--font-light-color);
      font-size: 0.95rem;
    }

    .about-info {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
      padding-bottom: 1.4rem;
      max-width: 20rem;

      .info-card {
        ${glassSurface}
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
      }
    }
  }
`;

export default ImageSection;
