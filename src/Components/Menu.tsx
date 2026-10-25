import type { Project } from "../types/portfolio";
import styled from "styled-components";
import ExternalLink from "./ExternalLink";
import ProjectPreview from "./ProjectPreview";

const Menu = ({ menuItem }: { menuItem: readonly Project[] }) => (
  <MenuItemStyled>
    {menuItem.map(item => (
      <ExternalLink
        className="grid-item"
        key={item.id}
        href={item.store || item.github || item.demo}
        aria-label={`${item.title} (opens in a new tab)`}
      >
        <div className="portfolio-image">
          {item.preview ? <ProjectPreview kind={item.preview} image={item.image}/> : <img src={item.image} alt="" loading="lazy" />}
        </div>
        <h3>{item.title}</h3>
      </ExternalLink>
    ))}
  </MenuItemStyled>
);

const MenuItemStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  padding: 1.5rem 0;

  .grid-item {
    display: flex;
    flex-direction: column;
    min-width: 0;
    overflow: hidden;
    border-radius: 20px;
    background: var(--background-dark-grey);
    color: var(--white-color);
    transition: transform .25s ease;
  }
  .grid-item:hover, .grid-item:focus-visible { transform: translateY(-4px); }
  .portfolio-image { position: relative; overflow: hidden; aspect-ratio: 3 / 2; }
  .portfolio-image > img { display: block; width: 100%; height: 100%; object-fit: cover; }
  h3 {
    margin: 0;
    padding: 22px 24px 26px;
    font-size: clamp(20px, 2vw, 28px);
    line-height: 1.3;
    font-weight: 700;
    color: inherit;
  }
  @media(max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.25rem;
    padding: 1rem 0;
    h3 { padding: 20px; }
  }
  @media(prefers-reduced-motion: reduce) {
    .grid-item { transition: none; }
    .grid-item:hover, .grid-item:focus-visible, .grid-item:hover img, .grid-item:focus-visible img { transform: none; }
  }
`;

export default Menu;
