import React from 'react';
import '../styles/Contact.css';

const Contact = () => {


  const contactInfo = {
    email: "gordondan2@gmail.com",
    phone: "+1 (647)-622-0424",
    location: "Vaughan, Canada",
    github: "https://github.com/DanielGord0n",
    linkedin: "https://www.linkedin.com/in/daniel-gordon2/",
    twitter: "https://twitter.com/danielgordon"
  };
  
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
      <div className="contact-header">
        <h1>Get In Touch</h1>
        <p className="contact-subheading">
          Have a project in mind or interested in working together? I'd love to hear from you.
        </p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-details">
            <div className="contact-detail">
              <h3>
                <span className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </span>
                Email
              </h3>
              <p><a href={`mailto:${contactInfo.email}?subject=Portfolio%20Inquiry&body=Hello%20Daniel,%0A%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20connect%20about...%0A%0ABest%20regards,%0A`}>{contactInfo.email}</a></p>
            </div>
            
            <div className="contact-detail">
              <h3>
                <span className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                  </svg>
                </span>
                Phone
              </h3>
              <p><a href={`tel:${contactInfo.phone.replace(/\D/g, '')}`}>{contactInfo.phone}</a></p>
            </div>
            
            <div className="contact-detail">
              <h3>
                <span className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </span>
                Location
              </h3>
              <p>{contactInfo.location}</p>
            </div>

            <div className="contact-detail">
              <h3>
                <span className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </span>
                GitHub
              </h3>
              <p><a href={contactInfo.github} target="_blank" rel="noopener noreferrer">DanielGord0n</a></p>
            </div>

            <div className="contact-detail">
              <h3>
                <span className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </span>
                LinkedIn
              </h3>
              <p><a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer">daniel-gordon2</a></p>
            </div>
          </div>
          
          {/* Removed duplicate social section since we already have GitHub and LinkedIn in the contact details */}
        </div>
        
        <div className="contact-quick-actions">
          <div className="contact-cta">
            <h2>Let's Connect</h2>
            <p>The best way to reach me is via email. Click the button below to send me a message directly.</p>
            <div className="cta-buttons">
              <button 
                className="btn btn-primary"
                onClick={openEmailClient}
              >
                Send Email
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
