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
  }, []);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section" ref={sectionRefs.hero}>
        <div className="hero-content">
          <span className="greeting">Hi, my name is</span>
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
          <span className="section-number">01.</span>
          <h2 className="section-title">About Me</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="about-content">
          <div className="about-text">
            <p>
              Hello! I'm Daniel, a passionate developer who enjoys creating things that live on the internet. My interest in web development started back in 2015 when I built my first website—turns out hacking together custom themes taught me a lot about HTML & CSS!
            </p>
            <p>
              Fast-forward to today, and I've had the privilege of working at various companies, from startups to corporations. My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.
            </p>
            <p>
              Here are a few technologies I've been working with recently:
            </p>
            
            <ul className="skills-list">
              <li>JavaScript (ES6+)</li>
              <li>React</li>
              <li>Node.js</li>
              <li>TypeScript</li>
              <li>GraphQL</li>
              <li>AWS</li>
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
          <span className="section-number">02.</span>
          <h2 className="section-title">Some Things I've Built</h2>
          <div className="section-line"></div>
        </div>
        
        <div className="featured-projects">
          <div className="featured-project">
            <div className="project-content">
              <p className="project-overline">Featured Project</p>
              <h3 className="project-title">E-Commerce Platform</h3>
              <div className="project-description">
                <p>
                  A comprehensive e-commerce solution with user authentication, product management, shopping cart functionality, and secure payment processing integration. The platform includes an admin dashboard for inventory management and sales analytics.                  
                </p>
              </div>
              <ul className="project-tech-list">
                <li>React</li>
                <li>Node.js</li>
                <li>MongoDB</li>
                <li>Express</li>
                <li>Stripe API</li>
              </ul>
              <div className="project-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub Link">
                  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><title>GitHub</title><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="https://example.com" target="_blank" rel="noopener noreferrer" aria-label="External Link">
                  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><title>External Link</title><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </div>
            </div>
            <div className="project-image">
              <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                <img src="https://via.placeholder.com/600x340/3a4a5c/ffffff?text=E-Commerce+App" alt="E-Commerce Platform" />
              </a>
            </div>
          </div>
          
          <div className="featured-project right">
            <div className="project-content">
              <p className="project-overline">Featured Project</p>
              <h3 className="project-title">Task Management System</h3>
              <div className="project-description">
                <p>
                  A collaborative task management application built for teams with real-time updates, user role management, and progress tracking. Features include Kanban boards, sprint planning, and integration with third-party services.
                </p>
              </div>
              <ul className="project-tech-list">
                <li>Vue.js</li>
                <li>Firebase</li>
                <li>Vuex</li>
                <li>Chart.js</li>
                <li>Socket.io</li>
              </ul>
              <div className="project-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub Link">
                  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><title>GitHub</title><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                </a>
                <a href="https://example.com" target="_blank" rel="noopener noreferrer" aria-label="External Link">
                  <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><title>External Link</title><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
              </div>
            </div>
            <div className="project-image">
              <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                <img src="https://via.placeholder.com/600x340/3a4a5c/ffffff?text=Task+Manager" alt="Task Management System" />
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
          <span className="section-number">03.</span>
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
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <h3>Reading</h3>
                <p>I enjoy reading books on technology, science fiction, and personal development. Currently reading "Clean Architecture" by Robert C. Martin.</p>
              </div>
              
              <div className="interest-card">
                <div className="interest-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h3>Open Source</h3>
                <p>I'm passionate about contributing to open-source projects, giving back to the community that has taught me so much.</p>
              </div>
              
              <div className="interest-card">
                <div className="interest-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                </div>
                <h3>Fitness</h3>
                <p>Regular exercise helps me stay focused and productive. I enjoy cycling, hiking, and practicing yoga to maintain a healthy work-life balance.</p>
              </div>
              
              <div className="interest-card">
                <div className="interest-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 2v4"></path>
                    <path d="M16 2v4"></path>
                    <rect x="2" y="6" width="20" height="16" rx="2"></rect>
                    <path d="M12 11h4"></path>
                    <path d="M12 16h4"></path>
                    <path d="M8 11v5"></path>
                  </svg>
                </div>
                <h3>Community Involvement</h3>
                <p>I regularly participate in tech meetups and conferences, both as an attendee and occasionally as a speaker, sharing knowledge and connecting with peers.</p>
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
        <span className="section-number">04.</span>
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
