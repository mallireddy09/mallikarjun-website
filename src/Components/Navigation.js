import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
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

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: home, darkIcon: darkHome, end: true },
  { to: "/about", label: "About", icon: about, darkIcon: darkAbout },
  { to: "/skills", label: "Skills", icon: skills, darkIcon: darkSkills },
  { to: "/experience", label: "Experience", icon: resume, darkIcon: darkResume },
  { to: "/education", label: "Education", icon: education, darkIcon: darkEducation },
  { to: "/projects", label: "Projects", icon: project, darkIcon: darkProject },
  { to: "/blogs", label: "Blogs", icon: blog, darkIcon: darkBlog },
  { to: "/certification", label: "Certification", icon: certification, darkIcon: darkCertification },
  { to: "/contact", label: "Contact", icon: contact, darkIcon: darkContact },
];

function Navigation({ theme, onClose }) {
  const [isHovering, setIsHovering] = useState(false);
  const isLight = theme === "light-theme";

  const handleMouseOver = useCallback(() => setIsHovering(true), []);
  const handleMouseOut = useCallback(() => setIsHovering(false), []);

  return (
    <NavigationStyled>
      <div className="avatar">
        <img
          src={avatar}
          alt="Mallikarjun Reddy"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          className={isHovering ? "hovering" : ""}
        />
      </div>
      <ul className="nav-items">
        {NAV_ITEMS.map((item) => (
          <li className="nav-item" key={item.to}>
            <NavLink
              to={item.to}
              end={item.end || false}
              className={({ isActive }) => (isActive ? "active-class" : "")}
              onClick={onClose}
            >
              <img
                src={isLight ? item.darkIcon : item.icon}
                alt={item.label}
                className="nav-icon"
              />
              {item.label}
            </NavLink>
          </li>
        ))}
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
      width: 130px;
      height: 130px;
      border-radius: 50%;
      border: 3px solid var(--primary-color);
      box-shadow: 0 0 20px rgba(var(--primary-color-rgb), 0.2);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      object-fit: cover;
      &.hovering {
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
        padding: 0.6rem 1.5rem;
        position: relative;
        z-index: 10;
        text-transform: uppercase;
        transition: all 0.3s ease;
        font-weight: 600;
        font-size: 0.85rem;
        letter-spacing: 1px;
        color: var(--font-light-color);
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
