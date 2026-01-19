'use client';
import { useEffect, useRef } from 'react';

export default function TrustLogos() {
    const sectionRef = useRef<HTMLElement>(null);
    const logos = ['NVIDIA', 'META', 'OPENAI', 'ANTHROPIC', 'REPLICATE', 'VERCEL', 'STRIPE', 'AMAZON'];
    // Duplicate for seamless loop
    const marqueeLogos = [...logos, ...logos, ...logos];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) entries[0].target.classList.add('visible');
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="trust" className="section" style={{ background: '#ffffff', borderBottom: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <div className="container">
                <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <p style={{
                        fontSize: '0.7rem',
                        fontWeight: 900,
                        letterSpacing: '0.25em',
                        color: 'var(--secondary)',
                        textTransform: 'uppercase',
                        opacity: 0.5
                    }}>
                        Trusted by Engineering Teams at
                    </p>
                </div>

                <div className="marquee-container">
                    <div className="marquee-track">
                        {marqueeLogos.map((logo, i) => (
                            <div key={`${logo}-${i}`} className="logo-item">
                                {logo}
                            </div>
                        ))}
                    </div>
                    <div className="marquee-track" aria-hidden="true">
                        {marqueeLogos.map((logo, i) => (
                            <div key={`${logo}-${i}-clone`} className="logo-item">
                                {logo}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .marquee-container {
                    position: relative;
                    width: 100%;
                    overflow: hidden;
                    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                    display: flex;
                    gap: 4rem;
                }

                .marquee-track {
                    display: flex;
                    gap: 4rem;
                    animation: scroll 40s linear infinite;
                    min-width: 100%;
                    justify-content: space-around;
                    flex-shrink: 0;
                }

                @keyframes scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-100%); }
                }

                .logo-item {
                    font-size: 1.5rem;
                    font-weight: 900;
                    letter-spacing: -0.05em;
                    color: var(--secondary);
                    opacity: 0.4;
                    transition: all 0.3s;
                    cursor: default;
                    white-space: nowrap;
                }
                .logo-item:hover {
                    color: var(--foreground);
                    opacity: 1;
                    transform: scale(1.05);
                }

                .reveal-on-scroll {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 1s var(--bezier-cinematic);
                }
                .reveal-on-scroll.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </section>
    );
}
