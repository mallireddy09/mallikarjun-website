import type { GalleryItem } from "../types/portfolio";
import styled from "styled-components";
import ExternalLink from "./ExternalLink";
import { glassCard } from "../styles/shared";

function GridGallery({ items, altPrefix = "item" }: { items: readonly GalleryItem[]; altPrefix?: string }) {
  return (
    <GridGalleryStyled>
      {items.map((item) => (
        <div key={item.id} className="gallery-item">
          {item.image ? (
            <div className="image">
              <img
                src={item.image}
                alt={`${altPrefix}_${item.id}`}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="text-card">
              <span className="issuer">{item.by}</span>
              {(item.month || item.date) && (
                <span className="issued">
                  {[item.month, item.date].filter(Boolean).join(" ")}
                </span>
              )}
            </div>
          )}
          <div className="title">
            <ExternalLink href={item.link}>
              {item.title}
            </ExternalLink>
          </div>
        </div>
      ))}
    </GridGalleryStyled>
  );
}

const GridGalleryStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media screen and (max-width: 900px) {
    gap: 1.25rem;
  }

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .gallery-item {
    ${glassCard}
    padding: 1rem;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    min-width: 0;

    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--card-hover-shadow);
      border-color: var(--primary-color);
    }

    @media (hover: none) {
      &:hover {
        transform: none;
      }
    }
  }

  .image {
    width: 100%;
    overflow: hidden;
    margin-bottom: 0.5rem;
    border-radius: 12px;
    aspect-ratio: 16 / 10;
    background: var(--background-dark-grey);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 8px;
      transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);

      &:hover {
        cursor: pointer;
        transform: scale(1.04);
      }
    }
  }

  .text-card {
    min-height: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    padding: 1.5rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 12px;
    background: linear-gradient(
      135deg,
      rgba(var(--primary-color-rgb), 0.12),
      rgba(var(--primary-color-rgb), 0.04)
    );
    border: 1px solid var(--glass-border);

    .issuer {
      font-size: 0.85rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--primary-color);
    }
    .issued {
      font-size: 0.9rem;
      color: var(--font-light-color);
    }
  }

  .title {
    a {
      font-size: 1rem;
      font-weight: 600;
      padding: 0.5rem 0;
      display: inline-block;
      color: var(--white-color);
      cursor: pointer;
      transition: color 0.3s ease;
      word-wrap: break-word;
      line-height: 1.4;
    }
    a:hover {
      color: var(--primary-color);
    }
  }
`;

export default GridGallery;
