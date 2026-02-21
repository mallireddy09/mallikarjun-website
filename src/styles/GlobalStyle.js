import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

.light-theme{
    --primary-color: #007bff;
    --primary-color-light: #057FFF;
    --primary-color-rgb: 0, 123, 255;
    --secondary-color: #ff7675;
    --background-dark-color: #f8f9fc;
    --background-dark-grey: #e8ecf1;
    --border-color: #d1d5db;
    --background-light-color: #F1F1F1;
    --background-light-color-2: rgba(3,127,255,.3);
    --white-color: #1a1a2e;
    --white-true-color: #fff;
    --font-light-color: #4a4a68;
    --font-dark-color: #313131;
    --font-dark-color-2: #151515;
    --sidebar-dark-color: #ffffff;
    --scrollbar-bg-color: #e8ecf1;
    --scrollbar-thump-color: #b0b8c9;
    --scrollbar-track-color: #e8ecf1;
    --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    --card-hover-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    --primary-code-color-property: #007bff;
    --primary-code-color-keyword: #007bff;
    --primary-code-color-function: #007bff;
    --primary-code-color-string: #007bff;
    --primary-code-color-bracket: #000000;
    --underlay-text-color: #e3e5eb50;
    --gradient-primary: linear-gradient(135deg, #007bff 0%, #00c6ff 100%);
    --glass-bg: rgba(255, 255, 255, 0.7);
    --glass-border: rgba(255, 255, 255, 0.3);
}

.dark-theme{
    --primary-color: #00d2d3;
    --primary-color-light: #057FFF;
    --primary-color-rgb: 0, 210, 211;
    --secondary-color: #6c757d;
    --background-dark-color: #0a0a0f;
    --background-dark-grey: #12121a;
    --border-color: #1e2235;
    --background-light-color: #F1F1F1;
    --background-light-color-2: rgba(0, 210, 211, .15);
    --white-color: #e8e8f0;
    --font-light-color: #a4acc4;
    --font-dark-color: #313131;
    --font-dark-color-2: #151515;
    --sidebar-dark-color: #08080d;
    --scrollbar-bg-color: #12121a;
    --scrollbar-thump-color: #2a2d42;
    --scrollbar-track-color: #12121a;
    --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    --card-hover-shadow: 0 8px 30px rgba(0, 210, 211, 0.1);
    --primary-code-color-property: #007bff;
    --primary-code-color-keyword: #007bff;
    --primary-code-color-function: #eeff31;
    --primary-code-color-string: #24e33a;
    --primary-code-color-bracket: #ffffff;
    --underlay-text-color: #0e1018;
    --gradient-primary: linear-gradient(135deg, #00d2d3 0%, #0084ff 100%);
    --glass-bg: rgba(10, 10, 15, 0.6);
    --glass-border: rgba(30, 34, 53, 0.5);
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
    font-family: 'Nunito', sans-serif;
    font-size: 1.1rem;
}

html{
    scroll-behavior: smooth;
}

body{
    background-color: var(--background-dark-color);
    color: var(--font-light-color);
    transition: background-color 0.5s ease, color 0.4s ease;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
    font-size: 1rem;
    transition: color 0.3s ease;
}

h1{
    font-size: 4rem;
    color: var(--white-color);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.1;
    span{
        font-size: inherit;
        @media screen and (max-width: 768px){
            font-size: 3rem;
        }
        @media screen and (max-width: 502px){
            font-size: 2.2rem;
        }
    }
    @media screen and (max-width: 768px){
        font-size: 3rem;
    }
    @media screen and (max-width: 502px){
        font-size: 2.2rem;
    }
}

h2{
    font-weight: 700;
    letter-spacing: -0.01em;
}

h5{
    font-size: 1.5rem;
    color: var(--white-color);
    font-weight: 600;
    span{
        font-size: 1.5rem;
        @media screen and (max-width: 502px){
            font-size: 1.3rem;
        }
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
    transform: translateY(30px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
.reveal.visible{
    opacity: 1;
    transform: translateY(0);
}

// Theme Toggle Button
.theme-toggle-btn{
    position: fixed;
    right: 1.5rem;
    top: 1.5rem;
    width: 3rem;
    height: 3rem;
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
@media screen and (max-width: 1200px){
    .theme-toggle-btn{
        right: 5rem;
        top: 1rem;
    }
}
@media screen and (max-width: 502px){
    .theme-toggle-btn{
        width: 2.5rem;
        height: 2.5rem;
        right: 4.5rem;
        top: 0.8rem;
        svg{
            font-size: 1.1rem;
        }
    }
}

// Nav Overlay
.nav-overlay{
    position: fixed;
    top: 0;
    left: 0;
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
    right: 1.5rem;
    top: 0.8rem;
    display: none;
    z-index: 25;
    svg{
        font-size: 2.2rem;
        color: var(--primary-color);
        transition: transform 0.3s ease;
    }
}
.nav-toggle{
    transform: translateX(0);
    z-index: 20;
}
@media screen and (max-width: 1200px){
    .ham-burger-menu{
        display: block;
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