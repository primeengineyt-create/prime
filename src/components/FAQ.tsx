'use client';
import { useState, useEffect, useRef } from 'react';

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const faqs = [
        {
            q: "How does autonomous orchestration work?",
            a: "Our core engine decomposes high-level goals into multi-agent workflows, managing the entire lifecycle from synthesis to global edge deployment automatically."
        },
        {
            q: "Can I export my source code?",
            a: "Yes. You own the clean, production-ready React and Node.js codebases. There is absolutely no vendor lock-in or proprietary runtime required."
        },
        {
            q: "What about data security and compliance?",
            a: "Prime Engine is built with enterprise-grade security at its core, featuring automated SOC2 scanning, HIPAA-ready infrastructure, and private data siloing."
        },
        {
            q: "How do you handle global scaling?",
            a: "Your applications are deployed across our global edge mesh network, featuring automated load balancing, self-healing nodes, and zero-latency routing."
        }
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
        <section ref={sectionRef} id="faq" className="section" style={{ background: '#ffffff' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
                    <div className="glass-pill" style={{ marginBottom: '1.5rem' }}>RESOLVED</div>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 950, letterSpacing: '-0.05em', lineHeight: 1 }}>
                        Expert <span style={{ color: 'var(--primary)' }}>Intelligence</span>.
                    </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className="reveal-on-scroll"
                            style={{
                                background: 'white',
                                border: '1px solid var(--card-border)',
                                borderRadius: 'var(--radius-md)',
                                overflow: 'hidden',
                                transition: 'all 0.4s var(--bezier-cinematic)',
                                transitionDelay: `${i * 0.1}s`
                            }}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                style={{
                                    width: '100%',
                                    padding: '2rem 2.5rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--foreground)',
                                    fontSize: '1.25rem',
                                    fontWeight: 800,
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    letterSpacing: '-0.02em'
                                }}
                            >
                                <span>{faq.q}</span>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%', background: 'var(--silver-gradient)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    transform: activeIndex === i ? 'rotate(180deg)' : 'rotate(0)',
                                    transition: 'transform 0.5s var(--bezier-cinematic)'
                                }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </button>

                            <div style={{
                                maxHeight: activeIndex === i ? '300px' : '0',
                                opacity: activeIndex === i ? 1 : 0,
                                transition: 'all 0.6s var(--bezier-cinematic)',
                                padding: activeIndex === i ? '0 2.5rem 2.5rem' : '0 2.5rem'
                            }}>
                                <p style={{ color: 'var(--secondary)', lineHeight: 1.6, fontSize: '1.1rem', fontWeight: 500, maxWidth: '750px' }}>
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
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
