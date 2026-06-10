import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCar, FaPlaneDeparture, FaBrain, FaSnowboarding, FaFistRaised, FaDumbbell } from 'react-icons/fa';
import '../styles/Home.css';
import profilePhoto from '../images/profilePhoto.jpeg';
import PageTransition from '../components/PageTransition';
import TypingText from '../components/TypingText';
import ProjectCard3D from '../components/ProjectCard3D';

const heroStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

// All figures verified — see PORTFOLIO_HANDOFF.md
const stats = [
  { value: '455', label: 'S3 buckets audited across a 17-account AWS org' },
  { value: '79', label: 'production EC2 instances hardened fleet-wide' },
  { value: '10,000+', label: 'CPU cores coordinated via SLURM' },
  { value: '4', label: 'national HPC clusters running my solver' },
];

const featuredProjects = [
  {
    index: 1,
    title: 'TellTours',
    company: 'Co-founder · telltours.com',
    category: 'AI / Mobile',
    description:
      'AI tour guide app generating real-time, context-aware narration as you walk, drive, or ride through any city. Provider-agnostic AI pipeline routing between Gemini, OpenAI, and Ollama; prompts externalized to Firestore for zero-redeploy tuning; keyless CI/CD on GCP. Pre-release — beta waitlist live.',
    tags: ['React Native', 'GCP', 'Gemini', 'Node.js'],
    links: [{ url: 'https://telltours.com', icon: <FaExternalLinkAlt size={13} />, label: 'telltours.com' }],
  },
  {
    index: 2,
    title: 'BS45 Quantum Explorer',
    company: 'Research · Wilfrid Laurier University',
    category: 'HPC / C++',
    description:
      'Distributed C++17 backtracking solver searching for BS(45,44) — an unsolved open problem in combinatorial mathematics — across 4 national supercomputing clusters, coordinating 10,000+ CPU cores via SLURM with custom pruning that cuts the naive search space ~100x.',
    tags: ['C++17', 'OpenMP', 'SLURM', 'HPC'],
    links: [{ url: 'https://github.com/DanielGord0n/BS45_Quantum_Explorer', icon: <FaGithub size={14} />, label: 'GitHub' }],
  },
  {
    index: 3,
    title: 'Phoenix Bot',
    company: 'Self-employed · shipped v0.2.1',
    category: 'Desktop / AI',
    description:
      'Cross-platform Electron desktop app automating WhatsApp group-chat summarization with Gemini. Solves the core architectural challenge of sustaining a persistent Puppeteer/headless-Chrome session inside an Electron main process — with OS keychain credential storage and local SQLite state.',
    tags: ['Electron', 'Puppeteer', 'Gemini', 'SQLite'],
    links: [
      { url: 'https://phoenix-bot-web.vercel.app/', icon: <FaExternalLinkAlt size={13} />, label: 'Live' },
      { url: 'https://github.com/DanielGord0n/phoenix-bot-desktop', icon: <FaGithub size={14} />, label: 'GitHub' },
    ],
  },
];

const interests = [
  { icon: <FaCar size={20} />, title: 'Cars', text: 'Automotive enthusiast — from classics to modern engineering marvels.' },
  { icon: <FaPlaneDeparture size={20} />, title: 'Traveling', text: 'New cultures, landscapes, and cuisines for fresh perspective.' },
  { icon: <FaBrain size={20} />, title: 'Brain Games', text: 'Daily chess, crosswords, and Wordle to keep the analysis sharp.' },
  { icon: <FaSnowboarding size={20} />, title: 'Snowboarding', text: 'Speed, precision, and mountains every winter.' },
  { icon: <FaFistRaised size={20} />, title: 'Martial Arts', text: 'Trained across seven disciplines — discipline, resilience, strategy.' },
  { icon: <FaDumbbell size={20} />, title: 'Gym & Calisthenics', text: 'Functional strength from weights and bodyweight work.' },
];

