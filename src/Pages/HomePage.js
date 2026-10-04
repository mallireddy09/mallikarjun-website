import React from "react";
import styled from "styled-components";
import GithubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import Particle from "../Components/Particle";
import { ReactTyped as Typed } from "react-typed";
import PrimaryButton from "../Components/PrimaryButton";
import { PROFILE, HERO_ROLES, HERO_SUMMARY, PAST_IMPACT } from "../data/profile";
import "./styles.css";
import IconLinks from "../Components/IconLinks";
import { gradientText } from "../styles/shared";
import { DRAWER_MEDIA } from "../styles/media";
import BrandMark from "../Components/BrandMark";

const SOCIAL_LINKS = [
  { key: "github", href: PROFILE.github, label: "GitHub", Icon: GithubIcon, className: "icon i-github" },
  { key: "linkedin", href: PROFILE.linkedin, label: "LinkedIn", Icon: LinkedInIcon, className: "icon i-linkedin" },
  { key: "twitter", href: PROFILE.twitter, label: "X (Twitter)", Icon: XIcon, className: "icon" },
];

function HomePage({ theme }) {
  return (
    <HomePageStyled>
      <div className="particle-con">
        <Particle theme={theme} />
      </div>

      <div className="hero-glow" />
      <div className="underlayText">{PROFILE.name}</div>
      <div className="hero-grid">
        <div className="typography">
          <div className="status-badge">
            <span className="pulse" />
            Data Engineer at NVIDIA
          </div>
          <h1>
            <span className="greeting">Hi, I'm</span>
            <span className="myname gradient-text">{PROFILE.name}</span>
          </h1>
          <h5 aria-label="Data Engineer, AI/ML Engineer, and Cloud Platform Engineer">
            <span aria-hidden="true">
              <Typed
                strings={HERO_ROLES}
                typeSpeed={80}
                backSpeed={40}
                loop
                className="typing"
              />
            </span>
          </h5>
          <p>{HERO_SUMMARY}</p>
          <div className="impact-bar" aria-label="Past impact at">
            <span className="impact-label">PAST IMPACT AT:</span>
            <ul>
              {PAST_IMPACT.map((company) => <li key={company}>{company}</li>)}
            </ul>
          </div>
          <div className="social">
            <div className="hero-actions">
              <PrimaryButton title="View Projects" href="#projects" variant="filled" />
              <PrimaryButton title="Download Resume" showDownloadIcon />
            </div>
            <div className="icons">
              <IconLinks links={SOCIAL_LINKS} />
            </div>
          </div>
        </div>
        <figure className="hero-brand" aria-label="MR²: Data, AI, and Cloud">
          <BrandMark decorative />
          <figcaption>DATA <span>·</span> AI <span>·</span> CLOUD</figcaption>
        </figure>
      </div>
      <div className="scroll-indicator" aria-hidden="true">
        <div className="mouse">
          <div className="wheel" />
        </div>
      </div>
    </HomePageStyled>
  );
}

