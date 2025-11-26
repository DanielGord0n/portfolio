import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ExperienceTimeline.css';

const ExperienceTimeline = () => {
    const experiences = [
        {
            id: 1,
            role: 'Full Stack Developer',
            company: 'LaunchPath Inc.',
            period: '2023 - Present',
            description: 'Architecting scalable solutions for biotech projects, leading agile teams, and developing full-stack applications.'
        },
        {
            id: 2,
            role: 'Software Developer',
            company: 'MCG',
            period: '2022 - 2023',
            description: 'Enhanced 3D avatar pipelines, integrated AI workflows, and optimized frontend performance.'
        },
        {
            id: 3,
            role: 'Freelance Developer',
            company: 'Self-Employed',
            period: '2020 - 2022',
            description: 'Delivered custom web solutions for various clients, focusing on CMS integration and responsive design.'
        }
    ];

    return (
        <div className="timeline-container">
            {experiences.map((exp, index) => (
                <motion.div
                    className="timeline-item"
                    key={exp.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                    <div className="timeline-content">
                        <span className="timeline-period">{exp.period}</span>
                        <h3 className="timeline-role">{exp.role}</h3>
                        <h4 className="timeline-company">{exp.company}</h4>
                        <p className="timeline-description">{exp.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ExperienceTimeline;
