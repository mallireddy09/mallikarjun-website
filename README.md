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

Pushes to `main` trigger [`.github/workflows/publish.yml`](.github/workflows/publish.yml), which builds the app and publishes the output to the `build` branch for GitHub Pages.

## License

Private portfolio project.
