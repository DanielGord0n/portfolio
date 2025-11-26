import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaPhone, FaCopy, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import '../styles/Contact.css';

const ContactItem = ({ icon: Icon, label, value, action, copyValue }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(copyValue).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <motion.div
      className="command-item"
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
      whileTap={{ scale: 0.98 }}
      onClick={action}
    >
      <div className="command-icon">
        <Icon />
      </div>
      <div className="command-info">
        <span className="command-label">{label}</span>
        <span className="command-value">{value}</span>
      </div>
      {copyValue && (
        <button
          className="command-copy-btn"
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          {copied ? <FaCheck color="#00E5FF" /> : <FaCopy />}
        </button>
      )}
    </motion.div>
  );
};

const Contact = () => {
  useEffect(() => {
    document.title = 'Contact | Daniel Gordon - Full Stack Developer';
  }, []);

  const openEmail = () => {
    window.open('mailto:gordondan2@gmail.com', '_blank');
  };

  return (
    <div className="contact-container">
      <div className="glass-command-center">
        <div className="command-header">
          <h1>Let's Connect</h1>
          <p>Available for new opportunities</p>
        </div>

        <div className="command-grid">
          <ContactItem
            icon={FaEnvelope}
            label="Email"
            value="gordondan2@gmail.com"
            action={openEmail}
            copyValue="gordondan2@gmail.com"
          />
          <ContactItem
            icon={FaPhone}
            label="Phone"
            value="+1 (647)-622-0424"
            action={() => window.location.href = 'tel:+16476220424'}
            copyValue="+16476220424"
          />
          <ContactItem
            icon={FaLinkedin}
            label="LinkedIn"
            value="Daniel Gordon"
            action={() => window.open('https://www.linkedin.com/in/daniel-gordon2/', '_blank')}
          />
          <ContactItem
            icon={FaGithub}
            label="GitHub"
            value="DanielGord0n"
            action={() => window.open('https://github.com/DanielGord0n', '_blank')}
          />
        </div>

        <div className="command-footer">
          <p>Based in Vaughan, Ontario • Open to Remote</p>
        </div>
      </div>
    </div>
  );
};

export default PageTransition(Contact);
