import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";

function Sidebar({ navToggle, theme, onClose }) {
  return (
    <SidebarStyled className={`${navToggle ? "nav-toggle" : ""}`}>
      <Navigation theme={theme} onClose={onClose} />
    </SidebarStyled>
  );
}

const SidebarStyled = styled.div`
  width: 16.3rem;
  position: fixed;
  height: 100vh;
  background-color: var(--sidebar-dark-color);
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 20;
  border-right: 1px solid var(--border-color);
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--border-color);
    border-radius: 10px;
  }
  @media screen and (max-width: 1200px) {
    transform: translateX(-100%);
    z-index: 20;
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);
  }
`;

export default Sidebar;
