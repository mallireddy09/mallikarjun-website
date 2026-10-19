import React from "react";
import styled from "styled-components";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { PROFILE } from "../data/profile";
import { scrollToSection } from "../helper/navigation";
import ExternalLink from "./ExternalLink";

function PrimaryButton({ title, href, showDownloadIcon = false, iconSrc, iconOnly = false }: { title: string; href?: string; showDownloadIcon?: boolean; iconSrc?: string; iconOnly?: boolean }) {
  const content = (
    <>
      {showDownloadIcon && (iconSrc ? <img src={iconSrc} alt="" width="44" height="44" /> : <FileDownloadOutlinedIcon />)}
      {!iconOnly && title}
    </>
  );

  const isHashLink = typeof href === "string" && href.startsWith("#");
  const Link = isHashLink ? "a" : ExternalLink;

  const handleHashClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (!href?.startsWith("#")) return;
    event.preventDefault();
    scrollToSection(href.slice(1));
  };

  return (
    <PrimaryButtonStyled className={iconOnly ? "icon-only" : undefined}>
      <Link
        href={href || PROFILE.resume}
        onClick={handleHashClick}
        aria-label={iconOnly ? title : undefined}
        title={iconOnly ? title : undefined}
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
  -webkit-tap-highlight-color: transparent;

  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
  }

  img { display: block; object-fit: contain; }

  &.icon-only a {
    width: 58px;
    height: 58px;
    min-height: 58px;
    padding: 0;
    border-width: 1px;
    border-radius: 50%;
    img { width: 48px; height: 48px; }
    &:hover { transform: translateY(-3px); }
  }

  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    min-height: 48px;
    padding: 0.75rem 1.35rem;
    border: 2px solid var(--border-color);
    border-radius: 50px;
    background: transparent;
    color: var(--white-color);
    font-weight: 700;
    transition: background 0.3s ease, border-color 0.3s ease,
      box-shadow 0.3s ease, transform 0.3s ease;
    position: relative;
    z-index: 1;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(var(--primary-color-rgb), 0.3);
      border-color: var(--primary-color);
      background: var(--glass-bg);
    }
    @media screen and (max-width: 480px) {
      padding: 0.7rem 1.1rem;
    }
  }
`;

export default PrimaryButton;
