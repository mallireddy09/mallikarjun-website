import { createGlobalStyle } from "styled-components";
import { DRAWER_MEDIA } from "./media";

const GlobalStyle = createGlobalStyle`
:root {
  --sidebar-width: 16.3rem;
  --safe-top: env(safe-area-inset-top, 0px);
  --safe-right: env(safe-area-inset-right, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --safe-left: env(safe-area-inset-left, 0px);
  --fixed-chrome: calc(3.75rem + var(--safe-top));
}

.light-theme{
    --primary-color: #007bff;
    --primary-color-rgb: 0, 123, 255;
    --background-dark-color: #f8f9fc;
    --background-dark-grey: #e8ecf1;
    --border-color: #d1d5db;
    --background-light-color-2: rgba(3,127,255,.3);
    --white-color: #1a1a2e;
    --font-light-color: #4a4a68;
    --sidebar-dark-color: #ffffff;
    --scrollbar-bg-color: #e8ecf1;
    --scrollbar-thump-color: #b0b8c9;
    --scrollbar-track-color: #e8ecf1;
    --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    --card-hover-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    --underlay-text-color: #e3e5eb50;
    --gradient-primary: linear-gradient(135deg, #007bff 0%, #00c6ff 100%);
    --glass-bg: rgba(255, 255, 255, 0.7);
    --glass-border: rgba(255, 255, 255, 0.3);
}

.dark-theme{
    --primary-color: #00d2d3;
    --primary-color-rgb: 0, 210, 211;
    --background-dark-color: #0a0a0f;
    --background-dark-grey: #12121a;
    --border-color: #1e2235;
    --background-light-color-2: rgba(0, 210, 211, .15);
    --white-color: #e8e8f0;
    --font-light-color: #a4acc4;
    --sidebar-dark-color: #08080d;
    --scrollbar-bg-color: #12121a;
    --scrollbar-thump-color: #2a2d42;
    --scrollbar-track-color: #12121a;
    --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    --card-hover-shadow: 0 8px 30px rgba(0, 210, 211, 0.1);
    --underlay-text-color: #0e1018;
    --gradient-primary: linear-gradient(135deg, #00d2d3 0%, #0084ff 100%);
    --glass-bg: rgba(10, 10, 15, 0.6);
    --glass-border: rgba(30, 34, 53, 0.5);
}

html {
  scroll-behavior: auto;
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
    font-family: 'Nunito', sans-serif;
}

html, body {
  overflow-x: clip;
  max-width: 100%;
}

body{
    background-color: var(--background-dark-color);
    color: var(--font-light-color);
    font-size: 1.05rem;
    transition: background-color 0.5s ease, color 0.4s ease;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: var(--safe-top) var(--safe-right) var(--safe-bottom) var(--safe-left);
}

body.nav-open {
  overflow: hidden;
  touch-action: none;
}

@media screen and (max-width: 768px) {
  body {
    font-size: 1rem;
  }
}

@media screen and (max-width: 480px) {
  body {
    font-size: 0.95rem;
  }
}

body::-webkit-scrollbar{
    width: 8px;
    background-color: var(--scrollbar-bg-color);
}
body::-webkit-scrollbar-thumb{
    border-radius: 10px;
    background-color: var(--scrollbar-thump-color);
    &:hover{
        background-color: var(--primary-color);
    }
}
body::-webkit-scrollbar-track{
    border-radius: 10px;
    background-color: var(--scrollbar-track-color);
}

a{
    font-family: inherit;
    color: inherit;
    font-size: inherit;
    transition: color 0.3s ease;
}

img, video, canvas, svg {
  max-width: 100%;
}

h1{
    font-size: clamp(2rem, 5vw, 4rem);
    color: var(--white-color);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.15;
    span{
        font-size: inherit;
    }
}

h2{
    font-weight: 700;
    letter-spacing: -0.01em;
}

h5{
    font-size: clamp(1.15rem, 2.5vw, 1.5rem);
    color: var(--white-color);
    font-weight: 600;
    span{
        font-size: inherit;
    }
}

h6{
    color: var(--white-color);
    font-size: 1.2rem;
    padding-bottom: .6rem;
    font-weight: 600;
}

span{
    color: var(--primary-color);
}

p{
    line-height: 1.7;
}

// Utilities
.u-margin-bottom{
    margin-bottom: 4rem;
}

// Scroll Reveal Animation
.reveal{
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
}
.reveal.visible{
    opacity: 1;
    transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

// Theme Toggle Button
.theme-toggle-btn{
    position: fixed;
    right: calc(5rem + var(--safe-right));
    top: calc(1rem + var(--safe-top));
    width: 3rem;
    height: 3rem;
    min-width: 44px;
    min-height: 44px;
    border-radius: 50%;
    border: 2px solid var(--border-color);
    background-color: var(--glass-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    color: var(--white-color);
    cursor: pointer;
    z-index: 25;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    -webkit-tap-highlight-color: transparent;
    svg{
        font-size: 1.3rem;
        transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    }
}
.theme-toggle-btn:hover{
    border-color: var(--primary-color);
    color: var(--primary-color);
    transform: scale(1.1) rotate(15deg);
    box-shadow: 0 4px 20px rgba(var(--primary-color-rgb), 0.3);
}
.theme-toggle-btn:active{
    transform: scale(0.95);
}
@media screen and (max-width: 480px){
    .theme-toggle-btn{
        width: 2.75rem;
        height: 2.75rem;
        min-width: 44px;
        min-height: 44px;
        right: calc(4.5rem + var(--safe-right));
        top: calc(0.85rem + var(--safe-top));
        svg{
            font-size: 1.15rem;
        }
    }
}

// Nav Overlay
.nav-overlay{
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 19;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    animation: fadeIn 0.3s ease;
}
@keyframes fadeIn{
    from { opacity: 0; }
    to { opacity: 1; }
}

// Nav Toggler
.ham-burger-menu{
    position: fixed;
    right: calc(1.25rem + var(--safe-right));
    top: calc(0.75rem + var(--safe-top));
    display: block;
    z-index: 25;
    -webkit-tap-highlight-color: transparent;
    button {
      width: 44px;
      height: 44px;
    }
    svg{
        font-size: 2rem;
        color: var(--primary-color);
        transition: transform 0.3s ease;
    }
    .mobile-menu-icon {
        display: none;
    }
    .desktop-menu-icon {
        display: block;
    }
}
.nav-toggle{
    transform: translateX(0) !important;
    z-index: 20;
}
@media ${DRAWER_MEDIA}{
    .ham-burger-menu{
        .mobile-menu-icon { display: block; }
        .desktop-menu-icon { display: none; }
    }
}

// Focus visible for accessibility
:focus-visible{
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

// Selection color
::selection{
    background-color: rgba(var(--primary-color-rgb), 0.3);
    color: var(--white-color);
}

`;

export default GlobalStyle;
