import React from "react";
import styled from "styled-components";
import GithubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Particle from "../Components/Particle";
import { ReactTyped as Typed } from "react-typed";
import PrimaryButton from "../Components/PrimaryButton";
import { NavLink } from "react-router-dom";
import "./styles.css";

function HomePage(props) {
  const { theme } = props;
  return (
    <HomePageStyled>
      <div className="particle-con">
        <Particle theme={theme} />
      </div>

      <div className="hero-glow" />
      <div className="underlayText">Mallikarjun Reddy</div>
      <div className="typography">
        <div className="status-badge">
          <span className="pulse" />
          Open to opportunities
        </div>
        <h1>
          Hi, I'm{" "}
          <span className="myname gradient-text">
            Mallikarjun Reddy
          </span>
        </h1>
        <h5>
          A{" "}
          <Typed
            strings={[
              "Senior Data Engineer",
              "AI/ML Engineer",
              "Data Scientist",
              "Data Engineer",
              "Software Engineer",
            ]}
            typeSpeed={80}
            backSpeed={40}
            loop
            className="typing"
          />
        </h5>
        <p>
          Specializing in Data Engineering, AI/ML, and Data Science with 6+
          years of experience, I'm dedicated to driving innovation and
          building scalable data solutions. Let's collaborate to transform
          data into actionable strategies and elevate your projects to new
          heights!
        </p>
        <div className="social">
          <div className="icons">
            <a href="https://github.com/mallireddy09" className="icon i-github" target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/mallireddy09/"
              className="icon i-linkedin"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </div>
          <PrimaryButton icon={true} title={"Resume"} />
          <NavLink to="/about">
            <PrimaryButton icon={false} title={"Read more"} />
          </NavLink>
        </div>

        <div className="scroll-indicator">
          <div className="mouse">
            <div className="wheel" />
          </div>
        </div>
      </div>
    </HomePageStyled>
  );
}

const HomePageStyled = styled.header`
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;

  .hero-glow {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 600px;
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
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
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
    font-size: 0.85rem;
    color: var(--primary-color);
    font-weight: 600;
    margin-bottom: 1.5rem;
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
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-width: 900px;
    padding: 0 10px;
    line-height: 1.5;
    z-index: 1;
    @media screen and (max-width: 768px) {
      width: 90%;
    }
    @media screen and (max-width: 502px) {
      width: 95%;
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
      gap: 0.5rem;
      margin-top: 1.5rem;
      a {
        display: inline-flex;
        align-items: center;
      }
      .icons {
        display: flex;
        align-items: center;
        .icon {
          border: 2px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          &:hover {
            border-color: var(--primary-color);
            color: var(--primary-color);
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(var(--primary-color-rgb), 0.3);
          }
          &:not(:last-child) {
            margin-right: 0.5rem;
          }
          svg {
            margin: 0.5rem;
          }
        }
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
