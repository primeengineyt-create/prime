'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TemplatesPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const templates = [
        { name: 'SaaS Dashboard', cat: 'Admin' },
        { name: 'E-commerce Store', cat: 'Retail' },
        { name: 'AI Chatbot', cat: 'Assistant' },
        { name: 'Social Feed', cat: 'Social' },
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
                    }}>Templates</h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.2rem', marginBottom: '4rem' }}>
                        Start your next project with pre-built production-ready templates.
                    </p>

                    <div className="grid-2">
                        {templates.map((template, i) => (
                            <div key={i} className="card glass-premium" style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? 'translateY(0)' : 'translateY(10px)',
                                transition: `all 0.6s ease ${i * 0.1}s`,
                                padding: '2.5rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <h3 style={{ marginBottom: '0.25rem', color: 'var(--foreground)', fontWeight: 800 }}>{template.name}</h3>
                                    <span style={{ color: '#9F0FFF', fontSize: '0.9rem', fontWeight: 600 }}>{template.cat}</span>
                                </div>
                                <button className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem' }}>Use Template</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
