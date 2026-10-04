import { css } from "styled-components";

export const glassSurface = css`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
`;

export const glassCard = css`
  ${glassSurface}
  border-radius: 16px;
`;

export const gradientText = css`
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const companyLogo = css`
  width: 2rem;
  height: 2rem;
  object-fit: contain;
  border-radius: 4px;
  flex-shrink: 0;
`;
