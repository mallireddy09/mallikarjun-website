import { useEffect } from "react";
import type { ComponentType } from "react";
import type { ThemeProps } from "../types/portfolio";
import type { SectionId } from "../data/sections";
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
import { SECTIONS, resolveSectionId } from "../data/sections";
import { scrollToSection } from "../helper/navigation";

const SECTION_COMPONENTS: Record<SectionId, ComponentType<ThemeProps>> = {
  home: HomePage,
  about: AboutPage,
  skills: SkillsPage,
  experience: ExperiencePage,
  education: EducationPage,
  projects: ProjectsPage,
  blogs: BlogsPage,
  certifications: CertificationPage,
  contact: ContactPage,
};

function pathToSectionId(pathname: string) {
  if (!pathname || pathname === "/") return "home";
  return pathname.replace(/^\//, "").split("/")[0] || "home";
}

function PortfolioPage({ theme }: ThemeProps) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isLegacyRoute = location.pathname !== "/";
    const rawId = location.hash.slice(1) || (isLegacyRoute ? pathToSectionId(location.pathname) : "");
    const id = resolveSectionId(rawId);
    if (!id) return undefined;

    let cancelled = false;
    const initialHash = window.location.hash;
    // Let layout request its fonts before aligning the anchor to the final text sizes.
    let frame = window.requestAnimationFrame(() => {
      void (document.fonts?.ready ?? Promise.resolve()).then(() => {
        if (cancelled) return;
        frame = window.requestAnimationFrame(() => {
          if (cancelled || window.location.hash !== initialHash) return;
          const found = scrollToSection(id, { updateHash: false });
          if (found && (isLegacyRoute || rawId !== id)) {
            navigate({ pathname: "/", search: location.search, hash: `#${id}` }, { replace: true });
          }
        });
      });
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frame);
    };
  }, [location.pathname, location.hash, location.search, navigate]);

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
    scroll-margin-top: calc(var(--fixed-chrome) + 0.75rem);
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
