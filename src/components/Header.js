import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('none');
  const [prevScrollY, setPrevScrollY] = useState(0);
  const location = useLocation();

  // Handle scroll direction for header show/hide
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > prevScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && 
          (currentScrollY - prevScrollY > 10 || prevScrollY - currentScrollY > 10)) {
        setScrollDirection(direction);
      }
      
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollDirection, prevScrollY]);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  // Determine header class based on scroll direction
  const headerClass = `header ${
    scrollDirection === 'down' && window.scrollY > 100 ? 'header-scrolled' : 
    scrollDirection === 'up' ? 'header-visible' : ''
  }`;

  // Toggle mobile menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Create a NavLink component with highlight effect
  const NavLink = ({ to, children }) => (
    <Link to={to}>
      {children}
      <span className="nav-link-highlight"></span>
    </Link>
  );

  return (
    <header className={headerClass}>
      <div className="logo">
        <Link to="/">Daniel Gordon</Link>
      </div>
      
      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <nav className={`nav ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/projects">Projects</NavLink></li>
          <li><NavLink to="/skills">Skills</NavLink></li>
          <li><NavLink to="/resume">Resume</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
