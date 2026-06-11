import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import HeroBackground from './components/HeroBackground';
import LightboxProvider from './components/Lightbox';

// Pages
import Home from './pages/Home';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// The TellTours scroll film loads on demand
const Showcase = React.lazy(() => import('./pages/Showcase'));

const ShowcaseLoading = () => (
  <div style={{
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 13,
    letterSpacing: '0.2em',
    color: '#A8B8AC',
  }}>
    LOADING THE TOUR ...
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/showcase"
          element={
            <Suspense fallback={<ShowcaseLoading />}>
              <Showcase />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

// Inside the Router so it can read the location: the showcase is a
// full-takeover page with no site header or footer
const AppShell = () => {
  const location = useLocation();
  const immersive = location.pathname === '/showcase';

  return (
    <div className="App">
      <HeroBackground />
      <SmoothScroll />
      {!immersive && <Header />}
      <main className={`main-content ${immersive ? 'main-immersive' : ''}`}>
        <AnimatedRoutes />
      </main>
      {!immersive && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <MotionConfig reducedMotion="user">
        <LightboxProvider>
          <AppShell />
        </LightboxProvider>
      </MotionConfig>
    </Router>
  );
}

export default App;
