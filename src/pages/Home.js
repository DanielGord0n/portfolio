import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCar, FaPlaneDeparture, FaBrain, FaSnowboarding, FaFistRaised, FaDumbbell } from 'react-icons/fa';
import '../styles/Home.css';
import profilePhoto from '../images/opt/profilePhoto.jpeg';
import tellToursLogo from '../images/TellToursLogo.png';
import PageTransition from '../components/PageTransition';
import TypingText from '../components/TypingText';
import ProjectCard3D from '../components/ProjectCard3D';
import HeroMonitor from '../components/HeroMonitor';
import StatGauge from '../components/StatGauge';

const heroStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
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

// All figures verified, see PORTFOLIO_HANDOFF.md
const gauges = [
  { value: 455, label: 'S3 buckets audited / 17-account AWS org', fraction: 0.78, delay: 0 },
  { value: 79, label: 'production EC2 instances hardened', fraction: 0.58, delay: 150 },
  { value: 10000, suffix: '+', label: 'CPU cores coordinated via SLURM', fraction: 0.92, delay: 300 },
  { value: 4, label: 'national HPC clusters', fraction: 0.42, delay: 450 },
];

const featuredProjects = [
  {
    index: 1,
    title: 'TellTours',
    company: 'Co-founder / telltours.com',
    category: 'AI / Mobile',
    image: tellToursLogo,
    description:
      'An AI tour guide that narrates the world around you in real time as you walk, drive, or ride. Routes between Gemini, OpenAI, and Ollama with no code changes, tunes its prompts from Firestore without redeploys, and ships through keyless CI/CD on GCP. Now in pre-release with the beta waitlist open.',
    tags: ['React Native', 'GCP', 'Gemini', 'Node.js'],
    links: [{ url: 'https://telltours.com', icon: <FaExternalLinkAlt size={13} />, label: 'telltours.com' }],
  },
  {
    index: 2,
    title: 'BS45 Quantum Explorer',
    company: 'Research / Wilfrid Laurier University',
    category: 'HPC / C++',
    description:
      'A distributed C++17 solver hunting BS(45,44), an unsolved problem in combinatorial mathematics. It runs on 4 of Canada\'s national supercomputing clusters, coordinates 10,000+ CPU cores through SLURM, and prunes the naive search space by roughly 100x.',
    tags: ['C++17', 'OpenMP', 'SLURM', 'HPC'],
    links: [{ url: 'https://github.com/DanielGord0n/BS45_Quantum_Explorer', icon: <FaGithub size={14} />, label: 'GitHub' }],
  },
  {
    index: 3,
    title: 'Phoenix Bot',
    company: 'Self-employed / shipped v0.2.1',
    category: 'Desktop / AI',
    description:
      'A cross-platform Electron app that summarizes WhatsApp group chats with Gemini. The hard part: keeping a persistent Puppeteer/headless-Chrome session alive inside the Electron main process, something serverless platforms simply cannot do. Credentials live in the OS keychain, state in local SQLite.',
    tags: ['Electron', 'Puppeteer', 'Gemini', 'SQLite'],
    links: [
      { url: 'https://phoenix-bot-web.vercel.app/', icon: <FaExternalLinkAlt size={13} />, label: 'Live' },
      { url: 'https://github.com/DanielGord0n/phoenix-bot-desktop', icon: <FaGithub size={14} />, label: 'GitHub' },
    ],
  },
];

const interests = [
  { icon: <FaCar size={20} />, title: 'Cars', text: 'Lifelong car enthusiast. Classics, modern engineering, all of it.' },
  { icon: <FaSnowboarding size={20} />, title: 'Snowboarding', text: 'Speed, precision, and mountains every winter.' },
  { icon: <FaFistRaised size={20} />, title: 'Martial Arts', text: 'Trained across seven disciplines. Discipline carries over.' },
  { icon: <FaBrain size={20} />, title: 'Brain Games', text: 'Daily chess, crosswords, and Wordle to stay sharp.' },
  { icon: <FaPlaneDeparture size={20} />, title: 'Traveling', text: 'New cultures and cuisines for fresh perspective.' },
  { icon: <FaDumbbell size={20} />, title: 'Gym & Calisthenics', text: 'Functional strength, weights and bodyweight.' },
];

