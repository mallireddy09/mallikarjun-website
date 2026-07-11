import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";

function Sidebar({ navToggle, theme, onClose }) {
  return (
    <SidebarStyled
      id="site-sidebar"
      className={`${navToggle ? "nav-toggle" : ""}`}
    >
      <Navigation theme={theme} onClose={onClose} />
    </SidebarStyled>
  );
}

const SidebarStyled = styled.div`
  width: var(--sidebar-width);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  height: 100dvh;
  background-color: var(--sidebar-dark-color);
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 20;
  border-right: 1px solid var(--border-color);
  padding-bottom: var(--safe-bottom);

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--border-color);
    border-radius: 10px;
  }

  @media screen and (max-width: 1200px) {
    transform: translateX(-100%);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.3);
    width: min(var(--sidebar-width), 85vw);
  }
`;

export default Sidebar;
