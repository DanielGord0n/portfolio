import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import earthMask from '../images/earth-mask.png';

const GLOBE_RADIUS = 1;
const PITCH_MIN = -0.4;
const PITCH_MAX = 0.5;
const IDLE_SPIN = 0.0022;

// Real footprint: home base, DRAC HPC clusters, cloud regions
const SITES = [
    { name: 'Toronto (home / Trillium)', lat: 43.65, lon: -79.38, home: true },
    { name: 'Waterloo (Nibi)', lat: 43.46, lon: -80.52 },
    { name: 'Montreal (Rorqual)', lat: 45.5, lon: -73.57 },
    { name: 'BC (Fir)', lat: 48.43, lon: -123.37 },
    { name: 'AWS us-east-1', lat: 38.95, lon: -77.45 },
    { name: 'GCP us-central1', lat: 41.26, lon: -95.86 },
];

const latLonToVec3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
        -radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
    );
};

// Sample the equirectangular land mask (land = dark pixels): land points get
// bright dots, a sparse subset of ocean points gets faint dots so the sphere
// always reads as a complete planet from every angle.
const useEarthDots = () => {
    const [dots, setDots] = useState(null);

    useEffect(() => {
        let cancelled = false;
        const img = new Image();
        img.src = earthMask;
        img.onload = () => {
            if (cancelled) return;
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(img, 0, 0);
            const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);

            const count = 22000;
            const land = [];
            const ocean = [];
            for (let i = 0; i < count; i++) {
                const y = 1 - (i / (count - 1)) * 2;
                const r = Math.sqrt(1 - y * y);
                const theta = i * Math.PI * (3 - Math.sqrt(5));
                const x = Math.cos(theta) * r;
                const z = Math.sin(theta) * r;

                // Invert latLonToVec3 so dots line up with the site markers.
                // atan2 spans [-180, 180], so after the -180 shift the eastern
                // hemisphere lands below -180 and must wrap back into range,
                // otherwise half the planet samples the mask's left edge.
                const lat = 90 - Math.acos(y) * (180 / Math.PI);
                let lon = Math.atan2(z, -x) * (180 / Math.PI) - 180;
                if (lon < -180) lon += 360;

                const u = Math.min(width - 1, Math.max(0, Math.round(((lon + 180) / 360) * width)));
                const v = Math.min(height - 1, Math.max(0, Math.round(((90 - lat) / 180) * height)));
                const pixel = data[(v * width + u) * 4];

                if (pixel < 128) {
                    land.push(x * GLOBE_RADIUS, y * GLOBE_RADIUS, z * GLOBE_RADIUS);
                } else if (i % 3 === 0) {
                    ocean.push(x * GLOBE_RADIUS, y * GLOBE_RADIUS, z * GLOBE_RADIUS);
                }
            }
            setDots({
                land: new Float32Array(land),
                ocean: new Float32Array(ocean),
            });
        };
        return () => { cancelled = true; };
    }, []);

    return dots;
};

const DotField = ({ positions, color, size, opacity }) => {
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, [positions]);

    return (
        <points geometry={geometry}>
            <pointsMaterial color={color} size={size} sizeAttenuation transparent opacity={opacity} />
        </points>
    );
};

const SiteMarkers = () => {
    const markersRef = useRef([]);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        markersRef.current.forEach((marker, i) => {
            if (marker) {
                const pulse = 1 + Math.sin(t * 2.2 + i * 1.1) * 0.3;
                marker.scale.setScalar(pulse);
            }
        });
    });

    return (
        <>
            {SITES.map((site, i) => {
                const pos = latLonToVec3(site.lat, site.lon, GLOBE_RADIUS * 1.012);
                return (
                    <mesh
                        key={site.name}
                        position={pos}
                        ref={el => { markersRef.current[i] = el; }}
                    >
                        <sphereGeometry args={[site.home ? 0.035 : 0.025, 12, 12]} />
                        <meshBasicMaterial color={site.home ? '#43D695' : '#00A36C'} />
                    </mesh>
                );
            })}
        </>
    );
};

