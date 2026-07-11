import React from "react";
import styled from "styled-components";

function SecondaryButton({ title, onClick }) {
  return (
    <SecondaryButtonStyled type="button" onClick={onClick}>
      {title}
    </SecondaryButtonStyled>
  );
}

const SecondaryButtonStyled = styled.button`
  background: var(--gradient-primary);
  padding: 0.8rem 2.5rem;
  min-height: 48px;
  color: white;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
  text-transform: uppercase;
  position: relative;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  letter-spacing: 0.03em;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  width: auto;
  max-width: 100%;

  @media screen and (max-width: 480px) {
    width: 100%;
    padding: 0.85rem 1.5rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(var(--primary-color-rgb), 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

export default SecondaryButton;
