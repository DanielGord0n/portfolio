import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="profile-section">
        <div className="profile-image-container">
          <img 
            src="https://via.placeholder.com/180x180/e5d6d2/c9927a?text=Profile" 
            alt="Michel Vivier" 
            className="profile-image" 
          />
        </div>
      </div>
      
      <div className="intro-section">
        <h1 className="intro-title">
          Marketing Strategist| Creative-Led, Analytics-Focused | Turning Ideas into Scalable Campaigns.
        </h1>
      </div>
      
      <div className="portfolio-preview">
        <div className="portfolio-item">
          <img 
            src="https://via.placeholder.com/400x300/f7d0c0/c9927a?text=Skincare" 
            alt="Skincare" 
            className="portfolio-image" 
          />
          <div className="portfolio-item-info">
            <p className="portfolio-type">PDF file</p>
            <h3 className="portfolio-title">Blog - Changing the skincare industry through CX experience</h3>
          </div>
        </div>
      </div>
      
      <div className="cta-section">
        <p className="cta-text">
          I've worked with over 16 clients from different industries.
          Want to start a project together?
        </p>
        <Link to="/contact" className="cta-button">Get in Touch</Link>
      </div>
    </div>
  );
};

export default Home;
