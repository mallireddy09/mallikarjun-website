import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "./Components/SideBar";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import SkillsPage from "./Pages/Skills";
import ExperiencePage from "./Pages/ExperiencePage";
import EducationPage from "./Pages/EducationPage";
import ProjectsPage from "./Pages/ProjectsPage";
import BlogsPage from "./Pages/BlogsPage";
import CertificationPage from "./Pages/CertificationPage";
import ContactPage from "./Pages/ContactPage";

function App() {
  const [theme, setTheme] = useState("dark-theme");
  const [navToggle, setNavToggle] = useState(false);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const themeToggler = () => {
    setTheme((prev) =>
      prev === "light-theme" ? "dark-theme" : "light-theme"
    );
  };

  const closeNav = () => setNavToggle(false);

  return (
    <div className="App">
      <Sidebar navToggle={navToggle} theme={theme} onClose={closeNav} />

      {navToggle && <div className="nav-overlay" onClick={closeNav} />}

      <button
        className="theme-toggle-btn"
        onClick={themeToggler}
        aria-label="Toggle theme"
      >
        {theme === "dark-theme" ? <LightModeIcon /> : <DarkModeIcon />}
      </button>

      <div className="ham-burger-menu">
        <IconButton onClick={() => setNavToggle(!navToggle)}>
          {navToggle ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </div>

      <MainContentStyled>
        <div className="lines">
          <div className="line-1"></div>
          <div className="line-2"></div>
          <div className="line-3"></div>
          <div className="line-4"></div>
        </div>

        <Routes>
          <Route path="/" element={<HomePage theme={theme} />} />
          <Route path="/about" element={<AboutPage theme={theme} />} />
          <Route path="/skills" element={<SkillsPage theme={theme} />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/certification" element={<CertificationPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </MainContentStyled>
    </div>
  );
}

const MainContentStyled = styled.main`
  position: relative;
  margin-left: 16.3rem;
  min-height: 100vh;
  transition: margin-left 0.4s ease;
  @media screen and (max-width: 1200px) {
    margin-left: 0;
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
