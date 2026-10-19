import { css } from "styled-components";

export const gradientText = css`
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const liquidGlassSurface = css`
  background: linear-gradient(135deg, rgba(var(--primary-color-rgb), .13), rgba(var(--primary-color-rgb), .035)), var(--glass-bg);
  border: 1px solid rgba(var(--primary-color-rgb), .2);
  box-shadow: inset 0 1px 0 rgba(224, 246, 255, .16);
  backdrop-filter: blur(12px);
`;

export const liquidGlassSelected = css`
  background: linear-gradient(135deg, rgba(155, 216, 255, .28), rgba(66, 143, 250, .18) 50%, rgba(30, 81, 157, .12)), var(--glass-bg);
  border-color: rgba(145, 210, 255, .65);
  box-shadow: inset 0 1px 0 rgba(235, 250, 255, .5), inset 0 -1px 0 rgba(121, 190, 255, .15), 0 8px 24px rgba(38, 125, 246, .2);
  .light-theme & {
    background: linear-gradient(135deg, rgba(244, 253, 255, .96), rgba(177, 220, 255, .6), rgba(128, 185, 251, .4));
    border-color: rgba(67, 139, 225, .45);
    box-shadow: inset 0 1px 0 #fff, 0 8px 24px rgba(38, 125, 246, .14);
  }
`;

export const lightLiquidGlass = css`
  background: linear-gradient(135deg, rgba(233, 248, 255, .96), rgba(174, 216, 255, .94) 48%, rgba(131, 190, 249, .96));
  border: 1px solid rgba(234, 249, 255, .8);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .85), inset 0 -1px 0 rgba(50, 115, 195, .15), 0 10px 32px rgba(38, 125, 246, .12);
`;
