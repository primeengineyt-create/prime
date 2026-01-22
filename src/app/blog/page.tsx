'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogPosts } from '@/lib/blog-data';

export default function BlogPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />

            <section style={{
                paddingTop: 'calc(var(--nav-height) + 6rem)',
                paddingBottom: '8rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative Elements */}
                <div style={{
                    position: 'absolute', top: '10%', right: '0%',
                    width: '600px', height: '600px',
                    background: 'radial-gradient(circle, rgba(159, 15, 255, 0.05) 0%, transparent 70%)',
                    filter: 'blur(100px)', pointerEvents: 'none'
                }} />

                <div className="container">
                    <div style={{ maxWidth: '800px', marginBottom: '5rem' }}>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                            background: 'var(--accent-gradient)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '1.5rem',
                            fontWeight: 900,
                            letterSpacing: '-0.05em',
                            opacity: mounted ? 1 : 0,
                            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
                        }}>
                            Pulse of Nebula
                        </h1>
                        <p style={{
                            color: 'var(--secondary)',
                            fontSize: '1.25rem',
                            lineHeight: 1.6,
                            opacity: mounted ? 1 : 0,
                            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.1s',
                        }}>
                            Insights, tutorials, and engineering breakthroughs from the team building the future of autonomous software creation.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {blogPosts.map((post, i) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="card glass-premium glass-hover-zone"
                                style={{
                                    opacity: mounted ? 1 : 0,
                                    transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                                    transition: `all 0.8s cubic-bezier(0.19, 1, 0.22, 1) ${0.2 + i * 0.1}s`,
                                    padding: '2.5rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '1.5rem',
                                    textDecoration: 'none'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{
                                        color: '#9F0FFF',
                                        fontSize: '0.8rem',
                                        fontWeight: 800,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.1em'
                                    }}>
                                        {post.category}
                                    </span>
                                    <span style={{ color: 'var(--secondary)', fontSize: '0.85rem' }}>{post.date}</span>
                                </div>

                                <div>
                                    <h3 style={{
                                        fontSize: '1.5rem',
                                        marginBottom: '1rem',
                                        color: 'var(--foreground)',
                                        fontWeight: 800,
                                        lineHeight: 1.3
                                    }}>
                                        {post.title}
                                    </h3>
                                    <p style={{
                                        color: 'var(--secondary)',
                                        fontSize: '1rem',
                                        lineHeight: 1.6,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div style={{
                                    marginTop: 'auto',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    paddingTop: '1.5rem',
                                    borderTop: '1px solid rgba(0,0,0,0.03)'
                                }}>
                                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-gradient)' }} />
                                    <span style={{ fontSize: '0.9rem', color: 'var(--foreground)', fontWeight: 600 }}>{post.author}</span>
                                    <span style={{ marginLeft: 'auto', color: '#9F0FFF', fontSize: '0.85rem', fontWeight: 700 }}>Read More →</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
