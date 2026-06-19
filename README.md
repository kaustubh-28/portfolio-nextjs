# Kaustubh Srivastava — Portfolio

This is my personal portfolio, built with Next.js, Tailwind CSS v4, and Framer Motion. I went with a sort of "engineering systems" theme — sections are framed like dossiers, diagnostics, and telemetry readouts rather than the usual landing/about/projects layout.

**Live site:** [add deployed URL here]

## Stack

- Next.js (App Router)
- Tailwind CSS v4 — custom design tokens via `@theme`
- Framer Motion for animations
- lucide-react and @icons-pack/react-simple-icons for icons

## Project structure

```
app/
  page.tsx              — page composition
  layout.tsx            — root layout, fonts, metadata
  globals.css           — design tokens, base styles

components/
  ui/
    Navbar.tsx           — sticky nav with section links
    Footer.tsx           — footer, back-to-top
  sections/
    HeroSection.tsx
    AboutSection.tsx      — profile + tech stack
    ProjectsSection.tsx   — project dossiers
    BenchmarksSection.tsx — reaction time / typing tests
    TransmissionSection.tsx — contact section

data/
  meta.ts              — name, role, links
  skills.ts            — tech stack list
  projects.ts          — project data
```

## Running locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Notes

All the colours and design tokens live in `app/globals.css` under `@theme`, so the whole palette can be changed from one place. Components reference semantic tokens like `--color-accent` and `--color-text-primary` instead of hardcoded values.

Some of the project dossiers are still in development — links will be updated as those get built out.

## Deployment

Deployed on Vercel, auto-deploys on push to `main`.
