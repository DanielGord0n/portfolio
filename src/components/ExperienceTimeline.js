import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ExperienceTimeline.css';

const ExperienceTimeline = () => {
    const experiences = [
        {
            id: 1,
            role: 'Research Assistant - AI/ML',
            company: 'Wilfrid Laurier University',
            period: 'Sept 2025 - Present',
            description: 'Reproduced and debugged mathematical constructions from research papers. Applied hybrid ML-driven error-localization to flag suspicious recurrence steps and implemented validated Maple pipelines.'
        },
        {
            id: 2,
            role: 'Full Stack / AI Developer',
            company: 'MCG - Digital Assetization Company',
            period: 'July 2025 - Present',
            description: 'Refactoring lip-sync pipelines for 3D avatars in Unity. Prototyping end-to-end AI workflows with Whisper and LangChain, and implementing model-level optimizations for 25% lower latency.'
        },
        {
            id: 3,
            role: 'Junior Solution Architect',
            company: 'LaunchPath Inc.',
            period: 'June 2025 - Aug 2025',
            description: 'Architected scalable systems for biosensor analytics. Led Agile delivery across 3 sprints and built a responsive React Native interface with secure Python microservices integration.'
        },
        {
            id: 4,
            role: 'Contract Full Stack Developer',
            company: 'Self-Employed',
            period: 'April 2024 - Present',
            description: 'Engineered AI-driven WhatsApp summarization services serving 200+ users. Built modular RESTful APIs and React/Next.js interfaces for 5+ small-business clients.'
        },
        {
            id: 5,
            role: 'Website Developer (UI/UX)',
            company: 'Futures and Fringes',
            period: 'Feb 2025 - Mar 2025',
            description: 'Designed and launched a CMS-powered website in Framer, improving mobile load times by 25% and boosting user engagement by 15% through interactive features.'
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