const HomePageStyled = styled.header`
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  .underlayText {
    top: 0;
  }

  .particle-con {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  .hero-glow {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: min(600px, 120vw);
    height: min(600px, 120vw);
    background: radial-gradient(
      circle,
      rgba(var(--primary-color-rgb), 0.08) 0%,
      transparent 70%
    );
    pointer-events: none;
    z-index: 0;
  }

  .typing {
    font-weight: 300;
    color: var(--primary-color);
  }

  .gradient-text {
    ${gradientText}
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 1rem;
    border-radius: 50px;
    border: 1px solid var(--border-color);
    background: var(--glass-bg);
    backdrop-filter: blur(8px);
    font-size: clamp(0.75rem, 2vw, 0.85rem);
    color: var(--primary-color);
    font-weight: 600;
    margin-bottom: 1.5rem;
    max-width: 100%;
    white-space: nowrap;
    .pulse {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #00d26a;
      display: inline-block;
      animation: pulse 2s ease-in-out infinite;
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.5); }
  }

  .typography {
    position: relative;
    min-width: 0;
    line-height: 1.5;
    z-index: 1;
    h1 {
      font-size: clamp(2.1rem, 3.7vw, 3.6rem);
      margin-bottom: 1rem;
      .greeting {
        display: block;
        font-size: 0.55em;
        font-weight: 500;
        color: var(--white-color);
        margin-bottom: 0.4rem;
      }
    }
    h5 {
      margin-bottom: 1rem;
    }
    p {
      max-width: 650px;
      color: var(--font-light-color);
      @media screen and (max-width: 502px) {
        font-size: 0.95rem;
      }
    }
    .social {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;
      margin-top: 1.5rem;
      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }
      a {
        display: inline-flex;
        align-items: center;
      }
      .icons {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        .icon {
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          &:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(var(--primary-color-rgb), 0.3);
          }
          svg {
            margin: 0;
            font-size: 1.25rem;
          }
        }
      }
      @media screen and (max-width: 480px) {
        gap: 0.65rem;
      }
      .i-github:hover {
        border-color: #5f4687;
        color: #5f4687;
        box-shadow: 0 4px 12px rgba(95, 70, 135, 0.3);
      }
      .i-linkedin:hover {
        border-color: #0077b5;
        color: #0077b5;
        box-shadow: 0 4px 12px rgba(0, 119, 181, 0.3);
      }
    }
  }

  .hero-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.7fr) minmax(0, 1fr);
    align-items: center;
    gap: clamp(1.5rem, 3vw, 3rem);
    width: min(100%, 1320px);
    margin: 0 auto;
    padding: calc(var(--fixed-chrome) + 1.5rem) 3rem 6rem;
    position: relative;
    z-index: 1;
  }

  .impact-bar {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
    .impact-label {
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      color: var(--font-light-color);
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 0.45rem 0.75rem;
      margin-top: 0.4rem;
      color: var(--white-color);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      li:not(:last-child)::after {
        content: "·";
        margin-left: 0.75rem;
        color: var(--primary-color);
      }
    }
  }

  .hero-brand {
    min-width: 0;
    width: 100%;
    border-radius: 24px;
    background: #0f172a;
    border: 1px solid rgba(0, 220, 236, 0.25);
    box-shadow: 0 20px 70px rgba(var(--primary-color-rgb), 0.12);
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
    figcaption {
      text-align: center;
      padding: 0 1rem 1.75rem;
      color: #f5f7fa;
      font-size: 0.7rem;
      letter-spacing: 0.2em;
      span { color: #00dcec; margin: 0 0.3rem; }
    }
  }

  @media screen and (max-width: 1000px) {
    .hero-grid {
      grid-template-columns: minmax(0, 1fr);
      padding: calc(var(--fixed-chrome) + 1rem) 1.75rem 2.5rem;
      gap: 2rem;
    }
    .hero-brand {
      max-width: 320px;
      justify-self: center;
    }
  }

  @media screen and (max-width: 480px) {
    .hero-grid { padding: calc(var(--fixed-chrome) + 0.75rem) 1rem 2rem; }
    .hero-brand { max-width: 260px; }
  }

  .scroll-indicator {
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: bounce 2s ease-in-out infinite;
    .mouse {
      width: 26px;
      height: 40px;
      border: 2px solid var(--border-color);
      border-radius: 13px;
      position: relative;
      .wheel {
        width: 4px;
        height: 8px;
        background: var(--primary-color);
        border-radius: 2px;
        position: absolute;
        top: 6px;
        left: 50%;
        transform: translateX(-50%);
        animation: scroll-wheel 2s ease-in-out infinite;
      }
    }
    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  @media ${DRAWER_MEDIA} {
    height: auto;
    min-height: 0;

    .scroll-indicator {
      display: none;
    }
  }

  @keyframes bounce {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-50%) translateY(8px); }
  }

  @keyframes scroll-wheel {
    0% { opacity: 1; top: 6px; }
    100% { opacity: 0; top: 20px; }
  }
`;

export default HomePage;
