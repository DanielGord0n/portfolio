import React, { useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Home.css';
import profilePhoto from '../images/profilePhoto.jpeg';
import MagneticButton from '../components/MagneticButton';
import PageTransition from '../components/PageTransition';

// TypingText Component
const TypingText = ({ text, delay = 0, speed = 0.03, className, onComplete, showCursor = true }) => {
  const [displayedText, setDisplayedText] = React.useState('');
  const [isComplete, setIsComplete] = React.useState(false);

  // Use a ref for the callback to prevent effect re-runs when the function identity changes
  const onCompleteRef = useRef(onComplete);

  // Update the ref whenever onComplete changes
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let currentIndex = 0;

      const typeChar = () => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1));
          currentIndex++;
          setTimeout(typeChar, speed * 1000);
        } else {
          setIsComplete(true);
          if (onCompleteRef.current) onCompleteRef.current();
        }
      };

      typeChar();
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, speed]); // Removed onComplete from dependencies to prevent reset

  return (
    <motion.span
      className={className}
      initial={{ opacity: 1 }} // Visible immediately to show cursor if needed, but text is empty
    >
      {displayedText}
      {showCursor && !isComplete && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="typing-cursor"
        >
          |
        </motion.span>
      )}
    </motion.span>
  );
};

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
    document.title = 'Daniel Gordon | Full Stack Developer';

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Daniel Gordon - Full Stack Developer specializing in React, Node.js, and modern web technologies. Currently studying Computer Science at Wilfrid Laurier University.');
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
        <div className="hero-content">
          <div className="greeting-wrapper">
            <TypingText
              text="Hi, my name is"
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

          <h2 className="hero-subtitle">
            {nameComplete && (
              <TypingText
                text="I build things for the web."
                delay={0}
                speed={0.03}
                onComplete={() => setTaglineComplete(true)}
                showCursor={!taglineComplete}
              />
            )}
          </h2>

          <div className="hero-description">
            {taglineComplete && (
              <TypingText
                text="I'm a software engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I'm focused on building accessible, human-centered products."
                delay={0}
                speed={0.01} // Very fast for long text
                showCursor={true} // Keep cursor blinking at the end
              />
            )}
          </div>

          <motion.div
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: taglineComplete ? 1 : 0, y: taglineComplete ? 0 : 20 }}
            transition={{ delay: 1 }} // Wait a bit after text starts
          >
            <MagneticButton to="/projects">Check out my work!</MagneticButton>
          </motion.div>
        </div>

        <motion.div
          className="scroll-down"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
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
          <span className="section-number">01.</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-line"></div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              Hello! My name is Daniel and I enjoy creating things that live on the internet.
              My interest in web development started back in 2020 when I decided to try editing custom Tumblr themes —
              turns out hacking together HTML & CSS was pretty fun!
            </p>
            <p>
              Fast-forward to today, and I've had the privilege of working at a start-up, a huge corporation, and a student-led design studio.
              My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.
            </p>
            <p>Here are a few technologies I've been working with recently:</p>
            <ul className="skills-list">
              <li>JavaScript (ES6+)</li>
              <li>React</li>
              <li>Node.js</li>
              <li>TypeScript</li>
              <li>Python</li>
              <li>AWS</li>
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
                Engineered a chat summarization tool that integrates the WhatsApp API with Gemini AI to automatically condense lengthy message threads into concise daily digests, improving information retention and reducing cognitive overload for users.
              </p>
            </div>
            <ul className="project-tech-list">
              <li>Node.js</li>
              <li>WhatsApp API</li>
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

          {/* Futures and Fringes CMS Website */}
          <div className="project-card-horizontal">
            <h3 className="project-title">Futures and Fringes CMS Website</h3>
            <div className="project-description">
              <p>
                Led the UI/UX build of a Framer-powered CMS website, integrating newsletter sign-ups, interactive scroll effects, and dynamic case-study pages to enhance user engagement and provide an intuitive content management experience for the client.
              </p>
            </div>
            <ul className="project-tech-list">
              <li>Framer</li>
              <li>CMS Integration</li>
              <li>UI/UX Design</li>
              <li>Responsive Design</li>
              <li>Interactive Elements</li>
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

          {/* wluNest - Student Housing Application */}
          <div className="project-card-horizontal">
            <h3 className="project-title">wluNest - Student Housing Application</h3>
            <div className="project-description">
              <p>
                Developed a platform aggregating Waterloo-Kitchener rental listings for students. Designed an intuitive UI with interactive maps, personalized filters, and a roommate finder. Integrated real-time updates and direct listing links using Node.js, React, and MySQL.
              </p>
            </div>
            <ul className="project-tech-list">
              <li>React</li>
              <li>Node.js</li>
              <li>MySQL</li>
              <li>Interactive Maps</li>
              <li>Real-time Updates</li>
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
        </div>

        <div className="more-projects">
          <Link to="/projects" className="btn">View All Projects</Link>
        </div>
      </section>

      {/* Personal Interests Section */}
      <section className="interests-section" ref={sectionRefs.interests}>
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="9" width="18" height="5" rx="2"></rect>
                    <circle cx="7" cy="14" r="2"></circle>
                    <circle cx="17" cy="14" r="2"></circle>
                  </svg>
                </div>
                <h3>Cars</h3>
                <p>I'm an automotive enthusiast who loves everything from classic cars to modern engineering marvels. I enjoy attending car shows and learning about the latest automotive technology.</p>
              </div>

              <div className="interest-card">
                <div className="interest-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                  </svg>
                </div>
                <h3>Traveling</h3>
                <p>Exploring new cultures, landscapes, and cuisines is one of my greatest passions. Immersing myself in different environments helps me gain fresh perspectives that I bring back to my work.</p>
              </div>

              <div className="interest-card">
                <div className="interest-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="5" width="14" height="14" rx="1"></rect>
                    <rect x="8" y="8" width="3" height="3"></rect>
                    <rect x="13" y="8" width="3" height="3"></rect>
                    <rect x="8" y="13" width="3" height="3"></rect>
                    <rect x="13" y="13" width="3" height="3"></rect>
                  </svg>
                </div>
                <h3>Brain Games</h3>
                <p>I challenge myself daily with chess, crosswords, and Wordle. These mental exercises sharpen my problem-solving skills and keep my analytical thinking fresh for coding challenges.</p>
              </div>

              <div className="interest-card">
                <div className="interest-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 20h18L14.5 9l-5 5-3.5-3.5L3 20Z"></path>
                    <path d="M7.2 6.8a3 3 0 1 0-4.2-4.2 3 3 0 0 0 4.2 4.2"></path>
                  </svg>
                </div>
                <h3>Snowboarding</h3>
                <p>Hitting the slopes during winter is where I find both thrill and tranquility. The combination of speed, precision, and being surrounded by nature provides a perfect counterbalance to my technical work.</p>
              </div>

              <div className="interest-card">
                <div className="interest-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 8a4 4 0 0 1 8 0v1a3 3 0 0 1-3 3H4V8Z"></path>
                    <path d="M12 8a4 4 0 0 1 8 0v1a3 3 0 0 1-3 3h-5V8Z"></path>
                    <path d="M8 14v3"></path>
                    <path d="M16 14v3"></path>
                  </svg>
                </div>
                <h3>Mixed Martial Arts</h3>
                <p>Having trained in seven different martial arts disciplines, I've gained not just physical skills but also mental discipline, resilience, and a strategic approach to challenges that applies to both combat and code.</p>
              </div>

              <div className="interest-card">
                <div className="interest-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 12h12"></path>
                    <rect x="2" y="7" width="4" height="10" rx="1"></rect>
                    <rect x="18" y="7" width="4" height="10" rx="1"></rect>
                  </svg>
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
      </section>

      {/* Contact CTA Section */}
      <section className="contact-cta">
        <h2>Get In Touch</h2>
        <p>
          Whether you have a project in mind, a question about my work, or just want to connect,
          I'm always open to new opportunities and conversations. Let's build something amazing together!
        </p>
        <Link to="/contact" className="btn btn-primary">Say Hello</Link>
      </section>
    </div>
  );
};

export default PageTransition(Home);
