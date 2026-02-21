import React from 'react';
import styled from 'styled-components';
import GitHub from '@mui/icons-material/GitHub';
import YouTube from '@mui/icons-material/YouTube';
import Play from '@mui/icons-material/PlayArrowOutlined';

// const getRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   };

const Menu = ({ menuItem }) => {
  return (
    <MenuItemStyled>
      {menuItem.map((item) => (
        <div className="grid-item" key={item.id}>
          <div className="portfolio-content">
            <div className="portfolio-image">
              <img src={item.image} alt={item.title} />
              <div className="overlay">
                {item.link1 && (
                  <a href={item.link1} target="_blank" rel="noreferrer">
                    <GitHub />
                  </a>
                )}
                {item.link2 && (
                  <a href={item.link2} target="_blank" rel="noreferrer">
                    <YouTube />
                  </a>
                )}
                {item.link3 && (
                  <a href={item.link3} target="_blank" rel="noreferrer">
                    <Play />
                  </a>
                )}
              </div>
            </div>
            <h6>{item.title}</h6>
            <p>{item.text}</p>
          </div>
        </div>
      ))}
    </MenuItemStyled>
  );
};

const MenuItemStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
  padding: 2rem;
  @media screen and (max-width: 920px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 670px) {
    grid-template-columns: repeat(1, 1fr);
  }
  .grid-item {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    box-shadow: var(--card-shadow);
    border-radius: 16px;
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
      h6, p {
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
        padding-bottom: 1rem;
        line-height: 1.5;
      }
      .portfolio-image {
        overflow: hidden;
        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
      }
    }
    &:hover .portfolio-image img {
      transform: scale(1.05);
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 200px;
      background: rgba(0,0,0,0.65);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.4s ease;
      a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        margin: 0 8px;
        border-radius: 50%;
        border: 2px solid rgba(255,255,255,0.3);
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
