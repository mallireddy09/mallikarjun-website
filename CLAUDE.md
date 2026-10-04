# CLAUDE.md

Guidance for AI agents working in this repository.

## Project

Personal portfolio site for Mallikarjun Reddy (Senior Data Engineer & AI/ML Engineer), live at [mallireddy09.github.io/mallireddy09/](https://mallireddy09.github.io/mallireddy09/). Source code is in `mallireddy09/mallikarjun-website` on `main`.

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

CI on `main` runs `npm ci`, the tests, and `PUBLIC_URL=/mallireddy09 npm run build`, then publishes `./build` to the `gh-pages` branch of `mallireddy09/mallireddy09` using the `PAGES_DEPLOY_KEY` Actions secret. That publishing repository uses branch-based GitHub Pages from `gh-pages` at the root. The build path sets the assets and router basename.

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

Theme is `"dark-theme"` | `"light-theme"` on `document.documentElement` (CSS class). The sidebar starts open beside desktop content and can be collapsed with the three-dot toggle. Below 1201px or on touch devices, it starts closed and opens as an overlay drawer with a hamburger toggle. Content sections fit their content; the desktop hero fills at least one screen and grows to accommodate its text on shorter screens.

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
