import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
    alert('Message sent! I\'ll get back to you as soon as possible.');
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-intro">
        <h2>Captured your interest? I'm just a message away — get in touch and I'll get back to you as soon as possible.</h2>
        
        <div className="contact-info">
          <p>If you're exploring this portfolio for a potential hire, I'd be excited to bring my creative, strategic, and executional skills to your team. With hands-on experience in digital marketing, market research, and community-driven content strategy, I'm confident in my ability to contribute to brand growth and campaign success. I'm open to full-time, internship, or contract opportunities — let's connect and explore how I can add value to your team.</p>
          
          <div className="contact-details">
            <p className="phone">(647) 535-2589</p>
            <p className="email">Mvivier111@gmail.com</p>
          </div>
        </div>
      </div>
      
      <div className="contact-form-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@email.com"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message*</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Start typing your message here..."
              required
            ></textarea>
          </div>
          
          <button type="submit" className="submit-button">SEND MAIL</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
