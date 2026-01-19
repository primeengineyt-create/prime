'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const team = [
        { name: 'Alex Chen', role: 'CEO & Co-Founder', color: '#FF4D00' },
        { name: 'Sarah Miller', role: 'CTO & Co-Founder', color: '#9F0FFF' },
        { name: 'James Wilson', role: 'Head of AI', color: '#6E38FF' },
        { name: 'Emily Zhang', role: 'Head of Design', color: '#C06AFF' },
    ];

    const stats = [
        { value: '50K+', label: 'Developers' },
        { value: '10M+', label: 'Apps Built' },
        { value: '99.99%', label: 'Uptime' },
        { value: '150+', label: 'Countries' },
    ];

    const values = [
        { title: 'Innovation First', desc: 'We push the boundaries of what\'s possible with AI.', color: '#FF4D00' },
        { title: 'User Obsessed', desc: 'Every decision starts with our users\' needs.', color: '#9F0FFF' },
        { title: 'Open & Transparent', desc: 'No lock-in. Your code, your data, your IP.', color: '#6E38FF' },
        { title: 'Global Impact', desc: 'Making software creation accessible to everyone.', color: '#C06AFF' },
    ];

    return (
        <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />

            {/* Hero */}
            <section style={{
                paddingTop: 'calc(var(--nav-height) + 6rem)',
                paddingBottom: '6rem',
                position: 'relative',
                overflow: 'hidden',
            }}>
                <div style={{
                    position: 'absolute', top: '20%', left: '10%',
                    width: '400px', height: '400px',
                    background: 'radial-gradient(circle, rgba(110, 56, 255, 0.08) 0%, transparent 70%)',
                    filter: 'blur(80px)', pointerEvents: 'none',
                    animation: 'float 15s ease-in-out infinite'
                }} />

                <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                        background: 'var(--accent-gradient)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1.5rem',
                        fontWeight: 900,
                        letterSpacing: '-0.05em',
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
                    }}>
                        Building the Future of<br />Software Creation
                    </h1>
                    <p style={{
                        fontSize: '1.25rem', color: 'var(--secondary)',
                        maxWidth: '700px', margin: '0 auto',
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.1s',
                    }}>
                        Empowering a new generation of creators to build without limits using Nebula Intelligence.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section style={{ padding: '5rem 0', background: 'rgba(8, 8, 25, 0.4)', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '3rem', textAlign: 'center',
                    }}>
                        {stats.map((stat, i) => (
                            <div key={i} style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                                transition: `all 0.6s cubic-bezier(0.19, 1, 0.22, 1) ${i * 0.15}s`,
                            }}>
                                <div style={{
                                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900,
                                    background: 'var(--accent-gradient)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    letterSpacing: '-0.02em',
                                    marginBottom: '0.5rem'
                                }}>
                                    {stat.value}
                                </div>
                                <div style={{ color: 'var(--secondary)', fontSize: '1rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Core Principles</h2>
                    <div className="grid-2" style={{ maxWidth: '1000px', margin: '4rem auto 0' }}>
                        {values.map((value, i) => (
                            <div key={i} className="card glass-premium glass-hover-zone" style={{
                                display: 'flex', gap: '2rem', alignItems: 'center', padding: '2.5rem'
                            }}>
                                <div style={{
                                    width: '64px', height: '64px', minWidth: '64px',
                                    background: `radial-gradient(circle at 30% 30%, ${value.color}33, transparent 70%)`,
                                    borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: `1px solid ${value.color}30`
                                }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" fill={value.color} />
                                    </svg>
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: '0.5rem', fontWeight: 800, fontSize: '1.25rem' }}>{value.title}</h3>
                                    <p style={{ color: 'var(--secondary)', lineHeight: 1.7, fontSize: '1rem' }}>{value.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section" style={{ background: 'rgba(8, 8, 25, 0.4)' }}>
                <div className="container">
                    <h2 className="section-title">The Innovators</h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: '2.5rem', maxWidth: '1100px', margin: '4rem auto 0',
                    }}>
                        {team.map((member, i) => (
                            <div key={i} className="card glass-premium glass-hover-zone" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
                                <div style={{
                                    width: '80px', height: '80px', margin: '0 auto 1.5rem',
                                    background: `linear-gradient(135deg, ${member.color}22, ${member.color}11)`,
                                    borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: `1px solid ${member.color}20`, position: 'relative'
                                }}>
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" fill={member.color} />
                                    </svg>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', fontWeight: 800 }}>{member.name}</h3>
                                <p style={{ color: 'var(--secondary)', fontSize: '0.95rem', fontWeight: 600 }}>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '2rem', fontWeight: 900 }}>Ready to Build the Future?</h2>
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/pricing" className="btn btn-primary" style={{ padding: '1.25rem 3rem', borderRadius: '1.25rem' }}>Start Building Now</a>
                        <a href="#" className="btn btn-secondary" style={{ padding: '1.25rem 3rem', borderRadius: '1.25rem' }}>Explore Careers</a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
