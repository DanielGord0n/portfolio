import React, { useEffect, useState } from 'react';
import '../styles/Resume.css';

const Resume = () => {
  const [resumeType, setResumeType] = useState('SWE'); // 'SWE' or 'ML'

  // PDF paths
  const resumes = {
    SWE: {
      path: '/Daniel_Gordon_Resume_SWE.pdf',
      filename: 'Daniel_Gordon_Resume_SWE.pdf',
      title: 'Software Engineering Resume'
    },
    ML: {
      path: '/DanielGordon_Resume_ML.pdf',
      filename: 'DanielGordon_Resume_ML.pdf',
      title: 'Machine Learning Resume'
    }
  };

  const currentResume = resumes[resumeType];
  
  // Update document title and meta description
  useEffect(() => {
    document.title = `Resume | Daniel Gordon - ${resumeType === 'SWE' ? 'Software Engineer' : 'Machine Learning Engineer'}`;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `View and download Daniel Gordon's ${resumeType === 'SWE' ? 'Software Engineering' : 'Machine Learning'} resume.`);
    }
  }, [resumeType]);

  return (
    <div className="resume-container">
      <div className="resume-header">
        <h1>My Resume</h1>
        <div className="resume-toggle-container">
          <div className="resume-toggle">
            <button 
              className={`toggle-btn ${resumeType === 'SWE' ? 'active' : ''}`}
              onClick={() => setResumeType('SWE')}
            >
              Software Engineering
            </button>
            <button 
              className={`toggle-btn ${resumeType === 'ML' ? 'active' : ''}`}
              onClick={() => setResumeType('ML')}
            >
              Machine Learning
            </button>
            <div className={`toggle-slider ${resumeType === 'ML' ? 'slide-right' : ''}`}></div>
          </div>
        </div>
      </div>

        <div className="resume-pdf-viewer">
          <div className="pdf-container">
            <iframe 
              src={`${currentResume.path}#view=FitH`} 
              title={currentResume.title}
              className="pdf-iframe"
              frameBorder="0"
            />
          </div>
          <div className="pdf-actions">
            <a 
              href={currentResume.path} 
              download={currentResume.filename}
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
              href={currentResume.path} 
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
