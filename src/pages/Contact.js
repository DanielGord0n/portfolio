import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You would typically send this data to a server
    alert('Thank you for your message! I\'ll get back to you as soon as possible.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
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
          <h2>Contact Information</h2>
          <p className="contact-intro">
            I'm currently available for freelance work, full-time positions, and collaborative projects. Feel free to reach out if you're looking for a developer who can deliver clean, efficient, and user-friendly applications.
          </p>
          
          <div className="contact-details">
            <div className="contact-method">
              <div className="contact-icon">
                <i className="icon-email">✉</i>
              </div>
              <div className="contact-text">
                <h3>Email</h3>
                <p>daniel.gordon@example.com</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">
                <i className="icon-location">📍</i>
              </div>
              <div className="contact-text">
                <h3>Location</h3>
                <p>Toronto, Canada</p>
              </div>
            </div>
            
            <div className="contact-method">
              <div className="contact-icon">
                <i className="icon-availability">🕒</i>
              </div>
              <div className="contact-text">
                <h3>Availability</h3>
                <p>Monday - Friday: 9am - 6pm EST</p>
              </div>
            </div>
          </div>
          
          <div className="social-links">
            <h3>Connect With Me</h3>
            <div className="social-icons">
              <a href="https://github.com/DanielGord0n" target="_blank" rel="noopener noreferrer" className="social-icon github">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/danielgordon" target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                LinkedIn
              </a>
              <a href="https://twitter.com/danielgordon" target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                Twitter
              </a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h2>Send Me a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email address"
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this regarding?"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                required
                rows="5"
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
