<div align="center">

# Daniel Gordon — Portfolio

### A production-grade portfolio that is itself an engineering artifact.

Built from scratch in React. No site builder, no UI kit, no CSS framework, no templates.
Every interaction, animation, and pixel is hand-authored and instrumented like a system I would deploy for a client.

[**▸ Live at danielgordon.vercel.app**](https://danielgordon.vercel.app)

![React](https://img.shields.io/badge/React-19-0C0F0E?style=flat-square&logo=react&logoColor=43D695)
![Remotion](https://img.shields.io/badge/Remotion-4.0-0C0F0E?style=flat-square&logoColor=43D695)
![Three.js](https://img.shields.io/badge/React_Three_Fiber-0C0F0E?style=flat-square&logo=three.js&logoColor=43D695)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0C0F0E?style=flat-square&logoColor=43D695)
![Vanilla CSS](https://img.shields.io/badge/Design_System-Hand--rolled_CSS-0C0F0E?style=flat-square&logoColor=43D695)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-0C0F0E?style=flat-square&logo=vercel&logoColor=white)
![Lighthouse](https://img.shields.io/badge/Lighthouse-100_A11y_·_100_SEO_·_100_Best_Practices-0C0F0E?style=flat-square&logoColor=43D695)

</div>

---

## Why this repo is worth a look

I am targeting **Forward Deployed Engineer** and field/solutions engineering roles. That work is about owning a system end to end: scoping it, building it, shipping it, instrumenting it, and being accountable for it in production.

I built this site the same way. It is not a Figma export or a Next.js starter with the colors changed. It is a single-page application where the interesting parts (a programmatically rendered title sequence, an interactive 3D systems globe, a WebGL-free 3D skill sphere, a cursor-reactive canvas field, a self-documenting observability dashboard) are all implemented by hand and then held to real performance, accessibility, and build-reproducibility budgets.

The site even documents its own infrastructure in a live "Mission Control" section, because how a thing is operated is part of the engineering, not an afterthought.

---

## Marquee technical work

### 🎬 A motion-graphics title sequence rendered in React (Remotion)
The hero is a 12-second cinematic intro composed entirely in code with [Remotion](https://remotion.dev) — a boot readout, a logo reveal with a metallic sheen sweep, live-counting telemetry tiles, and a closing tagline.

The non-obvious part: Remotion's `<Player>` drives its own clock from a `AudioContext` that browsers gate behind a user gesture, so it silently stalls at frame 0 on an autoplaying hero. I drive the frames myself with a `requestAnimationFrame` loop calling `seekTo()`, which plays reliably with no interaction. It is mounted full-bleed behind the hero on desktop, falls back to a framed "monitor" panel on mobile, and pauses when scrolled offscreen.
→ [`src/remotion/TitleSequence.js`](src/remotion/TitleSequence.js) · [`src/components/HeroMonitor.js`](src/components/HeroMonitor.js)

### 🌍 An interactive deployment-footprint globe (React Three Fiber)
A dotted-Earth globe plotting the real systems I have run: AWS and GCP regions, and the four Digital Research Alliance of Canada HPC clusters my research solver ran on (Trillium, Nibi, Fir, Rorqual), with animated arcs between them.

The continents are not a texture — at load time the component samples an equirectangular land mask and keeps only the fibonacci-sphere points that fall on land, with a sparse ocean layer so the sphere reads as a planet from every angle. Two-axis pointer-drag with inertia and a damped idle spin. The whole Three.js dependency is lazy-loaded only when the section scrolls into view.
→ [`src/components/SystemGlobe.js`](src/components/SystemGlobe.js)

### 🪐 A 3D skill sphere with zero WebGL
Forty-plus technologies orbit on a true 3D sphere built only from spherical-coordinate math and CSS 3D transforms. On hover it lerps every tag from its sphere position into a clean 2D grid. No Three.js, no canvas — just trigonometry and `transform: translate3d`.
→ [`src/components/SkillsSphere.js`](src/components/SkillsSphere.js)

### 🟢 A cursor-reactive canvas backdrop
The background is a live `<canvas>` grid that breathes with a slow ambient wave and bends away from the cursor like a gravity lens, with grid lines brightening as the pointer passes near them. Pure Canvas 2D, transform-smoothed, and it correctly composites *behind* the page content (a subtlety GPU Chrome gets wrong if you naively use a negative `z-index` layer with an opaque background).
→ [`src/components/HeroBackground.js`](src/components/HeroBackground.js)

### 📊 A self-documenting "Mission Control" dashboard
A bento grid that instruments the site itself: a simulated ops feed with a hand-rolled SVG sparkline and ticking latency/CPU readouts (clearly labelled as synthetic), an operational status tile, and an SVG flow diagram of how the site ships (`git push → GitHub → Vercel CI → Edge CDN → browser`). Plus animated SVG telemetry gauges with sprung needles and count-up readouts.
→ [`src/components/MissionControl.js`](src/components/MissionControl.js) · [`src/components/StatGauge.js`](src/components/StatGauge.js)

---

## Engineering rigor (the part recruiters actually care about)

Anyone can add animations. The discipline is keeping them fast, accessible, and reproducible.

| Concern | How it is handled |
| --- | --- |
| **Bundle discipline** | Main bundle ~143 KB gzipped. The two heavy dependencies — Three.js (~240 KB) and Remotion (~57 KB) — are code-split into lazy chunks that only download when their section is reached. |
| **Performance** | Lighthouse **100** on Accessibility, Best Practices, and SEO. Fonts are self-hosted (latin-subset `woff2`, preloaded), eliminating the Google Fonts round-trip and the late-swap repaint that was inflating LCP. Layout-shift reserved with `aspect-ratio` (CLS ≈ 0). |
| **Asset hygiene** | Source images are downscaled at build-prep time — the 1.4 MB brand logo ships as a 24 KB asset; a stray AVIF-mislabelled-as-PNG was caught and re-encoded. |
| **Runtime cost control** | Every animation loop (canvas backdrop, skill sphere, globe, Remotion driver) pauses via `IntersectionObserver` when offscreen and on `visibilitychange` when the tab is hidden. |
| **Accessibility** | `prefers-reduced-motion` is honored throughout — animations collapse to static frames, the Remotion hero swaps to a poster, and a screen-reader-only heading preserves the cinematic hero's semantics. Focus-visible rings and ARIA labels on interactive elements. |
| **Reproducible builds** | Locked dependency tree (`package-lock.json`), deterministic `npm ci` production builds on Vercel, keyless deploy from this repo. |
| **No dead weight** | Hand-rolled CSS-variable design system — no Tailwind, no MUI, no styled-components runtime. One stylesheet per component. |

---

## Architecture at a glance

```
GitHub (this repo)
        │  push to main
        ▼
Vercel CI  ──  npm ci (locked deps, deterministic build)
        │
        ▼
Edge CDN  ──  static, immutable, cached
        │
        ▼
Browser   ──  React 19 SPA
                ├─ main bundle ~143 KB gz (shell, routes, design system)
                ├─ lazy chunk: Remotion player + title sequence
                └─ lazy chunk: Three.js + systems globe
```

### Project structure
```
src/
├─ pages/            One component per route (Home, Projects, Skills, Resume, Contact, NotFound)
├─ components/       Reusable building blocks
│   ├─ HeroBackground.js   Cursor-reactive canvas grid
│   ├─ HeroMonitor.js      Lazy Remotion player + rAF frame driver
│   ├─ SystemGlobe.js      Lazy React Three Fiber deployment globe
│   ├─ SkillsSphere.js     WebGL-free 3D tag sphere
│   ├─ StatGauge.js        Animated SVG telemetry gauges
│   ├─ MissionControl.js   Observability bento (sparkline, status, arch diagram)
│   ├─ Lightbox.js         Context-driven image lightbox
│   └─ ...                 Header, Footer, ExperienceTimeline, transitions
├─ remotion/         TitleSequence composition (motion graphics as code)
├─ styles/           Hand-rolled CSS — one file per component, CSS-variable tokens
└─ images/           Brand + project assets (optimized copies in images/opt/)
public/
├─ fonts/            Self-hosted woff2 (Inter, Saira Condensed, JetBrains Mono, Instrument Serif)
└─ Daniel_Gordon_Resume.pdf
```

---

## Design language

A **motorsport-telemetry** aesthetic: graphite black, British-racing-green accent, brushed-silver type. Display type in **Saira Condensed**, body in **Inter**, technical labels and readouts in **JetBrains Mono**. HUD corner brackets, monospace section markers (`SECTOR 01 // TELEMETRY`), and a subtle film grain tie it together. The goal was something that reads as engineered and intentional to a technical audience, not another gradient-and-glassmorphism template.

---

## Tech stack

**Core:** React 19 · React Router 6 · vanilla CSS (custom-property design system)
**Motion & 3D:** Remotion · React Three Fiber / Three.js · Framer Motion · Lenis (smooth scroll)
**Tooling & infra:** Create React App build pipeline · self-hosted Fontsource fonts · Vercel (CI + Edge CDN)

---

## Run it locally

```bash
npm ci            # install from the locked dependency tree
npm start         # dev server on http://localhost:3000
npm run build     # optimized production build → build/
```

Requires Node 18+.

---

<div align="center">

**Daniel Gordon** — Software Engineer · Cloud, DevOps & AI Systems
Open to Forward Deployed Engineer, SWE, and DevOps roles · Toronto & the Bay Area

[Portfolio](https://danielgordon.vercel.app) · [LinkedIn](https://www.linkedin.com/in/daniel-gordon2/) · [GitHub](https://github.com/DanielGord0n)

</div>
