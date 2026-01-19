'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CommunityPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const channels = [
        { name: 'Discord', members: '25K+', desc: 'Real-time chat and support.' },
        { name: 'GitHub', members: '10K Stars', desc: 'Open source contributions.' },
        { name: 'Twitter', members: '50K+', desc: 'Latest updates and news.' },
    ];

    return (
        <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />
            <section style={{ paddingTop: 'calc(var(--nav-height) + 6rem)', paddingBottom: '6rem' }}>
                <div className="container">
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        background: 'var(--accent-gradient)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1rem',
                        fontWeight: 900,
                    }}>Community</h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.2rem', marginBottom: '4rem' }}>
                        Join thousands of developers building with Prime Engine.
                    </p>

                    <div className="grid-3">
                        {channels.map((ch, i) => (
                            <div key={i} className="card glass-premium" style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? 'translateY(0)' : 'translateY(10px)',
                                transition: `all 0.6s ease ${i * 0.1}s`,
                                padding: '2.5rem',
                                textAlign: 'center'
                            }}>
                                <h3 style={{ color: 'var(--foreground)', fontWeight: 800, marginBottom: '0.5rem' }}>{ch.name}</h3>
                                <div style={{ color: '#9F0FFF', fontWeight: 700, marginBottom: '1rem' }}>{ch.members} members</div>
                                <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>{ch.desc}</p>
                                <button className="btn btn-secondary" style={{ width: '100%' }}>Join Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
