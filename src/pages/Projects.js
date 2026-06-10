import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ProjectCard3D from '../components/ProjectCard3D';
import PageTransition from '../components/PageTransition';
import '../styles/Projects.css';

// Featured case studies — content sourced from PORTFOLIO_HANDOFF.md (verified)
const caseStudies = [
  {
    index: '01',
    title: 'TellTours',
    subtitle: 'AI Tour Guide App — Co-founder',
    period: '2024 — Present',
    category: 'AI / Mobile / GCP',
    description:
      'A production mobile app that generates real-time, context-aware AI narration as you walk, drive, or ride through any city — with Apple CarPlay, Android Auto, and multilingual narration. Live at telltours.com in pre-release, with the beta waitlist open.',
    highlights: [
      'Provider-agnostic AI narration pipeline routing between Gemini (primary), OpenAI (fallback), and Ollama (local dev) through a unified client interface — hot-swappable with no code changes.',
      'AI system prompts externalized into Firestore with in-memory caching, TTL, and hardcoded fallbacks, enabling zero-redeploy behavior tuning in production.',
      'Keyless CI/CD via GitHub Actions and Workload Identity Federation — no static service-account keys anywhere in dev or prod.',
      'Real-time geofenced playback triggers in React Native with a full GPS simulator for local testing, plus in-flight LLM observability (model, token count, latency) on every narration call.',
    ],
    tags: ['React Native', 'Expo', 'Node.js', 'Express', 'GCP', 'Cloud Run', 'Firestore', 'Cloud TTS', 'Gemini', 'OpenAI'],
    links: [{ url: 'https://telltours.com', icon: <FaExternalLinkAlt size={13} />, label: 'telltours.com' }],
    terminal: [
      { cmd: 'status', out: 'pre-release · beta waitlist live' },
      { cmd: 'providers', out: 'gemini ⇄ openai ⇄ ollama (hot-swap)' },
      { cmd: 'infra', out: 'gcp: cloud run · firestore · cloud tts' },
      { cmd: 'ci_cd', out: 'keyless — workload identity federation' },
    ],
    tagline: '“The world is full of stories. Listen.”',
  },
  {
    index: '02',
    title: 'BS45 Quantum Explorer',
    subtitle: 'Distributed HPC Solver — Research Assistantship, Wilfrid Laurier University',
    period: '2025 — Present',
    category: 'HPC / C++ / Research',
    description:
      'A high-performance distributed search engine hunting BS(45,44) — an unsolved world-record target in combinatorial mathematics — built for my research assistantship and deployed on Canada’s national supercomputing clusters, coordinating 10,000+ CPU cores.',
    highlights: [
      'Exact C++17 backtracking solver implementing Wang-Zhu published research with custom pruning layers: Theorem 2.3 residue prune (~100x search-space reduction), Theorem 2.4 spectral DFT filter, and pair encoding.',
      'Fixed atomic contention at scale — replaced a shared std::atomic counter across 192 cores with thread_local counters flushed every 2^20 nodes, restoring parallel scaling.',
      'Precomputed DFT basis table removes all floating-point trigonometry from the hot path; symmetry breaking cuts the search space a further 4x.',
      'SLURM job arrays across Trillium, Nibi, Fir, and Rorqual (Digital Research Alliance of Canada) with OpenMP at node level — 192 cores per node.',
    ],
    tags: ['C++17', 'OpenMP', 'SLURM', 'Bash', 'Python'],
    links: [{ url: 'https://github.com/DanielGord0n/BS45_Quantum_Explorer', icon: <FaGithub size={14} />, label: 'GitHub' }],
    terminal: [
      { cmd: 'target', out: 'BS(45,44) — unsolved open problem' },
      { cmd: 'scale', out: '10,000+ cpu cores · 4 national clusters' },
      { cmd: 'pruning', out: '~100x reduction of 2^(4n) space' },
      { cmd: 'clusters', out: 'trillium · nibi · fir · rorqual' },
    ],
  },
  {
    index: '03',
    title: 'Phoenix Bot',
    subtitle: 'AI WhatsApp Group Chat Summarizer — Self-employed',
    period: '2025',
    category: 'Desktop / Electron / AI',
    description:
      'A cross-platform desktop app (macOS, Windows, Linux) that connects to WhatsApp via QR code, monitors group chats, and generates structured AI summaries with Google Gemini. Shipped as v0.2.1 with signed, notarized installers.',
    highlights: [
      'Solved the core architectural challenge: sustaining a persistent, stateful Puppeteer/headless-Chrome session inside an Electron main process — a long-lived Node.js daemon that serverless platforms like Vercel cannot host.',
      'Local SQLite (better-sqlite3) for session state, chats, and summaries; OS keychain credential storage via keytar — no plaintext secrets on disk.',
      'Strictly typed, Zod-validated IPC between the Electron main process and renderer; the renderer has no direct Node.js access.',
      'electron-builder packaging for DMG, EXE, AppImage, and .deb with Apple Notarization; the companion web app documents the stateful-vs-stateless tradeoff and a Docker-based revival path.',
    ],
    tags: ['Electron', 'Next.js', 'React', 'whatsapp-web.js', 'Puppeteer', 'Gemini', 'better-sqlite3', 'keytar'],
    links: [
      { url: 'https://phoenix-bot-web.vercel.app/', icon: <FaExternalLinkAlt size={13} />, label: 'Live site' },
      { url: 'https://github.com/DanielGord0n/phoenix-bot-desktop', icon: <FaGithub size={14} />, label: 'Desktop repo' },
      { url: 'https://github.com/DanielGord0n/phoenix-bot', icon: <FaGithub size={14} />, label: 'Web repo' },
    ],
    terminal: [
      { cmd: 'platforms', out: 'macos · windows · linux (v0.2.1)' },
      { cmd: 'core', out: 'persistent puppeteer in electron main' },
      { cmd: 'storage', out: 'sqlite + os keychain (keytar)' },
      { cmd: 'ipc', out: 'zod-validated, typed end-to-end' },
    ],
  },
  {
    index: '04',
    title: 'MedDose',
    subtitle: 'AI-Powered Medication Assessment App',
    period: '2025',
    category: 'AI / Mobile / Backend',
    description:
      'An AI-powered medication assessment and dosage guidance app: users complete a dynamic 15-step health questionnaire, and the backend constructs a structured prompt for Google Gemini that returns dosage recommendations with step-by-step mathematical reasoning.',
    highlights: [
      'Resilient dual-model AI gateway on native fetch with AbortSignal.timeout (30s) — primary gemini-2.0-flash falls back to gemini-2.5-flash on timeout or 503, with safety settings injected into every payload.',
      'Prompt engineering separates a validation phase from a calculation phase, constraining the model to strict JSON output with explicit mathematical work.',
      'Dynamic conditional questionnaire whose steps array recalculates from real-time state while the UI step counter stays stable.',
      'Custom JWT/bcrypt auth with nodemailer email verification, password reset, token expiry, and rate limiting — no Firebase, no Auth0.',
    ],
    tags: ['React Native 0.79', 'Expo 53', 'Node.js 18', 'Express', 'MongoDB Atlas', 'Gemini 2.0/2.5 Flash'],
    links: [{ url: 'https://github.com/DanielGord0n/meddose', icon: <FaGithub size={14} />, label: 'GitHub' }],
    terminal: [
      { cmd: 'gateway', out: 'gemini-2.0-flash ⇄ 2.5-flash failover' },
      { cmd: 'timeout', out: 'AbortSignal.timeout(30s)' },
      { cmd: 'output', out: 'strict JSON + step-by-step math' },
      { cmd: 'auth', out: 'jwt/bcrypt — built from scratch' },
    ],
  },
];

