import React, { useRef, useEffect } from 'react';

const Snowfall = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Array<{x: number, y: number, radius: number, ySpeed: number, xSpeed: number}> = [];

        const setup = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const particleCount = 150;
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2 + 1,
                    ySpeed: (Math.random() * 0.5) + 0.1, // Slower vertical speed
                    xSpeed: (Math.random() * 0.4) - 0.2, // Slight horizontal speed for wind effect
                });
            }
        };

        const draw = () => {
            if(!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath();

            for (const p of particles) {
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, true);
            }
            ctx.fill();
            update();

            animationFrameId = requestAnimationFrame(draw);
        };

        const update = () => {
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.y += p.ySpeed;
                p.x += p.xSpeed;
                
                // Reset particle if it goes off screen
                if (p.y > canvas.height) {
                    particles[i] = { ...p, y: -10, x: Math.random() * canvas.width };
                }
                // Wrap around horizontally for wind effect
                if (p.x > canvas.width) {
                    particles[i] = { ...p, x: 0 };
                }
                if (p.x < 0) {
                    particles[i] = { ...p, x: canvas.width };
                }
            }
        };
        
        setup();
        draw();

        const handleResize = () => {
            setup();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }} />;
};

export default Snowfall;