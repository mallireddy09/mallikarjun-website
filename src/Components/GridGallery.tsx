import { useState } from "react";
import type { GalleryItem } from "../types/portfolio";
import styled from "styled-components";
import ExternalLink from "./ExternalLink";
import { liquidGlassSurface, liquidGlassSelected } from "../styles/shared";

function GridGallery({ items, altPrefix = "item" }: { items: readonly GalleryItem[]; altPrefix?: string }) {
  const [selected, setSelected] = useState<number | null>(null);
  return <GridGalleryStyled data-gallery={altPrefix}>
    {items.map(item => <ExternalLink key={item.id} href={item.link} aria-label={`${item.title} (opens in a new tab)`} className={`gallery-item${selected === item.id ? " is-selected" : ""}`} onClick={() => setSelected(item.id)}>
      {item.image ? <div className="image"><img src={item.image} alt="" loading="lazy" /></div> : <div className="text-card">
        <span className="issuer">{item.by}</span>
        {(item.month || item.date) && <span className="issued">{[item.month, item.date].filter(Boolean).join(" ")}</span>}
      </div>}
      <h3 className="title">{item.title}</h3>
    </ExternalLink>)}
  </GridGalleryStyled>;
}

const GridGalleryStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  align-items: stretch;
  .gallery-item {
    ${liquidGlassSurface}
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 14px;
    border-radius: 22px;
    color: var(--white-color);
    transition: transform .25s, border-color .25s, box-shadow .25s;
  }
  .gallery-item:hover, .gallery-item:focus-visible, .gallery-item.is-selected { ${liquidGlassSelected} }
  .gallery-item:hover { transform: translateY(-3px); }
  .gallery-item:active { transform: translateY(-1px) scale(.995); }
  .image { width: 100%; aspect-ratio: 16 / 10; border-radius: 14px; overflow: hidden; background: #fff; }
  .image img { display: block; width: 100%; height: 100%; object-fit: contain; }
  .title { font-size: 17px; line-height: 1.45; font-weight: 600; color: inherit; padding: 18px 6px 8px; }
  .text-card { min-height: 130px; display: flex; flex-direction: column; justify-content: center; gap: 8px; padding: 24px 16px; border-radius: 14px; background: var(--background-light-color-2); }
  .issuer { color: var(--primary-color); font-size: 16px; font-weight: 700; }
  .issued { color: var(--font-light-color); font-size: 15px; }
  @media(max-width: 900px) { gap: 1.25rem; }
  @media(max-width: 600px) { grid-template-columns: 1fr; gap: 16px; .gallery-item { padding: 10px; } .title { padding: 16px 8px 10px; } }
  @media(prefers-reduced-motion: reduce) { .gallery-item { transition: none; } .gallery-item:hover, .gallery-item:active { transform: none; } }
`;

export default GridGallery;
