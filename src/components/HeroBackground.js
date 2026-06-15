import React, { useEffect, useRef } from 'react';
import '../styles/HeroBackground.css';

/*
 * Living HUD backdrop: a canvas grid that breathes with a slow ambient wave
 * and bends away from the cursor like a gravity lens. Lines brighten as the
 * pointer passes near them. Static frame under reduced motion; ambient-only
 * on touch devices.
 */
const SPACING = 76;          // grid cell size, px
const SAMPLE = 26;           // polyline sample step, px
const AMBIENT_AMP = 5;       // ambient wave amplitude, px
const LENS_RADIUS = 300;     // cursor influence radius, px
const LENS_STRENGTH = 30;    // max displacement near the cursor, px

const HeroBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const hasPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

        let width = 0;
        let height = 0;
        let raf;
        let running = true;

        // Cursor state: target follows the mouse, current is smoothed
        let targetX = -9999;
        let targetY = -9999;
        let mouseX = -9999;
        let mouseY = -9999;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        // Displacement of a grid point: ambient breathing + cursor lens
        const displace = (x, y, t) => {
            let dx = Math.sin(y * 0.006 + t * 0.00045) * AMBIENT_AMP
                   + Math.sin((x + y) * 0.003 + t * 0.0003) * AMBIENT_AMP * 0.6;
            let dy = Math.cos(x * 0.005 + t * 0.0004) * AMBIENT_AMP;

            const rx = x - mouseX;
            const ry = y - mouseY;
            const dist = Math.hypot(rx, ry);
            if (dist < LENS_RADIUS && dist > 0.001) {
                const force = LENS_STRENGTH * Math.exp(-((dist / LENS_RADIUS) ** 2) * 3);
                dx += (rx / dist) * force;
                dy += (ry / dist) * force;
            }
            return [x + dx, y + dy];
        };

        const lineAlpha = (closestDist, base) => {
            if (closestDist > LENS_RADIUS) return base;
            // Lines glow as the cursor approaches them
            return base + (1 - closestDist / LENS_RADIUS) * 0.22;
        };

        const draw = (t) => {
            ctx.clearRect(0, 0, width, height);

            // Vertical lines
            for (let gx = SPACING / 2; gx < width + SPACING; gx += SPACING) {
                const closest = Math.abs(gx - mouseX);
                const green = Math.round(gx / SPACING) % 4 === 0;
                ctx.strokeStyle = green
                    ? `rgba(0, 163, 108, ${lineAlpha(closest, 0.20)})`
                    : `rgba(155, 168, 160, ${lineAlpha(closest, 0.14)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                for (let y = -SAMPLE; y <= height + SAMPLE; y += SAMPLE) {
                    const [px, py] = displace(gx, y, t);
                    if (y === -SAMPLE) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.stroke();
            }

            // Horizontal lines
            for (let gy = SPACING / 2; gy < height + SPACING; gy += SPACING) {
                const closest = Math.abs(gy - mouseY);
                const green = Math.round(gy / SPACING) % 4 === 0;
                ctx.strokeStyle = green
                    ? `rgba(0, 163, 108, ${lineAlpha(closest, 0.20)})`
                    : `rgba(155, 168, 160, ${lineAlpha(closest, 0.14)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                for (let x = -SAMPLE; x <= width + SAMPLE; x += SAMPLE) {
                    const [px, py] = displace(x, gy, t);
                    if (x === -SAMPLE) ctx.moveTo(px, py);
                    else ctx.lineTo(px, py);
                }
                ctx.stroke();
            }

            // Soft light pooling around the cursor
            if (mouseX > -999) {
                const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, LENS_RADIUS);
                glow.addColorStop(0, 'rgba(0, 163, 108, 0.10)');
                glow.addColorStop(1, 'rgba(0, 163, 108, 0)');
                ctx.fillStyle = glow;
                ctx.fillRect(mouseX - LENS_RADIUS, mouseY - LENS_RADIUS, LENS_RADIUS * 2, LENS_RADIUS * 2);
            }
        };

        const tick = (now) => {
            if (!running) return;
            mouseX += (targetX - mouseX) * 0.1;
            mouseY += (targetY - mouseY) * 0.1;
            draw(now);
            raf = requestAnimationFrame(tick);
        };

        const onMove = (e) => {
            targetX = e.clientX;
            targetY = e.clientY;
            // First movement: snap instead of flying in from offscreen
            if (mouseX < -999) {
                mouseX = targetX;
                mouseY = targetY;
            }
        };

        const onLeave = () => {
            targetX = width / 2;
            targetY = height * 0.3;
        };

        const onVisibility = () => {
            cancelAnimationFrame(raf);
            if (!document.hidden && !reducedMotion) raf = requestAnimationFrame(tick);
        };

        window.addEventListener('resize', resize);
        resize();

        if (reducedMotion) {
            // Single static frame, no animation loop
            draw(0);
        } else {
            if (hasPointer) {
                window.addEventListener('mousemove', onMove, { passive: true });
                document.documentElement.addEventListener('mouseleave', onLeave);
            }
            document.addEventListener('visibilitychange', onVisibility);
            raf = requestAnimationFrame(tick);
        }

        return () => {
            running = false;
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
            document.documentElement.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, []);

    return (
        <div className="hud-backdrop" aria-hidden="true">
            <canvas ref={canvasRef} className="hud-canvas" />
            <div className="hud-glow" />
            <div className="hud-vignette" />
        </div>
    );
};

export default HeroBackground;
