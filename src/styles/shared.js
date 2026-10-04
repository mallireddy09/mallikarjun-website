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
