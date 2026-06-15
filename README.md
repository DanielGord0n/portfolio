# danielgordon.vercel.app

Personal portfolio of Daniel Gordon: software engineer working across cloud infrastructure, DevOps, and AI systems. Motorsport-telemetry design language, built from scratch with no templates and no component library.

## Engineering highlights

- **Programmatic title sequence**: the hero is a 12-second motion-graphics loop written in React with [Remotion](https://remotion.dev), driven by a custom `requestAnimationFrame` clock through `seekTo` (the Player's internal clock is gated on a user gesture). See `src/remotion/TitleSequence.js`.
- **Telemetry gauge cluster**: hand-rolled SVG gauges with sprung needles and count-up readouts (`src/components/StatGauge.js`).
- **Systems globe**: lazy-loaded React Three Fiber scene plotting real deployment footprint (AWS, GCP, Digital Research Alliance HPC clusters) with animated arcs (`src/components/SystemGlobe.js`).
- **3D skill sphere without WebGL**: spherical-coordinate math and CSS transforms, lerping into a 2D grid on hover (`src/components/SkillsSphere.js`).
- **Performance by construction**: Remotion and Three.js live in lazy chunks (main bundle ~140 KB gzipped), images downscaled at source, animation loops pause offscreen, `prefers-reduced-motion` respected throughout.

## Stack

React 19, React Router, Remotion, React Three Fiber, Framer Motion, Lenis, vanilla CSS variables. Deployed on Vercel from this repo with a locked dependency tree.

## Run it

```bash
npm ci
npm start        # dev server on :3000
npm run build    # production build
```
