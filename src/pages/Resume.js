import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Resume.css';

const Resume = () => {
  // PDF path for production
  const resumePDF = '/Daniel_Gordon_Resume_FullStackDeveloper.pdf';
  
  // Removed tabs since we're only showing the PDF viewer
  
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
      </div>
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

    </div>
  );
};

export default Resume;
