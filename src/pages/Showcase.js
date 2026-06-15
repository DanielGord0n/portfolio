import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import audioPin from '../images/TellToursLogo_AudioPin.svg';
import tellToursLogo from '../images/TellToursLogo.svg';
import poiHistorical from '../images/POI_Historical.svg';
import poiLandmarks from '../images/POI_Landmarks.svg';
import poiMuseums from '../images/POI_Museums.svg';
import '../styles/Showcase.css';

/*
 * TellTours scroll film.
 * All product copy is taken verbatim from telltours.com and the app.
 * The audio pin travels a winding route down the whole page as you scroll.
 * Optional video backplates: drop files into public/clips/ (see SHOWCASE_ASSETS.md).
 */

// Winding route in normalized coords (x: 0-100, y: 0-1000), top to bottom
const ROUTE_PATH =
  'M 50 8 ' +
  'C 90 60, 10 110, 22 170 ' +
  'C 32 220, 88 240, 84 310 ' +
  'C 80 380, 14 400, 16 470 ' +
  'C 18 540, 86 560, 84 630 ' +
  'C 82 700, 12 720, 16 790 ' +
  'C 20 860, 80 880, 50 985';

const VideoBackplate = ({ src, opacity = 0.45 }) => {
  const [available, setAvailable] = useState(true);
  if (!available) return null;
  return (
    <video
      className="sc-backplate"
      style={{ opacity }}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      onError={() => setAvailable(false)}
    />
  );
};

