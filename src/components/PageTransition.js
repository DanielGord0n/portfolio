import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = (Component) => {
    return (props) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="page-transition-container"
            style={{ width: '100%' }}
        >
            <Component {...props} />
        </motion.div>
    );
};

export default PageTransition;
