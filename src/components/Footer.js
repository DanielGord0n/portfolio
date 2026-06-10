import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-name">Daniel Gordon</span>
          <span className="footer-role">Software Engineer — Cloud, DevOps &amp; AI Systems</span>
        </div>

        <div className="footer-links">
          <a href="https://github.com/DanielGord0n" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/daniel-gordon2/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin size={18} />
          </a>
          <a href="mailto:gordondan2@gmail.com" aria-label="Email">
            <FaEnvelope size={18} />
          </a>
        </div>

        <div className="footer-right">
          <span className="footer-note">Designed &amp; built from scratch — React, Framer Motion, vanilla CSS</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
