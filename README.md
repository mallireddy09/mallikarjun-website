# Mallikarjun Reddy — Portfolio

Personal portfolio for Mallikarjun Reddy — Data Engineer & AI/ML Engineer. The site showcases experience, skills, education, projects, articles, and certifications.

**Live site:** [mallireddy09.github.io/mallireddy09/](https://mallireddy09.github.io/mallireddy09/)

**Source repository:** [mallireddy09/mallikarjun-website](https://github.com/mallireddy09/mallikarjun-website) · **Source branch:** `main`

## Features

- One continuous portfolio page with instant sidebar navigation and content that smoothly reveals on scroll
- Sidebar open by default beside desktop content, with a three-dot toggle; phones/tablets start closed with a hamburger toggle
- Light and dark themes, particle effects, and animated role text
- The skills sphere pauses off-screen and in hidden tabs, with a static view for reduced motion
- A split hero with a live top-to-bottom data pipeline, 3D icons, matching circular Resume/social buttons, and an engineering impact bar
- Three-paragraph About narrative with a liquid-glass engineering principles card
- A compact skills sphere, interactive pipeline stages with typed descriptions, and six expandable skill groups linked to official documentation
- Rounded project cards with category filters, clickable image/title links, a 3D finance phone and pie chart, and an animated SpaceX launch/landing preview
- Platform-specific 3D previews for GitHub, LinkedIn, X, and the resume, using mouse hover or touch dialogs with destination links
- Animated navigation icons, an emerging profile portrait, and company scenes for NVIDIA, Microsoft, The Home Depot, and Uber
- Seven selected certifications, controlled by `src/data/certification.ts`
- A liquid-glass contact panel with an animated mail link and a copy-email confirmation that resets after ten seconds

## Stack

- React 19.3.1 + TypeScript 7.0.2/TSX + Vite 8.3.5
- React Router 7
- styled-components 6.6 + MUI 9.5
- @tsparticles/react + @tsparticles/slim 4.4, react-typed
- Vitest 5.0.5 + Playwright 1.64.1

Direct dependencies are pinned to stable releases checked on October 25, 2026. Node.js uses the latest 24.x LTS patch, with `@types/node` kept on the matching 24.x release line. The workflow uses Ubuntu 24.04 LTS and SHA-pinned Actions with Node 24 runtimes. Dependency versions and their complete resolved tree are recorded in `package.json` and `package-lock.json`.

## Getting started

Use Node.js 24.22.1 LTS (pinned in `.nvmrc`) and npm 12.2.1 to match the deployment workflow. Dependency lifecycle scripts are disabled by `.npmrc`; the build works without them.

```bash
git clone https://github.com/mallireddy09/mallikarjun-website.git
cd mallikarjun-website
nvm install
nvm use
npm install --global npm@12.2.1 --ignore-scripts
npm ci
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Development server |
| `npm run typecheck` | Strict TypeScript checks, including tests |
| `npm run build` | Production build to `./build` |
| `npm test` | Run tests once |
| `npm run test:watch` | Watch tests during development |
| `npm run audit` | Check all dependencies for known vulnerabilities |
| `npm run preview` | Preview the production build |
| `npm run test:browser` | Test the production build in desktop/mobile Chromium |

To build locally with the live site's asset and router path:

```bash
PUBLIC_URL=/mallireddy09 npm run build
```

For production-browser checks, run `npx --no-install playwright install chromium`, build with `PUBLIC_URL=/mallireddy09 npm run build`, then run `npm run test:browser`. These checks exercise the actual bundle, navigation, and CSP enforcement.

## Site structure

The menu and page use the same typed section registry, so their order stays aligned. The site uses hash links to scroll between sections on the same page. Append these anchors to the live URL:

| Anchor | Section |
|-------|---------|
| `#home` | Home |
| `#about` | About |
| `#experience` | Experience |
| `#projects` | Projects |
| `#skills` | Skills |
| `#certifications` | Certifications |
| `#education` | Education |
| `#blogs` | Blogs |
| `#contact` | Contact |

Old `/certification` and `#certification` links resolve to `#certifications`. Legacy section routes preserve query strings when normalized. Deep links wait for font layout.

## Updating content

| Location | Content |
|----------|---------|
| `src/data/profile.ts` | Name, summaries, roles, engineering principles, email, social links, and resume URL |
| `src/data/experience.ts`, `src/data/companies.ts` | Work experience and company details |
| `src/data/education.ts`, `src/data/skills.ts` | Education and skills |
| `src/data/projects.ts`, `src/data/blogs.ts`, `src/data/certification.ts` | Projects, articles, and certifications |
| `src/data/sections.ts` | Section order and navigation labels |
| `src/data/projectDemo.ts` | Fixed finance snapshots, tab timing, bill calculations, pie percentages, and synchronized rocket telemetry |
| `src/data/pipeline.ts` | Pipeline definitions and examples |
| `src/Pages/` | Section components |
| `src/Components/`, `src/styles/` | Shared components, layouts, and styling |
| `public/brand-mr-squared.svg`, `public/*mr2*` | Shared MR² artwork, favicons, and app icons |

React components and tests use `.tsx`; data, helpers, hooks, and styles use `.ts`. `tsconfig.json` enables strict checking, and `src/types/portfolio.ts` holds shared content and theme types.

### Interactive previews

The finance and rocket previews use simulated demo data; they do not connect to financial accounts or flight services.

- The finance phone cycles through Friends, Groups, and Activity every 4.2 seconds. Amounts stay fixed within each tab. On tab changes, the phone rows, total, monthly snapshot, and pie update together.
- The phone’s “Total balance” and the monthly snapshot’s main amount show the sum of the visible bills. Income and saved amount are separate; saved equals income minus bills. For Activity, `$880 + $230 + $415 = $1,525`.
- The 3D pie keeps a fixed orientation. Its slices and labels match the visible rows, and rounded percentages total 100%. The finance SVG recalculates only when the tab changes.
- Rocket position, altitude, vertical speed, exhaust, and smoke share one timeline. Altitude and speed reach zero at touchdown.
- Project playback pauses off screen and in hidden browser tabs. Reduced motion shows static previews; the hero scroll cue also stops animating.
- Pipeline hover previews leave navigation clear. Clicking or tapping a stage opens a modal that locks background scrolling while allowing its own content to scroll.

Artwork details and prompts are in [live project previews](docs/artwork/live-project-previews.md), [company scenes](docs/artwork/company-scenes.md), and the [profile prompt](docs/artwork/profile-3d.prompt.txt).

### Verification

```bash
npm run typecheck
npm test
PUBLIC_URL=/mallireddy09 npm run build
npm run test:browser
npm run audit
```

Unit tests cover calculations and avoiding unnecessary finance renders. Playwright checks desktop and phone layouts, both themes, reduced-motion changes, profile links, modal scrolling, project tab totals and pie proportions, synchronized rocket motion, asset loading, and production CSP. Hover-only cases are skipped on touch devices. Browser checks use Chromium; they do not establish Safari or Firefox compatibility. There is no separate lint script; TypeScript checks unused declarations and parameters.

### Build and TypeScript configuration

Vite builds from the root `index.html` into `build/`. TypeScript uses `moduleResolution: "bundler"`; Vitest runs the existing component and helper tests with jsdom. `PUBLIC_URL=/mallireddy09` sets Vite's base path and React Router's basename together.

The development and preview servers bind to loopback by default. Do not expose them as production servers. Only the contents of `build/` belong on the public host.

`npm run typecheck` also checks for unused local declarations and parameters. Before deleting assets, check application imports, CSS, HTML metadata, and manifest references: the MR² share image and app icons are used outside React components.

### Reusing existing code

- Use `src/helper/navigation.ts` for section scrolling; sidebar links, home buttons, and deep links share this implementation.
- Use `ExternalLink` for links that open in a new tab and `IconLinks` for lists of icon links.
- Use `Title` with `animated` for section headings, `GalleryPage` for image/text galleries, and `ResumeTimeline` for work and education entries.
- The project category `Button` is controlled by the selection in `ProjectsPage`.
- Reuse `src/styles/shared.ts` for glass surfaces and gradient text, and `src/styles/media.ts` for the desktop/drawer breakpoint.
- Reuse `PrimaryButton` for outline CTAs; use `showDownloadIcon` for the resume action.
- Use `publicAsset()` from `src/helper/publicAsset.ts` for public image URLs, including SVG images and CSS backgrounds, so they work under the deployment base path.
- The 3D artwork in `public/images/3d/` uses compressed WebP/JPEG images and transparent PNG cutouts where needed. Keep small icons at roughly 2–3 times their CSS dimensions; reserve larger assets for project illustrations. Timeline company logos load lazily.
- Scroll reveals respect reduced motion and reveal focused content immediately. Pipeline typing remains separate from these entrance effects.
- Each skill appears once in `src/data/skills.ts`; AWS IAM and GCP IAM retain their distinct documentation links. Linux belongs in DevOps, transformation tools in orchestration, and monitoring tools in observability.

## Contact

- Email: [mallireddy0912@gmail.com](mailto:mallireddy0912@gmail.com)
- LinkedIn: [mallireddy09](https://www.linkedin.com/in/mallireddy09/)
- X: [@mallireddy09](https://x.com/mallireddy09)

## Deploy

The current app version is `0.1.1`. Release tags use `v<version>` and match `package.json`. Production builds include `version.json` with the version and, in GitHub Actions, the source commit SHA.

Pushes to `main` in `mallireddy09/mallikarjun-website` trigger [`.github/workflows/publish.yml`](.github/workflows/publish.yml). The workflow runs on pull requests and pushes to `main`. Its `verify` job installs with lifecycle scripts disabled, audits every dependency, checks TypeScript, runs tests, and builds with `PUBLIC_URL=/mallireddy09`. Both jobs use Ubuntu 24.04 LTS with immutable Action commit pins and Node 24 Action runtimes. A separate `deploy` job runs only for `main`, downloads the verified build artifact, and publishes the generated files to the `gh-pages` branch of [mallireddy09/mallireddy09](https://github.com/mallireddy09/mallireddy09).

In the `mallireddy09/mallireddy09` repository's **Settings → Pages**, select **Deploy from a branch**, then **gh-pages** and **/ (root)**. The site URL is [mallireddy09.github.io/mallireddy09/](https://mallireddy09.github.io/mallireddy09/).

The source repository's `PAGES_DEPLOY_KEY` Actions secret contains a deploy key with write access to the publishing repository. The workflow uses `peaceiris/actions-gh-pages`, pinned to its v4.1.0 commit, to publish across repositories. The code remains in `mallikarjun-website`; `mallireddy09` holds the published build so the site's URL keeps the requested path.

`PUBLIC_URL` sets the asset paths and router basename. The workflow also creates `404.html` for older section URLs such as `/about`. Generated `build/` files are not committed to the source repository.

## Security controls

- `.npmrc` disables dependency lifecycle scripts. Keep this policy enabled for installs and CI; review any future exception before running it.
- CI fails on any reported dependency vulnerability. Dependabot checks npm dependencies and pinned GitHub Actions weekly.
- All workflow actions are pinned to commit SHAs. Checkout credentials are not persisted; the deployment key is available only in the separate publishing job, which runs no application or dependency scripts.
- Production HTML includes a Content Security Policy: scripts are restricted to the site and the exact JSON-LD hash, objects and form posts are blocked, and external image/font origins are allowlisted. Inline styles remain allowed for MUI/styled-components. Development HTML omits this production policy for Vite's development runtime.
- `.env*` and private-key files are ignored, except `.env.example`. Never put secrets into `VITE_*` variables: those are public client-side values.
- GitHub Pages enforces HTTPS and supplies HSTS. It does not provide configurable HTTP response headers. CSP `frame-ancestors`, `X-Content-Type-Options`, and `Permissions-Policy` require a host or reverse proxy supporting custom response headers; putting them in a meta tag or a `_headers` file does not configure GitHub Pages.
