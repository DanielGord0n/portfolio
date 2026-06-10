import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const NAV_ITEMS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
];

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

  return (
    <header className={headerClass}>
      <div className="logo">
        <Link to="/">
          <span className="logo-bracket">[</span>DG<span className="logo-bracket">]</span>
          <span className="logo-name">daniel gordon</span>
        </Link>
      </div>

      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <nav className={`nav ${menuOpen ? 'active' : ''}`}>
        <ul>
          {NAV_ITEMS.map((item, i) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={location.pathname === item.to ? 'nav-active' : ''}
              >
                <span className="nav-index">{String(i + 1).padStart(2, '0')}.</span>
                {item.label}
                <span className="nav-link-highlight"></span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
