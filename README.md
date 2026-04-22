# sufyanjami.github.io

Personal portfolio for Sufyan Jami — Full Stack Developer & Founder of Fairview Software.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui (base-ui under the hood)
- `next-themes` for light/dark mode
- JetBrains Mono via `next/font/google`
- Static export (`output: "export"`) — deploys as static HTML/CSS/JS for GitHub Pages

## Scripts

```bash
npm run dev      # start dev server
npm run build    # build static export to ./out
npm run lint     # eslint
```

## Editing content

All copy, projects, jobs, products, tech stack — one file:

```
src/content/portfolio.ts
```

## Theming

Single source of truth for colors / radius / fonts:

```
src/app/globals.css
```

The brand accent color is `--brand` (cyan by default). Change it once and it
propagates everywhere — buttons, links, focus rings, prompt markers.

## Layout

- `src/app/*` — routes (App Router)
- `src/components/site/*` — layout primitives (NavBar, Footer, Container, Prompt, Socials, TechPill)
- `src/components/sections/*` — homepage sections (Hero, Fairview, Experience, Projects, TechStack)
- `src/components/ui/*` — shadcn primitives
- `src/components/icons/brand.tsx` — inline GitHub / LinkedIn SVGs (lucide dropped brand icons)
