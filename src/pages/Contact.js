import React, { useEffect } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import PageTransition from '../components/PageTransition';
import '../styles/Contact.css';

const Contact = () => {
  // Update document title
  useEffect(() => {
    document.title = 'Contact | Daniel Gordon - Full Stack Developer';
  }, []);

  const openEmailClient = () => {
    const emailAddress = "gordondan2@gmail.com";
    const subject = "Portfolio Inquiry";
    const body = "Hello Daniel,\n\nI visited your portfolio and would like to connect about...\n\nBest regards,";

    // Try direct Gmail link first
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact-header">
          <h1>Get In Touch</h1>
          <p>
            Whether you have a project in mind, a question about my work, or just want to connect,
            I'm always open to new opportunities and conversations. Let's build something amazing together!
          </p>
        </div>

        <div className="contact-card-glass">
          <div className="contact-list">
            <a href="mailto:gordondan2@gmail.com" className="contact-list-item">
              <div className="icon-box-small">
                <FaEnvelope />
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <p>gordondan2@gmail.com</p>
              </div>
              <span className="link-arrow">→</span>
            </a>

            <a href="tel:+16476220424" className="contact-list-item">
              <div className="icon-box-small">
                <FaPhone />
              </div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p>+1 (647)-622-0424</p>
              </div>
              <span className="link-arrow">→</span>
            </a>

            <a href="https://www.linkedin.com/in/daniel-gordon2/" target="_blank" rel="noopener noreferrer" className="contact-list-item">
              <div className="icon-box-small">
                <FaLinkedin />
              </div>
              <div className="contact-details">
                <h3>LinkedIn</h3>
                <p>Connect professionally</p>
              </div>
              <span className="link-arrow">→</span>
            </a>

            <a href="https://github.com/DanielGord0n" target="_blank" rel="noopener noreferrer" className="contact-list-item">
              <div className="icon-box-small">
                <FaGithub />
              </div>
              <div className="contact-details">
                <h3>GitHub</h3>
                <p>Check out my code</p>
              </div>
              <span className="link-arrow">→</span>
            </a>
          </div>

          <div className="location-info">
            <FaMapMarkerAlt className="location-icon" />
            <span>Based in Vaughan, Ontario • Open to Remote Work</span>
          </div>
        </div>

        <div className="contact-cta-glass">
          <h2>Let's Connect</h2>
          <p>The best way to reach me is via email. Click the button below to send me a message directly.</p>
          <button className="btn-glass-primary" onClick={openEmailClient}>
            Send Email <FaEnvelope style={{ marginLeft: '10px' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageTransition(Contact);
