import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import ProjectCard3D from '../components/ProjectCard3D';
import PageTransition from '../components/PageTransition';
import { useLightbox } from '../components/Lightbox';
import '../styles/Projects.css';

import tellToursLogo from '../images/opt/TellToursLogo.png';
import mcgLogo from '../images/opt/MCGLogo.png';
import vivaLogo from '../images/VivaLogo.png';
import launchpathLogo from '../images/opt/launchpathLogo.png';
import laurierLogo from '../images/opt/LaurierLogo.png';
import elenasArtLogo from '../images/opt/ElenasArtLogo.png';
import dgLogo from '../images/opt/DG_logo.png';
import queenIcon from '../images/QueenIcon.png';
import waiverLogo from '../images/waiver.png';
import ffLogo from '../images/FF-ICON-BLK.png';
import battleshipsLogo from '../images/battleshipcycles-logo-ftr.png';

// Featured case studies. Content sourced from PORTFOLIO_HANDOFF.md (verified).
const caseStudies = [
  {
    index: '01',
    title: 'TellTours',
    subtitle: 'AI Tour Guide App / Co-founder',
    period: '2024 - Present',
    category: 'AI / Mobile / GCP',
    logo: tellToursLogo,
    description:
      'A production mobile app that narrates the world around you in real time as you walk, drive, or ride through any city. Supports Apple CarPlay, Android Auto, and multilingual narration. Live at telltours.com in pre-release, with the beta waitlist open.',
    highlights: [
      'Provider-agnostic AI narration pipeline that routes between Gemini (primary), OpenAI (fallback), and Ollama (local dev) through one client interface. Swapping providers requires zero code changes.',
      'System prompts live in Firestore with in-memory caching, TTL, and hardcoded fallbacks, so narration behavior can be tuned in production without a redeploy.',
      'Keyless CI/CD through GitHub Actions and Workload Identity Federation. No static service-account keys exist anywhere, dev or prod.',
      'Real-time geofenced playback triggers in React Native, a full GPS simulator for local testing, and in-flight LLM observability (model, token count, latency) on every narration call.',
    ],
    tags: ['React Native', 'Expo', 'Node.js', 'Express', 'GCP', 'Cloud Run', 'Firestore', 'Cloud TTS', 'Gemini', 'OpenAI'],
    links: [{ url: 'https://telltours.com', icon: <FaExternalLinkAlt size={13} />, label: 'telltours.com' }],
    terminal: [
      { cmd: 'status', out: 'pre-release / beta waitlist live' },
      { cmd: 'providers', out: 'gemini > openai > ollama (hot-swap)' },
      { cmd: 'infra', out: 'gcp: cloud run / firestore / cloud tts' },
      { cmd: 'ci_cd', out: 'keyless, workload identity federation' },
    ],
    tagline: '"The world is full of stories. Listen."',
  },
  {
    index: '02',
    title: 'BS45 Quantum Explorer',
    subtitle: 'Distributed HPC Solver / Research Assistantship, Wilfrid Laurier University',
    period: '2025 - Present',
    category: 'HPC / C++ / Research',
    logo: laurierLogo,
    description:
      'A high-performance distributed search engine hunting BS(45,44), an unsolved world-record target in combinatorial mathematics. Built for my research assistantship and deployed on Canada\'s national supercomputing clusters, coordinating more than 10,000 CPU cores.',
    highlights: [
      'Exact C++17 backtracking solver implementing Wang-Zhu published research, with custom pruning layers: Theorem 2.3 residue prune (roughly 100x search-space reduction), Theorem 2.4 spectral DFT filter, and pair encoding.',
      'Fixed atomic contention at scale by replacing a shared std::atomic counter across 192 cores with thread_local counters flushed every 2^20 nodes, restoring parallel scaling.',
      'Precomputed DFT basis table removes all floating-point trigonometry from the hot path. Symmetry breaking cuts the search space a further 4x.',
      'SLURM job arrays across Trillium, Nibi, Fir, and Rorqual (Digital Research Alliance of Canada), with OpenMP at node level on 192 cores per node.',
    ],
    tags: ['C++17', 'OpenMP', 'SLURM', 'Bash', 'Python'],
    links: [{ url: 'https://github.com/DanielGord0n/BS45_Quantum_Explorer', icon: <FaGithub size={14} />, label: 'GitHub' }],
    terminal: [
      { cmd: 'target', out: 'BS(45,44), unsolved open problem' },
      { cmd: 'scale', out: '10,000+ cpu cores / 4 national clusters' },
      { cmd: 'pruning', out: '~100x reduction of 2^(4n) space' },
      { cmd: 'clusters', out: 'trillium / nibi / fir / rorqual' },
    ],
  },
  {
    index: '03',
    title: 'Phoenix Bot',
    subtitle: 'AI WhatsApp Group Chat Summarizer / Self-employed',
    period: '2025',
    category: 'Desktop / Electron / AI',
    description:
      'A cross-platform desktop app (macOS, Windows, Linux) that connects to WhatsApp via QR code, monitors group chats, and generates structured AI summaries with Google Gemini. Shipped as v0.2.1 with signed, notarized installers.',
    highlights: [
      'Solved the core architectural problem: keeping a persistent, stateful Puppeteer/headless-Chrome session alive inside an Electron main process. It is a long-lived Node.js daemon, which is exactly what serverless platforms like Vercel cannot host.',
      'Local SQLite (better-sqlite3) for session state, chats, and summaries. Credentials go in the OS keychain via keytar, never in plaintext on disk.',
      'Strictly typed, Zod-validated IPC between the Electron main process and renderer. The renderer has no direct Node.js access.',
      'electron-builder packaging for DMG, EXE, AppImage, and .deb with Apple Notarization. The companion web app documents the stateful-vs-stateless tradeoff and a Docker-based revival path.',
    ],
    tags: ['Electron', 'Next.js', 'React', 'whatsapp-web.js', 'Puppeteer', 'Gemini', 'better-sqlite3', 'keytar'],
    links: [
      { url: 'https://phoenix-bot-web.vercel.app/', icon: <FaExternalLinkAlt size={13} />, label: 'Live site' },
      { url: 'https://github.com/DanielGord0n/phoenix-bot-desktop', icon: <FaGithub size={14} />, label: 'GitHub' },
    ],
    terminal: [
      { cmd: 'platforms', out: 'macos / windows / linux (v0.2.1)' },
      { cmd: 'core', out: 'persistent puppeteer in electron main' },
      { cmd: 'storage', out: 'sqlite + os keychain (keytar)' },
      { cmd: 'ipc', out: 'zod-validated, typed end-to-end' },
    ],
  },
  {
    index: '04',
    title: 'MedDose',
    subtitle: 'AI-Powered Medication Assessment App / built at LaunchPath Inc.',
    period: '2025',
    category: 'AI / Mobile / Backend',
    description:
      'An AI-powered medication assessment and dosage guidance app: the work from my Junior Solutions Architect role at LaunchPath Inc., shared as an NDA-safe public rebuild. Users complete a dynamic 15-step health questionnaire, and the backend builds a structured prompt for Google Gemini that returns dosage recommendations with step-by-step mathematical reasoning.',
    highlights: [
      'Resilient dual-model AI gateway on native fetch with AbortSignal.timeout (30s). Primary gemini-2.0-flash falls back to gemini-2.5-flash on timeout or 503, with safety settings injected into every payload.',
      'Prompt engineering separates a validation phase from a calculation phase, constraining the model to strict JSON output with explicit mathematical work.',
      'Dynamic conditional questionnaire whose steps array recalculates from real-time state while the UI step counter stays stable.',
      'Custom JWT/bcrypt auth with nodemailer email verification, password reset, token expiry, and rate limiting. No Firebase, no Auth0.',
    ],
    tags: ['React Native 0.79', 'Expo 53', 'Node.js 18', 'Express', 'MongoDB Atlas', 'Gemini 2.0/2.5 Flash'],
    links: [{ url: 'https://github.com/DanielGord0n/meddose', icon: <FaGithub size={14} />, label: 'GitHub' }],
    terminal: [
      { cmd: 'gateway', out: 'gemini-2.0-flash > 2.5-flash failover' },
      { cmd: 'timeout', out: 'AbortSignal.timeout(30s)' },
      { cmd: 'output', out: 'strict JSON + step-by-step math' },
      { cmd: 'auth', out: 'jwt/bcrypt, built from scratch' },
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
    image: mcgLogo,
    logoTreatment: 'invert',
    description:
      'Integrated OpenAI Whisper and LLM orchestration into production AI workflows for real-time 3D avatar animation, benchmarking accuracy and latency tradeoffs across models. Improved overall system performance by 25%. Refactored the Python/JavaScript lip-sync pipeline for Unity avatars, exposed as RESTful services to a React/Next.js frontend.',
    tags: ['Python', 'OpenAI Whisper', 'Unity', 'Next.js', 'REST APIs'],
    links: [{ url: 'https://unified.digicopy.me/account/twin', icon: <FaExternalLinkAlt size={13} />, label: 'Live demo' }],
  },
  {
    index: 6,
    title: 'Viva RGC Website & CMS',
    company: 'Viva RGC',
    category: 'Full Stack',
    image: vivaLogo,
    description:
      'Architected a full-stack platform with a custom CMS using Next.js 16 and Supabase. Enabled real-time content management for non-technical staff while delivering a high-performance, glassmorphic public site. Features strong typing, RLS security, and dynamic scheduling for complex athletic programs.',
    tags: ['Next.js 16', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
    links: [
      { url: 'https://www.vivargc.com/', icon: <FaExternalLinkAlt size={13} />, label: 'Live' },
      { url: 'https://github.com/DanielGord0n/vivargc', icon: <FaGithub size={14} />, label: 'GitHub' },
    ],
  },
  {
    index: 7,
    title: "Elena's Art",
    company: 'Personal / a gift for my mother',
    category: 'Frontend',
    image: elenasArtLogo,
    description:
      'A bilingual (English/Russian) digital portfolio that brings physical paintings to life as subtle cinematic animations, built for my mother, a Toronto painter. 2.5D animation without WebGL: AI-generated video overlaid inside each painting\'s frame plus custom React effect components. The CMS is the file system, so publishing is a git commit.',
    tags: ['Next.js 16', 'TypeScript', 'Tailwind CSS v4', 'Vercel'],
    links: [
      { url: 'https://elenas-art.vercel.app', icon: <FaExternalLinkAlt size={13} />, label: 'Live' },
      { url: 'https://github.com/DanielGord0n/ElenasArt', icon: <FaGithub size={14} />, label: 'GitHub' },
    ],
  },
  {
    index: 8,
    title: 'wluNest, Student Housing',
    company: 'Academic Project',
    category: 'Full Stack',
    image: laurierLogo,
    description:
      'Full-stack student housing platform for Laurier and UWaterloo students: apartment listings, interactive map browsing, reviews, and roommate matching. A custom local geocoder streams a 7.4MB postal-code CSV to coordinates at $0 API cost. Layered JWT and RBAC middleware, a normalized MySQL schema, and a secure Multer upload pipeline.',
    tags: ['React 19', 'React Leaflet', 'Node.js', 'Express', 'MySQL', 'JWT'],
    links: [{ url: 'https://github.com/WluNest/wluNest-App', icon: <FaGithub size={14} />, label: 'GitHub' }],
  },
  {
    index: 9,
    title: 'LaunchPath Biotech Architecture',
    company: 'LaunchPath Inc.',
    category: 'Architecture',
    image: launchpathLogo,
    imageWide: true,
    logoTreatment: 'hue',
    description:
      'Owned the full-stack solution architecture for a biosensor analytics platform. Designed C4 system diagrams, defined API specifications, and implemented a React Native + Python microservices ecosystem for real-time data ingestion. Delivered a secure, production-ready system for clinical data reporting.',
    tags: ['React Native', 'Python', 'Microservices', 'C4 Architecture'],
    links: [],
  },
  {
    index: 10,
    title: 'Personal Developer Portfolio',
    company: 'This site',
    category: 'Frontend',
    image: dgLogo,
    logoTreatment: 'invert',
    description:
      'The site you are on. A programmatic title sequence rendered in React with Remotion, an animated SVG telemetry gauge cluster, a lazy-loaded React Three Fiber systems globe, and a 3D skill sphere built with pure CSS transforms. The design system is hand-rolled CSS variables. No Tailwind, no component library.',
    tags: ['React 19', 'Remotion', 'React Three Fiber', 'Framer Motion 12', 'Vanilla CSS'],
    links: [{ url: 'https://github.com/DanielGord0n/daniels_website', icon: <FaGithub size={14} />, label: 'GitHub' }],
  },
  {
    index: 11,
    title: 'N-Queens RL & CSP Solver',
    company: 'Academic Project',
    category: 'Algorithms',
    image: queenIcon,
    logoTreatment: 'invert',
    description:
      'Implemented an optimized Min-Conflicts CSP solver scaling to N=1,000,000. Designed greedy initialization and constant-time conflict repair to reduce runtime to O(n).',
    tags: ['Python', 'Min-Conflicts CSP', 'Optimization', 'PyTorch'],
    links: [{ url: 'https://github.com/DanielGord0n/N-Queens-Solver', icon: <FaGithub size={14} />, label: 'GitHub' }],
  },
  {
    index: 12,
    title: 'Waiver Submission App',
    company: 'Contract Work',
    category: 'Full Stack',
    image: waiverLogo,
    description:
      'Built a full-stack liability waiver management system using React and Prisma. Reduced administrative processing time by 40% through automated database storage and retrieval.',
    tags: ['React.js', 'Prisma', 'Tailwind CSS', 'Vercel'],
    links: [],
  },
  {
    index: 13,
    title: 'Futures and Fringes CMS',
    company: 'Futures and Fringes',
    category: 'Frontend',
    image: ffLogo,
    logoTreatment: 'invert',
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
    image: battleshipsLogo,
    description:
      'Implemented a Battleships game in Java with a Swing GUI and OOP design patterns. Built an AI opponent using minimax-style heuristics and state pruning.',
    tags: ['Java', 'Maven', 'OOP', 'GUI'],
    links: [{ url: 'https://github.com/y-fysiks/ICS4U-CPT-Battleship', icon: <FaGithub size={14} />, label: 'GitHub' }],
  },
];

const CaseStudy = ({ study, flipped }) => {
  const { openLightbox } = useLightbox();

  return (
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
      <div className="case-title-row">
        {study.logo && (
          <button
            type="button"
            className="case-logo-btn"
            onClick={() => openLightbox(study.logo, study.title)}
            aria-label={`View ${study.title} logo larger`}
            title="Click to enlarge"
          >
            <img src={study.logo} alt={`${study.title} logo`} className="case-logo" />
          </button>
        )}
        <h2 className="case-title">{study.title}</h2>
      </div>
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
      <div className="terminal-window hud-corners">
        <div className="terminal-titlebar">
          <span className="terminal-light" />
          <span className="terminal-title">
            PIT WALL // {study.title.toUpperCase()}
          </span>
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
};

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
        <h1 className="silver-text">Projects</h1>
        <p>
          Production systems I've designed, built, and operated. AI products, cloud fleets, and
          research code on national supercomputers.
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
            image={project.image}
            imageWide={project.imageWide}
            logoTreatment={project.logoTreatment}
          />
        ))}
      </div>
    </div>
  );
};

export default PageTransition(Projects);
