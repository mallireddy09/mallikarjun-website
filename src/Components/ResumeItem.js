import React from "react";
import styled from "styled-components";

function ResumeItem({ year, title, subTitle, text, link, logo }) {
  return (
    <ResumeItemStyled>
      <div className="left-content">
        <p>{year}</p>
      </div>
      <div className="right-content">
        <p className="mobile-year">{year}</p>
        <h5>{title}</h5>
        <a href={link} target="_blank" rel="noreferrer" className="company-link">
          {logo && <img src={logo} alt="" className="company-logo" />}
          <h6>{subTitle}</h6>
        </a>
        {text && <p>{text}</p>}
      </div>
    </ResumeItemStyled>
  );
}

const ResumeItemStyled = styled.div`
  display: flex;
  transition: all 0.3s ease;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  &:not(:last-child) {
    padding-bottom: 2.5rem;

    @media screen and (max-width: 480px) {
      padding-bottom: 2rem;
    }
  }

  .left-content {
    width: 35%;
    min-width: 8rem;
    padding-left: 20px;
    flex-shrink: 0;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: -10px;
      top: 5px;
      height: 15px;
      width: 15px;
      border-radius: 50%;
      border: 2px solid var(--primary-color);
      background-color: var(--background-dark-color);
      transition: all 0.3s ease;
      box-shadow: 0 0 0 3px rgba(var(--primary-color-rgb), 0.15);
    }

    p {
      display: inline-block;
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--font-light-color);
    }

    @media screen and (max-width: 768px) {
      display: none;
    }
  }

  &:hover .left-content::before {
    background-color: var(--primary-color);
    box-shadow: 0 0 0 5px rgba(var(--primary-color-rgb), 0.25);
  }

  .right-content {
    flex: 1;
    padding-left: 1rem;
    position: relative;
    min-width: 0;

    .mobile-year {
      display: none;
      font-weight: 600;
      font-size: 0.85rem;
      color: var(--primary-color);
      margin-bottom: 0.35rem;

      @media screen and (max-width: 768px) {
        display: block;
      }
    }

    h5 {
      color: var(--primary-color);
      font-size: clamp(1.15rem, 2.5vw, 1.6rem);
      padding-bottom: 0.4rem;
      font-weight: 700;
      word-wrap: break-word;
    }

    .company-link {
      display: inline-flex;
      align-items: center;
      gap: 0.55rem;
      margin-bottom: 0.4rem;
      max-width: 100%;

      .company-logo {
        width: 2rem;
        height: 2rem;
        object-fit: contain;
        border-radius: 4px;
        flex-shrink: 0;
      }

      h6 {
        padding-bottom: 0;
        font-size: clamp(1rem, 2vw, 1.2rem);
        transition: color 0.3s ease;
        word-wrap: break-word;
      }

      &:hover h6 {
        color: var(--primary-color);
      }
    }

    p {
      color: var(--font-light-color);
      line-height: 1.7;
      font-size: 0.95rem;
    }

    @media screen and (max-width: 768px) {
      padding-left: 1.5rem;

      &::before {
        content: "";
        position: absolute;
        left: -9px;
        top: 8px;
        height: 12px;
        width: 12px;
        border-radius: 50%;
        border: 2px solid var(--primary-color);
        background-color: var(--background-dark-color);
      }
    }
  }
`;

export default ResumeItem;
