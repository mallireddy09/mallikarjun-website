import React from "react";
import styled from "styled-components";
import GitHub from "@mui/icons-material/GitHub";
import YouTube from "@mui/icons-material/YouTube";
import Play from "@mui/icons-material/PlayArrowOutlined";
import IconLinks from "./IconLinks";
import { glassCard } from "../styles/shared";

const LINK_ICONS = [
  { key: "github", Icon: GitHub },
  { key: "demo", Icon: YouTube },
  { key: "store", Icon: Play },
];

function ProjectLinks({ item }) {
  return (
    <IconLinks links={LINK_ICONS.map(({ key, Icon }) => ({
      key, Icon, href: item[key], label: `${item.title} ${key}`,
    }))} />
  );
}

const Menu = ({ menuItem }) => {
  return (
    <MenuItemStyled>
      {menuItem.map((item) => (
        <div className="grid-item" key={item.id}>
          <div className="portfolio-content">
            <div className="portfolio-image">
              <img src={item.image} alt={item.title} loading="lazy" />
              <div className="overlay">
                <ProjectLinks item={item} />
              </div>
            </div>
            <h6>{item.title}</h6>
            <p>{item.text}</p>
            <div className="mobile-links">
              <ProjectLinks item={item} />
            </div>
          </div>
        </div>
      ))}
    </MenuItemStyled>
  );
};

const MenuItemStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1.5rem;
  padding: 1.5rem 0;

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    grid-gap: 1.25rem;
    padding: 1rem 0;
  }

  .grid-item {
    ${glassCard}
    box-shadow: var(--card-shadow);
    overflow: hidden;
    position: relative;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
      transform: translateY(-6px);
      box-shadow: var(--card-hover-shadow);
      border-color: var(--primary-color);
    }

    &:hover .overlay {
      opacity: 1;
    }

    .portfolio-content {
      h6,
      p {
        padding: 0.5rem 1rem;
        font-size: 0.9rem;
      }
      h6 {
        font-weight: 700;
        color: var(--primary-color);
        padding-top: 0.8rem;
      }
      p {
        color: var(--font-light-color);
        padding-bottom: 0.5rem;
        line-height: 1.5;
      }

      .portfolio-image {
        overflow: hidden;
        position: relative;
        aspect-ratio: 16 / 10;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
      }

      .mobile-links {
        display: none;
        gap: 0.75rem;
        padding: 0 1rem 1rem;

        a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid var(--border-color);
          color: var(--white-color);
          transition: all 0.3s ease;

          &:hover,
          &:active {
            border-color: var(--primary-color);
            color: var(--primary-color);
          }
        }

        @media (hover: none), (pointer: coarse) {
          display: flex;
        }
      }
    }

    &:hover .portfolio-image img {
      transform: scale(1.05);
    }

    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.4s ease;

      @media (hover: none), (pointer: coarse) {
        display: none;
      }

      a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        margin: 0 8px;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.3);
        color: white;
        transition: all 0.3s ease;
        &:hover {
          background: var(--primary-color);
          border-color: var(--primary-color);
          transform: scale(1.15);
        }
        svg {
          font-size: 1.3rem;
        }
      }
    }
  }
`;

export default Menu;
