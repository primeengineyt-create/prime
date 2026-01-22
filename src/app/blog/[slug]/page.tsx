'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { blogPosts, BlogPost } from '@/lib/blog-data';

export default function BlogPostPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const foundPost = blogPosts.find(p => p.slug === slug);
        if (foundPost) {
            setPost(foundPost);
        } else if (mounted) {
            router.push('/blog');
        }
    }, [slug, router, mounted]);

    if (!post) return null;

    return (
        <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />

            {/* Hero Section */}
            <section style={{
                paddingTop: 'calc(var(--nav-height) + 6rem)',
                paddingBottom: '4rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container">
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            alignItems: 'center',
                            marginBottom: '2rem',
                            opacity: mounted ? 1 : 0,
                            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.6s ease'
                        }}>
                            <span style={{
                                padding: '0.4rem 1rem',
                                background: 'rgba(159, 15, 255, 0.1)',
                                border: '1px solid rgba(159, 15, 255, 0.2)',
                                borderRadius: '100px',
                                color: '#9F0FFF',
                                fontSize: '0.85rem',
                                fontWeight: 700
                            }}>
                                {post.category}
                            </span>
                            <span style={{ color: 'var(--secondary)', fontSize: '0.9rem' }}>
                                {post.date} • {post.readingTime}
                            </span>
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            lineHeight: 1.1,
                            fontWeight: 900,
                            letterSpacing: '-0.04em',
                            marginBottom: '2rem',
                            color: 'var(--foreground)',
                            opacity: mounted ? 1 : 0,
                            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.6s ease 0.1s'
                        }}>
                            {post.title}
                        </h1>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            opacity: mounted ? 1 : 0,
                            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.6s ease 0.2s'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'var(--accent-gradient)',
                                border: '2px solid white'
                            }} />
                            <div>
                                <div style={{ fontSize: '1rem', fontWeight: 700 }}>{post.author}</div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--secondary)' }}>Prime Engine Team</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section style={{ paddingBottom: '8rem' }}>
                <div className="container">
                    <article className="card glass-premium" style={{
                        maxWidth: '800px',
                        margin: '0 auto',
                        padding: '4rem',
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.3s'
                    }}>
                        <div className="blog-content" style={{
                            color: 'var(--secondary)',
                            lineHeight: 1.8,
                            fontSize: '1.1rem'
                        }}>
                            {/* Simple markdown-ish renderer logic for this demo */}
                            {post.content.split('\n').map((line, i) => {
                                if (line.startsWith('# ')) {
                                    return <h1 key={i} style={{ color: 'var(--foreground)', marginTop: '2rem', marginBottom: '1.5rem', fontWeight: 800 }}>{line.replace('# ', '')}</h1>
                                }
                                if (line.startsWith('## ')) {
                                    return <h2 key={i} style={{ color: 'var(--foreground)', marginTop: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>{line.replace('## ', '')}</h2>
                                }
                                if (line.startsWith('### ')) {
                                    return <h3 key={i} style={{ color: 'var(--foreground)', marginTop: '2rem', marginBottom: '0.75rem', fontWeight: 800 }}>{line.replace('### ', '')}</h3>
                                }
                                if (line.startsWith('* ') || line.startsWith('1. ')) {
                                    return <li key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem' }}>{line.replace(/^\d\. |^\* /, '')}</li>
                                }
                                if (line.trim() === '') return <br key={i} />
                                return <p key={i} style={{ marginBottom: '1.25rem' }}>{line}</p>
                            })}
                        </div>
                    </article>
                </div>
            </section>

            <Footer />

            <style jsx>{`
                .blog-content p {
                    margin-bottom: 1.5rem;
                }
                .blog-content h2, .blog-content h3 {
                    color: var(--foreground);
                    letter-spacing: -0.02em;
                }
            `}</style>
        </main>
    );
}
