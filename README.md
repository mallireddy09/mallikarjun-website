# Mallikarjun Reddy — Portfolio

Personal portfolio for Mallikarjun Reddy — Data Engineer & AI/ML Engineer. The site showcases experience, skills, education, projects, articles, and certifications.

**Live site:** [mallireddy09.github.io/mallireddy09/](https://mallireddy09.github.io/mallireddy09/)

**Source repository:** [mallireddy09/mallikarjun-website](https://github.com/mallireddy09/mallikarjun-website) · **Source branch:** `main`

## Features

- One continuous portfolio page with section navigation and smooth scrolling
- Sidebar open by default beside desktop content, with a three-dot toggle; phones/tablets start closed with a hamburger toggle
- Light and dark themes, particle effects, and animated role text
- The skills sphere pauses off-screen and in hidden tabs, with a static view for reduced motion
- A centered hero with an outline Resume button, compact social links, and an engineering impact bar using the Experience logos
- Three-paragraph About narrative with a Key Highlights card
- Six skills sections with every skill linked to official documentation in a new tab
- Project category filters
- GitHub, LinkedIn, X, and resume links
- Contact section with email, location, and a validated form that opens the visitor's email client

## Stack

- React 18 + TypeScript/TSX + Create React App
- React Router 6
- styled-components + MUI
- react-particles / tsparticles, react-typed

## Getting started

Use Node.js 24 and npm to match the deployment workflow.

```bash
git clone https://github.com/mallireddy09/mallikarjun-website.git
cd mallikarjun-website
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
| `npm test` | Run tests |
| `npm test -- --watchAll=false --runInBand` | Run tests once, as in CI |

To build locally with the live site's asset and router path:

```bash
PUBLIC_URL=/mallireddy09 npm run build
```

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

Old `/certification` and `#certification` links resolve to `#certifications`. Legacy section routes preserve query strings when normalized. Deep links wait for font layout, and the stats card reserves its space while loading.

## Updating content

| Location | Content |
|----------|---------|
| `src/data/profile.ts` | Name, summaries, roles, email, location, social links, and resume URL |
| `src/data/experience.ts`, `src/data/companies.ts` | Work experience and company details |
| `src/data/education.ts`, `src/data/skills.ts` | Education and skills |
| `src/data/projects.ts`, `src/data/blogs.ts`, `src/data/certification.ts` | Projects, articles, and certifications |
| `src/data/sections.ts` | Section order and navigation labels |
| `src/Pages/` | Section components |
| `src/Components/`, `src/styles/` | Shared components, layouts, and styling |
| `public/brand-mr-squared.svg`, `public/*mr2*` | Shared MR² artwork, favicons, and app icons |

React components and tests use `.tsx`; data, helpers, hooks, and styles use `.ts`. `tsconfig.json` enables strict checking, and `src/types/portfolio.ts` holds shared content and theme types.

### Reusing existing code

- Use `src/helper/navigation.ts` for section scrolling; sidebar links, home buttons, and deep links share this implementation.
- Use `ExternalLink` for links that open in a new tab and `IconLinks` for lists of icon links.
- Use `Title` with `animated` for section headings, `GalleryPage` for image/text galleries, and `ResumeTimeline` for work and education entries.
- Use `FormField` for labeled inputs and textareas. The project category `Button` is controlled by the selection in `ProjectsPage`.
- Reuse `src/styles/shared.ts` for glass surfaces and gradient text, and `src/styles/media.ts` for the desktop/drawer breakpoint.
- Reuse `PrimaryButton` for outline CTAs; use `showDownloadIcon` for the resume action.
- Each skill appears once in `src/data/skills.ts`; AWS IAM and GCP IAM retain their distinct documentation links. Linux belongs in DevOps, transformation tools in orchestration, and monitoring tools in observability.

## Contact

- Email: [mallireddy0912@gmail.com](mailto:mallireddy0912@gmail.com)
- LinkedIn: [mallireddy09](https://www.linkedin.com/in/mallireddy09/)
- X: [@mallireddy09](https://x.com/mallireddy09)

## Deploy

Pushes to `main` in `mallireddy09/mallikarjun-website` trigger [`.github/workflows/publish.yml`](.github/workflows/publish.yml). The workflow installs dependencies with `npm ci`, checks TypeScript, runs tests, builds with `PUBLIC_URL=/mallireddy09`, and publishes the generated files to the `gh-pages` branch of [mallireddy09/mallireddy09](https://github.com/mallireddy09/mallireddy09).

In the `mallireddy09/mallireddy09` repository's **Settings → Pages**, select **Deploy from a branch**, then **gh-pages** and **/ (root)**. The site URL is [mallireddy09.github.io/mallireddy09/](https://mallireddy09.github.io/mallireddy09/).

The source repository's `PAGES_DEPLOY_KEY` Actions secret contains a deploy key with write access to the publishing repository. The workflow uses `peaceiris/actions-gh-pages`, pinned to its v4 commit, to publish across repositories. The code remains in `mallikarjun-website`; `mallireddy09` holds the published build so the site's URL keeps the requested path.

`PUBLIC_URL` sets the asset paths and router basename. The workflow also creates `404.html` for older section URLs such as `/about`. Generated `build/` files are not committed to the source repository.
