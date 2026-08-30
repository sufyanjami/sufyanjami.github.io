# sufyanjami.github.io

Personal portfolio for Sufyan Jami | Full Stack Developer.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 + shadcn/ui (base-ui under the hood)
- Custom theme provider, where the `dark` class on `<html>` is the source of
  truth, set by a pre-paint inline script and read via `useSyncExternalStore`
- JetBrains Mono via `next/font/google`
- Static export (`output: "export"`), deployed as static HTML/CSS/JS on GitHub Pages

## Scripts

```bash
npm run dev        # start dev server (regenerates images first)
npm run build      # build static export to ./out (regenerates images first)
npm run images     # regenerate public/*.webp and public/og.png
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

`lint` and `typecheck` also run in CI before the deploy build.

## Editing content

All copy, projects, jobs, products, and tech stack live in one file:

```
src/content/portfolio.ts
```

Name, title, location, email, and canonical URL live in `src/content/site.mjs`,
because the plain-Node build scripts need them too and cannot import TypeScript.

A project renders as a card everywhere; adding a `detail` block is what
generates its `/project/<slug>` page. Fairview products live in
`fairviewProjects` and are the same `Project` type, plus an optional
`tagline`, `status`, and `pricing`.

## Images

The full-resolution source photo lives in `assets/`, deliberately **outside**
`public/`, so the multi-megabyte original never ships in the static export.
`scripts/optimize-images.mjs` crops and resizes it into `public/*.webp`, and
`scripts/generate-og.mjs` renders the 1200x630 social card to `public/og.png`.
Both run automatically before `dev` and `build`, and both outputs are
gitignored. `assets/` is the thing under version control.

To change how a photo is cropped, edit the `position` field in
`scripts/optimize-images.mjs` (`"attention"`, `"top"`, `"center"`, …).

## Theming

Single source of truth for colors / radius / fonts:

```
src/app/globals.css
```

The brand accent color is `--brand` (warm sienna by default). Change it once
and it propagates everywhere: buttons, links, focus rings, prompt markers. The
OG card's palette mirrors the dark theme's value in `src/content/site.mjs`.

## Layout

- `src/app/*`: routes (App Router), plus `sitemap.ts` and `robots.ts`
- `src/components/site/*`: layout primitives (NavBar, Footer, Container, Prompt, Socials, TechPill)
- `src/components/sections/*`: homepage sections (Hero, Fairview, Experience, Projects, TechStack)
- `src/components/ui/*`: shadcn primitives
- `src/components/icons/brand.tsx`: inline GitHub / LinkedIn SVGs (lucide dropped brand icons)
- `scripts/*`: build-time asset generation

## License

Code is MIT (see `LICENSE`). The personal content (bio copy, résumé, and
photographs) is not covered; please don't reuse it.
