import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    projects: useRef(null),
    interests: useRef(null)
  };

  // Animation for sections on scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.25,
      rootMargin: '0px 0px -100px 0px'
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
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
          <span className="greeting">Hello world, my name is</span>
          <h1 className="hero-title">Daniel Gordon.</h1>
          <h2 className="hero-subtitle">I build things for the web.</h2>
          
          <p className="hero-description">
            I'm a Full Stack Developer specializing in building exceptional digital experiences. 
            Currently, I'm focused on building accessible, human-centered products using modern frameworks and technologies.
          </p>
          
          <div className="hero-cta">
            <Link to="/projects" className="btn">View My Work</Link>
          </div>
        </div>
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
              Hello! I'm Daniel Gordon, currently in my fourth year of the Honours Bachelor of Computer Science and Management program at Wilfrid Laurier University. Based in Vaughan, Ontario, I've been drawn to software development by a lifelong passion for problem-solving and building tools that make users' lives easier.
            </p>
            <p>
              Over the past year as a Contract Full Stack Developer, I've engineered an AI-powered WhatsApp chat summarizer by integrating the WhatsApp API with Gemini AI, developed a scheduled email-delivery system using Node.js, and led the UI/UX build of a Framer-powered CMS website with interactive features.
            </p>
            <p>
              I focus on writing clean, well-structured code and continuously improving my development skills. I'm eager to collaborate on team projects and value feedback that helps me grow as a developer.
            </p>
            <p>
              Here are the core technologies I work with daily:
            </p>
            
            <ul className="skills-list">
              <li>React</li>
              <li>Node.js</li>
              <li>MySQL</li>
              <li>Prisma</li>
              <li>RESTful APIs</li>
              <li>JavaScript/TypeScript</li>
            </ul>
          </div>
          
          <div className="about-image-container">
            <div className="about-image-wrapper">
              <img 
                src="https://via.placeholder.com/300x300/3a4a5c/ffffff?text=Daniel" 
                alt="Daniel Gordon" 
                className="about-image" 
              />
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
        
        <div className="featured-projects">
          <div className="featured-project">
            <div className="project-content">
              <p className="project-overline">Featured Project</p>
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
                <a href="https://github.com/DanielGord0n" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
            <div className="project-image">
              <img src={require('../images/WhatsappLogoBlack.png')} alt="WhatsApp AI Summarizer" style={{maxWidth: '75%', maxHeight: '75%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} />
            </div>
          </div>
          
          <div className="featured-project right">
            <div className="project-content">
              <p className="project-overline">Featured Project</p>
              <h3 className="project-title">Automated Email Digest System</h3>
              <div className="project-description">
                <p>
                  Developed a scheduled email-delivery system that sends WhatsApp conversation summaries to subscribers, reducing manual review time by over 80% through a Node.js back-end and cloud-based mail services with robust error handling.               
                </p>
              </div>
              <ul className="project-tech-list">
                <li>Node.js</li>
                <li>Express</li>
                <li>Cloud Mail Services</li>
                <li>Scheduled Tasks</li>
                <li>MySQL/Prisma</li>
              </ul>
              <div className="project-links">
                <a href="https://github.com/DanielGord0n" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
            <div className="project-image">
              <img src={require('../images/email.png')} alt="Automated Email Digest System" style={{maxWidth: '75%', maxHeight: '75%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} />
            </div>
          </div>
          
          <div className="featured-project">
            <div className="project-content">
              <p className="project-overline">Featured Project</p>
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
                <a href="https://github.com/DanielGord0n" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
            <div className="project-image">
              <img src={require('../images/FF-ICON-BLK (1).png')} alt="Futures and Fringes CMS Website" style={{maxWidth: '75%', maxHeight: '75%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} />
            </div>
          </div>
          
          <div className="featured-project right">
            <div className="project-content">
              <p className="project-overline">Featured Project</p>
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
                <a href="https://github.com/DanielGord0n" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </div>
            </div>
            <div className="project-image">
              <img src={require('../images/wilfrid-laurier-university-seeklogo.png')} alt="wluNest Student Housing Application" style={{maxWidth: '75%', maxHeight: '75%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} />
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

export default Home;
