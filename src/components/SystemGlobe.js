import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GLOBE_RADIUS = 1;

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

// Fibonacci-distributed dot sphere
const DotSphere = () => {
    const geometry = useMemo(() => {
        const count = 900;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const y = 1 - (i / (count - 1)) * 2;
            const r = Math.sqrt(1 - y * y);
            const theta = i * Math.PI * (3 - Math.sqrt(5));
            positions[i * 3] = Math.cos(theta) * r * GLOBE_RADIUS;
            positions[i * 3 + 1] = y * GLOBE_RADIUS;
            positions[i * 3 + 2] = Math.sin(theta) * r * GLOBE_RADIUS;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        return geo;
    }, []);

    return (
        <points geometry={geometry}>
            <pointsMaterial color="#6e7f76" size={0.022} sizeAttenuation transparent opacity={0.95} />
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
                const pos = latLonToVec3(site.lat, site.lon, GLOBE_RADIUS * 1.01);
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

const GlobeScene = ({ active }) => {
    const groupRef = useRef(null);
    const dragState = useRef({ dragging: false, lastX: 0, velocity: 0.0016 });

    useFrame((_, delta) => {
        const group = groupRef.current;
        if (!group) return;
        if (!dragState.current.dragging && active) {
            group.rotation.y += dragState.current.velocity * (delta * 60);
            // Ease drag momentum back to the idle cruise speed
            dragState.current.velocity += (0.0016 - dragState.current.velocity) * 0.02;
        }
    });

    const onPointerDown = (e) => {
        dragState.current.dragging = true;
        dragState.current.lastX = e.clientX;
    };
    const onPointerMove = (e) => {
        if (!dragState.current.dragging || !groupRef.current) return;
        const dx = e.clientX - dragState.current.lastX;
        dragState.current.lastX = e.clientX;
        groupRef.current.rotation.y += dx * 0.005;
        dragState.current.velocity = dx * 0.0009;
    };
    const endDrag = () => { dragState.current.dragging = false; };

    return (
        <group
            ref={groupRef}
            rotation={[0.25, 2.4, 0]}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
        >
            {/* Faint solid body so the dot field reads as a globe; also catches pointer events */}
            <mesh>
                <sphereGeometry args={[GLOBE_RADIUS * 0.985, 32, 32]} />
                <meshBasicMaterial color="#0E2A20" transparent opacity={0.5} />
            </mesh>
            <DotSphere />
            <SiteMarkers />
            <Arcs />
        </group>
    );
};

const SystemGlobe = ({ active = true }) => {
    return (
        <Canvas
            camera={{ position: [0, 0.1, 2.55], fov: 45 }}
            dpr={[1, 1.75]}
            frameloop={active ? 'always' : 'demand'}
            gl={{ antialias: true, alpha: true }}
            style={{ width: '100%', height: '100%', cursor: 'grab', touchAction: 'pan-y' }}
        >
            <GlobeScene active={active} />
        </Canvas>
    );
};

export default SystemGlobe;
