# Kaustubh Srivastava — Portfolio

This is my personal portfolio, built with Next.js, Tailwind CSS v4, and Framer Motion. I went with a sort of "engineering systems" theme — sections are framed like dossiers, diagnostics, and telemetry readouts rather than the usual landing/about/projects layout.


## Live Site
Visit the live portal here: _[coming soon]_ 

---

## Tech Stack & Architecture

- **Framework**: Next.js (App Router, static optimizations)
- **Styling**: Tailwind CSS v4 (Clean semantic utility classes mapped via custom `@theme` layer)
- **Animations**: Framer Motion (Optimized entrance variants, wait transitions, and micro-interactive gestures)
- **Icons**: Lucide React & Icons Pack (Simple Icons)

---

## Key Features

1. **System Telemetry Monitor**: Interactive technical assets dashboard. Hovering or focusing keys lists metrics in a dedicated display node. Users can **click** to lock/unlock specific telemetries in place. Fully optimized with `aria-live` polite status regions for screen readers.
2. **Reflex Diagnostic Test (F1 Lights)**: Interactive reaction benchmark simulating F1 start lights. Tracks attempts, stores personal best reaction times in `localStorage`, and provides performance ratings (`ELITE` | `GOOD` | `AVERAGE` | `SLOW`).
3. **Ingestion Stream Typing Test**: Live keyboard performance metric test featuring **inline character highlighting**. Highlights correct typing inputs in white, incorrect keystrokes in underlined red, and remaining characters in muted gray.
4. **Universal Constants Layout**: Consolidated system numbers, intervals, local storage keys, and page routing layouts in a central configuration module to avoid magic numbers and maintain high DRY standards.

---

## Project Structure

```
├── app/
│   ├── layout.tsx            # Root layout, Google fonts subsets, metadata
│   ├── page.tsx              # Main section composition
│   ├── globals.css           # Tailwind v4 theme configurations & base overrides
│   └── fonts.tsx             # Sora, Space Grotesk, and JetBrains Mono configurations
├── components/
│   ├── ui/
│   │   ├── Navbar.tsx        # Sticky navigation with dynamic section links
│   │   ├── Footer.tsx        # Footer with back-to-top button
│   │   └── BackgroundGrid.tsx# Grid-vignette style background layer
│   └── sections/
│       ├── HeroSection.tsx   # Intro, brief, action link buttons
│       ├── AboutSection.tsx  # Telemetry interactive skills matrix
│       ├── ProjectsSection.tsx# Project file dossiers console
│       ├── BenchmarksSection.tsx# F1 Reflex & Ingestion Typing speed tests
│       └── ContactMeSection.tsx# Open connection terminal simulator
├── data/
│   ├── constants.ts          # Centralized configuration variables & routing details
│   ├── profile.ts            # About me profile paragraphs
│   ├── experience.ts         # Professional career history dossiers
│   ├── projects.ts           # Project systems array
│   ├── skills.ts             # Telemetry skills mapping
│   ├── meta.ts               # Core SEO meta details
│   └── typingPrompts.ts      # Target prompts list for typing test
```

---

## Running Locally

To run this application in your development environment:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## Theme & Customization
All styling values, semantic colors, and font families are defined under `@theme` inside [globals.css](file:///Users/kaustubhsrivastava/Documents/Projects/kaustubh-portfolio/frontend/portfolio-v1/app/globals.css). 

Flip theme configurations quickly between Light and Dark data-themes seamlessly by modifying the semantic theme maps. The components cleanly bind to semantic classes like `text-primary`, `text-muted`, `bg-background`, and `border-surface` rather than inline CSS variable escapes.
