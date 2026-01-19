'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const posts = [
        { title: 'The Future of AI Agents', date: 'Jan 15, 2026' },
        { title: 'Building Scalable Apps', date: 'Jan 10, 2026' },
        { title: 'New Nebula Features', date: 'Jan 05, 2026' },
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
                    }}>Blog</h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.2rem', marginBottom: '4rem' }}>
                        Updates, tutorials, and insights from the Prime Engine team.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px' }}>
                        {posts.map((post, i) => (
                            <div key={i} className="card glass-premium" style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? 'translateY(0)' : 'translateY(10px)',
                                transition: `all 0.6s ease ${i * 0.1}s`,
                                padding: '2rem',
                                cursor: 'pointer'
                            }}>
                                <span style={{ color: '#9F0FFF', fontSize: '0.85rem', fontWeight: 600 }}>{post.date}</span>
                                <h3 style={{ marginTop: '0.5rem', color: 'var(--foreground)', fontWeight: 800 }}>{post.title}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
