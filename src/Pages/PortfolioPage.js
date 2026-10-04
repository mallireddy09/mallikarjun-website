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
import { scrollToSection } from "../helper/navigation";

const SECTION_COMPONENTS = {
  home: HomePage,
  about: AboutPage,
  skills: SkillsPage,
  experience: ExperiencePage,
  education: EducationPage,
  projects: ProjectsPage,
  blogs: BlogsPage,
  certification: CertificationPage,
  contact: ContactPage,
};

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

    const isLegacyRoute = location.pathname !== "/" && !fromHash;
    const id = isLegacyRoute ? fromPath : fromHash;
    if (!id || (!isLegacyRoute && id === "home")) return undefined;

    const timer = window.setTimeout(() => {
      const found = scrollToSection(id, { updateHash: false });
      if (found && isLegacyRoute) navigate(`/#${id}`, { replace: true });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash, navigate]);

  return (
    <PortfolioStyled>
      {SECTIONS.map(({ id }) => {
        const Component = SECTION_COMPONENTS[id];
        return (
          <section key={id} id={id} className="portfolio-section">
            <Component theme={theme} />
          </section>
        );
      })}
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
    min-height: 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .portfolio-section > * {
    flex: 0 0 auto;
    width: 100%;
  }

  #home.portfolio-section {
    scroll-margin-top: 0;
  }
`;

export default PortfolioPage;
