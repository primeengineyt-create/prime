'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DocsPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const categories = [
        { title: 'Getting Started', items: ['Introduction', 'Installation', 'Quick Start Guide'] },
        { title: 'Core Concepts', items: ['Nebula Intelligence', 'Agent Orchestration', 'Security'] },
        { title: 'API Reference', items: ['Authentication', 'Endpoints', 'Rate Limits'] },
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
                    }}>Documentation</h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.2rem', marginBottom: '4rem' }}>
                        Learn how to build and scale your applications with Prime Engine.
                    </p>

                    <div className="grid-3">
                        {categories.map((cat, i) => (
                            <div key={i} className="card glass-premium" style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? 'translateY(0)' : 'translateY(10px)',
                                transition: `all 0.6s ease ${i * 0.1}s`,
                                padding: '2.5rem'
                            }}>
                                <h3 style={{ marginBottom: '1.5rem', color: 'var(--foreground)', fontWeight: 800 }}>{cat.title}</h3>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    {cat.items.map((item, j) => (
                                        <li key={j}>
                                            <a href="#" style={{ color: 'var(--secondary)', textDecoration: 'none', transition: 'color 0.2s' }}>
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
