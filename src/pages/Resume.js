import React, { useEffect } from 'react';
import '../styles/Resume.css';

const Resume = () => {
  // PDF path for production
  const resumePDF = '/Daniel_Gordon_Resume_FullStackDeveloper.pdf';
  
  // Update document title and meta description
  useEffect(() => {
    document.title = 'Resume | Daniel Gordon - Full Stack Developer';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'View and download Daniel Gordon\'s resume. Full Stack Developer with experience in React, Node.js, and modern web technologies.');
    }
  }, []);

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
