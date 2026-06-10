import React from 'react';
import {
    AbsoluteFill,
    Sequence,
    interpolate,
    spring,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
import dgLogo from '../images/opt/DG_logo.png';

export const TITLE_SEQUENCE = {
    durationInFrames: 360,
    fps: 30,
    width: 1920,
    height: 1080,
};

const COLORS = {
    bg: '#0C0F0E',
    panel: '#121A15',
    silver: '#DCE3DE',
    silverDim: '#9BA8A0',
    muted: '#5F6C64',
    green: '#00A36C',
    greenBright: '#43D695',
    line: '#2B3A32',
};

const mono = "'JetBrains Mono', monospace";
const display = "'Saira Condensed', sans-serif";

/* Stats are verified, see PORTFOLIO_HANDOFF.md */
const STATS = [
    { value: 455, suffix: '', label: 'S3 BUCKETS AUDITED' },
    { value: 79, suffix: '', label: 'EC2 INSTANCES HARDENED' },
    { value: 10000, suffix: '+', label: 'CPU CORES COORDINATED' },
    { value: 4, suffix: '', label: 'NATIONAL HPC CLUSTERS' },
];

const Grid = ({ opacity }) => (
    <AbsoluteFill
        style={{
            opacity,
            backgroundImage:
                'linear-gradient(to right, rgba(155,168,160,0.07) 1px, transparent 1px),' +
                'linear-gradient(to bottom, rgba(155,168,160,0.07) 1px, transparent 1px)',
            backgroundSize: '96px 96px',
        }}
    />
);

const CornerBrackets = ({ progress }) => {
    const size = interpolate(progress, [0, 1], [0, 38]);
    const common = {
        position: 'absolute',
        width: size,
        height: size,
        borderColor: COLORS.silverDim,
        borderStyle: 'solid',
        opacity: 0.85,
    };
    return (
        <>
            <div style={{ ...common, top: 42, left: 42, borderWidth: '2px 0 0 2px' }} />
            <div style={{ ...common, top: 42, right: 42, borderWidth: '2px 2px 0 0' }} />
            <div style={{ ...common, bottom: 42, left: 42, borderWidth: '0 0 2px 2px' }} />
            <div style={{ ...common, bottom: 42, right: 42, borderWidth: '0 2px 2px 0' }} />
        </>
    );
};

/* Scene A: system boot readout */
const Boot = () => {
    const frame = useCurrentFrame();
    const lines = [
        '$ dg --init',
        'LOADING TELEMETRY .......... OK',
        'CLOUD / DEVOPS / AI SYSTEMS ONLINE',
    ];
    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ fontFamily: mono, fontSize: 33, lineHeight: 2.1, letterSpacing: '0.08em' }}>
                {lines.map((line, i) => {
                    const start = i * 14;
                    const chars = Math.max(0, Math.floor((frame - start) * 1.6));
                    const visible = line.slice(0, chars);
                    return (
                        <div key={i} style={{ color: i === 0 ? COLORS.greenBright : COLORS.silverDim, minHeight: 69 }}>
                            {visible}
                            {chars > 0 && chars < line.length && (
                                <span style={{ color: COLORS.green }}>▌</span>
                            )}
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

/* Scene B: logo and name reveal */
const Identity = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const logoIn = spring({ frame, fps, config: { damping: 14, mass: 0.8 } });
    const ringRotation = frame * 1.4;
    const ringOpacity = interpolate(frame, [0, 18], [0, 0.9], { extrapolateRight: 'clamp' });

    const nameIn = spring({ frame: frame - 16, fps, config: { damping: 16 } });
    const roleOpacity = interpolate(frame, [34, 52], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const sectorOpacity = interpolate(frame, [50, 66], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Silver sheen sweeping across the name
    const sheenX = interpolate(frame, [30, 85], [-30, 130], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: 186, height: 186, marginBottom: 44 }}>
                <svg
                    width="186"
                    height="186"
                    viewBox="0 0 186 186"
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: ringOpacity,
                        transform: `rotate(${ringRotation}deg)`,
                    }}
                >
                    <circle cx="93" cy="93" r="87" fill="none" stroke={COLORS.line} strokeWidth="3" />
                    <circle
                        cx="93" cy="93" r="87" fill="none"
                        stroke={COLORS.green} strokeWidth="3.5"
                        strokeDasharray="120 428" strokeLinecap="round"
                    />
                </svg>
                {/* Native img: this composition only plays in the browser Player,
                    and remotion's Img pauses the timeline while decoding */}
                <img
                    src={dgLogo}
                    alt=""
                    style={{
                        position: 'absolute',
                        inset: 33,
                        width: 120,
                        height: 120,
                        objectFit: 'contain',
                        filter: 'invert(1)',
                        transform: `scale(${logoIn})`,
                    }}
                />
            </div>

            <div style={{ position: 'relative', overflow: 'hidden', padding: '0 30px' }}>
                <div
                    style={{
                        fontFamily: display,
                        fontWeight: 700,
                        fontSize: 144,
                        letterSpacing: '0.03em',
                        textTransform: 'uppercase',
                        color: COLORS.silver,
                        lineHeight: 1,
                        transform: `translateY(${interpolate(nameIn, [0, 1], [135, 0])}px)`,
                        opacity: nameIn,
                        position: 'relative',
                    }}
                >
                    Daniel Gordon
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            background: `linear-gradient(100deg, transparent ${sheenX - 14}%, rgba(255,255,255,0.5) ${sheenX}%, transparent ${sheenX + 14}%)`,
                            mixBlendMode: 'overlay',
                        }}
                    />
                </div>
            </div>

            <div
                style={{
                    fontFamily: display,
                    fontWeight: 500,
                    fontSize: 51,
                    letterSpacing: '0.34em',
                    textTransform: 'uppercase',
                    color: COLORS.greenBright,
                    marginTop: 20,
                    opacity: roleOpacity,
                }}
            >
                Software Engineer
            </div>

            <div
                style={{
                    fontFamily: mono,
                    fontSize: 25,
                    letterSpacing: '0.3em',
                    color: COLORS.silverDim,
                    marginTop: 24,
                    opacity: sectorOpacity,
                }}
            >
                CLOUD&nbsp;&nbsp;//&nbsp;&nbsp;DEVOPS&nbsp;&nbsp;//&nbsp;&nbsp;AI SYSTEMS
            </div>
        </AbsoluteFill>
    );
};

