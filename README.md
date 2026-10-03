# Mallikarjun Reddy — Portfolio

Personal portfolio site for [Mallikarjun Reddy](https://www.mallikarjun.in/) — Senior Data Engineer & AI/ML Engineer.

## Stack

- React 18 + Create React App
- React Router 6
- styled-components + MUI
- react-particles / tsparticles, react-typed

## Getting started

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Development server |
| `npm run build` | Production build to `./build` |
| `npm test` | Run tests |

## Site structure

| Route | Section |
|-------|---------|
| `/` | Home |
| `/about` | About |
| `/skills` | Skills |
| `/experience` | Experience |
| `/education` | Education |
| `/projects` | Projects |
| `/blogs` | Blogs |
| `/certification` | Certifications |
| `/contact` | Contact |

Static content for projects, blogs, and certifications lives under `src/data/`.

## Deploy

Pushes to `mallikarjun-website` trigger [`.github/workflows/publish.yml`](.github/workflows/publish.yml), which tests, builds, and deploys the site directly to GitHub Pages using GitHub Actions.

In the repository's **Settings → Pages**, select **GitHub Actions** as the publishing source. The default site URL is [mallireddy09.github.io/website/](https://mallireddy09.github.io/website/).

The build uses the Pages base path for assets and routing, so it also supports a custom domain configured in GitHub Pages. Section links use hashes; `404.html` provides a fallback for older section URLs.

## License

Private portfolio project.
