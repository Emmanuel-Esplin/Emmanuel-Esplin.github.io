# Emmanuel Esplin · CV & Portfolio

Personal CV and project portfolio for a Business Informatics graduate focused on data and automation.
Built with [Astro](https://astro.build) + TypeScript and hosted free on GitHub Pages.

**Live:** <https://emmanuel-esplin.github.io> · **Printable CV:** <https://emmanuel-esplin.github.io/cv>

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static site in dist/
npx astro check    # type-check
```

## Update content

All content lives in two files; components only render it.

| File | What it holds |
| --- | --- |
| `src/data/cv.ts` | Profile, education & modules, experience, certifications, skills |
| `src/data/projects.ts` | Featured GitHub projects (stats are fetched at build time) |

Empty fields are hidden, so nothing half-finished shows. Search for `TODO` in `src/data/cv.ts` to find what still needs filling in.

## Structure

```text
src/
├─ data/          # CV and project content
├─ components/    # one component per page section
├─ scripts/       # flowfield.ts: generative hero background
├─ layouts/       # Base.astro: SEO, fonts, scroll reveal
├─ pages/         # index.astro (portfolio), cv.astro (print / ATS CV)
└─ styles/        # global.css: HUD theme tokens
```

## Deployment

Every push to `main` runs `.github/workflows/deploy.yml`, which builds and deploys to GitHub Pages.
It also rebuilds every Monday so the project stats stay current.
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
