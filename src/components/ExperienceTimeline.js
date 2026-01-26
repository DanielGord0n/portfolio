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
            description: [
                'Verified Sarukhanian’s δ-code constructions by implementing computational checks that identified a sign error in Proposition 1.',
                'Applied evolutionary and stochastic optimization (Genetic Algorithms, Simulated Annealing) to repair the incorrect Proposition 2 structure.',
                'Combined exhaustive search space validation with symbolic Maple verification to mathematically disprove the published construction.'
            ]
        },
        {
            id: 2,
            role: 'AI Platform / Full-Stack Developer',
            company: 'MCG - Digital Assetization Company',
            period: 'July 2025 - Present',
            description: 'Refactoring lip-sync pipelines for 3D avatars in Unity. Prototyping end-to-end AI workflows with Whisper and LangChain, and implementing model-level optimizations reducing inference latency by ~25%.'
        },
        {
            id: 3,
            role: 'Junior Solutions Architect',
            company: 'LaunchPath Inc.',
            period: 'June 2025 - Aug 2025',
            description: 'Owned solution architecture for a biosensor analytics platform: translated requirements into C4 diagrams. Built a responsive React Native frontend integrated with Python microservices for real-time data ingestion.'
        },
        {
            id: 4,
            role: 'Contract Full-Stack Developer',
            company: 'Self-Employed',
            period: 'April 2024 - Present',
            description: 'Engineered AI-driven WhatsApp summarization services serving 200+ users. Built modular RESTful APIs and React/Next.js interfaces for small-business clients, focusing on scalability and user experience.'
        },
        {
            id: 5,
            role: 'Website Developer (UI/UX)',
            company: 'Futures and Fringes',
            period: 'Feb 2025 - Mar 2025',
            description: 'Designed and launched a CMS-powered website in Framer. Improved mobile load times by 25% and boosted user engagement by 15% through optimized interactive features and layout.'
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
                        {Array.isArray(exp.description) ? (
                            <ul className="timeline-description-list">
                                {exp.description.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="timeline-description">{exp.description}</p>
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ExperienceTimeline;
