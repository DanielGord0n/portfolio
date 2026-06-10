import React, { Suspense, useMemo } from 'react';
import dgLogo from '../images/opt/DG_logo.png';
import '../styles/HeroMonitor.css';

// Composition timing (mirrors TITLE_SEQUENCE in src/remotion/TitleSequence.js).
// Kept as literals here so the remotion runtime stays out of the main bundle.
const SEQ = { durationInFrames: 360, fps: 30, width: 1280, height: 720 };

// Player and composition load together in one lazy chunk
const LazySequencePlayer = React.lazy(async () => {
    const [{ Player }, { default: TitleSequence }] = await Promise.all([
        import('@remotion/player'),
        import('../remotion/TitleSequence'),
    ]);
    const SequencePlayer = () => {
        const playerRef = React.useRef(null);

        // Drive frames with our own rAF clock through seekTo instead of the
        // Player's internal playback, which stalls without a user gesture
        // (its clock is tied to a gesture-gated AudioContext).
        React.useEffect(() => {
            let raf;
            let start = null;
            const tick = (now) => {
                if (start === null) start = now;
                const elapsed = (now - start) / 1000;
                const frame = Math.floor(elapsed * SEQ.fps) % SEQ.durationInFrames;
                const player = playerRef.current;
                if (player && !document.hidden) {
                    player.seekTo(frame);
                }
                raf = requestAnimationFrame(tick);
            };
            raf = requestAnimationFrame(tick);
            return () => cancelAnimationFrame(raf);
        }, []);

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

const HeroMonitor = () => {
    const prefersReducedMotion = useMemo(
        () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        []
    );

    return (
        <MonitorChrome>
            {prefersReducedMotion ? (
                <StaticPoster />
            ) : (
                <Suspense fallback={<StaticPoster />}>
                    <LazySequencePlayer />
                </Suspense>
            )}
        </MonitorChrome>
    );
};

export default HeroMonitor;
