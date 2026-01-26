import React, { useState, useEffect, useRef } from 'react';

const TypingText = ({ text, delay = 0, speed = 0.05, className = '', onComplete, showCursor = true }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const onCompleteRef = useRef(onComplete);

    useEffect(() => {
        onCompleteRef.current = onComplete;
    }, [onComplete]);

    useEffect(() => {
        // Reset state when text changes
        setDisplayedText('');
        setIsComplete(false);

        let currentIndex = 0;
        let intervalId;

        const startTimeout = setTimeout(() => {
            intervalId = setInterval(() => {
                if (currentIndex < text.length) {
                    // Use substring instead of appending to avoid duplication
                    setDisplayedText(text.substring(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    clearInterval(intervalId);
                    setIsComplete(true);
                    if (onCompleteRef.current) {
                        onCompleteRef.current();
                    }
                }
            }, speed * 1000);
        }, delay * 1000);

        return () => {
            clearTimeout(startTimeout);
            if (intervalId) clearInterval(intervalId);
        };
    }, [text, delay, speed]);

    return (
        <span className={className}>
            {displayedText}
            {showCursor && !isComplete && <span className="typing-cursor">|</span>}
        </span>
    );
};

export default TypingText;
