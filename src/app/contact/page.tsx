'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
    const [mounted, setMounted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => setMounted(true), []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 2000);
    };

    const contactMethods = [
        { title: 'Email', value: 'hello@primeengine.in', link: 'mailto:hello@primeengine.in', color: '#FF4D00' },
        { title: 'Live Chat', value: 'Available 24/7', link: '#', color: '#9F0FFF' },
        { title: 'Twitter', value: '@PrimeEngineIn', link: '#', color: '#6E38FF' },
    ];

    return (
        <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />

            <section style={{ paddingTop: 'calc(var(--nav-height) + 6rem)', paddingBottom: '6rem' }}>
                <div className="container">
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                            background: 'var(--accent-gradient)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '1rem',
                            fontWeight: 900,
                            letterSpacing: '-0.05em',
                        }}>
                            Get in Touch
                        </h1>
                        <p style={{ color: 'var(--secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                            Have a question or want to explore Nebula Intelligence? Our team is here to help you build the future.
                        </p>
                    </div>

                    {/* Contact Methods */}
                    <div className="grid-3" style={{ maxWidth: '1000px', margin: '0 auto 5rem', gap: '2rem' }}>
                        {contactMethods.map((method, i) => (
                            <a
                                key={i}
                                href={method.link}
                                className="card glass-premium glass-hover-zone"
                                style={{
                                    textAlign: 'center', padding: '3rem 2rem',
                                    opacity: mounted ? 1 : 0,
                                    transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                                    transition: `all 0.6s cubic-bezier(0.19, 1, 0.22, 1) ${i * 0.1}s`,
                                    textDecoration: 'none',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '1rem'
                                }}
                            >
                                <div style={{
                                    width: '64px', height: '64px',
                                    background: `radial-gradient(circle at 30% 30%, ${method.color}22, transparent 70%)`,
                                    borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: `1px solid ${method.color}20`,
                                    marginBottom: '0.5rem'
                                }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" fill={method.color} />
                                    </svg>
                                </div>
                                <h3 style={{ marginBottom: '0.25rem', color: 'white', fontWeight: 800, fontSize: '1.25rem' }}>{method.title}</h3>
                                <p style={{ color: 'var(--secondary)', fontWeight: 500 }}>{method.value}</p>
                            </a>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="card glass-premium" style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 3.5rem' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
                            Send us a Message
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="grid-2" style={{ marginBottom: '1.5rem', gap: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Your name"
                                        required
                                        style={{
                                            width: '100%', padding: '1.1rem', borderRadius: '1rem',
                                            background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)',
                                            color: 'var(--foreground)', fontSize: '1rem', outline: 'none',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        className="form-input"
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="you@example.com"
                                        required
                                        style={{
                                            width: '100%', padding: '1.1rem', borderRadius: '1rem',
                                            background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)',
                                            color: 'var(--foreground)', fontSize: '1rem', outline: 'none',
                                            transition: 'border-color 0.3s ease'
                                        }}
                                        className="form-input"
                                    />
                                </div>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    placeholder="How can we help?"
                                    required
                                    style={{
                                        width: '100%', padding: '1.1rem', borderRadius: '1rem',
                                        background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)',
                                        color: 'var(--foreground)', fontSize: '1rem', outline: 'none',
                                        transition: 'border-color 0.3s ease'
                                    }}
                                    className="form-input"
                                />
                            </div>
                            <div style={{ marginBottom: '2.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.9rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    Message
                                </label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    placeholder="Tell us more about your project..."
                                    rows={5}
                                    required
                                    style={{
                                        width: '100%', padding: '1.1rem', borderRadius: '1rem',
                                        background: 'rgba(255,255,255,0.03)', border: '1px solid var(--card-border)',
                                        color: 'var(--foreground)', fontSize: '1rem', outline: 'none',
                                        resize: 'vertical', fontFamily: 'inherit',
                                        transition: 'border-color 0.3s ease'
                                    }}
                                    className="form-input"
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', borderRadius: '1rem', fontWeight: 800 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? '⏳ Sending...' : '🚀 Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
