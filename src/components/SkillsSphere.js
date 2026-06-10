import React, { useEffect, useRef, useState } from 'react';
import '../styles/SkillsSphere.css';

const SkillsSphere = () => {
    const containerRef = useRef(null);
    const [isHoveredState, setIsHoveredState] = useState(false);
    const isHoveredRef = useRef(false);

    const handleMouseEnter = () => {
        setIsHoveredState(true);
        isHoveredRef.current = true;
    };

    const handleMouseLeave = () => {
        setIsHoveredState(false);
        isHoveredRef.current = false;
    };

    const texts = React.useMemo(() => [
        'Python', 'TypeScript', 'JavaScript', 'C++', 'Java',
        'SQL', 'Bash', 'PowerShell', 'AWS', 'S3',
        'EC2', 'AWS SSM', 'IAM', 'CloudWatch', 'Lambda',
        'GCP', 'Cloud Run', 'Firestore', 'Docker', 'GitHub Actions',
        'SLURM', 'OpenMP', 'Linux', 'Git', 'React',
        'React Native', 'Next.js', 'Node.js', 'Express', 'Electron',
        'Expo', 'Gemini', 'OpenAI', 'Whisper', 'MongoDB',
        'MySQL', 'PostgreSQL', 'REST APIs', 'Puppeteer', 'Jira'
    ], []);

    useEffect(() => {
        const container = containerRef.current;
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Clear previous tags if any
        container.innerHTML = '';

        const computePosition = (idx, random = false) => {
            const phi = Math.acos(-1 + (2 * idx + 1) / texts.length);
            const theta = Math.sqrt(texts.length * Math.PI) * phi;
            return {
                x: (random ? Math.random() * 0.5 : 1) * 150 * Math.cos(theta) * Math.sin(phi),
                y: (random ? Math.random() * 0.5 : 1) * 150 * Math.sin(theta) * Math.sin(phi),
                z: (random ? Math.random() * 0.5 : 1) * 150 * Math.cos(phi)
            };
        };

        const createTag = (text, idx) => {
            const tag = document.createElement('div');
            tag.className = 'tag';
            tag.innerText = text;
            tag.style.color = idx % 3 === 0 ? 'var(--accent-secondary)' : 'var(--silver)';
            const { x, y, z } = computePosition(idx);
            tag.style.transform = `translate3d(${x}px, ${y}px, ${z}px) translate(-50%, -50%)`;
            tag.dataset.x = x;
            tag.dataset.y = y;
            tag.dataset.z = z;
            return tag;
        };

        const tags = texts.map((text, idx) => createTag(text, idx));
        tags.forEach(tag => container.appendChild(tag));

        // Reduced motion: lay tags out as a static grid, no animation loop
        if (prefersReducedMotion) {
            const cols = 5;
            const rows = Math.ceil(texts.length / cols);
            tags.forEach((tag, idx) => {
                const row = Math.floor(idx / cols);
                const col = idx % cols;
                const gx = (col - (cols - 1) / 2) * 160;
                const gy = (row - (rows - 1) / 2) * 50;
                tag.style.transform = `translate3d(${gx}px, ${gy}px, 0) translate(-50%, -50%)`;
            });
            return () => {
                container.innerHTML = '';
            };
        }

        // Store current positions for smooth interpolation
        const currentPositions = tags.map((_, idx) => {
            const { x, y, z } = computePosition(idx);
            return { x, y, z, scale: 1, opacity: 1 };
        });

        let angleX = 0;
        let angleY = 0;
        let animationFrameId;

        // Skip the per-tag transform work while the sphere is offscreen
        let isVisible = true;
        const visibilityObserver = new IntersectionObserver(
            ([entry]) => { isVisible = entry.isIntersecting; },
            { threshold: 0.05 }
        );
        visibilityObserver.observe(container);

        const animate = () => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }
            // Rotate the sphere if not hovered
            if (!isHoveredRef.current) {
                angleX += 0.005;
                angleY += 0.005;
            }

            tags.forEach((tag, idx) => {
                let targetX, targetY, targetZ, targetScale, targetOpacity;

                if (isHoveredRef.current) {
                    // Grid layout target
                    const cols = 5;
                    const rows = Math.ceil(texts.length / cols);
                    const row = Math.floor(idx / cols);
                    const col = idx % cols;

                    // Calculate grid position centered
                    targetX = (col - (cols - 1) / 2) * 160;
                    targetY = (row - (rows - 1) / 2) * 50;
                    targetZ = 0;
                    targetScale = 1.2;
                    targetOpacity = 1;
                } else {
                    // Sphere rotation target
                    const { x, y, z } = computePosition(idx);

                    const cosX = Math.cos(angleX);
                    const sinX = Math.sin(angleX);
                    const cosY = Math.cos(angleY);
                    const sinY = Math.sin(angleY);

                    const rotatedX = x * cosY - z * sinY;
                    const rotatedZ = x * sinY + z * cosY;
                    const rotatedY = y * cosX - rotatedZ * sinX;
                    const finalZ = y * sinX + rotatedZ * cosX;

                    targetX = rotatedX;
                    targetY = rotatedY;
                    targetZ = finalZ;
                    targetScale = (300 + finalZ) / 300;
                    targetOpacity = (finalZ + 150) / 300;
                }

                // Smoothly interpolate current position to target position (Lerp)
                const ease = 0.1; // Adjust for speed/smoothness
                currentPositions[idx].x += (targetX - currentPositions[idx].x) * ease;
                currentPositions[idx].y += (targetY - currentPositions[idx].y) * ease;
                currentPositions[idx].z += (targetZ - currentPositions[idx].z) * ease;
                currentPositions[idx].scale += (targetScale - currentPositions[idx].scale) * ease;
                currentPositions[idx].opacity += (targetOpacity - currentPositions[idx].opacity) * ease;

                // Apply transforms
                const { x, y, z, scale, opacity } = currentPositions[idx];
                tag.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale}) translate(-50%, -50%)`;
                tag.style.opacity = opacity;
                tag.style.zIndex = Math.round(scale * 100);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            visibilityObserver.disconnect();
            container.innerHTML = '';
        };
    }, [texts]); // Added texts to dependency array

    return (
        <div
            className="skills-sphere-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="skills-sphere" ref={containerRef}></div>
            <div className={`skills-instruction ${isHoveredState ? 'hidden' : ''}`}>Hover to view list</div>
        </div>
    );
};

export default SkillsSphere;
