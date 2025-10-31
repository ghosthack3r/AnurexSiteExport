import React, { useState, useEffect } from 'react';
import { navItems } from '../data/navigation';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`sticky top-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-[#005A64]/80 backdrop-blur-sm' : 'bg-[#0B2E34]'}`}>
            <div className={`container mx-auto flex justify-between items-center transition-all duration-300 ease-in-out ${isScrolled ? 'py-2' : 'py-4'}`}>
                <a href="#" aria-label="Anurex Home" className="text-white no-underline">
                     <img src="https://i.ibb.co/ccTRXmT2/Anurex-Logo-New-TXT-up-Scaled-Transparent.png" alt="Anurex Logo" className={`transition-all duration-300 ${isScrolled ? 'h-10' : 'h-12'}`} />
                </a>
                <nav className="hidden md:flex items-center space-x-8">
                    {navItems.map((item) => (
                        <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-white hover:text-[#F0C828] transition-colors duration-300">
                            {item}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;