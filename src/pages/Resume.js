import React, { useEffect } from 'react';
import { FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import '../styles/Resume.css';

const RESUME_PATH = '/Daniel_Gordon_Resume.pdf';
const RESUME_FILENAME = 'Daniel_Gordon_Resume.pdf';

const Resume = () => {
  useEffect(() => {
    document.title = 'Resume | Daniel Gordon';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', "View and download Daniel Gordon's resume — Software Engineer (Cloud, DevOps & AI Systems).");
    }
  }, []);

  return (
    <div className="resume-container">
      <div className="resume-header">
        <span className="section-marker">curriculum vitae</span>
        <h1>Resume</h1>
        <p className="resume-note">
          One resume, kept current — covering cloud/DevOps work at WellnessLiving, AI platform
          engineering, HPC research, and TellTours.
        </p>
      </div>

      <div className="resume-pdf-viewer">
        <div className="pdf-container">
          <iframe
            src={`${RESUME_PATH}#view=FitH`}
            title="Daniel Gordon — Resume"
            className="pdf-iframe"
            frameBorder="0"
          />
        </div>
        <div className="pdf-actions">
          <a
            href={RESUME_PATH}
            download={RESUME_FILENAME}
            className="btn btn-primary"
          >
            <FaDownload size={14} />
            Download PDF
          </a>
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <FaExternalLinkAlt size={13} />
            Open in new tab
          </a>
        </div>
      </div>
    </div>
  );
};

export default PageTransition(Resume);
