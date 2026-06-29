# Faeez Kader — Developer Portfolio

A cinematic, dark-mode developer portfolio built as a premium product-launch experience.
Real-time 3D, scroll storytelling, and a clean component architecture.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion (`motion`) ·
Three.js + React Three Fiber + Drei + Postprocessing · Lenis smooth scroll.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

> First load compiles the 3D scene — give it a second. Add `?lite` to the URL
> (`localhost:3000/?lite`) to disable the WebGL scenes (useful on low-power devices or for screenshots).

## What's inside

| Section | Highlights |
|---|---|
| **Hero** | R3F scene — distorted-metal crystal, particle field, neon circuit grid, **bloom** post-processing, mouse parallax. Animated role cycler, glass UI, scroll indicator. |
| **About** | Bio + animated metric counters. |
| **Skills** | 3D tech sphere (R3F points) + interactive category graph (Frontend, Backend, AI/ML, Cybersecurity, Data, Cloud, PM, UI/UX). |
| **Experience** | Scroll-animated progress timeline. |
| **Projects** | 3D tilt cards, animated filtering, device mockups, tech badges, status. |
| **Education** | Degrees + certifications / learning paths. |
| **Contact** | Glowing mailto form, copy-email animation, socials, availability. |

Plus: futuristic **preloader**, **scroll-progress** bar, Lenis **smooth scrolling**,
SEO metadata + OpenGraph, `sitemap.ts` / `robots.ts`, reduced-motion + mobile fallbacks.

## Editing content

**All content lives in [`lib/data.ts`](lib/data.ts)** — profile, bio, roles, skills,
experience, education, certifications, projects, socials. Edit there; no component changes needed.

## Architecture

```
app/            layout (fonts, SEO), page (section assembly), globals.css, sitemap, robots
components/
  three/        HeroScene, SkillSphere   (R3F, client-only, dynamically imported)
  sections/     Hero, About, Skills, Experience, Projects, Education, Contact
  ...           Navbar, Preloader, SmoothScroll, Reveal, Counter, TiltCard, RoleCycler, Footer
lib/            data.ts (content), icons.tsx
```

3D scenes are loaded with `next/dynamic({ ssr: false })` and gated behind reduced-motion,
mobile (low quality), and `?lite`, so the site degrades gracefully and never blocks first paint.

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. Import it on [vercel.com/new](https://vercel.com/new) — framework auto-detected (Next.js).
3. (Optional) set `NEXT_PUBLIC_SITE_URL` to your domain (see `.env.example`), then redeploy.

No environment variables are required for the base site.
