import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaServer, FaGlobeAmericas, FaCodeBranch } from 'react-icons/fa';
import '../styles/MissionControl.css';

const SystemGlobe = React.lazy(() => import('./SystemGlobe'));

/* ----- Simulated ops feed (clearly labeled, not real metrics) ----- */
const FEED_LENGTH = 40;

const nextValue = (prev, min, max, step) => {
    const moved = prev + (Math.random() - 0.5) * step;
    return Math.min(max, Math.max(min, moved));
};

const useSimulatedFeed = (active) => {
    const [latency, setLatency] = useState(() =>
        Array.from({ length: FEED_LENGTH }, () => 38 + Math.random() * 18)
    );
    const [cpu, setCpu] = useState(34);
    const [rps, setRps] = useState(127);

    useEffect(() => {
        if (!active) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const interval = setInterval(() => {
            setLatency(prev => [...prev.slice(1), nextValue(prev[prev.length - 1], 24, 96, 16)]);
            setCpu(prev => Math.round(nextValue(prev, 18, 72, 9)));
            setRps(prev => Math.round(nextValue(prev, 80, 240, 30)));
        }, 900);
        return () => clearInterval(interval);
    }, [active]);

    return { latency, cpu, rps };
};

const Sparkline = ({ data, width = 420, height = 96 }) => {
    const max = 110;
    const points = data
        .map((v, i) => `${(i / (data.length - 1)) * width},${height - (v / max) * height}`)
        .join(' ');
    const areaPoints = `0,${height} ${points} ${width},${height}`;

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className="sparkline" preserveAspectRatio="none" aria-hidden="true">
            <polygon points={areaPoints} className="sparkline-area" />
            <polyline points={points} className="sparkline-line" />
        </svg>
    );
};

/* ----- Architecture flow of this site ----- */
const archNodes = [
    { icon: <FaCodeBranch size={15} />, title: 'git push', sub: 'main branch' },
    { icon: <FaGithub size={15} />, title: 'GitHub', sub: 'source of truth' },
    { icon: <FaServer size={15} />, title: 'Vercel CI', sub: 'npm ci, deterministic build' },
    { icon: <FaGlobeAmericas size={15} />, title: 'Edge CDN', sub: 'static, cached, immutable' },
    { icon: null, title: 'You', sub: 'this page' },
];

const MissionControl = () => {
    const { ref: feedRef, inView: feedVisible } = useInView({ threshold: 0.2 });
    const { ref: globeRef, inView: globeSeen } = useInView({ triggerOnce: true, rootMargin: '200px' });
    const { latency, cpu, rps } = useSimulatedFeed(feedVisible);
    const currentLatency = Math.round(latency[latency.length - 1]);

    const reducedMotion = useMemo(
        () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        []
    );

    // Keep the globe mounted once it has been seen
    const globeMountedRef = useRef(false);
    if (globeSeen) globeMountedRef.current = true;

    return (
        <div className="mission-grid">
            {/* Status tile */}
            <div className="mc-tile mc-status hud-corners">
                <span className="mc-tile-label">site status</span>
                <div className="mc-status-row">
                    <span className="mc-status-dot" />
                    <span className="mc-status-text">OPERATIONAL</span>
                </div>
                <div className="mc-status-checks">
                    {Array.from({ length: 24 }, (_, i) => (
                        <span className="mc-check-dot" key={i} style={{ animationDelay: `${i * 0.08}s` }} />
                    ))}
                </div>
                <span className="mc-tile-footnote">synthetic checks, decorative</span>
            </div>

            {/* Simulated ops feed */}
            <div className="mc-tile mc-ops hud-corners" ref={feedRef}>
                <div className="mc-tile-head">
                    <span className="mc-tile-label">ops feed</span>
                    <span className="mc-sim-badge">SIMULATED FEED</span>
                </div>
                <div className="mc-ops-readouts">
                    <div className="mc-readout">
                        <span className="mc-readout-value">{currentLatency}<small>ms</small></span>
                        <span className="mc-readout-label">api latency</span>
                    </div>
                    <div className="mc-readout">
                        <span className="mc-readout-value">{cpu}<small>%</small></span>
                        <span className="mc-readout-label">cpu load</span>
                    </div>
                    <div className="mc-readout">
                        <span className="mc-readout-value">{rps}<small>r/s</small></span>
                        <span className="mc-readout-label">throughput</span>
                    </div>
                </div>
                <Sparkline data={latency} />
            </div>

            {/* Site stack tile */}
            <div className="mc-tile mc-stack hud-corners">
                <span className="mc-tile-label">this site's stack</span>
                <ul className="mc-stack-list">
                    <li>React 19 + React Router</li>
                    <li>Remotion (title sequence)</li>
                    <li>React Three Fiber (globe)</li>
                    <li>Framer Motion</li>
                    <li>Vanilla CSS variables</li>
                </ul>
                <span className="mc-tile-footnote">
                    main bundle ~140 KB gz, remotion + globe lazy-loaded
                </span>
            </div>

            {/* Globe tile */}
            <div className="mc-tile mc-globe hud-corners" ref={globeRef}>
                <div className="mc-tile-head">
                    <span className="mc-tile-label">deployment footprint</span>
                    <span className="mc-sim-badge">DRAG TO SPIN</span>
                </div>
                <div className="mc-globe-canvas">
                    {globeMountedRef.current && (
                        <Suspense fallback={<div className="mc-globe-loading">loading globe ...</div>}>
                            <SystemGlobe active={!reducedMotion} />
                        </Suspense>
                    )}
                </div>
                <span className="mc-tile-footnote">
                    systems I've run: AWS us-east / GCP / DRAC HPC clusters (Trillium, Nibi, Fir, Rorqual)
                </span>
            </div>

            {/* Architecture tile */}
            <div className="mc-tile mc-arch hud-corners">
                <span className="mc-tile-label">how this site ships</span>
                <div className="mc-arch-flow">
                    {archNodes.map((node, i) => (
                        <React.Fragment key={i}>
                            <div className="mc-arch-node">
                                {node.icon && <span className="mc-arch-icon">{node.icon}</span>}
                                <span className="mc-arch-title">{node.title}</span>
                                <span className="mc-arch-sub">{node.sub}</span>
                            </div>
                            {i < archNodes.length - 1 && <span className="mc-arch-arrow">▸</span>}
                        </React.Fragment>
                    ))}
                </div>
                <ul className="mc-arch-notes">
                    <li>Locked dependency tree (package-lock), reproducible production builds</li>
                    <li>Heavy chunks (Remotion, Three.js) split out and loaded on demand</li>
                    <li>Images downscaled at source: the 1.4 MB logo ships as 24 KB</li>
                </ul>
            </div>
        </div>
    );
};

export default MissionControl;
