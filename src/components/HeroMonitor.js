import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import dgLogo from '../images/opt/DG_logo.png';
import '../styles/HeroMonitor.css';

// Composition timing (mirrors TITLE_SEQUENCE in src/remotion/TitleSequence.js).
// Kept as literals here so the remotion runtime stays out of the main bundle.
const SEQ = { durationInFrames: 360, fps: 30, width: 1920, height: 1080 };

// Player and composition load together in one lazy chunk
const LazySequencePlayer = React.lazy(async () => {
    const [{ Player }, { default: TitleSequence }] = await Promise.all([
        import('@remotion/player'),
        import('../remotion/TitleSequence'),
    ]);
    const SequencePlayer = ({ visibleRef }) => {
        const playerRef = React.useRef(null);

        // Drive frames with our own rAF clock through seekTo instead of the
        // Player's internal playback, which stalls without a user gesture
        // (its clock is tied to a gesture-gated AudioContext).
        React.useEffect(() => {
            let raf;
            let elapsedBase = 0;
            let lastNow = null;
            const tick = (now) => {
                const isVisible = !document.hidden && (!visibleRef || visibleRef.current);
                if (lastNow !== null && isVisible) {
                    elapsedBase += (now - lastNow) / 1000;
                    const frame = Math.floor(elapsedBase * SEQ.fps) % SEQ.durationInFrames;
                    const player = playerRef.current;
                    if (player) {
                        player.seekTo(frame);
                    }
                }
                lastNow = now;
                raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            return () => cancelAnimationFrame(raf);
        }, [visibleRef]);

        return (
            <Player
                ref={playerRef}
                component={TitleSequence}
                durationInFrames={SEQ.durationInFrames}
                fps={SEQ.fps}
                compositionWidth={SEQ.width}
                compositionHeight={SEQ.height}
                initiallyMuted
                numberOfSharedAudioTags={0}
                acknowledgeRemotionLicense
                controls={false}
                clickToPlay={false}
                style={{ width: '100%', display: 'block' }}
            />
        );
    };
    return { default: SequencePlayer };
});

const MonitorChrome = ({ children }) => (
    <div className="monitor-frame hud-corners">
        <div className="monitor-titlebar">
            <span className="monitor-light" />
            <span className="monitor-label">PIT WALL // TITLE SEQUENCE</span>
            <span className="monitor-tag">REMOTION</span>
        </div>
        <div className="monitor-screen">{children}</div>
        <div className="monitor-footer">
            <span>SRC: src/remotion/TitleSequence.js</span>
            <span>30 FPS / 12S LOOP</span>
        </div>
    </div>
);

const StaticPoster = () => (
    <div className="monitor-poster">
        <img src={dgLogo} alt="DG logo" className="poster-logo" />
        <span className="poster-name">Daniel Gordon</span>
        <span className="poster-sub">CLOUD // DEVOPS // AI SYSTEMS</span>
    </div>
);

// variant="panel": framed pit-wall monitor (mobile / reduced contexts)
// variant="cinema": bare full-bleed player that covers its parent
const HeroMonitor = ({ variant = 'panel' }) => {
    const prefersReducedMotion = useMemo(
        () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        []
    );

    const wrapRef = useRef(null);
    const visibleRef = useRef(true);
    const [mounted, setMounted] = useState(false);

    // Track visibility so the frame driver idles when scrolled away
    useEffect(() => {
        const el = wrapRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                visibleRef.current = entry.isIntersecting;
            },
            { threshold: 0.05 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Load the player chunk only after first paint settles: keeps the hero
    // text's LCP independent of the Remotion download
    useEffect(() => {
        let idleId;
        const start = () => {
            if ('requestIdleCallback' in window) {
                idleId = window.requestIdleCallback(() => setMounted(true), { timeout: 1500 });
            } else {
                idleId = setTimeout(() => setMounted(true), 500);
            }
        };
        if (document.readyState === 'complete') {
            start();
        } else {
            window.addEventListener('load', start, { once: true });
        }
        return () => {
            window.removeEventListener('load', start);
            if (idleId) {
                if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
                clearTimeout(idleId);
            }
        };
    }, []);

    const player = prefersReducedMotion ? (
        <StaticPoster />
    ) : (
        <Suspense fallback={<StaticPoster />}>
            {mounted && <LazySequencePlayer visibleRef={visibleRef} />}
        </Suspense>
    );

    if (variant === 'cinema') {
        return (
            <div className="cinema-wrap" ref={wrapRef} aria-hidden="true">
                <div className="cinema-player">{player}</div>
            </div>
        );
    }

    return (
        <div ref={wrapRef}>
            <MonitorChrome>{player}</MonitorChrome>
        </div>
    );
};

export default HeroMonitor;
