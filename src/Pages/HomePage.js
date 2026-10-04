import React from "react";
import styled from "styled-components";
import GithubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import Particle from "../Components/Particle";
import { ReactTyped as Typed } from "react-typed";
import PrimaryButton from "../Components/PrimaryButton";
import { PROFILE, HERO_ROLES, HERO_SUMMARY } from "../data/profile";
import "./styles.css";
import IconLinks from "../Components/IconLinks";
import { gradientText } from "../styles/shared";
import { DRAWER_MEDIA } from "../styles/media";

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
      <div className="typography">
        <div className="status-badge">
          <span className="pulse" />
          Data Engineer at NVIDIA
        </div>
        <h1>
          Hi, I'm{" "}
          <span className="myname gradient-text">{PROFILE.name}</span>
        </h1>
        <h5>
          A{" "}
          <Typed
            strings={HERO_ROLES}
            typeSpeed={80}
            backSpeed={40}
            loop
            className="typing"
          />
        </h5>
        <p>{HERO_SUMMARY}</p>
        <div className="social">
          <div className="icons">
            <IconLinks links={SOCIAL_LINKS} />
          </div>
          <PrimaryButton title="Resume" showDownloadIcon />
          <PrimaryButton title="Read more" href="#about" />
        </div>
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
    margin: 0 auto;
    width: min(90%, 900px);
    max-width: 900px;
    padding: calc(var(--fixed-chrome) + 0.5rem) 1rem 6rem;
    line-height: 1.5;
    z-index: 1;
    @media screen and (max-width: 768px) {
      width: min(94%, 900px);
    }
    @media screen and (max-width: 480px) {
      width: 100%;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    h1 {
      margin-bottom: 0.5rem;
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
      gap: 0.75rem;
      margin-top: 1.5rem;
      a {
        display: inline-flex;
        align-items: center;
      }
      .icons {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        .icon {
          border: 2px solid var(--border-color);
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

    .typography {
      padding-bottom: 2rem;
    }

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
