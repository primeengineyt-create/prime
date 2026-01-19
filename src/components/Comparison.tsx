'use client';
import { useEffect, useRef } from 'react';
import TiltCard from '@/components/TiltCard';

export default function Comparison() {
    const sectionRef = useRef<HTMLElement>(null);

    const traditional = [
        'Months of development time',
        'Complex infrastructure management',
        'Security vulnerabilities',
        'High cost of ownership',
        'Vendor lock-in'
    ];

    const prime = [
        'Launch in days',
        'Autonomous DevOps orchestration',
        'Built-in SOC2 compliance',
        'Fraction of traditional costs',
        'Clean, owned source code'
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.1 }
        );
        const children = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
        children?.forEach(c => observer.observe(c));
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="section" style={{ background: 'var(--silver-gradient)' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                    <div className="glass-pill" style={{ marginBottom: '1.5rem' }}>BENCHMARK</div>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 950, letterSpacing: '-0.05em', lineHeight: 1 }}>
                        The Paradigm <span style={{ color: 'var(--primary)' }}>Shift</span>.
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                    {/* Traditional */}
                    <div className="reveal-on-scroll" style={{
                        padding: '4rem 3rem',
                        background: 'rgba(255,255,255,0.4)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        borderRadius: 'var(--radius-lg)'
                    }}>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--secondary)', marginBottom: '3rem' }}>
                            Traditional Development
                        </h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {traditional.map(item => (
                                <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--secondary)', fontWeight: 500, fontSize: '1.1rem' }}>
                                    <span style={{ width: '20px', height: '2px', background: 'rgba(0,0,0,0.1)', flexShrink: 0 }} />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Prime Engine */}
                    <div className="reveal-on-scroll">
                        <TiltCard
                            style={{
                                padding: '4rem 3rem',
                                background: 'white',
                                border: '1px solid var(--primary)',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--premium-shadow)',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--accent-gradient)' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', transform: 'translateZ(20px)' }}>
                                <h4 style={{ fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--primary)' }}>
                                    Prime Engine AI
                                </h4>
                                <div className="glass-pill" style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>PRECISION</div>
                            </div>

                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.5rem', transform: 'translateZ(10px)' }}>
                                {prime.map(item => (
                                    <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 700, fontSize: '1.1rem' }}>
                                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--orb-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 12px rgba(110, 56, 255, 0.3)' }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                                                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </TiltCard>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .reveal-on-scroll {
                    opacity: 0;
                    transform: translateY(30px);
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
