import React from 'react';

const Footer = () => (
    <footer className="bg-[#0B2E34] text-center p-8">
        <div className="container mx-auto text-sm text-[#8AA0A6]">
            <p>&copy; {new Date().getFullYear()} Anurex Technologies. All Rights Reserved.</p>
            <p className="mt-2">This website is a conceptual clone for portfolio purposes and is not affiliated with the actual Anurex brand.</p>
        </div>
    </footer>
);

export default Footer;