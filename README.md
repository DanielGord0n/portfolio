# danielgordon.vercel.app — Personal Portfolio

My personal developer portfolio, built from scratch with a focus on interactive UI engineering. No component libraries, no Three.js — complex 3D effects and animations built directly on the browser's native APIs.

**Live:** [danielgordon.vercel.app](https://danielgordon.vercel.app)

---

## Sections

**Home**
Custom HTML5 Canvas particle engine with distance-based connecting lines, terminal-style typing effect for the hero text, and scroll-triggered reveal animations via IntersectionObserver.

**Projects**
Filterable project grid (All, Featured, Machine Learning, Full Stack, etc.) with a custom `ProjectCard3D` component that responds to mouse position with a real-time 3D parallax tilt effect.

**Skills**
A `SkillsSphere` component — a fully custom rotating 3D tag cloud built without WebGL or Three.js, with smooth linear interpolation into a flat 2D grid on hover.

**Resume**
Embedded PDF viewer with a pill-shaped toggle to switch between three tailored resume versions (AI / Platform SWE, Solutions Engineer, Applied AI Engineer) without leaving the page.

**Contact**
Glass Command Center layout with one-click copy-to-clipboard for email, phone, LinkedIn, and GitHub.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19, Create React App |
| Routing | React Router DOM v6 |
| Animation | Framer Motion v12, Lenis (smooth scroll) |
| Scroll triggers | react-intersection-observer |
| Icons | react-icons |
| Styling | Vanilla CSS with CSS variables design system |
| Hosting | Vercel |

No Tailwind. No Bootstrap. No Three.js. No WebGL.

---

## Engineering Highlights

**3D skill sphere without WebGL (SkillsSphere.js)**
The rotating tag cloud calculates spherical coordinates using `Math.acos` and `Math.sin`, then applies 3D CSS transforms directly to DOM nodes inside a `requestAnimationFrame` loop. On hover, linear interpolation (`lerp`) smoothly morphs the sphere into a flat 2D grid. No canvas, no WebGL — just math and CSS transforms.

**Canvas particle engine (HeroBackground.js)**
Custom particle system running on an HTML5 canvas. Particles bounce off screen edges and dynamically draw connecting lines to nearby particles using distance calculations (`Math.sqrt(dx*dx + dy*dy)`). No particle library — raw canvas API and a `requestAnimationFrame` loop.

**Physics-based card tilt (ProjectCard3D.js)**
Uses Framer Motion's `useMotionValue`, `useSpring`, and `useTransform` to map mouse coordinates relative to each card's bounding box into `rotateX`/`rotateY` values with spring physics. The result is a smooth, physically convincing 3D tilt with no external physics engine.

**CSS variables design system**
Rather than Tailwind or a component library, all design decisions live in a custom token system (`--bg-primary: #121212`, `--accent-primary: #00E5FF`, etc.) with consistent spacing, typography, and gradient scales across all components.

**Performance**
- `useMemo` for static data structures to prevent unnecessary re-renders
- IntersectionObserver to lazy-trigger animations only when elements enter the viewport
- Raw canvas and math operations instead of heavy 3D libraries

---

## Running Locally

No environment variables required.

```bash
git clone https://github.com/DanielGord0n/portfolio
cd portfolio
npm install
npm start
# Runs at http://localhost:3000
```

**Production build:**
```bash
npm run build
```

---

*Built with React 19, Framer Motion, and Vanilla CSS. 3D effects via spherical coordinate math and CSS transforms — no Three.js or WebGL.*