// Additional projects grid
const projects = [
  {
    index: 5,
    title: 'AI-Powered 3D Avatar Platform',
    company: 'MCG Digital Assetization',
    category: 'AI Systems',
    description:
      'Integrated OpenAI Whisper and LLM orchestration into production AI workflows for real-time 3D avatar animation, benchmarking accuracy and latency tradeoffs across models — improving overall system performance by 25%. Refactored the Python/JavaScript lip-sync pipeline for Unity avatars, exposed as RESTful services to a React/Next.js frontend.',
    tags: ['Python', 'OpenAI Whisper', 'Unity', 'Next.js', 'REST APIs'],
    links: [{ url: 'https://mycleanmesh.com/', icon: <FaExternalLinkAlt size={13} />, label: 'Live' }],
  },
  {
    index: 6,
    title: 'Viva RGC Website & CMS',
    company: 'Viva RGC',
    category: 'Full Stack',
    description:
      'Architected a full-stack platform with a custom CMS using Next.js 16 and Supabase. Enabled real-time content management for non-technical staff while delivering a high-performance, glassmorphic public site. Features strong typing, RLS security, and dynamic scheduling for complex athletic programs.',
    tags: ['Next.js 16', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
    links: [{ url: 'https://www.vivargc.com/', icon: <FaExternalLinkAlt size={13} />, label: 'Live' }],
  },
  {
    index: 7,
    title: "Elena's Art",
    company: 'Personal — a gift for my mother',
    category: 'Frontend',
    description:
      'Bilingual (English/Russian) digital portfolio that brings physical paintings to life as subtle cinematic animations — built for my mother, a Toronto painter. 2.5D animation without WebGL: AI-generated video overlaid inside each painting’s frame plus custom React effect components; a file-system CMS where publishing is a git commit; custom lightweight i18n.',
    tags: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Vercel'],
    links: [
      { url: 'https://elenas-art.vercel.app', icon: <FaExternalLinkAlt size={13} />, label: 'Live' },
      { url: 'https://github.com/DanielGord0n/ElenasArt', icon: <FaGithub size={14} />, label: 'GitHub' },
    ],
  },
  {
    index: 8,
    title: 'wluNest — Student Housing',
    company: 'Academic Project',
    category: 'Full Stack',
    description:
      'Full-stack student housing platform for Laurier and UWaterloo students: apartment listings, interactive map browsing, reviews, and roommate matching. Custom local geocoder streams a 7.4MB postal-code CSV to coordinates ($0 API cost); layered JWT→RBAC middleware; normalized MySQL schema; secure Multer upload pipeline.',
    tags: ['React 19', 'React Leaflet', 'Node.js', 'Express', 'MySQL', 'JWT'],
    links: [{ url: 'https://github.com/WluNest/wluNest-App', icon: <FaGithub size={14} />, label: 'GitHub' }],
  },
  {
    index: 9,
    title: 'LaunchPath Biotech Architecture',
    company: 'LaunchPath Inc.',
    category: 'Architecture',
    description:
      'Owned the full-stack solution architecture for a biosensor analytics platform. Designed C4 system diagrams, defined API specifications, and implemented a React Native + Python microservices ecosystem for real-time data ingestion. Delivered a secure, production-ready system for clinical data reporting.',
    tags: ['React Native', 'Python', 'Microservices', 'C4 Architecture'],
    links: [{ url: 'https://github.com/DanielGord0n/aptamer_therapeutic', icon: <FaGithub size={14} />, label: 'GitHub' }],
  },
  {
    index: 10,
    title: 'Personal Developer Portfolio',
    company: 'This site',
    category: 'Frontend',
    description:
      'Custom 3D skill sphere built without WebGL/Three.js using spherical-coordinate math and CSS transforms, lerping into a 2D grid on hover. HTML5 Canvas particle engine with distance-based connecting lines. Physics-based card tilt via Framer Motion. CSS-variables design system — no Tailwind, no component library.',
    tags: ['React 19', 'Framer Motion 12', 'Lenis', 'Vanilla CSS', 'Vercel'],
    links: [{ url: 'https://github.com/DanielGord0n', icon: <FaGithub size={14} />, label: 'GitHub' }],
  },
  {
    index: 11,
    title: 'N-Queens RL & CSP Solver',
    company: 'Academic Project',
    category: 'Algorithms',
    description:
      'Implemented an optimized Min-Conflicts CSP solver scaling to N=1,000,000. Designed greedy initialization and constant-time conflict repair to reduce runtime to O(n).',
    tags: ['Python', 'Min-Conflicts CSP', 'Optimization', 'PyTorch'],
    links: [],
  },
  {
    index: 12,
    title: 'Waiver Submission App',
    company: 'Contract Work',
    category: 'Full Stack',
    description:
      'Built a full-stack liability waiver management system using React and Prisma. Reduced administrative processing time by 40% through automated database storage and retrieval.',
    tags: ['React.js', 'Prisma', 'Tailwind CSS', 'Vercel'],
    links: [{ url: 'https://github.com/DanielGord0n/pool-waiver', icon: <FaGithub size={14} />, label: 'GitHub' }],
  },
  {
    index: 13,
    title: 'Futures and Fringes CMS',
    company: 'Futures and Fringes',
    category: 'Frontend',
    description:
      'Designed and launched a CMS-powered website in Framer. Improved mobile load times by 25% and integrated interactive features for better user engagement.',
    tags: ['Framer', 'CMS', 'UI/UX Design'],
    links: [{ url: 'https://www.futuresandfringes.com/', icon: <FaExternalLinkAlt size={13} />, label: 'Live' }],
  },
  {
    index: 14,
    title: 'Battleships Game',
    company: 'Academic Project',
    category: 'Games',
    description:
      'Implemented a Battleships game in Java with a Swing GUI and OOP design patterns. Built an AI opponent using minimax-style heuristics and state pruning.',
    tags: ['Java', 'Maven', 'OOP', 'GUI'],
    links: [{ url: 'https://github.com/y-fysiks/ICS4U-CPT-Battleship', icon: <FaGithub size={14} />, label: 'GitHub' }],
  },
  {
    index: 15,
    title: 'Multiplayer Roblox Game',
    company: 'Personal Project',
    category: 'Games',
    description:
      'Working on a multiplayer game using Lua and the Roblox framework. Focus on networking, server-client interaction, and game state management.',
    tags: ['Lua', 'Roblox Framework', 'Networking'],
    links: [{ url: 'https://github.com/DanielGord0n', icon: <FaGithub size={14} />, label: 'GitHub' }],
  },
];

const CaseStudy = ({ study, flipped }) => (
  <motion.article
    className={`case-study ${flipped ? 'case-study-flipped' : ''}`}
    initial={{ opacity: 0, y: 32 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  >
    <div className="case-study-body">
      <div className="case-study-meta">
        <span className="case-index">{study.index}</span>
        <span className="case-category">{study.category}</span>
        <span className="case-period">{study.period}</span>
      </div>
      <h2 className="case-title">{study.title}</h2>
      <span className="case-subtitle">{study.subtitle}</span>
      <p className="case-description">{study.description}</p>

      <ul className="case-highlights">
        {study.highlights.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <ul className="case-tags">
        {study.tags.map((tag, i) => (
          <li key={i}>{tag}</li>
        ))}
      </ul>

      <div className="case-links">
        {study.links.map((link, i) => (
          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="project-link-pill">
            {link.icon}
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </div>

    <div className="case-study-panel">
      <div className="terminal-window">
        <div className="terminal-titlebar">
          <span className="terminal-dot" />
          <span className="terminal-dot" />
          <span className="terminal-dot" />
          <span className="terminal-title">{study.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}</span>
        </div>
        <div className="terminal-body">
          {study.terminal.map((line, i) => (
            <div className="terminal-line" key={i}>
              <span className="terminal-prompt">$ {line.cmd}</span>
              <span className="terminal-output">{line.out}</span>
            </div>
          ))}
        </div>
      </div>
      {study.tagline && <p className="case-tagline">{study.tagline}</p>}
    </div>
  </motion.article>
);

const Projects = () => {
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    document.title = 'Projects | Daniel Gordon';
  }, []);

  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const projectsToDisplay =
    filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="projects-container">
      <div className="projects-header">
        <span className="section-marker">selected work</span>
        <h1>Projects</h1>
        <p>
          Production systems I've designed, built, and operated — from AI products and cloud fleets
          to research code on national supercomputers.
        </p>
      </div>

      <div className="case-studies">
        {caseStudies.map((study, i) => (
          <CaseStudy key={study.index} study={study} flipped={i % 2 === 1} />
        ))}
      </div>

      <div className="more-projects-header">
        <span className="section-marker">more work</span>
        <h2>Other projects</h2>
        <div className="project-filters">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {projectsToDisplay.map(project => (
          <ProjectCard3D
            key={project.index}
            index={project.index}
            title={project.title}
            company={project.company}
            category={project.category}
            description={project.description}
            tags={project.tags}
            links={project.links}
          />
        ))}
      </div>
    </div>
  );
};

export default PageTransition(Projects);
