import React, { useEffect, useState } from 'react';
import PageTransition from '../components/PageTransition';
import '../styles/Resume.css';

const Resume = () => {
  const [resumeType, setResumeType] = useState('AI'); // 'AI', 'Solutions', 'FullStack'

  // PDF paths - using placeholders or assuming filenames based on prompt
  const resumes = {
    AI: {
      path: '/DanielGordon_Resume_SWE_AIPlatform.pdf',
      filename: 'DanielGordon_Resume_SWE_AIPlatform.pdf',
      title: 'AI Platform Engineering Resume'
    },
    Solutions: {
      path: '/DanielGordon_Resume_SolutionsEngineer.pdf',
      filename: 'DanielGordon_Resume_SolutionsEngineer.pdf',
      title: 'Solutions Engineering Resume'
    },
    FullStack: {
      path: '/DanielGordon_Resume_AppliedAI.pdf',
      filename: 'DanielGordon_Resume_AppliedAI.pdf',
      title: 'Applied AI & Full-Stack Resume'
    }
  };

  const currentResume = resumes[resumeType];

  // Helper to determine pill position
  const getPillPosition = () => {
    switch (resumeType) {
      case 'AI': return '0%';
      case 'Solutions': return '100%'; // 100% of the pill width (x=width)
      case 'FullStack': return '200%';
      default: return '0%';
    }
  };

  // Update document title and meta description
  useEffect(() => {
    document.title = `Resume | Daniel Gordon - ${currentResume.title}`;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', `View and download Daniel Gordon's ${currentResume.title}.`);
    }
  }, [resumeType, currentResume.title]);

  return (
    <div className="resume-container">
      <div className="resume-header">
        <h1>My Resume</h1>

        <div className="resume-toggle-container">
          <div className="resume-toggle-nav">
            <button
              className={`resume-toggle-btn ${resumeType === 'AI' ? 'active' : ''}`}
              onClick={() => setResumeType('AI')}
            >
              AI / Platform SWE
            </button>
            <button
              className={`resume-toggle-btn ${resumeType === 'Solutions' ? 'active' : ''}`}
              onClick={() => setResumeType('Solutions')}
            >
              Solutions Engineer
            </button>
            <button
              className={`resume-toggle-btn ${resumeType === 'FullStack' ? 'active' : ''}`}
              onClick={() => setResumeType('FullStack')}
            >
              Applied AI Engineer
            </button>
            <div
              className="toggle-pill"
              style={{ transform: `translateX(${getPillPosition()})` }}
            ></div>
          </div>
          <p className="resume-note">
            These resume versions are tailored to different internship tracks. The content is consistent across roles; emphasis changes by job type.
          </p>
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

export default PageTransition(Resume);
