import React, { useEffect, useRef } from 'react';
import Animated from './Animated';

const Testimonials = () => {
    const frameRef = useRef<HTMLDivElement>(null);
    const dotsWrapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const frame = frameRef.current;
        const dotsWrap = dotsWrapRef.current;
        if (!frame || !dotsWrap) return;

        const track = frame.querySelector<HTMLElement>('.t-track');
        if (!track) return;

        const slides = Array.from(track.children) as HTMLElement[];
        const prevBtn = frame.querySelector<HTMLButtonElement>('.t-prev');
        const nextBtn = frame.querySelector<HTMLButtonElement>('.t-next');
        const progress = frame.querySelector<HTMLElement>('.t-progress');

        if (!prevBtn || !nextBtn || !progress) return;

        let index = 0;
        const total = slides.length;
        const loop = String(frame.dataset.loop).toLowerCase() !== 'false';
        const autoplayMs = Number(frame.dataset.autoplay || 0);
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let autoplayTimer: number | null = null;
        let progressTimer: number | null = null;
        let isHover = false;
        let isInteracting = false;

        dotsWrap.innerHTML = '';

        const dots = slides.map((_, i) => {
            const b = document.createElement('button');
            b.className = 't-dot';
            b.type = 'button';
            b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            b.addEventListener('click', () => { isInteracting = true; goTo(i); restartAutoplay(); });
            dotsWrap.appendChild(b);
            return b;
        });

        function updateARIA() {
            slides.forEach((s, i) => s.setAttribute('aria-label', (i + 1) + ' of ' + total));
        }

        function goTo(i: number) {
            index = (i + total) % total;
            const x = -index * 100;
            if (track) track.style.transform = 'translateX(' + x + '%)';
            dots.forEach((d, di) => d.setAttribute('aria-current', String(di === index)));
            if (!loop && prevBtn && nextBtn) {
                prevBtn.disabled = index === 0;
                nextBtn.disabled = index === total - 1;
            }
        }

        function next() { goTo(index + 1); }
        function prev() { goTo(index - 1); }
        
        const handlePrevClick = () => { isInteracting = true; prev(); restartAutoplay(); };
        const handleNextClick = () => { isInteracting = true; next(); restartAutoplay(); };
        prevBtn.addEventListener('click', handlePrevClick);
        nextBtn.addEventListener('click', handleNextClick);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); isInteracting = true; next(); restartAutoplay(); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); isInteracting = true; prev(); restartAutoplay(); }
        };
        frame.addEventListener('keydown', handleKeyDown);
        frame.tabIndex = 0;

        let startX = 0, dx = 0, dragging = false;
        const onPointerDown = (e: PointerEvent) => {
            dragging = true; startX = e.clientX; dx = 0;
            track.style.transition = 'none';
            track.setPointerCapture(e.pointerId);
        };
        const onPointerMove = (e: PointerEvent) => {
            if (!dragging) return;
            const x = e.clientX; dx = x - startX;
            const pct = dx / frame.clientWidth * 100;
            track.style.transform = 'translateX(' + (-index * 100 + pct) + '%)';
        };
        const onPointerUp = () => {
            if (!dragging) return;
            dragging = false; track.style.transition = '';
            if (Math.abs(dx) > frame.clientWidth * 0.15) { isInteracting = true; (dx < 0 ? next() : prev()); }
            else { goTo(index); }
            restartAutoplay();
        };
        track.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);

        function startAutoplay() {
            if (autoplayMs <= 0 || prefersReduced) return;
            progress.hidden = false; progress.style.transition = 'none'; progress.style.transform = 'scaleX(0)';
            if (progressTimer) clearTimeout(progressTimer);
            progressTimer = window.setTimeout(() => {
                progress.style.transition = 'transform ' + autoplayMs + 'ms linear';
                progress.style.transform = 'scaleX(1)';
            }, 30);
            if (autoplayTimer) clearInterval(autoplayTimer);
            autoplayTimer = window.setInterval(() => {
                if (!isHover && !isInteracting) { next(); }
                progress.style.transition = 'none'; progress.style.transform = 'scaleX(0)';
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        progress.style.transition = 'transform ' + autoplayMs + 'ms linear';
                        progress.style.transform = 'scaleX(1)';
                    });
                });
            }, autoplayMs);
        }

        function stopAutoplay() {
            if (autoplayTimer) clearInterval(autoplayTimer);
            autoplayTimer = null;
            progress.hidden = true;
        }

        function restartAutoplay() {
            if (autoplayMs > 0 && !prefersReduced) {
                stopAutoplay();
                isInteracting = false;
                startAutoplay();
            }
        }
        
        const handleMouseEnter = () => { isHover = true; };
        const handleMouseLeave = () => { isHover = false; };
        frame.addEventListener('mouseenter', handleMouseEnter);
        frame.addEventListener('mouseleave', handleMouseLeave);

        const handleResize = () => { goTo(index); };
        window.addEventListener('resize', handleResize);

        updateARIA();
        goTo(0);
        if (!loop) { prevBtn.disabled = true; }
        startAutoplay();

        return () => {
            prevBtn.removeEventListener('click', handlePrevClick);
            nextBtn.removeEventListener('click', handleNextClick);
            frame.removeEventListener('keydown', handleKeyDown);
            track.removeEventListener('pointerdown', onPointerDown);
            window.removeEventListener('pointermove', onPointerMove);
            window.removeEventListener('pointerup', onPointerUp);
            frame.removeEventListener('mouseenter', handleMouseEnter);
            frame.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('resize', handleResize);
            stopAutoplay();
            if (progressTimer) clearTimeout(progressTimer);
        };
    }, []);

    return (
        <section id="testimonials" className="t-slider" role="region" aria-label="Testimonials">
            <Animated>
                <h2 className="text-4xl font-bold text-center mb-12 text-white">What Our Customers Say</h2>
            </Animated>

            <div ref={frameRef} className="t-frame" id="anurex-testimonials" data-autoplay="6500" data-loop="true">
                <div className="t-track" role="list">

                    <article className="t-slide" role="group" aria-roledescription="slide" aria-label="1 of 3">
                        <div className="t-stars" role="img" aria-label="Rated 5 out of 5">
                            <span className="sr-only">Rated 5 out of 5</span>
                            <span className="t-star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></span>
                            <span className="t-star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></span>
                            <span className="t-star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></span>
                            <span className="t-star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></span>
                            <span className="t-star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></span>
                        </div>
                        <p className="t-quote">“This is the standby for rectal problems. A natural form of cryotherapy that brought instant, soothing relief.”</p>
                        <div className="t-meta">
                            <img className="t-avatar" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200" alt="Portrait of Pepper One" loading="lazy" />
                            <div>
                                <div className="t-name">Pepper One</div>
                                <div className="t-role">Verified buyer</div>
                            </div>
                        </div>
                    </article>

                    <article className="t-slide" role="group" aria-roledescription="slide" aria-label="2 of 3">
                        <div className="t-stars" role="img" aria-label="Rated 5 out of 5">
                            <span className="sr-only">Rated 5 out of 5</span>
                            <span className="t-star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></span>
                            <span className="t-star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></span>
                            <span className="t-star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></span>
                            <span className="t-star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></span>
                            <span className="t-star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></span>
                        </div>
                        <p className="t-quote">“Amazing product — the only thing that has worked for me in 24 years.”</p>
                        <div className="t-meta">
                            <img className="t-avatar" src="https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200" alt="Portrait of Elizabeth" loading="lazy" />
                            <div>
                                <div className="t-name">Elizabeth</div>
                                <div className="t-role">Verified buyer</div>
                            </div>
                        </div>
                    </article>

                    <article className="t-slide" role="group" aria-roledescription="slide" aria-label="3 of 3">
                        <div className="t-stars" role="img" aria-label="Rated 5 out of 5">
                            <span className="sr-only">Rated 5 out of 5</span>
                            <span className="t-star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></span>
                            <span className="t-star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></span>
                            <span className="t-star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></span>
                            <span className="t-star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></span>
                            <span className="t-star" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg></span>
                        </div>
                        <p className="t-quote">“I prefer this over messy creams. The frozen applicator is comforting and brings almost instant relief.”</p>
                        <div className="t-meta">
                            <img className="t-avatar" src="https://images.unsplash.com/photo-1548207808-8b0a5c2ed4e1?q=80&w=200" alt="Portrait of Jeff" loading="lazy" />
                            <div>
                                <div className="t-name">Jeff</div>
                                <div className="t-role">Verified buyer</div>
                            </div>
                        </div>
                    </article>

                </div>

                <div className="t-nav" aria-hidden="true">
                    <button className="t-btn t-prev" type="button" title="Previous" aria-label="Previous testimonial">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    <button className="t-btn t-next" type="button" title="Next" aria-label="Next testimonial">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                </div>

                <div className="t-progress" hidden></div>
            </div>

            <div ref={dotsWrapRef} className="t-dots" aria-label="Slide pagination" aria-controls="anurex-testimonials"></div>
        </section>
    );
};

export default Testimonials;
