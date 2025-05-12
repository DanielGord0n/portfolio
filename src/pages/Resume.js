import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Resume.css';
import resumePDF from '../images/Daniel_Gordon_Resume_FullStackDeveloper.pdf';

const Resume = () => {
  const [activeTab, setActiveTab] = useState('pdf');
  
  const experiences = [
    {
      company: 'TechNova Solutions',
      position: 'Senior Frontend Developer',
      period: 'Jan 2023 - Present',
      description: 'Lead the frontend development team in building responsive web applications using React and TypeScript. Implemented state management solutions with Redux and optimized application performance. Collaborated with UX/UI designers to create intuitive user interfaces.',
      achievements: [
        'Reduced load time by 40% through code optimization and lazy loading techniques',
        'Implemented comprehensive test coverage using Jest and React Testing Library',
        'Mentored junior developers and established frontend best practices'
      ]
    },
    {
      company: 'DataViz Inc.',
      position: 'Full Stack Developer',
      period: 'Mar 2020 - Dec 2022',
      description: 'Developed and maintained full-stack web applications using the MERN stack (MongoDB, Express, React, Node.js). Designed and implemented RESTful APIs and database schemas. Collaborated in an Agile development environment.',
      achievements: [
        'Built a real-time data visualization dashboard that increased client retention by 25%',
        'Implemented secure authentication system with JWT and role-based access control',
        'Contributed to microservices architecture migration'
      ]
    },
    {
      company: 'WebSphere Solutions',
      position: 'Junior Web Developer',
      period: 'Jun 2018 - Feb 2020',
      description: 'Developed responsive websites and web applications for various clients. Worked with HTML, CSS, JavaScript, and jQuery. Maintained existing client websites and implemented new features based on client requirements.',
      achievements: [
        'Created mobile-responsive designs for 15+ client websites',
        'Implemented e-commerce functionality using Stripe payment integration',
        'Improved site performance and SEO rankings for multiple clients'
      ]
    }
  ];
  
  const education = [
    {
      institution: 'University of Technology',
      degree: 'Bachelor of Science in Computer Science',
      period: '2014 - 2018',
      details: 'Graduated with honors. Specialized in web development and software engineering.'
    }
  ];
  
  const certifications = [
    { name: 'AWS Certified Developer - Associate', issuer: 'Amazon Web Services', year: '2022' },
    { name: 'MongoDB Certified Developer', issuer: 'MongoDB Inc.', year: '2021' },
    { name: 'React Developer Certification', issuer: 'Meta', year: '2020' }
  ];

  return (
    <div className="resume-container">
      <div className="resume-header">
        <h1>My Resume</h1>
        <div className="resume-tabs">
          <button 
            className={`tab-btn ${activeTab === 'view' ? 'active' : ''}`}
            onClick={() => setActiveTab('view')}
          >
            View Experience
          </button>
          <button 
            className={`tab-btn ${activeTab === 'pdf' ? 'active' : ''}`}
            onClick={() => setActiveTab('pdf')}
          >
            View PDF
          </button>
          <button 
            className={`tab-btn ${activeTab === 'download' ? 'active' : ''}`}
            onClick={() => setActiveTab('download')}
          >
            Download Options
          </button>
        </div>
      </div>
      
      {activeTab === 'view' ? (
        <div className="resume-content">
          <section className="resume-section">
            <h2 className="section-title">Professional Experience</h2>
            <div className="experiences">
              {experiences.map((exp, index) => (
                <div className="experience" key={index}>
                  <div className="experience-header">
                    <h3 className="company">{exp.company}</h3>
                    <span className="period">{exp.period}</span>
                  </div>
                  <p className="position">{exp.position}</p>
                  <p className="description">{exp.description}</p>
                  <div className="achievements">
                    <h4>Key Achievements:</h4>
                    <ul>
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
          
          <section className="resume-section">
            <h2 className="section-title">Education</h2>
            <div className="education">
              {education.map((edu, index) => (
                <div className="education-item" key={index}>
                  <div className="education-header">
                    <h3 className="institution">{edu.institution}</h3>
                    <span className="period">{edu.period}</span>
                  </div>
                  <p className="degree">{edu.degree}</p>
                  <p className="details">{edu.details}</p>
                </div>
              ))}
            </div>
          </section>
          
          <section className="resume-section">
            <h2 className="section-title">Certifications</h2>
            <div className="certifications">
              {certifications.map((cert, index) => (
                <div className="certification-item" key={index}>
                  <h3 className="certification-name">{cert.name}</h3>
                  <p className="certification-details">
                    {cert.issuer} | {cert.year}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : activeTab === 'pdf' ? (
        <div className="resume-pdf-viewer">
          <div className="pdf-container">
            <iframe 
              src={`${resumePDF}#view=FitH`} 
              title="Daniel Gordon Resume"
              className="pdf-iframe"
              frameBorder="0"
            />
          </div>
          <div className="pdf-actions">
            <a 
              href={resumePDF} 
              download="Daniel_Gordon_Resume_FullStackDeveloper.pdf"
              className="pdf-download-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Download PDF
            </a>
            <a 
              href={resumePDF} 
              target="_blank"
              rel="noopener noreferrer"
              className="pdf-open-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Open in New Tab
            </a>
          </div>
        </div>
      ) : (
        <div className="resume-download">
          <div className="pdf-preview">
            <iframe 
              src={`${resumePDF}#view=FitH&page=1`} 
              title="Daniel Gordon Resume Preview"
              className="preview-iframe"
              frameBorder="0"
            />
          </div>
          <div className="download-options">
            <h2>Download Options</h2>
            <p>
              You can download my complete resume in multiple formats. Each includes detailed information about my work experience, education, skills, and certifications.
            </p>
            <div className="download-buttons">
              <a 
                href={resumePDF} 
                download="Daniel_Gordon_Resume_FullStackDeveloper.pdf"
                className="download-btn primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M9 15L12 18 15 15"></path>
                  <path d="M12 18L12 10"></path>
                </svg>
                PDF Format
              </a>
              <a 
                href={resumePDF} 
                download="Daniel_Gordon_Resume_FullStackDeveloper.pdf"
                className="download-btn secondary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <path d="M9 15L12 18 15 15"></path>
                  <path d="M12 18L12 10"></path>
                </svg>
                Word Format
              </a>
            </div>
            <div className="resume-features">
              <h3>Resume Features</h3>
              <ul className="features-list">
                <li>ATS-optimized format for better visibility</li>
                <li>Comprehensive skills section highlighting technical abilities</li>
                <li>Project highlights with measurable results</li>
                <li>Professional certifications and education</li>
              </ul>
            </div>
            <p className="additional-info">
              Need a different format or customized version? <Link to="/contact">Contact me</Link> for a tailored version of my resume.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;
