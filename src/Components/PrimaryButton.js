import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { PROFILE } from "../data/profile";

function PrimaryButton({ title, to, href, showDownloadIcon = false }) {
  const content = (
    <>
      {showDownloadIcon && <FileDownloadOutlinedIcon />}
      {title}
    </>
  );

  const isHashLink = typeof href === "string" && href.startsWith("#");

  const handleHashClick = (event) => {
    if (!isHashLink) return;
    event.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `/#${id}`);
    }
  };

  return (
    <PrimaryButtonStyled>
      {to ? (
        <NavLink to={to}>{content}</NavLink>
      ) : (
        <a
          href={href || PROFILE.resume}
          target={isHashLink ? undefined : "_blank"}
          rel={isHashLink ? undefined : "noreferrer"}
          onClick={handleHashClick}
        >
          {content}
        </a>
      )}
    </PrimaryButtonStyled>
  );
}

const PrimaryButtonStyled = styled.div`
  border: 2px solid var(--border-color);
  margin-left: 0;
  padding: 0.75rem 1.35rem;
  min-height: 44px;
  height: auto;
  border-radius: 50px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  font-size: 0.9rem;
  text-transform: uppercase;
  position: relative;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;

  @media screen and (max-width: 480px) {
    padding: 0.7rem 1.1rem;
    font-size: 0.8rem;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--gradient-primary);
    transition: left 0.4s ease;
    z-index: 0;
  }

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(var(--primary-color-rgb), 0.3);

    &::before {
      left: 0;
    }

    a {
      color: #fff;
      position: relative;
      z-index: 1;
    }
  }

  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.4s ease;
    color: var(--white-color);
    position: relative;
    z-index: 1;
  }
`;

export default PrimaryButton;