/* The "dragon": the TellTours audio pin riding the route as you scroll */
const RouteRibbon = ({ progress }) => {
  const pathRef = useRef(null);
  const wrapRef = useRef(null);

  const pinX = useMotionValue(0);
  const pinY = useMotionValue(0);
  const pinRotate = useMotionValue(0);
  const springX = useSpring(pinX, { stiffness: 110, damping: 22 });
  const springY = useSpring(pinY, { stiffness: 110, damping: 22 });
  const springRotate = useSpring(pinRotate, { stiffness: 90, damping: 18 });

  const reducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  const place = (p) => {
    const path = pathRef.current;
    const wrap = wrapRef.current;
    if (!path || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    const scaleX = rect.width / 100;
    const scaleY = rect.height / 1000;
    const len = path.getTotalLength();
    const at = Math.max(0.001, Math.min(0.999, p)) * len;
    const pt = path.getPointAtLength(at);
    const ahead = path.getPointAtLength(Math.min(len, at + 4));
    pinX.set(pt.x * scaleX);
    pinY.set(pt.y * scaleY);
    // Lean into turns, gently
    const angle = Math.atan2((ahead.y - pt.y) * scaleY, (ahead.x - pt.x) * scaleX) * (180 / Math.PI) - 90;
    pinRotate.set(Math.max(-22, Math.min(22, angle)));
  };

  useMotionValueEvent(progress, 'change', (p) => {
    if (!reducedMotion) place(p);
  });

  useEffect(() => {
    place(reducedMotion ? 0.5 : progress.get());
    const onResize = () => place(reducedMotion ? 0.5 : progress.get());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="sc-ribbon" ref={wrapRef} aria-hidden="true">
      <svg viewBox="0 0 100 1000" preserveAspectRatio="none" className="sc-ribbon-svg">
        {/* Full route, faintly visible ahead */}
        <path d={ROUTE_PATH} className="sc-route-ghost" />
        {/* Traveled portion draws in as you scroll */}
        <motion.path
          ref={pathRef}
          d={ROUTE_PATH}
          className="sc-route-drawn"
          style={{ pathLength: reducedMotion ? 1 : progress }}
        />
      </svg>
      <motion.img
        src={audioPin}
        alt=""
        className="sc-pin"
        style={{ x: springX, y: springY, rotate: springRotate }}
      />
    </div>
  );
};

/* Code-drawn phone. Swappable for real screenshots later (SHOWCASE_ASSETS.md). */
const PhoneScreenExplore = () => (
  <div className="ph-screen">
    <div className="ph-statusbar"><span>9:41</span><span>●●●</span></div>
    <span className="ph-kicker">TORONTO · TODAY</span>
    <h4 className="ph-serif">Where to <em>today?</em></h4>
    <div className="ph-action ph-action-primary">
      <strong>Plan a Tour</strong>
      <span>Pick stops. We'll route &amp; narrate.</span>
      <em>Build route ▸</em>
    </div>
    <div className="ph-action">
      <strong>Free Roam</strong>
      <span>Walk or drive. We'll narrate POIs.</span>
      <em>Start now ▸</em>
    </div>
    <div className="ph-chips">
      <span className="on">All</span><span>Walking</span><span>Driving</span><span>Architecture</span>
    </div>
    <div className="ph-tourcard">
      <span className="ph-tag">POPULAR · 0.4 KM</span>
      <strong>Whispers of the Old Quarter</strong>
      <span>8 stops · 1 h 20 min</span>
    </div>
  </div>
);

const PhoneScreenRoam = () => (
  <div className="ph-screen ph-map">
    <div className="ph-mapgrid" />
    <div className="ph-geofence" />
    <span className="ph-userdot" />
    <img src={poiHistorical} alt="" className="ph-poi ph-poi-1" />
    <img src={poiLandmarks} alt="" className="ph-poi ph-poi-2" />
    <img src={poiMuseums} alt="" className="ph-poi ph-poi-3" />
    <div className="ph-roam-banner">
      <strong>Discovery</strong>
      <span>11 nearby landmarks</span>
    </div>
    <div className="ph-roam-chip">Casa Loma · 0.4 km · Historical</div>
  </div>
);

const PhoneScreenPlaying = () => (
  <div className="ph-screen ph-playing">
    <span className="ph-kicker">NOW PLAYING</span>
    <h4 className="ph-serif">The Gooderham Building</h4>
    <p className="ph-story">
      An iconic flatiron building constructed in 1892, featuring a striking Romanesque Revival
      facade at the meeting of Front and Wellington...
    </p>
    <div className="ph-wave">
      {Array.from({ length: 22 }, (_, i) => (
        <span key={i} style={{ animationDelay: `${i * 0.09}s` }} />
      ))}
    </div>
    <div className="ph-controls">
      <span>⏮</span><span className="ph-play">⏸</span><span>⏭</span>
    </div>
    <span className="ph-langs">EN · FR · ES · DE +</span>
  </div>
);

const Showcase = () => {
  const pageRef = useRef(null);
  const phoneActRef = useRef(null);
  const mapActRef = useRef(null);

  useEffect(() => {
    document.title = 'TellTours Showcase | Daniel Gordon';
  }, []);

  const { scrollYProgress } = useScroll({ target: pageRef, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 70, damping: 20, restDelta: 0.0004 });

  // Phone act: which screen shows
  const { scrollYProgress: phoneProgress } = useScroll({
    target: phoneActRef,
    offset: ['start start', 'end end'],
  });
  const screen1Opacity = useTransform(phoneProgress, [0, 0.3, 0.4], [1, 1, 0]);
  const screen2Opacity = useTransform(phoneProgress, [0.3, 0.4, 0.62, 0.72], [0, 1, 1, 0]);
  const screen3Opacity = useTransform(phoneProgress, [0.62, 0.72, 1], [0, 1, 1]);
  const phoneTilt = useTransform(phoneProgress, [0, 1], [3, -3]);

  // Map act: route + stops
  const { scrollYProgress: mapProgress } = useScroll({
    target: mapActRef,
    offset: ['start start', 'end end'],
  });
  const mapRoute = useSpring(mapProgress, { stiffness: 80, damping: 24 });
  const stop1 = useTransform(mapProgress, [0.18, 0.28], [0, 1]);
  const stop2 = useTransform(mapProgress, [0.45, 0.55], [0, 1]);
  const stop3 = useTransform(mapProgress, [0.72, 0.82], [0, 1]);

  return (
    <div className="showcase" ref={pageRef}>
      {/* Fixed chrome */}
      <motion.div className="sc-progress" style={{ scaleX: scrollYProgress }} />
      <Link to="/" className="sc-exit">⏎ DG // portfolio</Link>

      <RouteRibbon progress={smooth} />

      {/* Act 1: hero */}
      <section className="sc-hero">
        <VideoBackplate src="/clips/showcase-hero.mp4" />
        <motion.div
          className="sc-hero-inner"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src={tellToursLogo} alt="TellTours" className="sc-hero-logo" />
          <span className="sc-prerelease">● NOW IN PRERELEASE</span>
          <h1 className="sc-display">
            The world is full of stories. <em>Listen.</em>
          </h1>
          <p className="sc-lede">
            TellTours is your personal, AI-powered tour guide. Walk, drive, or ride through any
            city, and hear fascinating, context-aware stories about the landmarks you pass, in
            real time.
          </p>
          <div className="sc-scrollcue">
            <span>scroll to start the tour</span>
            <span className="sc-scrollcue-line" />
          </div>
        </motion.div>
      </section>

      {/* Act 2: the experience. Phone pins, copy steps scroll past it. */}
      <section className="sc-phone-act" ref={phoneActRef}>
        <div className="sc-phone-pinwrap">
          <motion.div className="sc-phone" style={{ rotate: phoneTilt }}>
            <div className="sc-phone-notch" />
            <div className="sc-phone-screens">
              <motion.div className="sc-phone-layer" style={{ opacity: screen1Opacity }}>
                <PhoneScreenExplore />
              </motion.div>
              <motion.div className="sc-phone-layer" style={{ opacity: screen2Opacity }}>
                <PhoneScreenRoam />
              </motion.div>
              <motion.div className="sc-phone-layer" style={{ opacity: screen3Opacity }}>
                <PhoneScreenPlaying />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="sc-phone-copy">
          <ShowcaseStep
            kicker="01 · ANYWHERE"
            title="Walk. Drive. Ride."
            body="Open the app, pick a curated tour or just start moving. TellTours follows along wherever the day takes you."
          />
          <ShowcaseStep
            kicker="02 · DISCOVERY"
            title="No itinerary? No problem."
            body="In Discovery mode, TellTours tracks your location and automatically narrates the history of landmarks as you approach them. Location-aware. Auto-play."
          />
          <ShowcaseStep
            kicker="03 · THE MAGIC"
            title="Your city starts talking."
            body="Pass the Gooderham Building and hear its 1892 story, told like a friend who knows everything. Multilingual, in real time."
          />
        </div>
      </section>

      {/* Act 3: the living map */}
      <section className="sc-map-act" ref={mapActRef}>
        <div className="sc-map-sticky">
          <div className="sc-map-head">
            <span className="sc-kicker">THE WORLD IS YOUR MUSEUM</span>
            <h2 className="sc-display sc-display-sm">
              Every block has a <em>story.</em>
            </h2>
          </div>
          <div className="sc-map-stage">
            <svg viewBox="0 0 800 460" className="sc-map-svg" aria-hidden="true">
              <g className="sc-map-streets">
                {[60, 140, 220, 300, 380].map(y => (
                  <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} />
                ))}
                {[100, 230, 360, 490, 620, 750].map(x => (
                  <line key={`v${x}`} x1={x} y1="0" x2={x} y2="460" />
                ))}
              </g>
              <path
                d="M 60 400 C 200 380, 180 240, 320 220 C 440 204, 470 320, 580 290 C 680 263, 690 150, 750 90"
                className="sc-map-route-ghost"
              />
              <motion.path
                d="M 60 400 C 200 380, 180 240, 320 220 C 440 204, 470 320, 580 290 C 680 263, 690 150, 750 90"
                className="sc-map-route"
                style={{ pathLength: mapRoute }}
              />
            </svg>

            <motion.div className="sc-stop sc-stop-1" style={{ opacity: stop1, scale: stop1 }}>
              <img src={poiHistorical} alt="" />
              <div><strong>Whispers of the Old Quarter</strong><span>8 stops · 1 h 20 min</span></div>
            </motion.div>
            <motion.div className="sc-stop sc-stop-2" style={{ opacity: stop2, scale: stop2 }}>
              <img src={poiLandmarks} alt="" />
              <div><strong>Casa Loma</strong><span>0.4 km · Historical</span></div>
            </motion.div>
            <motion.div className="sc-stop sc-stop-3" style={{ opacity: stop3, scale: stop3 }}>
              <img src={poiMuseums} alt="" />
              <div><strong>Coastal Highway 1</strong><span>12 stops · 3 h 40 min</span></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Act 4: features */}
      <section className="sc-features">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="sc-features-inner"
        >
          <h2 className="sc-display sc-display-sm">Built for the way you <em>move.</em></h2>
          <div className="sc-feature-row">
            <div className="sc-feature">
              <span className="sc-feature-icon">🚗</span>
              <strong>Apple CarPlay &amp; Android Auto</strong>
              <span>Narration on the dash, hands on the wheel.</span>
            </div>
            <div className="sc-feature">
              <span className="sc-feature-icon">🌍</span>
              <strong>Multilingual AI narration</strong>
              <span>Hear every story in your language.</span>
            </div>
            <div className="sc-feature">
              <span className="sc-feature-icon">📱</span>
              <strong>Free to download</strong>
              <span>iOS &amp; Android. Now in prerelease.</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Act 5: CTA */}
      <section className="sc-cta">
        <VideoBackplate src="/clips/showcase-cta.mp4" opacity={0.35} />
        <motion.div
          className="sc-cta-inner"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="sc-display sc-display-xl"><em>Listen.</em></h2>
          <p>The beta waitlist is open.</p>
          <div className="sc-cta-buttons">
            <a href="https://telltours.com" target="_blank" rel="noopener noreferrer" className="sc-btn sc-btn-primary">
              Join the beta at telltours.com
            </a>
            <Link to="/projects" className="sc-btn">Back to my work</Link>
          </div>
          <span className="sc-colophon">
            A scroll film by Daniel Gordon. No video engine, no template: this page is React,
            rendered live as you scroll.
          </span>
        </motion.div>
      </section>
    </div>
  );
};

const ShowcaseStep = ({ kicker, title, body }) => (
  <motion.div
    className="sc-step"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ margin: '-30% 0px -30% 0px' }}
    transition={{ duration: 0.5 }}
  >
    <span className="sc-kicker">{kicker}</span>
    <h3 className="sc-display sc-display-sm">{title}</h3>
    <p>{body}</p>
  </motion.div>
);

export default Showcase;
