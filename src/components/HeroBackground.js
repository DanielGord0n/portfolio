import React from 'react';
import '../styles/HeroBackground.css';

// Static layered HUD backdrop: engineering grid, green glow, vignette.
// Pure CSS, zero runtime cost.
const HeroBackground = () => {
    return (
        <div className="hud-backdrop" aria-hidden="true">
            <div className="hud-grid" />
            <div className="hud-glow" />
            <div className="hud-vignette" />
        </div>
    );
};

export default HeroBackground;
