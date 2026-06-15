import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import '../styles/StatGauge.css';

// Semicircular telemetry gauge: ticks, arc sweep, sprung needle, count-up readout.
// fraction sets how far the needle sweeps (purely visual); value is the real number.
const StatGauge = ({ value, suffix = '', label, unit, fraction = 0.75, delay = 0 }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });
    const [count, setCount] = useState(0);
    const [armed, setArmed] = useState(false);
    const rafRef = useRef();

    useEffect(() => {
        if (!inView) return;

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) {
            setCount(value);
            setArmed(true);
            return;
        }

        const timer = setTimeout(() => {
            setArmed(true);
            const duration = 1400;
            const start = performance.now();
            const tick = (now) => {
                const t = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                setCount(Math.round(value * eased));
                if (t < 1) rafRef.current = requestAnimationFrame(tick);
            };
            rafRef.current = requestAnimationFrame(tick);
        }, delay);

        return () => {
            clearTimeout(timer);
            cancelAnimationFrame(rafRef.current);
        };
    }, [inView, value, delay]);

    // Needle: rest at -90deg (far left), sweep to target
    const needleAngle = armed ? -90 + fraction * 180 : -90;

    // Arc path geometry
    const cx = 100, cy = 96, r = 78;
    const circumference = Math.PI * r;
    const sweep = armed ? fraction : 0;

    const ticks = [];
    for (let i = 0; i <= 12; i++) {
        const angle = (-180 + i * 15) * (Math.PI / 180);
        const isMajor = i % 3 === 0;
        const r1 = isMajor ? r - 12 : r - 7;
        ticks.push(
            <line
                key={i}
                x1={cx + r1 * Math.cos(angle)}
                y1={cy + r1 * Math.sin(angle)}
                x2={cx + (r - 2) * Math.cos(angle)}
                y2={cy + (r - 2) * Math.sin(angle)}
                className={isMajor ? 'gauge-tick-major' : 'gauge-tick'}
            />
        );
    }

    return (
        <div className="stat-gauge" ref={ref}>
            <svg viewBox="0 0 200 112" className="gauge-svg" aria-hidden="true">
                <path
                    d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                    className="gauge-track"
                />
                <path
                    d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
                    className="gauge-fill"
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: circumference * (1 - sweep),
                    }}
                />
                {ticks}
                <g
                    className="gauge-needle-group"
                    style={{ transform: `rotate(${needleAngle}deg)` }}
                >
                    <line x1={cx} y1={cy} x2={cx} y2={cy - r + 22} className="gauge-needle" />
                </g>
                <circle cx={cx} cy={cy} r="5" className="gauge-hub" />
            </svg>
            <div className="gauge-readout">
                <span className="gauge-value">
                    {count.toLocaleString()}
                    {suffix && <span className="gauge-suffix">{suffix}</span>}
                </span>
                {unit && <span className="gauge-unit">{unit}</span>}
            </div>
            <span className="gauge-label">{label}</span>
        </div>
    );
};

export default StatGauge;
