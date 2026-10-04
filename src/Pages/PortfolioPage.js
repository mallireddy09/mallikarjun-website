import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import SkillsPage from "./Skills";
import ExperiencePage from "./ExperiencePage";
import EducationPage from "./EducationPage";
import ProjectsPage from "./ProjectsPage";
import BlogsPage from "./BlogsPage";
import CertificationPage from "./CertificationPage";
import ContactPage from "./ContactPage";
import { SECTIONS } from "../data/sections";

function pathToSectionId(pathname) {
  if (!pathname || pathname === "/") return "home";
  return pathname.replace(/^\//, "").split("/")[0] || "home";
}

function PortfolioPage({ theme }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fromHash = location.hash?.replace("#", "");
    const fromPath = pathToSectionId(location.pathname);

    // Deep link from old routes like /about
    if (location.pathname !== "/" && !fromHash) {
      const el = document.getElementById(fromPath);
      if (!el) return undefined;
      const timer = window.setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        navigate(`/#${fromPath}`, { replace: true });
      }, 50);
      return () => window.clearTimeout(timer);
    }

    // Hash link like /#skills
    if (fromHash && fromHash !== "home") {
      const el = document.getElementById(fromHash);
      if (!el) return undefined;
      const timer = window.setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [location.pathname, location.hash, navigate]);

  return (
    <PortfolioStyled>
      {SECTIONS.map(({ id }) => (
        <section key={id} id={id} className="portfolio-section">
          {id === "home" && <HomePage theme={theme} />}
          {id === "about" && <AboutPage />}
          {id === "skills" && <SkillsPage theme={theme} />}
          {id === "experience" && <ExperiencePage />}
          {id === "education" && <EducationPage />}
          {id === "projects" && <ProjectsPage />}
          {id === "blogs" && <BlogsPage />}
          {id === "certification" && <CertificationPage />}
          {id === "contact" && <ContactPage />}
        </section>
      ))}
    </PortfolioStyled>
  );
}

const PortfolioStyled = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: clip;

  .portfolio-section {
    scroll-margin-top: 0;
    position: relative;
    width: 100%;
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .portfolio-section > * {
    flex: 1 0 auto;
    width: 100%;
  }

  #home.portfolio-section {
    scroll-margin-top: 0;
  }

  @media screen and (max-width: 1200px), screen and (pointer: coarse) {
    .portfolio-section {
      min-height: 0;
    }

    .portfolio-section > * {
      flex: 0 0 auto;
    }
  }
`;

export default PortfolioPage;