/* Scene C: telemetry counters */
const Telemetry = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const headerOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div
                style={{
                    fontFamily: mono,
                    fontSize: 22,
                    letterSpacing: '0.32em',
                    color: COLORS.green,
                    marginBottom: 64,
                    opacity: headerOpacity,
                }}
            >
                ▸ LIVE TELEMETRY / VERIFIED PRODUCTION NUMBERS
            </div>
            <div style={{ display: 'flex', gap: 40 }}>
                {STATS.map((stat, i) => {
                    const enter = spring({ frame: frame - 6 - i * 7, fps, config: { damping: 15 } });
                    const count = Math.round(
                        interpolate(Math.min(frame - 10 - i * 7, 55), [0, 55], [0, stat.value], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                        })
                    );
                    const barWidth = interpolate(Math.min(frame - 10 - i * 7, 55), [0, 55], [0, 100], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    });
                    return (
                        <div
                            key={i}
                            style={{
                                width: 360,
                                padding: '40px 36px 33px',
                                background: COLORS.panel,
                                border: `1px solid ${COLORS.line}`,
                                transform: `translateY(${interpolate(enter, [0, 1], [66, 0])}px)`,
                                opacity: enter,
                            }}
                        >
                            <div
                                style={{
                                    fontFamily: display,
                                    fontWeight: 700,
                                    fontSize: 87,
                                    lineHeight: 1,
                                    color: COLORS.silver,
                                }}
                            >
                                {count.toLocaleString()}
                                <span style={{ color: COLORS.greenBright }}>{stat.suffix}</span>
                            </div>
                            <div
                                style={{
                                    height: 4,
                                    background: COLORS.line,
                                    margin: '24px 0 18px',
                                    position: 'relative',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        bottom: 0,
                                        width: `${barWidth}%`,
                                        background: COLORS.green,
                                    }}
                                />
                            </div>
                            <div
                                style={{
                                    fontFamily: mono,
                                    fontSize: 19,
                                    letterSpacing: '0.14em',
                                    color: COLORS.silverDim,
                                }}
                            >
                                {stat.label}
                            </div>
                        </div>
                    );
                })}
            </div>
        </AbsoluteFill>
    );
};

/* Scene D: closing tagline */
const Tagline = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const inSpring = spring({ frame, fps, config: { damping: 15 } });
    const subOpacity = interpolate(frame, [16, 32], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div
                style={{
                    fontFamily: display,
                    fontWeight: 700,
                    fontSize: 129,
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: COLORS.silver,
                    transform: `scale(${interpolate(inSpring, [0, 1], [1.15, 1])})`,
                    opacity: inSpring,
                }}
            >
                Built to <span style={{ color: COLORS.greenBright }}>ship.</span>
            </div>
            <div
                style={{
                    fontFamily: mono,
                    fontSize: 25,
                    letterSpacing: '0.26em',
                    color: COLORS.silverDim,
                    marginTop: 30,
                    opacity: subOpacity,
                }}
            >
                PRODUCTION SYSTEMS, END TO END
            </div>
        </AbsoluteFill>
    );
};

const TitleSequence = () => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    const gridOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
    const bracketProgress = interpolate(frame, [6, 36], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    // Fade the whole frame at the very end for a clean loop seam
    const loopFade = interpolate(frame, [durationInFrames - 14, durationInFrames - 1], [1, 0], {
        extrapolateLeft: 'clamp',
    });

    return (
        <AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
            <AbsoluteFill style={{ opacity: loopFade }}>
                <Grid opacity={gridOpacity * 0.8} />
                <CornerBrackets progress={bracketProgress} />

                <Sequence durationInFrames={62}>
                    <Boot />
                </Sequence>
                <Sequence from={62} durationInFrames={118}>
                    <Identity />
                </Sequence>
                <Sequence from={180} durationInFrames={108}>
                    <Telemetry />
                </Sequence>
                <Sequence from={288}>
                    <Tagline />
                </Sequence>

                {/* Persistent footer readout */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 60,
                        width: '100%',
                        textAlign: 'center',
                        fontFamily: mono,
                        fontSize: 19,
                        letterSpacing: '0.3em',
                        color: COLORS.muted,
                        opacity: gridOpacity,
                    }}
                >
                    DG // TITLE SEQUENCE RENDERED IN REACT WITH REMOTION
                </div>
            </AbsoluteFill>
        </AbsoluteFill>
    );
};

export default TitleSequence;
