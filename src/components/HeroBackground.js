import React, { useEffect, useRef } from 'react';
import '../styles/HeroBackground.css';

// Layered HUD backdrop: engineering grid, green glow, vignette, plus a
// cursor-following spotlight that lights up the grid around the pointer.
// Flashlight technique: the masked circle moves with the cursor while the
// bright grid inside is counter-translated, so its lines stay locked to the
// viewport grid. Both movements are transforms: compositor-only, no repaints.
const SPOT_SIZE = 760; // keep in sync with .hud-spotlight size in CSS

const HeroBackground = () => {
    const spotRef = useRef(null);
    const gridRef = useRef(null);
    const sheenRef = useRef(null);

    useEffect(() => {
        // Pointer-driven light: runs whenever a fine pointer exists. It only
        // moves when the user moves, so it is acceptable under reduced motion.
        const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const spot = spotRef.current;
        const grid = gridRef.current;
        const sheen = sheenRef.current;
        if (!canHover || !spot || !grid || !sheen) return;

        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight * 0.35;
        let x = targetX;
        let y = targetY;
        let raf;

        const onMove = (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
        };

        // Drift back toward the hero when the cursor leaves the window
        const onLeave = () => {
            targetX = window.innerWidth / 2;
            targetY = window.innerHeight * 0.35;
        };

        const tick = () => {
            x += (targetX - x) * 0.09;
            y += (targetY - y) * 0.09;
            const ox = x - SPOT_SIZE / 2;
            const oy = y - SPOT_SIZE / 2;
            spot.style.transform = `translate3d(${ox}px, ${oy}px, 0)`;
            grid.style.transform = `translate3d(${-ox}px, ${-oy}px, 0)`;
            sheen.style.transform = `translate3d(${ox}px, ${oy}px, 0)`;
            raf = requestAnimationFrame(tick);
        };

        const onVisibility = () => {
            cancelAnimationFrame(raf);
            if (!document.hidden) raf = requestAnimationFrame(tick);
        };

        spot.style.opacity = '1';
        sheen.style.opacity = '1';
        window.addEventListener('mousemove', onMove, { passive: true });
        document.documentElement.addEventListener('mouseleave', onLeave);
        document.addEventListener('visibilitychange', onVisibility);
        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMove);
            document.documentElement.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    return (
        <>
            <div className="hud-backdrop" aria-hidden="true">
                <div className="hud-grid" />
                <div className="hud-spotlight" ref={spotRef}>
                    <div className="hud-spotlight-grid" ref={gridRef} />
                    <div className="hud-spotlight-glow" />
                </div>
                <div className="hud-glow" />
                <div className="hud-vignette" />
            </div>
            {/* Above-content cursor sheen: without this the light is invisible
                wherever panels or the full-bleed hero cover the backdrop */}
            <div className="hud-cursor-sheen" ref={sheenRef} aria-hidden="true" />
        </>
    );
};

export default HeroBackground;
