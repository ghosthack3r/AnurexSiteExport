import React from 'react';

const Loader = ({ isFinishing }: { isFinishing: boolean }) => (
    <div className={`fixed inset-0 bg-anurex-gradient flex items-center justify-center z-[999] transition-opacity duration-700 ease-out ${isFinishing ? 'opacity-0' : 'opacity-100'}`}>
        <div className="animate-fade-in-grow">
            <img src="https://i.ibb.co/gL6B4kmy/Untitled-11.png" alt="Anurex Logo" className="w-auto h-20" />
        </div>
    </div>
);

export default Loader;