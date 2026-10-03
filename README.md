# Mallikarjun Reddy — Portfolio

Personal portfolio for Mallikarjun Reddy — Data Engineer & AI/ML Engineer. The site showcases experience, skills, education, projects, articles, and certifications.

**Live site:** [mallireddy09.github.io/mallireddy09/](https://mallireddy09.github.io/mallireddy09/)

**Repository:** [mallireddy09/mallireddy09](https://github.com/mallireddy09/mallireddy09/tree/mallikarjun-website) · **Website branch:** `mallikarjun-website`

## Features

- One continuous portfolio page with section navigation and smooth scrolling
- Responsive sidebar and mobile menu
- Light and dark themes, particle effects, and animated role text
- Project category filters
- GitHub, LinkedIn, X, and resume links
- Contact section with email, location, and a form that opens the visitor's email client

## Stack

- React 18 + Create React App
- React Router 6
- styled-components + MUI
- react-particles / tsparticles, react-typed

## Getting started

Use Node.js 24 and npm to match the deployment workflow.

```bash
git clone --branch mallikarjun-website https://github.com/mallireddy09/mallireddy09.git
cd mallireddy09
npm ci
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Development server |
| `npm run build` | Production build to `./build` |
| `npm test` | Run tests |
| `npm test -- --watchAll=false --runInBand` | Run tests once, as in CI |

To build locally with the live site's asset and router path:

```bash
PUBLIC_URL=/mallireddy09 npm run build
```

## Site structure

The site uses hash links to scroll between sections on the same page. Append these anchors to the live URL:

| Anchor | Section |
|-------|---------|
| `#home` | Home |
| `#about` | About |
| `#skills` | Skills |
| `#experience` | Experience |
| `#education` | Education |
| `#projects` | Projects |
| `#blogs` | Blogs |
| `#certification` | Certifications |
| `#contact` | Contact |

## Updating content

| Location | Content |
|----------|---------|
| `src/data/profile.js` | Name, summaries, roles, email, location, social links, and resume URL |
| `src/data/experience.js`, `src/data/companies.js` | Work experience and company details |
| `src/data/education.js`, `src/data/skills.js` | Education and skills |
| `src/data/projects.js`, `src/data/blogs.js`, `src/data/certification.js` | Projects, articles, and certifications |
| `src/data/sections.js` | Section order and navigation labels |
| `src/Pages/` | Section components |
| `src/Components/`, `src/styles/` | Shared components, layouts, and styling |

## Contact

- Email: [mallireddy0912@gmail.com](mailto:mallireddy0912@gmail.com)
- LinkedIn: [mallireddy09](https://www.linkedin.com/in/mallireddy09/)
- X: [@mallireddy09](https://x.com/mallireddy09)

## Deploy

Pushes to `mallikarjun-website` in `mallireddy09/mallireddy09` trigger [`.github/workflows/publish.yml`](.github/workflows/publish.yml). The workflow installs dependencies with `npm ci`, runs tests, builds the site, and deploys `build/` to GitHub Pages using the official Pages actions.

In the `mallireddy09/mallireddy09` repository's **Settings → Pages**, select **GitHub Actions** as the publishing source. The site URL is [mallireddy09.github.io/mallireddy09/](https://mallireddy09.github.io/mallireddy09/).

The `github-pages` environment must allow deployments from `mallikarjun-website`. This branch contains the portfolio application; the repository's `main` branch retains the GitHub profile README and earlier site files.

The workflow derives `PUBLIC_URL` from the Pages configuration, which sets the asset paths and router basename. It also creates `404.html` for older section URLs such as `/about`. Generated `build/` files are deployed as an artifact and are not committed.
