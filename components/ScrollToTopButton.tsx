import React, { useState, useEffect } from 'react';
import { ChevronUpIcon } from './icons';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 bg-[#F0C828] text-[#0B2E34] p-3 rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-300 ease-in-out transform hover:scale-110 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
            aria-label="Scroll to top"
        >
            <ChevronUpIcon className="w-6 h-6" />
        </button>
    );
};

export default ScrollToTopButton;