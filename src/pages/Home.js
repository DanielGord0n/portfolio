import React, { useEffect, useRef, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../styles/Home.css';
import '../styles/MagneticButton.css';
import profilePhoto from '../images/profilePhoto.jpeg';
import PageTransition from '../components/PageTransition';
import TypingText from '../components/TypingText';
import { FaCar, FaPlaneDeparture, FaBrain, FaSnowboarding, FaFistRaised, FaDumbbell } from 'react-icons/fa';

const Home = () => {
  // Create refs directly
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const interestsRef = useRef(null);

  // Animation states
  const [greetingComplete, setGreetingComplete] = React.useState(false);
  const [nameComplete, setNameComplete] = React.useState(false);
  const [taglineComplete, setTaglineComplete] = React.useState(false);

  // Memoize the refs object to prevent unnecessary re-renders
  const sectionRefs = useMemo(() => ({
    hero: heroRef,
    about: aboutRef,
    projects: projectsRef,
    interests: interestsRef
  }), []);

  // Set document title for Home page
  useEffect(() => {
    document.title = 'Daniel Gordon | Software Engineer (AI Platforms & Solutions)';

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Daniel Gordon - Software Engineer (AI Platforms & Solutions). Building scalable AI systems and production-ready infrastructure.');
    }
  }, []);

  // Animation for sections on scroll
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    const observerOptions = {
      threshold: isMobile ? [0, 0.05, 0.1] : [0, 0.1, 0.2], // Even more sensitive on mobile
      rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px' // Less aggressive margin for mobile
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        // More sensitive triggering - activate when element enters viewport
        if (entry.isIntersecting && entry.intersectionRatio >= (isMobile ? 0.05 : 0.1)) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Add a timeout fallback for mobile devices
    const fallbackTimeout = setTimeout(() => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current && !ref.current.classList.contains('animate-in')) {
          const rect = ref.current.getBoundingClientRect();
          // If section is anywhere near the viewport, animate it
          if (rect.top < window.innerHeight * 1.2) {
            ref.current.classList.add('animate-in');
          }
        }
      });
    }, 1000);

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      clearTimeout(fallbackTimeout);
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" ref={sectionRefs.hero}>
        <img src={require('../images/DG_logo.png')} alt="DG Logo" className="hero-logo" />
        <div className="hero-content">
          <div className="greeting-wrapper">
            <TypingText
              text="Hello world, my name is"
              delay={0.5}
              speed={0.03}
              className="greeting"
              onComplete={() => setGreetingComplete(true)}
              showCursor={!greetingComplete}
            />
          </div>

          <h1 className="hero-title">
            {greetingComplete && (
              <TypingText
                text="Daniel Gordon."
                delay={0}
                speed={0.05}
                onComplete={() => setNameComplete(true)}
                showCursor={!nameComplete}
              />
            )}
          </h1>

          <motion.div
            className="intro-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="hero-role">
              <TypingText
                text="Software Engineer"
                delay={1.5}
                speed={0.04}
                showCursor={false}
              />
              <br />
              <span style={{ color: 'var(--accent-primary)' }}>
                <TypingText
                  text="(AI Platforms & Solutions)"
                  delay={1.5}
                  speed={0.04}
                  showCursor={false}
                />
              </span>
            </h2>
            <div className="hero-description">
              <TypingText
                text="I build scalable AI systems and production-ready infrastructure. Specializing in bridging the gap between machine learning models and real-world product constraints."
                delay={1.5}
                speed={0.02}
                showCursor={true}
              />
            </div>
            <div className="hero-cta">
              <Link to="/projects" className="magnetic-btn">
                View featured projects
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="scroll-down"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <div className="arrow-scroll">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="about-section" ref={sectionRefs.about}>
        <div className="section-header">
          <h2 className="section-title">About Me</h2>
          <div className="section-line"></div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              I am a Software Engineer focused on <strong>AI Platforms & Solutions</strong>.
              My work centers on designing and implementing the systems that make AI useful, reliable, and scalable in production environments.
            </p>
            <p>
              I don't just train models; I build the end-to-end infrastructure that serves them.
              From architecting real-time inference pipelines to optimizing backend performance for high-load applications,
              I bridge the critical gap between research-grade ML and robust, deployable software.
            </p>
            <p>
              Whether integrating LLMs into complex workflows or engineering custom solutions for unique business needs,
              I bring a systems-first approach to every challenge.
            </p>

            <p>Here are a few technologies I work with:</p>
            <ul className="skills-list">
              <li>Python & Typescript</li>
              <li>React & Next.js</li>
              <li>FastAPI & Node.js</li>
              <li>Docker & AWS</li>
              <li>LLM Orchestration (LangChain)</li>
              <li>System Architecture</li>
            </ul>
          </div>
          <div className="about-image-container">
            <div className="about-image-wrapper">
              <img src={profilePhoto} alt="Profile" className="about-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="projects-section" ref={sectionRefs.projects}>
        <div className="section-header">
          <h2 className="section-title">Some Things I've Built</h2>
          <div className="section-line"></div>
        </div>

        <div className="projects-horizontal-grid">
          {/* WhatsApp Summarizer */}
          <div className="project-card-horizontal">
            <h3 className="project-title">AI-Powered WhatsApp Summarizer</h3>
            <div className="project-description">
              <p>
                Built an AI summarization system for high-volume WhatsApp chat threads, producing daily digests for users. Designed backend services and APIs, implemented validation and reliability checks, and optimized summarization performance for usability and response time.
              </p>
            </div>
            <ul className="project-tech-list">
              <li>Node.js</li>
              <li>WhatsApp Web</li>
              <li>Gemini AI</li>
              <li>RESTful APIs</li>
              <li>Express</li>
            </ul>
            <div className="project-links">
              <a href="https://github.com/DanielGord0n" target="_blank" rel="noopener noreferrer" className="project-link-button">
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>View on GitHub</span>
              </a>
            </div>
          </div>

          {/* LaunchPath Biotech Architecture */}
          <div className="project-card-horizontal">
            <h3 className="project-title">LaunchPath Biotech Architecture</h3>
            <div className="project-description">
              <p>
                Owned solution architecture for a biosensor analytics platform: translated requirements into C4 diagrams and technical specs, coordinated Agile delivery, and built a React Native frontend integrated with Python microservices for real-time data ingestion and reporting.
              </p>
            </div>
            <ul className="project-tech-list">
              <li>React Native</li>
              <li>Python</li>
              <li>Microservices</li>
              <li>C4 Architecture</li>
            </ul>
            <div className="project-links">
              <a href="https://github.com/DanielGord0n/aptamer_therapeutic" target="_blank" rel="noopener noreferrer" className="project-link-button">
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                <span>View on GitHub</span>
              </a>
            </div>
          </div>

          {/* AI-Powered 3D Avatar Platform */}
          <div className="project-card-horizontal">
            <h3 className="project-title">AI-Powered 3D Avatar Platform</h3>
            <div className="project-description">
              <p>
                Refactored a Python/JavaScript lip-sync ML pipeline for 3D avatars in Unity. Built AI workflows with speech-to-text and LLM orchestration, benchmarked model tradeoffs, and exposed capabilities as REST APIs for real-time browser-based avatar animation. Reduced inference latency by ~25%.
              </p>
            </div>
            <ul className="project-tech-list">
              <li>Python</li>
              <li>Unity</li>
              <li>OpenAI Whisper</li>
              <li>LangChain</li>
              <li>Next.js</li>
            </ul>
            <div className="project-links">
              <a href="https://mycleanmesh.com/" target="_blank" rel="noopener noreferrer" className="project-link-button">
                <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                <span>Live Demo</span>
              </a>
            </div>
          </div>
        </div>

        <div className="more-projects">
          <Link to="/projects" className="btn">View All Projects</Link>
        </div>
      </section >

      {/* Personal Interests Section */}
      < section className="interests-section" ref={sectionRefs.interests} >
        <div className="section-header">
          <h2 className="section-title">Beyond Coding</h2>
          <div className="section-line"></div>
        </div>

        <div className="interests-container">
          <div className="interests-content">
            <p>
              When I'm not coding, you'll find me engaged in various activities that fuel my creativity and keep me balanced. I'm a firm believer that diverse interests contribute to becoming a better developer.
            </p>

            <div className="interests-grid">
              <div className="interest-card">
                <div className="interest-icon">
                  <FaCar size={24} />
                </div>
                <h3>Cars</h3>
                <p>I'm an automotive enthusiast who loves everything from classic cars to modern engineering marvels. I enjoy attending car shows and learning about the latest automotive technology.</p>
              </div>

              <div className="interest-card">
                <div className="interest-icon">
                  <FaPlaneDeparture size={24} />
                </div>
                <h3>Traveling</h3>
                <p>Exploring new cultures, landscapes, and cuisines is one of my greatest passions. Immersing myself in different environments helps me gain fresh perspectives that I bring back to my work.</p>
              </div>

              <div className="interest-card">
                <div className="interest-icon">
                  <FaBrain size={24} />
                </div>
                <h3>Brain Games</h3>
                <p>I challenge myself daily with chess, crosswords, and Wordle. These mental exercises sharpen my problem-solving skills and keep my analytical thinking fresh for coding challenges.</p>
              </div>

              <div className="interest-card">
                <div className="interest-icon">
                  <FaSnowboarding size={24} />
                </div>
                <h3>Snowboarding</h3>
                <p>Hitting the slopes during winter is where I find both thrill and tranquility. The combination of speed, precision, and being surrounded by nature provides a perfect counterbalance to my technical work.</p>
              </div>

              <div className="interest-card">
                <div className="interest-icon">
                  <FaFistRaised size={24} />
                </div>
                <h3>Mixed Martial Arts</h3>
                <p>Having trained in seven different martial arts disciplines, I've gained not just physical skills but also mental discipline, resilience, and a strategic approach to challenges that applies to both combat and code.</p>
              </div>

              <div className="interest-card">
                <div className="interest-icon">
                  <FaDumbbell size={24} />
                </div>
                <h3>Gym & Calisthenics</h3>
                <p>My fitness regimen combines weight training and bodyweight exercises to build functional strength. This discipline enhances my focus and productivity, essential qualities for tackling complex coding projects.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="skills-cta">
          <Link to="/skills" className="btn">View My Skills</Link>
        </div>
      </section >

      {/* Contact CTA Section */}
      < section className="contact-cta" >
        <h2>Get In Touch</h2>
        <p>
          Whether you have a project in mind, a question about my work, or just want to connect,
          I'm always open to new opportunities and conversations. Let's build something amazing together!
        </p>
        <Link to="/contact" className="btn btn-primary">Say Hello</Link>
      </section >
    </div >
  );
};

export default PageTransition(Home);
