import { publicAsset } from "../helper/publicAsset";
import type { ThemeProps } from "../types/portfolio";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactTyped as Typed } from "react-typed";
import PrimaryButton from "../Components/PrimaryButton";
import { PROFILE, HERO_ROLES, HERO_SUMMARY, PAST_IMPACT } from "../data/profile";
import IconLinks from "../Components/IconLinks";
import { gradientText } from "../styles/shared";
import CompanyLogo from "../Components/CompanyLogo";
import LiveDataPipeline from "../Components/LiveDataPipeline";
import { DRAWER_MEDIA } from "../styles/media";

const SOCIAL_LINKS = [
  { key: "github", href: PROFILE.github, label: "GitHub", image: publicAsset("/images/3d/github-clear-3d.webp"), className: "icon i-github" },
  { key: "linkedin", href: PROFILE.linkedin, label: "LinkedIn", image: publicAsset("/images/3d/linkedin-brand-3d.webp"), className: "icon i-linkedin" },
  { key: "twitter", href: PROFILE.twitter, label: "X (Twitter)", image: publicAsset("/images/3d/x-brand-3d.webp"), className: "icon" },
];

function HomePage(_props: ThemeProps) {
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  const [hasScrolled, setHasScrolled] = useState(() => window.scrollY > 24);
  useEffect(() => {
    const updateScroll = () => setHasScrolled(window.scrollY > 24);
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);
  return (
    <HomePageStyled>

      <div className="hero-content">
        <div className="typography">
          <div className="hero-main">
          <div className="hero-intro">

          <h1>
            <span className="greeting">Hi, I'm</span>
            {" "}
            <span className="myname gradient-text">{PROFILE.name}</span>
          </h1>
          <h5 aria-label="Data Engineer, AI/ML Engineer, and Cloud Platform Engineer">
            <span aria-hidden="true">
              {reducedMotion ? <span className="typing">{HERO_ROLES[0]}</span> : <Typed
                strings={HERO_ROLES}
                typeSpeed={80}
                backSpeed={40}
                loop
                className="typing"
              />}
            </span>
          </h5>
          <p>{HERO_SUMMARY}</p>
          <div className="social">
            <div className="hero-actions">
              <PrimaryButton title="Resume" showDownloadIcon iconOnly iconSrc={publicAsset("/images/3d/resume-clear-3d.webp")} />
            </div>
            <div className="icons">
              <IconLinks links={SOCIAL_LINKS} />
            </div>
          </div>
          </div>
          <LiveDataPipeline />
          </div>
          <div className="impact-bar" aria-label="Engineering impact at">
            <span className="impact-label">ENGINEERING IMPACT AT:</span>
            <ul>
              {PAST_IMPACT.map((company) => (
                <li key={company.name}>
                  <span className="impact-company">
                    <CompanyLogo src={company.logo} eager />
                    {company.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={`scroll-indicator${hasScrolled ? " is-hidden" : ""}`} aria-hidden="true">
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

  .hero-main { position: relative; display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(0, .9fr); align-items: end; gap: 28px; }
  .hero-intro { min-width: 0; }
  .hero-art { position: absolute; right: 0; top: 0; width: calc((100% - 28px) * .45); max-width: 420px; height: 100%; pointer-events: none; }
  .icons .social-art { display: block; width: 48px; height: 48px; object-fit: contain; }
  @media(max-width: 700px) {
    .hero-main { grid-template-columns: minmax(0, 1fr); gap: 24px; }
    .hero-art { position: relative; right: auto; top: auto; width: min(100%, 360px); height: auto; aspect-ratio: 600 / 630; justify-self: center; }
  }
  .typing {
    font-weight: 300;
    color: var(--primary-color);
  }

  .gradient-text {
    ${gradientText}
  }

  .typography {
    position: relative;
    min-width: 0;
    max-width: 100%;
    margin: 0;
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
      max-width: min(100%, 470px);
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
          width: 58px;
          height: 58px;
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
        border-color: var(--white-color);
        color: var(--white-color);
      }
      .i-linkedin:hover {
        border-color: #0077b5;
        color: #0077b5;
        box-shadow: 0 4px 12px rgba(0, 119, 181, 0.3);
      }
    }
  }

  .hero-content {
    width: min(100%, 1400px);
    margin: 0 auto;
    padding: calc(var(--fixed-chrome) + 1rem) 3rem 2rem;
    position: relative;
    z-index: 1;
  }

  .impact-bar {
    .impact-company {
      display: inline-flex;
      align-items: center;
      gap: .45rem;
      transition: transform .4s cubic-bezier(.16, 1, .3, 1);
    }
    li:hover .impact-company { transform: translateY(-3px); }
    @media(prefers-reduced-motion: reduce) {
      .impact-company { transition: none; }
      li:hover .impact-company { transform: none; }
    }
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
      text-transform: uppercase;
      li {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
      }
      li:not(:last-child)::after {
        content: "·";
        margin-left: 0.75rem;
        color: var(--primary-color);
      }
    }
  }

  @media screen and (max-width: 1000px) {
    .hero-content {
      padding: calc(var(--fixed-chrome) + 1rem) 1.75rem 2.5rem;
    }
  }

  @media screen and (max-width: 480px) {
    .hero-content { padding: calc(var(--fixed-chrome) + 0.75rem) 1rem 2rem; }
  }

  @media(min-width: 701px) {
    .hero-content { padding-left: clamp(20px, 3vw, 48px); padding-right: clamp(20px, 3vw, 48px); }
  }

  .scroll-indicator {
    opacity: 1;
    transition: opacity .2s ease;
    pointer-events: none;
    &.is-hidden { opacity: 0; }
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
