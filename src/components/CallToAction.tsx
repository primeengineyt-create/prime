'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import TiltCard from '@/components/TiltCard';

export default function CallToAction() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) setIsVisible(true);
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} id="cta" className="section" style={{ background: '#ffffff', padding: '4rem 0' }}>
            <div className="container">
                <TiltCard
                    className={`cta-card ${isVisible ? 'visible' : ''}`}
                    perspective={2000}
                    style={{
                        background: 'var(--foreground)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '4rem 3rem',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        opacity: isVisible ? 1 : 0,
                        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'opacity 1s var(--bezier-cinematic), transform 1s var(--bezier-cinematic)',
                        boxShadow: '0 50px 100px -30px rgba(0, 0, 0, 0.25)'
                    }}
                >
                    <div className="cta-bg">
                        <div className="bg-orb bg-orb-1" style={{ transform: 'translateZ(-20px)' }} />
                        <div className="bg-orb bg-orb-2" style={{ transform: 'translateZ(-20px)' }} />
                    </div>

                    <div className="cta-particles" style={{ transform: 'translateZ(10px)' }}>
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="cta-particle" style={{
                                left: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${6 + Math.random() * 4}s`
                            }} />
                        ))}
                    </div>

                    <div style={{ position: 'relative', zIndex: 10, transform: 'translateZ(30px)' }}>
                        <div className="cta-badge shimmer">
                            START NOW
                        </div>

                        <h2 className="cta-title">
                            Ready? Let's <br />
                            <span className="gradient-text">Build Anything</span>.
                        </h2>

                        <p className="cta-desc">
                            Join thousands building their dreams with AI.
                            Start in one minute.
                        </p>

                        <div className="cta-buttons">
                            <Link href="/build">
                                <button className="btn-primary">
                                    <span className="btn-shine" />
                                    Start Building
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </Link>
                            <Link href="/signup">
                                <button className="btn-secondary">
                                    Get Started Free
                                </button>
                            </Link>
                        </div>

                        <div className="trust-badges">
                            {['🔒 Secure', '⚡ Fast', '🌍 Global'].map(badge => (
                                <div key={badge} className="trust-badge">
                                    {badge}
                                </div>
                            ))}
                        </div>
                    </div>
                </TiltCard>
            </div>

            <style jsx>{`
                .cta-card {
                    /* Handled by TiltCard styling */
                }

                .cta-card {
                    /* Handled by TiltCard styling */
                }

                .cta-bg {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                    pointer-events: none;
                }
                .bg-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(60px);
                    animation: float-orb 10s ease-in-out infinite;
                }
                .bg-orb-1 {
                    width: 250px;
                    height: 250px;
                    background: var(--accent-solar);
                    top: -15%;
                    left: -5%;
                    opacity: 0.15;
                }
                .bg-orb-2 {
                    width: 200px;
                    height: 200px;
                    background: var(--primary);
                    bottom: -10%;
                    right: -5%;
                    opacity: 0.2;
                    animation-delay: 2s;
                }
                @keyframes float-orb {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(20px, -20px) scale(1.05); }
                }
                
                .cta-particles {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                    pointer-events: none;
                }
                .cta-particle {
                    position: absolute;
                    bottom: -5px;
                    width: 3px;
                    height: 3px;
                    background: white;
                    border-radius: 50%;
                    opacity: 0.2;
                    animation: rise linear infinite;
                }
                @keyframes rise {
                    0% { transform: translateY(0) scale(0); opacity: 0; }
                    10% { opacity: 0.2; }
                    90% { opacity: 0.2; }
                    100% { transform: translateY(-400px) scale(1); opacity: 0; }
                }
                
                .cta-badge {
                    display: inline-block;
                    padding: 0.5rem 1rem;
                    background: rgba(255,255,255,0.1);
                    color: white;
                    border-radius: 100px;
                    font-size: 0.6rem;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    margin-bottom: 1.5rem;
                    position: relative;
                    overflow: hidden;
                }
                .shimmer::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
                    animation: shimmer 2.5s infinite;
                }
                @keyframes shimmer {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
                
                .cta-title {
                    font-size: clamp(2rem, 5vw, 3.5rem);
                    font-weight: 800;
                    color: white;
                    line-height: 0.95;
                    letter-spacing: -0.04em;
                    margin-bottom: 1rem;
                }
                .gradient-text {
                    background: linear-gradient(135deg, #FF4D00 0%, #6E38FF 50%, #001AFF 100%);
                    background-size: 200% 200%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradient-shift 4s ease infinite;
                }
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                .cta-desc {
                    font-size: 0.95rem;
                    color: rgba(255,255,255,0.55);
                    max-width: 400px;
                    margin: 0 auto 2.5rem;
                    font-weight: 500;
                    line-height: 1.5;
                }
                
                .cta-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;
                    flex-wrap: wrap;
                }
                
                .btn-primary {
                    position: relative;
                    padding: 0.85rem 2rem;
                    background: white;
                    color: var(--foreground);
                    border: none;
                    border-radius: 100px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    overflow: hidden;
                    transition: all 0.4s var(--bezier-cinematic);
                }
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.25);
                }
                .btn-shine {
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(110, 56, 255, 0.15), transparent);
                    animation: shine 3s infinite;
                }
                @keyframes shine {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
                
                .btn-secondary {
                    padding: 0.85rem 2rem;
                    background: transparent;
                    color: white;
                    border: 1px solid rgba(255,255,255,0.15);
                    border-radius: 100px;
                    font-size: 0.9rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.4s;
                }
                .btn-secondary:hover {
                    background: rgba(255,255,255,0.08);
                    border-color: rgba(255,255,255,0.3);
                }
                
                .trust-badges {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    margin-top: 2.5rem;
                    flex-wrap: wrap;
                }
                .trust-badge {
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.35);
                    font-weight: 600;
                }
            `}</style>
        </section>
    );
}
