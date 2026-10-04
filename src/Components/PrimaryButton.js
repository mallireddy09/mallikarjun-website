import React from "react";
import styled from "styled-components";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { PROFILE } from "../data/profile";
import { scrollToSection } from "../helper/navigation";
import ExternalLink from "./ExternalLink";

function PrimaryButton({ title, href, showDownloadIcon = false, variant = "outline" }) {
  const content = (
    <>
      {showDownloadIcon && <FileDownloadOutlinedIcon />}
      {title}
    </>
  );

  const isHashLink = typeof href === "string" && href.startsWith("#");
  const Link = isHashLink ? "a" : ExternalLink;

  const handleHashClick = (event) => {
    if (!isHashLink) return;
    event.preventDefault();
    scrollToSection(href.slice(1));
  };

  return (
    <PrimaryButtonStyled $variant={variant}>
      <Link
        href={href || PROFILE.resume}
        onClick={handleHashClick}
      >
        {content}
      </Link>
    </PrimaryButtonStyled>
  );
}

const PrimaryButtonStyled = styled.div`
  margin-left: 0;
  cursor: pointer;
  display: inline-flex;
  font-size: 0.9rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  -webkit-tap-highlight-color: transparent;

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(var(--primary-color-rgb), 0.3);

    a {
      border-color: var(--primary-color);
      background: ${({ $variant }) => $variant === "filled" ? "var(--primary-color)" : "var(--glass-bg)"};
    }
  }

  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    min-height: 48px;
    padding: 0.75rem 1.35rem;
    border: 2px solid ${({ $variant }) => $variant === "filled" ? "var(--primary-color)" : "var(--border-color)"};
    border-radius: 50px;
    background: ${({ $variant }) => $variant === "filled" ? "var(--primary-color)" : "transparent"};
    color: ${({ $variant }) => $variant === "filled" ? "var(--on-primary-color)" : "var(--white-color)"};
    font-weight: 700;
    transition: background 0.3s ease, border-color 0.3s ease;
    position: relative;
    z-index: 1;
    @media screen and (max-width: 480px) {
      padding: 0.7rem 1.1rem;
    }
  }
`;

export default PrimaryButton;
