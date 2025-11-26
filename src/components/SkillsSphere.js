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

    const texts = [
        'React', 'Node.js', 'Python', 'Java', 'C/C++',
        'TypeScript', 'JavaScript', 'Next.js', 'Flutter', 'Dart',
        'PyTorch', 'TensorFlow', 'SQL', 'NoSQL', 'AWS',
        'Docker', 'Git', 'Figma', 'Tailwind', 'Prisma',
        'GraphQL', 'Unity', 'Framer', 'R', 'Bash',
        'Gemini AI', 'Scikit-learn', 'Babylon.js'
    ];

    useEffect(() => {
        const container = containerRef.current;

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
            tag.style.color = 'var(--accent-primary)';
            const { x, y, z } = computePosition(idx);
            tag.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
            tag.dataset.x = x;
            tag.dataset.y = y;
            tag.dataset.z = z;
            return tag;
        };

        const tags = texts.map((text, idx) => createTag(text, idx));
        tags.forEach(tag => container.appendChild(tag));

        // Store current positions for smooth interpolation
        const currentPositions = tags.map((_, idx) => {
            const { x, y, z } = computePosition(idx);
            return { x, y, z, scale: 1, opacity: 1 };
        });

        let angleX = 0;
        let angleY = 0;
        let animationFrameId;

        const animate = () => {
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
                    targetX = (col - (cols - 1) / 2) * 120;
                    targetY = (row - (rows - 1) / 2) * 50;
                    targetZ = 0;
                    targetScale = 1;
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
                tag.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
                tag.style.opacity = opacity;
                tag.style.zIndex = Math.round(scale * 100);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            container.innerHTML = '';
        };
    }, []); // Empty dependency array ensures effect runs only once

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
