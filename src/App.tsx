import type { Theme } from "./types/portfolio";
import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "./Components/SideBar";
import PortfolioPage from "./Pages/PortfolioPage";
import { DESKTOP_QUERY } from "./styles/media";

function App() {
  const [theme, setTheme] = useState<Theme>("dark-theme");
  const [isDesktop, setIsDesktop] = useState(() => window.matchMedia(DESKTOP_QUERY).matches);
  const [navToggle, setNavToggle] = useState(isDesktop);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const isOverlayOpen = navToggle && !isDesktop;
  const closeNav = useCallback(() => {
    setNavToggle(false);
    menuButtonRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_QUERY);
    const onChange = ({ matches }: MediaQueryListEvent) => {
      setIsDesktop(matches);
      setNavToggle(matches);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", isOverlayOpen);
    return () => document.body.classList.remove("nav-open");
  }, [isOverlayOpen]);

  useEffect(() => {
    if (!navToggle) return undefined;
    const menuItems = [
      ...document.querySelectorAll<HTMLAnchorElement>("#site-sidebar a[href]"),
      menuButtonRef.current,
    ].filter((item): item is HTMLAnchorElement | HTMLButtonElement => item !== null);
    if (isOverlayOpen) menuItems[0]?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeNav();
      }
      if (event.key === "Tab" && isOverlayOpen) {
        const index = menuItems.findIndex((item) => item === document.activeElement);
        const next = index < 0
          ? (event.shiftKey ? menuItems.length - 1 : 0)
          : (index + (event.shiftKey ? -1 : 1) + menuItems.length) % menuItems.length;
        event.preventDefault();
        menuItems[next]?.focus({ preventScroll: true });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navToggle, isOverlayOpen, closeNav]);

  const themeToggler = () => {
    setTheme((prev) =>
      prev === "light-theme" ? "dark-theme" : "light-theme"
    );
  };

  return (
    <div className="App">
      <Sidebar navToggle={navToggle} theme={theme} onClose={isDesktop ? undefined : closeNav} />

      {isOverlayOpen && (
        <div
          className="nav-overlay"
          onClick={closeNav}
          onKeyDown={(e) => e.key === "Enter" && closeNav()}
          role="button"
          tabIndex={0}
          aria-label="Close navigation"
        />
      )}

      <button
        className="theme-toggle-btn"
        onClick={themeToggler}
        aria-label="Toggle theme"
      >
        {theme === "dark-theme" ? <LightModeIcon /> : <DarkModeIcon />}
      </button>

      <div className="ham-burger-menu">
        <IconButton
          ref={menuButtonRef}
          onClick={() => navToggle ? closeNav() : setNavToggle(true)}
          aria-label={navToggle ? "Close menu" : "Open menu"}
          aria-expanded={navToggle}
          aria-controls="site-sidebar"
        >
          {navToggle ? <CloseIcon className="mobile-menu-icon" /> : <MenuIcon className="mobile-menu-icon" />}
          <MoreVertIcon className="desktop-menu-icon" />
        </IconButton>
      </div>

      <MainContentStyled $sidebarOpen={isDesktop && navToggle}>
        <div className="lines" aria-hidden="true">
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="line-3"></div>
          <div className="line-4"></div>
        </div>

        <Routes>
          <Route path="/*" element={<PortfolioPage theme={theme} />} />
        </Routes>
      </MainContentStyled>
    </div>
  );
}

const MainContentStyled = styled.main<{ $sidebarOpen: boolean }>`
  position: relative;
  margin-left: ${({ $sidebarOpen }) => $sidebarOpen ? "var(--sidebar-width)" : "0"};
  min-height: 100vh;
  min-height: 100dvh;
  width: ${({ $sidebarOpen }) => $sidebarOpen ? "calc(100% - var(--sidebar-width))" : "100%"};
  max-width: 100%;
  overflow-x: clip;
  transition: margin-left 0.4s ease, width 0.4s ease;

  .lines {
    position: absolute;
    min-height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    opacity: 0.25;
    z-index: -1;
    pointer-events: none;
    .line-1,
    .line-2,
    .line-3,
    .line-4 {
      width: 1px;
      min-height: 100vh;
      min-height: 100dvh;
      background: linear-gradient(
        to bottom,
        transparent 0%,
        var(--border-color) 15%,
        var(--border-color) 85%,
        transparent 100%
      );
    }
  }
`;

export default App;
