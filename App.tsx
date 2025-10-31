import React, { useState, useEffect } from 'react';
import { LoadingContext } from './context/LoadingContext';
import Loader from './components/Loader';
import Snowfall from './components/Snowfall';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import ProductAdvantage from './components/ProductAdvantage';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);
    
    useEffect(() => {
        if (!isLoading) {
            const contentTimer = setTimeout(() => {
                setIsContentLoaded(true);
            }, 100); // slight delay to allow loader to start fading out
            return () => clearTimeout(contentTimer);
        }
    }, [isLoading]);

    return (
        <LoadingContext.Provider value={{ isContentLoaded }}>
            <Loader isFinishing={!isLoading} />
            <div className={`bg-anurex-gradient text-white antialiased transition-opacity duration-1000 ease-in ${isContentLoaded ? 'opacity-100' : 'opacity-0'}`}>
                <Snowfall />
                <Header />
                <main>
                    <Hero />
                    <Features />
                    <ProductAdvantage />
                    <Testimonials />
                    <FaqSection />
                </main>
                <Footer />
                <ScrollToTopButton />
            </div>
        </LoadingContext.Provider>
    );
}

export default App;
