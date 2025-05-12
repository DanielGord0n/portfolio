import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Resume.css';
import resumePDF from '../images/Daniel_Gordon_Resume_FullStackDeveloper.pdf';

const Resume = () => {
  const [activeTab, setActiveTab] = useState('view');
  
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
            View Online
          </button>
          <button 
            className={`tab-btn ${activeTab === 'download' ? 'active' : ''}`}
            onClick={() => setActiveTab('download')}
          >
            Download PDF
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
      ) : (
        <div className="resume-download">
          <div className="pdf-preview">
            <img 
              src="https://via.placeholder.com/600x800/f5f5f5/3a4a5c?text=Resume+Preview" 
              alt="Resume preview" 
              className="preview-image" 
            />
          </div>
          <div className="download-options">
            <h2>Download Options</h2>
            <p>
              You can download my complete resume in PDF format. It includes detailed information about my work experience, education, skills, and certifications.
            </p>
            <a 
              href={resumePDF} 
              download="Daniel_Gordon_Resume_FullStackDeveloper.pdf"
              className="download-btn"
            >
              Download Resume PDF
            </a>
            <p className="additional-info">
              Looking for something specific? <Link to="/contact">Contact me</Link> for additional information or a tailored version of my resume.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;