const Arcs = () => {
    const lines = useMemo(() => {
        const home = latLonToVec3(SITES[0].lat, SITES[0].lon, GLOBE_RADIUS * 1.01);
        return SITES.slice(1).map(site => {
            const end = latLonToVec3(site.lat, site.lon, GLOBE_RADIUS * 1.01);
            const mid = home.clone().add(end).multiplyScalar(0.5);
            const distance = home.distanceTo(end);
            mid.normalize().multiplyScalar(GLOBE_RADIUS * (1.12 + distance * 0.25));
            const curve = new THREE.QuadraticBezierCurve3(home, mid, end);
            return new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
        });
    }, []);

    return (
        <>
            {lines.map((geometry, i) => (
                <line key={i} geometry={geometry}>
                    <lineBasicMaterial color="#00A36C" transparent opacity={0.55} />
                </line>
            ))}
        </>
    );
};

// drag.current: { yaw, pitch, yawVelocity, dragging }
const GlobeScene = ({ active, drag, dots }) => {
    const groupRef = useRef(null);

    useFrame((_, delta) => {
        const group = groupRef.current;
        if (!group) return;
        const state = drag.current;
        const step = delta * 60;

        if (!state.dragging) {
            // Inertia decays toward a gentle idle spin
            state.yawVelocity += (IDLE_SPIN * (active ? 1 : 0) - state.yawVelocity) * 0.03 * step;
            state.yaw += state.yawVelocity * step;
            // Pitch eases back toward a comfortable angle
            state.pitch += (0.28 - state.pitch) * 0.02 * step;
        }

        // Smoothly follow the targets for a damped, fluid feel
        group.rotation.y += (state.yaw - group.rotation.y) * 0.18 * step;
        group.rotation.x += (state.pitch - group.rotation.x) * 0.18 * step;
    });

    return (
        // Initial yaw 0.22 puts Toronto and the marker cluster face-on
        <group ref={groupRef} rotation={[0.28, 0.22, 0]}>
            {/* Opaque body: writes depth so far-side dots, markers, and arcs
                are properly hidden instead of ghosting through */}
            <mesh>
                <sphereGeometry args={[GLOBE_RADIUS * 0.992, 48, 48]} />
                <meshBasicMaterial color="#13231C" />
            </mesh>
            {/* Soft atmosphere halo around the silhouette */}
            <mesh>
                <sphereGeometry args={[GLOBE_RADIUS * 1.06, 48, 48]} />
                <meshBasicMaterial color="#00A36C" transparent opacity={0.07} side={THREE.BackSide} />
            </mesh>
            <DotField positions={dots.ocean} color="#4A5A51" size={0.011} opacity={0.8} />
            <DotField positions={dots.land} color="#C7D6CC" size={0.0145} opacity={1} />
            <SiteMarkers />
            <Arcs />
        </group>
    );
};

const SystemGlobe = ({ active = true }) => {
    const dots = useEarthDots();
    const drag = useRef({ yaw: 0.22, pitch: 0.28, yawVelocity: IDLE_SPIN, dragging: false });
    const pointer = useRef({ lastX: 0, lastY: 0, lastMoveX: 0 });
    const [grabbing, setGrabbing] = useState(false);

    const onPointerDown = (e) => {
        drag.current.dragging = true;
        drag.current.yawVelocity = 0;
        pointer.current.lastX = e.clientX;
        pointer.current.lastY = e.clientY;
        pointer.current.lastMoveX = 0;
        setGrabbing(true);
        // Keep receiving moves even when the pointer leaves the tile mid-drag
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
        if (!drag.current.dragging) return;
        const dx = e.clientX - pointer.current.lastX;
        const dy = e.clientY - pointer.current.lastY;
        pointer.current.lastX = e.clientX;
        pointer.current.lastY = e.clientY;
        pointer.current.lastMoveX = dx;

        drag.current.yaw += dx * 0.006;
        drag.current.pitch = Math.min(
            PITCH_MAX,
            Math.max(PITCH_MIN, drag.current.pitch + dy * 0.004)
        );
    };

    const onPointerUp = () => {
        if (!drag.current.dragging) return;
        drag.current.dragging = false;
        // Fling: carry the last move into momentum
        drag.current.yawVelocity = Math.max(-0.06, Math.min(0.06, pointer.current.lastMoveX * 0.0012));
        setGrabbing(false);
    };

    return (
        <div
            style={{ width: '100%', height: '100%', cursor: grabbing ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
        >
            <Canvas
                camera={{ position: [0, 0.1, 2.55], fov: 45 }}
                dpr={[1, 1.75]}
                frameloop={active ? 'always' : 'demand'}
                gl={{ antialias: true, alpha: true }}
                style={{ width: '100%', height: '100%' }}
            >
                {dots && <GlobeScene active={active} drag={drag} dots={dots} />}
            </Canvas>
        </div>
    );
};

export default SystemGlobe;
