import React, { useRef, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import '../styles/ProjectCard3D.css';

const ProjectCard3D = ({ index, title, company, category, description, tags, links }) => {
    const ref = useRef(null);

    // Tilt only on devices that can hover — touch devices get a static card
    const canTilt = useMemo(
        () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches,
        []
    );

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e) => {
        if (!canTilt) return;
        const rect = ref.current.getBoundingClientRect();

        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const monogram = title
        .split(/\s+/)
        .map(word => word[0])
        .filter(ch => /[A-Za-z0-9]/.test(ch))
        .slice(0, 2)
        .join('')
        .toUpperCase();

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={canTilt ? {
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            } : undefined}
            className="project-card-3d"
        >
            <div
                style={canTilt ? {
                    transform: "translateZ(40px)",
                    transformStyle: "preserve-3d",
                } : undefined}
                className="project-card-content"
            >
                <div className="card-top-row">
                    <div className="card-monogram">{monogram}</div>
                    <div className="card-top-meta">
                        {index != null && (
                            <span className="card-index">{String(index).padStart(2, '0')}</span>
                        )}
                        {category && <span className="card-category">{category}</span>}
                    </div>
                </div>

                <div className="project-info">
                    <h3 className="project-title-3d">{title}</h3>
                    {company && <span className="card-company">{company}</span>}
                    <p className="project-desc-3d">{description}</p>

                    <ul className="project-tags-3d">
                        {tags.map((tag, i) => (
                            <li key={i}>{tag}</li>
                        ))}
                    </ul>

                    {links && links.length > 0 && (
                        <div className="card-links">
                            {links.map((link, i) => (
                                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="project-link-pill">
                                    {link.icon}
                                    <span>{link.label || (link.url.includes('github') ? 'GitHub' : 'Visit')}</span>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard3D;
