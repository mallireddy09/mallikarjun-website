import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "./Components/SideBar";
import PortfolioPage from "./Pages/PortfolioPage";

function App() {
  const [theme, setTheme] = useState("dark-theme");
  const [navToggle, setNavToggle] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", navToggle);
    return () => document.body.classList.remove("nav-open");
  }, [navToggle]);

  useEffect(() => {
    if (!navToggle) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setNavToggle(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navToggle]);

  const themeToggler = () => {
    setTheme((prev) =>
      prev === "light-theme" ? "dark-theme" : "light-theme"
    );
  };

  const closeNav = () => setNavToggle(false);

  return (
    <div className="App">
      <Sidebar navToggle={navToggle} theme={theme} onClose={closeNav} />

      {navToggle && (
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
          onClick={() => setNavToggle((open) => !open)}
          aria-label={navToggle ? "Close menu" : "Open menu"}
          aria-expanded={navToggle}
          aria-controls="site-sidebar"
        >
          {navToggle ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </div>

      <MainContentStyled>
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

const MainContentStyled = styled.main`
  position: relative;
  margin-left: var(--sidebar-width);
  min-height: 100vh;
  min-height: 100dvh;
  width: calc(100% - var(--sidebar-width));
  max-width: 100%;
  overflow-x: clip;
  transition: margin-left 0.4s ease, width 0.4s ease;

  @media screen and (max-width: 1200px) {
    margin-left: 0;
    width: 100%;
  }

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
