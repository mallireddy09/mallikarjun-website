import styled from "styled-components";

/** Display rendered brand assets without CSS filters or perspective distortion. */
function CompanyLogo({ src, eager = false }: { src: string; eager?: boolean }) {
  return (
    <LogoStyled aria-hidden="true" data-wordmark={src.includes("nineleaps") || src.includes("gitam") || undefined} data-gitam={src.includes("gitam") || undefined}>
      <img className="logo-face" src={src} alt="" loading={eager ? "eager" : "lazy"} decoding="async" />
    </LogoStyled>
  );
}

const LogoStyled = styled.span`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 48px;
  margin: 2px 5px 5px 0;
  flex-shrink: 0;
  &[data-wordmark] { width: 96px; }
  &[data-gitam] { width: 144px; height: 64px; }
  img {
    position: absolute;
    inset: 0;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 5px;
  }
`;

export default CompanyLogo;
