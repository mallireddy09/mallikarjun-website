import React from "react";
import styled from "styled-components";
import AnimatedSection from "./AnimatedSection";

function Title({ title, span, animated = false }) {
  const content = (
    <TitleStyled>
      <h2>
        {title}{" "}
        <b>
          <span>{span}</span>
        </b>
      </h2>
    </TitleStyled>
  );
  return animated ? <AnimatedSection>{content}</AnimatedSection> : content;
}

const TitleStyled = styled.div`
  position: relative;
  h2 {
    color: var(--white-color);
    font-size: clamp(1.75rem, 5vw, 3.1rem);
    font-weight: 800;
    text-transform: uppercase;
    position: relative;
    padding-bottom: 0.7rem;
    letter-spacing: -0.01em;
    word-wrap: break-word;

    &::before {
      content: "";
      position: absolute;
      bottom: 0;
      width: 7.4rem;
      height: 0.33rem;
      background-color: var(--background-light-color-2);
      border-radius: 15px;
      left: 0;
    }
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      width: 3.5rem;
      height: 0.33rem;
      background: var(--gradient-primary);
      border-radius: 15px;
      left: 0;
      transition: width 0.4s ease;
    }
    &:hover::after {
      width: 7.4rem;
    }
    span {
      font-weight: 900;
      color: var(--underlay-text-color);
      font-size: clamp(2rem, 8vw, 5rem);
      position: absolute;
      left: 0;
      top: 30%;
      z-index: -1;
      user-select: none;
      white-space: nowrap;
      max-width: 100%;
      overflow: hidden;
    }
  }
`;

export default Title;
