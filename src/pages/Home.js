import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="profile-section">
        <div className="profile-image-container">
          <img 
            src="https://via.placeholder.com/180x180/3a4a5c/ffffff?text=Daniel" 
            alt="Daniel Gordon" 
            className="profile-image" 
          />
        </div>
      </div>
      
      <div className="intro-section">
        <h1 className="intro-title">
          Full Stack Developer | JavaScript Specialist | Building Modern Web Applications
        </h1>
        <p className="intro-subtitle">
          Passionate about creating clean, efficient, and user-friendly applications using modern frameworks and technologies.
        </p>
      </div>
      
      <div className="featured-projects">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-image">
              <img 
                src="https://via.placeholder.com/400x250/2a3f5c/ffffff?text=Web+App" 
                alt="Web Application Project" 
              />
            </div>
            <div className="project-info">
              <h3 className="project-title">Full Stack Web Application</h3>
              <p className="project-tech">React | Node.js | MongoDB</p>
              <p className="project-description">A responsive web application with user authentication, data visualization, and CRUD operations.</p>
            </div>
          </div>
          <div className="project-card">
            <div className="project-image">
              <img 
                src="https://via.placeholder.com/400x250/1e4d2b/ffffff?text=API+Project" 
                alt="API Integration Project" 
              />
            </div>
            <div className="project-info">
              <h3 className="project-title">RESTful API Service</h3>
              <p className="project-tech">Express.js | PostgreSQL | Docker</p>
              <p className="project-description">A scalable API service with comprehensive documentation and automated testing.</p>
            </div>
          </div>
        </div>
        <div className="view-more">
          <Link to="/projects" className="view-more-link">View all projects</Link>
        </div>
      </div>
      
      <div className="skills-preview">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Frontend</h3>
            <ul>
              <li>React.js</li>
              <li>JavaScript (ES6+)</li>
              <li>HTML5/CSS3</li>
              <li>Redux</li>
              <li>Responsive Design</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Backend</h3>
            <ul>
              <li>Node.js</li>
              <li>Express</li>
              <li>RESTful APIs</li>
              <li>PostgreSQL/MongoDB</li>
              <li>Authentication</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Tools & Methods</h3>
            <ul>
              <li>Git/GitHub</li>
              <li>Docker</li>
              <li>CI/CD</li>
              <li>Agile/Scrum</li>
              <li>Testing (Jest, Mocha)</li>
            </ul>
          </div>
        </div>
        <div className="view-more">
          <Link to="/skills" className="view-more-link">See all skills</Link>
        </div>
      </div>
      
      <div className="cta-section">
        <p className="cta-text">
          Looking for a developer who can bring your ideas to life?
          I'm currently available for freelance work and full-time opportunities.
        </p>
        <Link to="/contact" className="cta-button">Get in Touch</Link>
        <Link to="/resume" className="resume-button">View Resume</Link>
      </div>
    </div>
  );
};

export default Home;
