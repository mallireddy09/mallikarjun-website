import React from "react";
import styled from "styled-components";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
function PrimaryButton({ icon, title }) {
  return (
    <PrimaryButtonStyled>
      <a
        href="https://drive.google.com/file/d/1SV0KGJ-y8ayeJozpz3sggtdmx9vARm-_/view?usp=sharing"
        download="Mallikarjun_Resume.pdf"
      >
        {icon && <FileDownloadOutlinedIcon />}
        {title}
      </a>
    </PrimaryButtonStyled>
  );
}

const PrimaryButtonStyled = styled.div`
  border: 2px solid var(--border-color);
  margin-left: 0.5rem;
  padding: 0.8rem 1.5rem;
  height: 3rem;
  border-radius: 50px;
  cursor: pointer;
  display: inline-block;
  font-size: inherit;
  text-transform: uppercase;
  position: relative;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: var(--gradient-primary);
    transition: left 0.4s ease;
    z-index: 0;
  }
  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(var(--primary-color-rgb), 0.3);
    &::before {
      left: 0;
    }
    a {
      color: #fff;
      position: relative;
      z-index: 1;
    }
  }
  a {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: color 0.4s ease;
    color: var(--white-color);
    position: relative;
    z-index: 1;
  }
`;
export default PrimaryButton;