const Home = () => {
  useEffect(() => {
    document.title = 'Daniel Gordon | Software Engineer, Cloud, DevOps & AI Systems';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Daniel Gordon is a software engineer who builds and operates production systems end to end: cloud infrastructure, AI pipelines, and client deployments.'
      );
    }
  }, []);

  return (
    <div className="home-container">
      {/* Hero */}
      <section className="hero-section">
        <motion.div className="hero-content" variants={heroStagger} initial="hidden" animate="visible">
          <motion.span className="hero-eyebrow" variants={heroItem}>
            {'// hello, I\'m'}
          </motion.span>

          <motion.h1 className="hero-title silver-text" variants={heroItem}>
            Daniel Gordon
          </motion.h1>

          <motion.div className="hero-sector" variants={heroItem}>
            <span className="hero-role">Software Engineer</span>
            <span className="hero-sector-line">CLOUD&nbsp;//&nbsp;DEVOPS&nbsp;//&nbsp;AI SYSTEMS</span>
          </motion.div>

          <motion.p className="hero-description" variants={heroItem}>
            I build and operate production systems end to end: cloud infrastructure, AI pipelines,
            and client deployments. I work directly with stakeholders to scope, ship, and own
            outcomes in ambiguous environments.
          </motion.p>

          <motion.div className="hero-status" variants={heroItem}>
            <span className="status-prompt">$</span>
            <TypingText
              text=" now: DevOps / Cloud Engineering Intern @ WellnessLiving | open to FDE, SWE & DevOps roles"
              delay={1.0}
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
          className="hero-monitor-wrap"
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroMonitor />
        </motion.div>
      </section>

      {/* Telemetry gauges */}
      <motion.section className="telemetry-section" {...sectionReveal}>
        <div className="section-header">
          <span className="section-marker">sector 01 // telemetry</span>
          <h2 className="section-title">The numbers are real</h2>
          <p className="section-sub">Pulled straight from production work. Nothing padded.</p>
        </div>
        <div className="gauge-grid">
          {gauges.map((gauge, i) => (
            <StatGauge key={i} {...gauge} />
          ))}
        </div>
      </motion.section>

      {/* Selected work */}
      <motion.section className="projects-section" {...sectionReveal}>
        <div className="section-header">
          <span className="section-marker">sector 02 // selected work</span>
          <h2 className="section-title">Built and shipped</h2>
        </div>

        <div className="featured-grid">
          {featuredProjects.map(project => (
            <ProjectCard3D key={project.index} {...project} />
          ))}
        </div>

        <div className="more-projects">
          <Link to="/projects" className="btn">All projects</Link>
        </div>
      </motion.section>

      {/* About */}
      <motion.section className="about-section" {...sectionReveal}>
        <div className="section-header">
          <span className="section-marker">sector 03 // driver profile</span>
          <h2 className="section-title">From cloud fleets to supercomputers</h2>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a 4th-year Computer Science and Management student at{' '}
              <strong>Wilfrid Laurier University</strong>, graduating December 2026. These days I'm
              a DevOps / Cloud Engineering Intern at <strong>WellnessLiving</strong>, running cost
              optimization and fleet hardening across a 17-account AWS organization. Real
              production, real client sites, real consequences when you get it wrong.
            </p>
            <p>
              Before that I was the technical lead on a live AI platform at MCG, did solutions
              architecture at LaunchPath, and my research solver currently runs on Canada's national
              supercomputers. On the side I co-founded <strong>TellTours</strong>, an AI tour guide
              app now in pre-release.
            </p>
            <p>
              The thread through all of it: I like owning systems end to end. Scope it with the
              people who need it, build it, deploy it, and answer for it in production. That's why
              I'm targeting <strong>Forward Deployed Engineer</strong> roles, and why SWE, DevOps,
              and AI platform work all feel like home. Open to Toronto and the Bay Area.
            </p>

            <p className="tech-list-intro">Daily drivers:</p>
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
            <div className="about-image-wrapper hud-corners">
              <img src={profilePhoto} alt="Daniel Gordon" className="about-image" />
              <span className="about-image-caption">GORDON / D.</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Off track */}
      <motion.section className="interests-section" {...sectionReveal}>
        <div className="section-header">
          <span className="section-marker">sector 04 // off track</span>
          <h2 className="section-title">When the laptop closes</h2>
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

      {/* Contact CTA */}
      <motion.section className="contact-cta" {...sectionReveal}>
        <span className="section-marker">sector 05 // contact</span>
        <h2 className="silver-text">Let's build something.</h2>
        <p>
          A role, a project, or a question about my work. I'm always up for the conversation.
        </p>
        <Link to="/contact" className="btn btn-primary">Get in touch</Link>
      </motion.section>
    </div>
  );
};

export default PageTransition(Home);
