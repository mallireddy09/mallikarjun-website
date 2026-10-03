# CLAUDE.md

Guidance for AI agents working in this repository.

## Project

Personal portfolio site for Mallikarjun Reddy (Senior Data Engineer & AI/ML Engineer), live at [mallikarjun.in](https://www.mallikarjun.in/).

- **Stack:** Create React App (`react-scripts` 5), React 18, React Router 6
- **Styling:** styled-components, CSS variables for light/dark themes, MUI icons/components
- **Effects:** react-particles / tsparticles, react-typed
- **Package name:** `profolio-mallikarjun`

## Commands

```bash
npm install          # install dependencies
npm start            # dev server (http://localhost:3000)
npm run build        # production build → ./build
npm test             # Jest via react-scripts
```

CI on `mallikarjun-website` runs `npm ci`, the tests, and `npm run build`, then deploys `./build` directly to GitHub Pages using the official Pages actions. Set the repository's Pages publishing source to GitHub Actions. The build uses the Pages base path for assets and the router basename.

## Layout

```
src/
  App.js                 # routes, theme toggle, sidebar shell
  index.js               # BrowserRouter entry
  Pages/                 # one page component per route
  Components/            # shared UI (Sidebar, Title, cards, etc.)
  data/                  # static content (projects, blogs, certifications)
  styles/                # GlobalStyle, layout helpers
  hooks/                 # e.g. useScrollReveal
  helper/                # utilities (e.g. sphere)
public/                  # static assets, index.html, .htaccess
.github/workflows/       # deploy pipeline
```

## Routes

| Path | Page |
|------|------|
| `/` | HomePage |
| `/about` | AboutPage |
| `/skills` | SkillsPage |
| `/experience` | ExperiencePage |
| `/education` | EducationPage |
| `/projects` | ProjectsPage |
| `/blogs` | BlogsPage |
| `/certification` | CertificationPage |
| `/contact` | ContactPage |

Theme is `"dark-theme"` | `"light-theme"` on `document.documentElement` (CSS class). Sidebar collapses below 1200px; hamburger + overlay handle mobile nav.

## Conventions

- Prefer editing existing page/component patterns over introducing new libraries.
- Portfolio **content** (jobs, projects, blogs, certs) lives in `src/data/` or inline in page components — update data files when changing listed items.
- Keep styled-components colocated with the component that uses them (see `App.js`).
- Do not eject CRA unless explicitly asked.
- Do not commit `node_modules/` or `build/`.

## Out of scope unless asked

- Changing deploy branch/workflow secrets
- Ejecting from Create React App
- Rewriting the design system from scratch
