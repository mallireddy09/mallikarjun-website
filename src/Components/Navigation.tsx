import type { SectionId } from "../data/sections";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { SECTIONS } from "../data/sections";
import { scrollToSection } from "../helper/navigation";
import NavigationIcon from "./NavigationIcon";
import ProfilePortrait from "./ProfilePortrait";

function Navigation({ onClose, isOpen = true }: { onClose?: () => void; isOpen?: boolean }) {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [clickedTab, setClickedTab] = useState<{ id: SectionId | null; count: number }>({ id: null, count: 0 });

  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    if (!isOpen) clearTimeout(closeTimer.current);
    return () => clearTimeout(closeTimer.current);
  }, [isOpen, onClose]);
  useEffect(() => {
    if (!clickedTab.id) return;
    const timer = setTimeout(() => setClickedTab(current => ({ ...current, id: null })), 950);
    return () => clearTimeout(timer);
  }, [clickedTab]);

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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setClickedTab(current => ({ id: reducedMotion ? null : id, count: current.count + 1 }));
    if (scrollToSection(id, { behavior: "instant" })) {
      setActiveSection(id);
    }
    clearTimeout(closeTimer.current);
    if (onClose) {
      // Let touch users see the icon react before dismissing the drawer.
      if (reducedMotion) onClose();
      else closeTimer.current = setTimeout(onClose, 780);
    }
  };

  return (
    <NavigationStyled>
      <div className="avatar">
        <ProfilePortrait onClick={handleSectionClick("home")} visible={isOpen} />
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
                <span key={`sheen-${clickedTab.id === item.id ? clickedTab.count : 0}`} aria-hidden="true" className="nav-sheen" />
                <NavigationIcon key={`icon-${clickedTab.id === item.id ? clickedTab.count : 0}`} id={item.id} reacting={clickedTab.id === item.id} />
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
