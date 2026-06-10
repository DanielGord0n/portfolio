import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../styles/Lightbox.css';

const LightboxContext = createContext({ openLightbox: () => {} });

export const useLightbox = () => useContext(LightboxContext);

export const LightboxProvider = ({ children }) => {
    const [item, setItem] = useState(null);

    const openLightbox = useCallback((src, title) => {
        setItem({ src, title });
    }, []);

    const close = useCallback(() => setItem(null), []);

    useEffect(() => {
        if (!item) return;
        const onKey = (e) => {
            if (e.key === 'Escape') close();
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = 'unset';
        };
    }, [item, close]);

    return (
        <LightboxContext.Provider value={{ openLightbox }}>
            {children}
            <AnimatePresence>
                {item && (
                    <motion.div
                        className="lightbox-overlay"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${item.title} logo, enlarged`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={close}
                    >
                        <motion.div
                            className="lightbox-panel hud-corners"
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <img src={item.src} alt={`${item.title} logo`} className="lightbox-image" />
                            <span className="lightbox-caption">{item.title}</span>
                        </motion.div>
                        <button className="lightbox-close" onClick={close} aria-label="Close">
                            ESC / CLOSE ✕
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </LightboxContext.Provider>
    );
};

export default LightboxProvider;
