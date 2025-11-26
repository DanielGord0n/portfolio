import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import '../styles/ProjectCard3D.css';

const ProjectCard3D = ({ title, description, tags, links, image }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className="project-card-3d"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="project-card-content"
            >
                <div className="project-image-container">
                    {image && <img src={image} alt={title} className="project-image" />}
                    <div className="project-image-overlay"></div>
                </div>

                <div className="project-info">
                    <h3 className="project-title-3d">{title}</h3>
                    <p className="project-desc-3d">{description}</p>

                    <ul className="project-tags-3d">
                        {tags.map((tag, i) => (
                            <li key={i}>{tag}</li>
                        ))}
                    </ul>

                    <div className="project-links-3d">
                        {links.map((link, i) => (
                            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="project-link-pill">
                                {link.icon}
                                <span>{link.url.includes('github') ? 'GitHub' : 'Visit'}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard3D;