const Home = () => {
  useEffect(() => {
    document.title = 'Daniel Gordon | Software Engineer — Cloud, DevOps & AI Systems';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Daniel Gordon — Software Engineer building and operating production systems end-to-end across cloud infrastructure, AI pipelines, and client deployments.'
      );
    }
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div className="hero-content" variants={heroStagger} initial="hidden" animate="visible">
          <motion.span className="hero-eyebrow" variants={heroItem}>
            // hello world — I'm
          </motion.span>

          <motion.h1 className="hero-title" variants={heroItem}>
            Daniel Gordon<span className="hero-dot">.</span>
          </motion.h1>

          <motion.h2 className="hero-role" variants={heroItem}>
            Software Engineer — <span className="hero-role-accent">Cloud, DevOps &amp; AI Systems</span>
          </motion.h2>

          <motion.p className="hero-description" variants={heroItem}>
            I build and operate production systems end-to-end — cloud infrastructure, AI pipelines,
            and client-facing deployments — working directly with stakeholders to scope, ship, and
            own outcomes in ambiguous environments.
          </motion.p>

          <motion.div className="hero-status" variants={heroItem}>
            <span className="status-prompt">$</span>
            <TypingText
              text=" now: DevOps / Cloud Engineering Intern @ WellnessLiving — open to FDE, SWE & DevOps roles"
              delay={1.1}
              speed={0.018}
              showCursor={true}
            />
          </motion.div>

          <motion.div className="hero-cta" variants={heroItem}>
            <Link to="/projects" className="btn btn-primary">View projects</Link>
            <Link to="/resume" className="btn">Resume</Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="scroll-down"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
        >
          <div className="mouse">
            <div className="wheel"></div>
          </div>
        </motion.div>
      </section>

      {/* Verified numbers strip */}
      <motion.section className="stats-strip" {...sectionReveal}>
        {stats.map((stat, i) => (
          <div className="stat-block" key={i}>
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </motion.section>

      {/* About Section */}
      <motion.section className="about-section" {...sectionReveal}>
        <div className="section-header">
          <span className="section-marker">01 / about</span>
          <h2 className="section-title">From cloud fleets to research clusters</h2>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a 4th-year B.Sc. Honours Computer Science and Management student at{' '}
              <strong>Wilfrid Laurier University</strong> (graduating Dec 2026). Right now I'm a
              DevOps / Cloud Engineering Intern at <strong>WellnessLiving</strong>, operating a
              17-account AWS organization — cost optimization at fleet scale, zero-touch hardening
              of production WordPress instances, and staged upgrades across 78 live client sites.
            </p>
            <p>
              Before that: technical lead on a live AI platform at MCG, solutions architecture at
              LaunchPath, and a research assistantship where my C++ solver runs on Canada's national
              supercomputers. On the side I co-founded <strong>TellTours</strong>, an AI tour guide
              app live in pre-release.
            </p>
            <p>
              The common thread is owning systems end-to-end — scoping with stakeholders, building
              the thing, deploying it, and being accountable for it in production. I'm targeting{' '}
              <strong>Forward Deployed Engineer</strong> and field engineering roles, and equally
              at home in SWE, DevOps, and AI platform work. Open to Toronto and the Bay Area.
            </p>

            <p className="tech-list-intro">Technologies I work with daily:</p>
            <ul className="skills-list">
              <li>Python &amp; TypeScript</li>
              <li>AWS &amp; GCP</li>
              <li>C++ &amp; HPC (SLURM)</li>
              <li>React &amp; React Native</li>
              <li>Node.js &amp; Electron</li>
              <li>LLM integration (Gemini, Whisper, OpenAI)</li>
            </ul>
          </div>
          <div className="about-image-container">
            <div className="about-image-wrapper">
              <img src={profilePhoto} alt="Daniel Gordon" className="about-image" />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Projects Section */}
      <motion.section className="projects-section" {...sectionReveal}>
        <div className="section-header">
          <span className="section-marker">02 / selected work</span>
          <h2 className="section-title">Things I've built and shipped</h2>
        </div>

        <div className="featured-grid">
          {featuredProjects.map(project => (
            <ProjectCard3D key={project.index} {...project} />
          ))}
        </div>

        <div className="more-projects">
          <Link to="/projects" className="btn">View all projects</Link>
        </div>
      </motion.section>

      {/* Personal Interests Section */}
      <motion.section className="interests-section" {...sectionReveal}>
        <div className="section-header">
          <span className="section-marker">03 / beyond code</span>
          <h2 className="section-title">When I'm not shipping</h2>
        </div>

        <div className="interests-grid">
          {interests.map((interest, i) => (
            <div className="interest-card" key={i}>
              <div className="interest-icon">{interest.icon}</div>
              <div className="interest-body">
                <h3>{interest.title}</h3>
                <p>{interest.text}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Contact CTA Section */}
      <motion.section className="contact-cta" {...sectionReveal}>
        <span className="section-marker">04 / contact</span>
        <h2>Let's build something.</h2>
        <p>
          Whether it's a role, a project, or a question about my work — I'm always open to a
          conversation.
        </p>
        <Link to="/contact" className="btn btn-primary">Get in touch</Link>
      </motion.section>
    </div>
  );
};

export default PageTransition(Home);
