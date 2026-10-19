import { publicAsset } from "../helper/publicAsset";
import type { ThemeProps } from "../types/portfolio";
import type { SectionId } from "../data/sections";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import avatar from "../img/arjun_image.jpg";
import { SECTIONS } from "../data/sections";
import { scrollToSection } from "../helper/navigation";

const NAV_POSITIONS: Record<SectionId, string> = {
  home: "0% 0%", about: "50% 0%", experience: "100% 0%",
  projects: "0% 50%", skills: "50% 50%", certifications: "100% 50%",
  education: "0% 100%", blogs: "50% 100%", contact: "100% 100%",
};

function Navigation({ onClose }: ThemeProps & { onClose?: () => void }) {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [clickedTab, setClickedTab] = useState<{ id: SectionId | null; count: number }>({ id: null, count: 0 });

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      const elements = SECTIONS.map(({ id }) => {
        const element = document.getElementById(id);
        return element ? { id, element } : null;
      }).filter((entry): entry is { id: SectionId; element: HTMLElement } => entry !== null);
      if (!elements.length) return;

      // A small top offset keeps short content sections active after navigation.
      const marker = window.scrollY + Math.min(window.innerHeight * 0.2, 120);
      let current = elements[0].id;

      for (const { id, element } of elements) {
        const top = element.getBoundingClientRect().top + window.scrollY;
        if (top <= marker + 1) {
          current = id;
        } else {
          break;
        }
      }

      const docHeight = document.documentElement.scrollHeight;
      const scrolledToBottom =
        window.scrollY + window.innerHeight >= docHeight - 24;
      if (scrolledToBottom) {
        current = elements[elements.length - 1].id;
      }

      setActiveSection((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const handleSectionClick = (id: SectionId) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setClickedTab(current => ({ id, count: current.count + 1 }));
    if (scrollToSection(id, { behavior: "instant" })) {
      setActiveSection(id);
    }
    onClose?.();
  };

  return (
    <NavigationStyled>
      <div className="avatar">
        <a href="#home" onClick={handleSectionClick("home")} aria-label="Mallikarjun Reddy home"><img src={avatar} alt="Mallikarjun Reddy" /></a>
      </div>
      <ul className="nav-items">
        {SECTIONS.map((item) => {
          return (
            <li className="nav-item" key={item.id}>
              <a
                href={`#${item.id}`}
                className={`${activeSection === item.id ? "active-class" : ""} ${clickedTab.id === item.id ? "is-clicked" : ""}`.trim()}
                aria-current={activeSection === item.id ? "location" : undefined}
                onClick={handleSectionClick(item.id)}
              >
                <span key={clickedTab.id === item.id ? clickedTab.count : 0} aria-hidden="true" className="nav-sheen" />
                <span aria-hidden="true" className={`nav-icon${item.id === "blogs" ? " blogs-icon" : ""}`} style={item.id === "blogs" ? undefined : { backgroundPosition: NAV_POSITIONS[item.id] }} />
                <span className="nav-label">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
      <footer className="footer">
        <p>
          <b>&copy; {new Date().getFullYear()} Mallikarjun Reddy</b>
        </p>
      </footer>
    </NavigationStyled>
  );
}

const NavigationStyled = styled.nav`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;

  .avatar {
    width: 100%;
    border-bottom: 1px solid var(--border-color);
    text-align: center;
    padding: 1.8rem 0;
    img {
      width: clamp(96px, 22vw, 130px);
      height: clamp(96px, 22vw, 130px);
      border-radius: 50%;
      border: 3px solid var(--primary-color);
      box-shadow: 0 0 20px rgba(var(--primary-color-rgb), 0.2);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      object-fit: cover;
      &:hover {
        transform: scale(1.08);
        box-shadow: 0 0 30px rgba(var(--primary-color-rgb), 0.35);
      }
    }
  }

  .nav-icon {
    background-image: url("${publicAsset("/images/3d/navigation-v3-3d.webp")}");
    background-size: 300% 300%;
    display: inline-block;
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    margin-right: 10px;
    vertical-align: middle;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  .nav-icon.blogs-icon {
    background-image: url("${publicAsset("/images/3d/blogs-standalone-3d.webp")}");
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }

  .nav-items {
    width: 100%;
    padding: 14px 12px;
    flex: 1;
    display: grid;
    align-content: start;
    gap: 6px;
  }
  .nav-items li { display: block; min-width: 0; }
  .nav-items a {
    display: flex;
    align-items: center;
    min-height: 56px;
    padding: 8px 12px;
    position: relative;
    isolation: isolate;
    overflow: hidden;
    border: 1px solid transparent;
    border-radius: 16px;
    color: var(--font-light-color);
    font-size: 15px;
    font-weight: 600;
    letter-spacing: .01em;
    transition: background-color .2s, border-color .2s, box-shadow .2s, color .2s, transform .2s;
    -webkit-tap-highlight-color: transparent;
  }
  .nav-label { color: inherit; }
  .nav-items a:hover { background-color: rgba(var(--primary-color-rgb), .07); color: var(--white-color); }
  .nav-items a:active { transform: scale(.98); }
  .nav-items a.active-class {
    color: var(--primary-color);
    background: linear-gradient(125deg, rgba(var(--primary-color-rgb), .32), rgba(var(--primary-color-rgb), .09));
    border-color: rgba(var(--primary-color-rgb), .45);
    box-shadow: inset 0 1px 0 rgba(218, 242, 255, .35), inset 0 -1px 0 rgba(var(--primary-color-rgb), .12), 0 5px 16px rgba(var(--primary-color-rgb), .14);
    backdrop-filter: blur(12px);
  }
  .nav-sheen { position: absolute; inset: -50% auto -50% 0; width: 35%; pointer-events: none; z-index: -1; opacity: 0; background: linear-gradient(90deg, transparent, rgba(219, 244, 255, .4), transparent); transform: translateX(-160%) skewX(-20deg); }
  .nav-items a.is-clicked .nav-sheen { animation: nav-liquid-sweep .7s ease-out 1; }
  @keyframes nav-liquid-sweep {
    0% { transform: translateX(-160%) skewX(-20deg); opacity: 0; }
    25% { opacity: 1; }
    100% { transform: translateX(420%) skewX(-20deg); opacity: 0; }
  }
  .light-theme & .nav-items a.active-class { background: linear-gradient(125deg, rgba(235, 249, 255, .94), rgba(136, 191, 252, .38)); border-color: rgba(var(--primary-color-rgb), .3); box-shadow: inset 0 1px 0 #fff, 0 5px 16px rgba(var(--primary-color-rgb), .12); }
  @media(prefers-reduced-motion: reduce) {
    .nav-items a, .nav-icon { transition: none; }
    .nav-items a.is-clicked .nav-sheen { animation: none; }
  }

  footer {
    border-top: 1px solid var(--border-color);
    width: 100%;
    p {
      padding: 1rem 0;
      font-size: 0.85rem;
      display: block;
      text-align: center;
      opacity: 0.7;
    }
  }
`;

export default Navigation;
