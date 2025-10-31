import React, { useState, useEffect, useRef, useContext } from 'react';
import { LoadingContext } from '../context/LoadingContext';

type AnimatedProps = {
    // FIX: `children` was missing from the props definition, causing type errors
    // wherever this component was used to wrap other elements.
    children: React.ReactNode;
    delay?: number;
    className?: string;
};

const Animated: React.FC<AnimatedProps> = ({ children, delay = 0, className = "" }) => {
    const [isVisibleByObserver, setIsVisibleByObserver] = useState(false);
    const { isContentLoaded } = useContext(LoadingContext);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisibleByObserver(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    // Animation should only trigger when the page has finished loading AND the element is in view
    const shouldAnimate = isContentLoaded && isVisibleByObserver;

    const style = {
        transition: 'opacity 700ms ease-out, transform 700ms ease-out',
        transitionDelay: `${delay}ms`,
        opacity: shouldAnimate ? 1 : 0,
        transform: shouldAnimate ? 'translateY(0)' : 'translateY(20px)',
    };

    return (
        <div ref={ref} style={style} className={className}>
            {children}
        </div>
    );
};

export default Animated;
