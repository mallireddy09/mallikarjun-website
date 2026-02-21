import React from "react";
import styled from "styled-components";

function ResumeItem({ year, title, subTitle, text, link, css }) {
  return (
    <ResumeItemStyled>
      <div className="left-content left">
        <p>{year}</p>
      </div>
      <div className={`right-content${css !== undefined ? ` right${css}` : ''}`}>
        <h5>{title}</h5>
        <a href={link} target="_blank" rel="noreferrer">
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

  @media screen and (max-width: 600px) {
    flex-direction: column;
  }

  &:not(:last-child) {
    padding-bottom: 3rem;
  }
  .left-content {
    width: 35%;
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
    @media screen and (max-width: 600px) {
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
    h5 {
      color: var(--primary-color);
      font-size: 1.6rem;
      padding-bottom: 0.4rem;
      font-weight: 700;
      @media screen and (max-width: 502px) {
        font-size: 1.3rem;
      }
    }
    h6 {
      padding-bottom: 0.6rem;
      font-size: 1.2rem;
      transition: color 0.3s ease;
      &:hover {
        color: var(--primary-color);
      }
      @media screen and (max-width: 502px) {
        font-size: 1rem;
      }
    }
    p {
      color: var(--font-light-color);
      line-height: 1.7;
    }
    @media screen and (max-width: 600px) {
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
  .right0 {
    flex: 1;
  }
  .right1 {
    padding-left: 0;
  }
`;
export default ResumeItem;
