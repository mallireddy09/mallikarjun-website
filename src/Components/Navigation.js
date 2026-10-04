import React, { useState, useEffect } from "react";
import styled from "styled-components";
import avatar from "../img/arjun_image.jpg";
import home from "../Components/Assets/home.svg";
import darkHome from "../Components/Assets/darkHome.svg";
import about from "../Components/Assets/about.svg";
import resume from "../Components/Assets/resume.svg";
import project from "../Components/Assets/project.svg";
import blog from "../Components/Assets/blog.svg";
import certification from "../Components/Assets/certification.svg";
import contact from "../Components/Assets/contact.svg";
import darkAbout from "../Components/Assets/darkAbout.svg";
import darkResume from "../Components/Assets/darkResume.svg";
import darkProject from "../Components/Assets/darkProject.svg";
import darkBlog from "../Components/Assets/darkBlog.svg";
import darkCertification from "../Components/Assets/darkCertification.svg";
import darkContact from "../Components/Assets/darkContact.svg";
import skills from "../Components/Assets/skills.svg";
import darkSkills from "../Components/Assets/darkSkills.svg";
import darkEducation from "../Components/Assets/darkEducation.svg";
import education from "../Components/Assets/education.svg";
import { SECTIONS } from "../data/sections";

const NAV_ICONS = {
  home: { icon: home, darkIcon: darkHome },
  about: { icon: about, darkIcon: darkAbout },
  skills: { icon: skills, darkIcon: darkSkills },
  experience: { icon: resume, darkIcon: darkResume },
  education: { icon: education, darkIcon: darkEducation },
  projects: { icon: project, darkIcon: darkProject },
  blogs: { icon: blog, darkIcon: darkBlog },
  certification: { icon: certification, darkIcon: darkCertification },
  contact: { icon: contact, darkIcon: darkContact },
};

function Navigation({ theme, onClose }) {
  const [activeSection, setActiveSection] = useState("home");
  const isLight = theme === "light-theme";

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      const elements = SECTIONS.map(({ id }) =>
        document.getElementById(id)
      ).filter(Boolean);
      if (!elements.length) return;

      // A small top offset keeps short content sections active after navigation.
      const marker = window.scrollY + Math.min(window.innerHeight * 0.2, 120);
      let current = elements[0].id;

      for (const el of elements) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top <= marker + 1) {
          current = el.id;
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

  const scrollToSection = (id) => (event) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      setActiveSection(id);
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${id}`);
    }
    onClose?.();
  };

  return (
    <NavigationStyled>
      <div className="avatar">
        <img
          src={avatar}
          alt="Mallikarjun Reddy"
        />
      </div>
      <ul className="nav-items">
        {SECTIONS.map((item) => {
          const icons = NAV_ICONS[item.id];
          return (
            <li className="nav-item" key={item.id}>
              <a
                href={`#${item.id}`}
                className={activeSection === item.id ? "active-class" : ""}
                aria-current={activeSection === item.id ? "location" : undefined}
                onClick={scrollToSection(item.id)}
              >
                <img
                  src={isLight ? icons.darkIcon : icons.icon}
                  alt={item.label}
                  className="nav-icon"
                />
                {item.label}
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
    width: 20px;
    height: 20px;
    margin-right: 10px;
    vertical-align: middle;
    opacity: 0.8;
    transition: opacity 0.3s ease;
  }

  .nav-items {
    width: 100%;
    padding: 0.5rem 0;
    flex: 1;
    .active-class {
      color: var(--primary-color) !important;
      background-color: var(--background-light-color-2);
      border-right: 3px solid var(--primary-color);
      .nav-icon {
        opacity: 1;
      }
    }
    li {
      display: block;
      a {
        display: flex;
        align-items: center;
        min-height: 44px;
        padding: 0.75rem 1.5rem;
        position: relative;
        z-index: 10;
        text-transform: uppercase;
        transition: all 0.3s ease;
        font-weight: 600;
        font-size: 0.85rem;
        letter-spacing: 1px;
        color: var(--font-light-color);
        -webkit-tap-highlight-color: transparent;
        &:hover {
          cursor: pointer;
          color: var(--primary-color);
          background-color: var(--background-light-color-2);
          padding-left: 2rem;
          .nav-icon {
            opacity: 1;
          }
        }
      }
    }
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
