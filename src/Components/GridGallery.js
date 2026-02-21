import React from "react";
import styled from "styled-components";

function GridGallery({ items, altPrefix = "item" }) {
  return (
    <GridGalleryStyled>
      {items.map((item) => (
        <div key={item.id} className="gallery-item">
          <div className="image">
            <img src={item.image} alt={`${altPrefix}_${item.id}`} />
          </div>
          <div className="title">
            <a href={item.link} target="_blank" rel="noreferrer">
              {item.title}
            </a>
          </div>
        </div>
      ))}
    </GridGalleryStyled>
  );
}

const GridGalleryStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  @media screen and (max-width: 770px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .gallery-item {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    padding: 1rem;
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--card-hover-shadow);
      border-color: var(--primary-color);
    }
  }
  .image {
    width: 100%;
    overflow: hidden;
    padding-bottom: 0.5rem;
    border-radius: 12px;
    img {
      width: 100%;
      height: 90%;
      object-fit: cover;
      border-radius: 8px;
      transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
      &:hover {
        cursor: pointer;
        transform: scale(1.04);
      }
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
      transition: all 0.3s ease;
      &:hover {
        color: var(--primary-color);
      }
    }
  }
`;

export default GridGallery;
