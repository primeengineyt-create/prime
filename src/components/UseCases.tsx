'use client';
import { useEffect, useRef } from 'react';
import TiltCard from '@/components/TiltCard';

export default function UseCases() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.1 }
        );

        const children = sectionRef.current?.querySelectorAll('.bento-item');
        children?.forEach(child => observer.observe(child));

        return () => observer.disconnect();
    }, []);

    const cases = [
        { title: 'Start a Shop', desc: 'Build your online store and sell products.', tag: 'RETAIL', size: '2' },
        { title: 'Make a Game', desc: 'Create fun web games with AI.', tag: 'FUN', size: '1' },
        { title: 'Build an App', desc: 'Turn ideas into real apps.', tag: 'MOBILE', size: '1' },
        { title: 'Create a Tool', desc: 'Build helpful business tools.', tag: 'WORK', size: '1' },
        { title: 'Design a Site', desc: 'Make beautiful websites.', tag: 'WEB', size: '1' },
        { title: 'Smart Finance', desc: 'Build money tracking tools.', tag: 'DEFI', size: '2' }
    ];

    return (
        <section ref={sectionRef} className="section" style={{ background: '#ffffff', padding: '4rem 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="glass-pill" style={{ marginBottom: '1rem', fontSize: '0.6rem' }}>IDEAS</div>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>
                        If you dream it, <span style={{ color: 'var(--primary)' }}>build it</span>.
                    </h2>
                </div>

                <div className="bento-grid" style={{ gridAutoRows: 'minmax(160px, auto)' }}>
                    {cases.map((c, i) => (
                        <TiltCard
                            key={c.title}
                            className="bento-item reveal-on-scroll"
                            delay={i * 0.08}
                            style={{
                                gridColumn: `span ${c.size}`,
                                background: 'white',
                                padding: '1.5rem'
                            }}
                        >
                            <div style={{ marginBottom: 'auto', transform: 'translateZ(20px)' }}>
                                <div className="glass-pill" style={{ opacity: 0.5, fontSize: '0.5rem', padding: '0.35rem 0.75rem' }}>{c.tag}</div>
                            </div>
                            <div style={{ marginTop: '1.25rem', transform: 'translateZ(10px)' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{c.title}</h3>
                                <p style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 500, lineHeight: 1.4 }}>{c.desc}</p>
                            </div>
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                height: '2px',
                                background: 'var(--accent-gradient)',
                                opacity: 0.08
                            }} />
                        </TiltCard>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .reveal-on-scroll {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.8s var(--bezier-cinematic);
                }
                .reveal-on-scroll.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </section>
    );
}
