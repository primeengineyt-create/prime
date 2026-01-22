'use client';
import { useEffect, useRef, useState } from 'react';
import TiltCard from '@/components/TiltCard';

export default function Features() {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const [counters, setCounters] = useState({ speed: 0, uptime: 0, users: 0 });

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.classList.contains('counter-trigger')) {
                        animateCounters();
                    }
                }
            });
        }, { threshold: 0.1 });

        const children = sectionRef.current?.querySelectorAll('.bento-item, .counter-trigger');
        children?.forEach(child => observer.observe(child));

        const handleMouseMove = (e: MouseEvent) => {
            if (!gridRef.current) return;
            const items = gridRef.current.querySelectorAll('.bento-item');
            items.forEach((item) => {
                const rect = (item as HTMLElement).getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                (item as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
                (item as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            observer.disconnect();
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const animateCounters = () => {
        const duration = 2000;
        const targets = { speed: 10, uptime: 99.9, users: 50 };
        const start = performance.now();

        const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);

            setCounters({
                speed: Math.round(targets.speed * eased),
                uptime: Math.round(targets.uptime * eased * 10) / 10,
                users: Math.round(targets.users * eased)
            });

            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    };

    const features = [
        {
            title: 'Smart AI Build',
            desc: 'Our AI understands you and builds what you want in seconds.',
            tag: 'SMART',
            icon: <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
        },
        {
            title: 'Fast Deploy',
            desc: 'Get online instantly. One click and you are live.',
            tag: 'SPEED',
            icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        },
        {
            title: 'Secure & Safe',
            desc: 'Your data is locked. Best security for your work.',
            tag: 'SAFE',
            icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        },
        {
            title: 'All Devices',
            desc: 'Works on phone, tablet, and computer.',
            tag: 'DEVICES',
            icon: <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        },
        {
            title: 'Team Work',
            desc: 'Build together with your team in real-time.',
            tag: 'COLLAB',
            icon: <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8zm14 14v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        }
    ];

    return (
        <section ref={sectionRef} id="features" className="section" style={{ background: '#fafafa' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="glass-pill shimmer" style={{ marginBottom: '1rem' }}>Features</div>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.75rem' }}>
                        Everything you <span className="text-gradient">Need</span>.
                    </h2>
                    <p style={{ fontSize: '0.95rem', color: 'var(--secondary)', maxWidth: '400px', margin: '0 auto', fontWeight: 500 }}>
                        Simple tools for big ideas.
                    </p>
                </div>

                <div ref={gridRef} className="bento-grid">
                    {/* Primary Card */}
                    <TiltCard className="bento-item feature-card-primary" style={{ gridColumn: 'span var(--primary-span, 2)', gridRow: 'span 2' }}>
                        <div className="card-glow" />
                        <div style={{ marginBottom: 'auto', position: 'relative', zIndex: 10 }}>
                            <div className="glass-pill" style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', fontSize: '0.6rem' }}>{features[0].tag}</div>
                        </div>
                        <div style={{ marginTop: '1.5rem', position: 'relative', zIndex: 10 }}>
                            <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.75rem)', fontWeight: 700, color: 'white', marginBottom: '0.75rem' }}>{features[0].title}</h3>
                            <p style={{ fontSize: '0.9rem', opacity: 0.7, lineHeight: 1.5, marginBottom: '1.5rem' }}>{features[0].desc}</p>

                            <div className="counter-trigger" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                                <div className="mini-stat">
                                    <div className="mini-stat-value">{counters.speed}x</div>
                                    <div className="mini-stat-label">Faster</div>
                                </div>
                                <div className="mini-stat">
                                    <div className="mini-stat-value">{counters.uptime}%</div>
                                    <div className="mini-stat-label">Uptime</div>
                                </div>
                                <div className="mini-stat">
                                    <div className="mini-stat-value">{counters.users}K+</div>
                                    <div className="mini-stat-label">Users</div>
                                </div>
                            </div>
                        </div>

                        <div className="floating-shapes">
                            <div className="shape shape-1" />
                            <div className="shape shape-2" />
                        </div>
                    </TiltCard>

                    {features.slice(1).map((feature, i) => (
                        <TiltCard
                            key={feature.title}
                            className={`bento-item feature-card card-variant-${i}`}
                            style={{
                                gridColumn: i === 3 ? 'span var(--special-span, 2)' : 'span 1',
                            }}
                            delay={(i + 1) * 0.1}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{feature.title}</h3>
                                <div className="icon-wrapper">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{feature.icon}</svg>
                                </div>
                            </div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--secondary)', marginTop: '0.75rem', fontWeight: 500, lineHeight: 1.5 }}>{feature.desc}</p>
                        </TiltCard>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .shimmer {
                    position: relative;
                    overflow: hidden;
                    font-size: 0.65rem;
                }
                .shimmer {
                    position: relative;
                    overflow: hidden;
                    font-size: 0.65rem;
                }
                .shimmer::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    animation: shimmer 3s infinite;
                }
                @keyframes shimmer {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
                
                .text-gradient {
                    background: var(--accent-gradient);
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

                .bento-grid {
                    --primary-span: 2;
                    --special-span: 2;
                }
                
                @media (max-width: 1024px) {
                    .bento-grid {
                        --primary-span: 2;
                        --special-span: 2;
                    }
                }
                
                @media (max-width: 640px) {
                    .bento-grid {
                        --primary-span: 1;
                        --special-span: 1;
                    }
                }

                .bento-item {
                    opacity: 0;
                    transform: translateY(30px);
                    background: white;
                    border: 1px solid rgba(0,0,0,0.06);
                    border-radius: 20px;
                    padding: 2.25rem;
                    display: flex;
                    flex-direction: column;
                    transition: all 0.7s var(--bezier-cinematic);
                    position: relative;
                    overflow: hidden;
                }

                .bento-item.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .feature-card-primary {
                    background: var(--foreground);
                    color: white;
                }
                
                .card-glow {
                    position: absolute;
                    top: 50%; left: 50%;
                    width: 150%; height: 150%;
                    background: radial-gradient(circle, var(--primary), transparent 50%);
                    opacity: 0.08;
                    animation: glow-pulse 4s ease-in-out infinite;
                    transform: translate(-50%, -50%);
                }
                @keyframes glow-pulse {
                    0%, 100% { opacity: 0.05; transform: translate(-50%, -50%) scale(1); }
                    50% { opacity: 0.1; transform: translate(-50%, -50%) scale(1.05); }
                }
                
                .floating-shapes .shape {
                    position: absolute;
                    border-radius: 50%;
                    background: linear-gradient(135deg, var(--accent-solar), var(--primary));
                    opacity: 0.08;
                }
                .shape-1 { width: 60px; height: 60px; top: 15%; right: 10%; animation: float-1 8s ease-in-out infinite; }
                .shape-2 { width: 40px; height: 40px; bottom: 25%; right: 25%; animation: float-2 6s ease-in-out infinite; }
                
                @keyframes float-1 { 0%, 100% { transform: translate(0, 0) rotate(0deg); } 50% { transform: translate(-15px, 15px) rotate(180deg); } }
                @keyframes float-2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(10px, -10px) scale(1.1); } }
                
                .mini-stat {
                    text-align: center;
                    padding: 0.75rem;
                    background: rgba(255,255,255,0.05);
                    border-radius: 12px;
                    border: 1px solid rgba(255,255,255,0.08);
                }
                .mini-stat-value { font-size: 1rem; font-weight: 800; color: white; }
                .mini-stat-label { font-size: 0.55rem; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.5; margin-top: 0.15rem; }
                
                .icon-wrapper {
                    width: 36px; height: 36px;
                    border-radius: 12px;
                    background: #f1f5f9;
                    display: flex; align-items: center; justify-content: center;
                    color: var(--primary);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .feature-card-primary .icon-wrapper { background: rgba(255,255,255,0.1); color: white; }
                
                .bento-item:hover .icon-wrapper {
                    background: var(--primary);
                    color: white;
                    transform: rotate(5deg) scale(1.1);
                }
                .feature-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.06);
                    border-color: rgba(110, 56, 255, 0.2);
                }
            `}</style>
        </section>
    );
}

