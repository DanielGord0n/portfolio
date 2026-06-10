import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ExperienceTimeline.css';

// Content sourced from PORTFOLIO_HANDOFF.md (verified)
const experiences = [
    {
        id: 1,
        role: 'DevOps / Cloud Engineering Intern',
        company: 'WellnessLiving Systems',
        meta: 'Remote',
        period: 'Apr 2026 — Present',
        description: [
            'Discovered a silent CloudWatch failure mode where S3 request metrics returned empty data on 14 buckets due to disabled server-access logging; built a three-layer verification framework that prevented 4 active production buckets from being incorrectly modified.',
            'Owned end-to-end S3 cost optimization across a 17-account AWS organization — audited 455 buckets ($8,214/mo) via Python, executed an Intelligent-Tiering lifecycle rollout, and confirmed 151,892 object transitions within 4 days with zero production incidents.',
            'Hardened 79 production WordPress EC2 instances fleet-wide via AWS SSM Run Command with zero direct server access, automating a 7-step security standard and delivering a 33-flag prioritized remediation report to stakeholders.',
            'Executed a PHP 8.3 upgrade across 78 live client sites via staged batches (10, 25, 42 instances); caught a missing php8.3-mysql extension after batch 1 before full-fleet impact, limiting client-facing downtime to under 5 minutes.',
            'Automated OS patching via AWS SSM Patch Manager across Amazon Linux 2023, Ubuntu 22.04, and Windows Server 2025; authored a 14-section production SOP reviewed and approved by senior engineers.'
        ]
    },
    {
        id: 2,
        role: 'Software Engineer → Technical Lead',
        company: 'MCG Digital Assetization',
        meta: 'Remote',
        period: 'Jul 2025 — May 2026',
        description: [
            'Promoted to technical lead after 6 months; owned system architecture, production integrations, and codebase stability across a live AI platform while remaining hands-on in backend development.',
            'Integrated OpenAI Whisper and LLM orchestration into production AI workflows for real-time 3D avatar animation, benchmarking accuracy and latency tradeoffs across models; improved overall system performance by 25%.',
            'Refactored a Python/JavaScript lip-sync ML pipeline for Unity 3D avatars, improving phoneme-to-blendshape alignment and exposing audio-driven animation triggers as RESTful services to a React/Next.js frontend.'
        ]
    },
    {
        id: 3,
        role: 'Research Assistant — Combinatorial Mathematics & HPC',
        company: 'Wilfrid Laurier University',
        meta: 'Waterloo, ON',
        period: 'Sep 2025 — Present',
        description: [
            'Developed a high-performance C++ backtracking solver (BS45 Quantum Explorer) deployed across 4 national HPC clusters (Trillium, Nibi, Fir, Rorqual) via SLURM, coordinating 10,000+ CPU cores to search for new Base Sequences — an unsolved open problem in combinatorial mathematics.',
            'Implemented Theorem 2.3 residue pruning, spectral DFT filtering, and Wang-Zhu pair encoding to reduce the naive 2^(4n) search space by ~100x; actively searching for BS(45,44), an unsolved world-record target.',
            'Built automated validation pipelines to verify numerical stability and detect convergence failures across large-scale parallel workloads.'
        ]
    },
    {
        id: 4,
        role: 'Junior Solutions Architect',
        company: 'LaunchPath Inc.',
        meta: 'Toronto, ON — Remote',
        period: 'Jun 2025 — Aug 2025',
        description: [
            'Designed a resilient dual-model Gemini AI gateway using native fetch with AbortSignal timeouts and automatic failover between models; engineered structured prompt chains constraining the LLM to strict JSON output with step-by-step mathematical reasoning.',
            'Built a dynamic 15-step conditional questionnaire engine in React Native where the steps array mutates in real time while keeping UI state stable, backed by a custom Node.js/Express API with JWT/bcrypt authentication and email verification built from scratch.'
        ]
    },
    {
        id: 5,
        role: 'Software Engineer, AI Systems',
        company: 'Self-Employed',
        meta: 'Remote',
        period: 'Apr 2024 — May 2026',
        description: [
            'Designed and shipped Phoenix Bot, a cross-platform Electron desktop app (macOS, Windows, Linux) automating WhatsApp group chat summarization via Google Gemini — solving the core challenge of sustaining a persistent Puppeteer/headless-Chrome session inside an Electron main process, with OS keychain credential storage and local SQLite for session state.'
        ]
    },
    {
        id: 6,
        role: 'Website Developer (UI/UX)',
        company: 'Futures and Fringes',
        meta: 'Toronto, ON',
        period: 'Feb 2025 — Mar 2025',
        description: [
            'Designed and launched a CMS-powered website in Framer. Improved mobile load times by 25% and boosted user engagement through optimized interactive features and layout.'
        ]
    }
];

const ExperienceTimeline = () => {
    return (
        <div className="timeline-container">
            {experiences.map((exp, index) => (
                <motion.div
                    className="timeline-item"
                    key={exp.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.3) }}
                >
                    <div className="timeline-marker" />
                    <div className="timeline-content">
                        <div className="timeline-head">
                            <span className="timeline-period">{exp.period}</span>
                            <span className="timeline-meta">{exp.meta}</span>
                        </div>
                        <h3 className="timeline-role">{exp.role}</h3>
                        <h4 className="timeline-company">{exp.company}</h4>
                        <ul className="timeline-description-list">
                            {exp.description.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ExperienceTimeline;
