import { useState, useCallback } from 'react';

export const useTypewriterEffect = () => {
    const [displayedText, setDisplayedText] = useState('');
    const [typewriterDone, setTypewriterDone] = useState(false);

    const typewriterEffect = useCallback((text: string, index = 0) => {
        if (index < text.length) {
            setDisplayedText(text.substring(0, index + 1));
            setTimeout(() => typewriterEffect(text, index + 1), 35);
        } else {
            setTypewriterDone(true);
        }
    }, []);

    return { displayedText, typewriterDone, typewriterEffect, setTypewriterDone };
};