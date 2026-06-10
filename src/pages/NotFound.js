import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import '../styles/NotFound.css';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 | Daniel Gordon';
  }, []);

  return (
    <div className="notfound-container">
      <div className="notfound-panel hud-corners">
        <span className="notfound-code">ERR 404 // OFF TRACK</span>
        <h1 className="silver-text">Nothing at this address.</h1>
        <p>The route you requested doesn't exist. Telemetry suggests heading back to the pit.</p>
        <Link to="/" className="btn btn-primary">Back to home</Link>
      </div>
    </div>
  );
};

export default PageTransition(NotFound);
