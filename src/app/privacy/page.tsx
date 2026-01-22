'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const sections = [
        {
            title: "1. Information We Collect",
            content: "We collect information you provide directly to us, such as when you create an account, use our services, or communicate with us. This may include your name, email address, and any other information you choose to provide."
        },
        {
            title: "2. How We Use Information",
            content: "We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect Prime Engine and our users."
        },
        {
            title: "3. Information Sharing",
            content: "We do not share your personal information with companies, organizations, or individuals outside of Prime Engine except in the following cases: with your consent, for external processing, or for legal reasons."
        },
        {
            title: "4. Data Security",
            content: "We work hard to protect Prime Engine and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold."
        },
        {
            title: "5. Your Privacy Rights",
            content: "You have the right to access, update, or delete your personal information at any time through your account settings or by contacting us directly."
        },
        {
            title: "6. Cookies",
            content: "We use cookies and similar technologies to provide and support our services and each of the uses outlined and described in this policy."
        }
    ];

    return (
        <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />

            {/* Header */}
            <section style={{
                paddingTop: 'calc(var(--nav-height) + 6rem)',
                paddingBottom: '4rem',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        background: 'var(--accent-gradient)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        marginBottom: '1rem',
                        fontWeight: 900,
                        letterSpacing: '-0.05em',
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.6s ease'
                    }}>
                        Privacy Policy
                    </h1>
                    <p style={{
                        color: 'var(--secondary)',
                        fontSize: '1.1rem',
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.6s ease 0.1s'
                    }}>
                        Last updated: January 22, 2026
                    </p>
                </div>
            </section>

            {/* Content */}
            <section style={{ paddingBottom: '8rem' }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <div className="card glass-premium" style={{
                        padding: '4rem 3.5rem',
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                        transition: 'all 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.2s'
                    }}>
                        {sections.map((section, i) => (
                            <div key={i} style={{ marginBottom: i === sections.length - 1 ? 0 : '3rem' }}>
                                <h2 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: 800,
                                    marginBottom: '1.25rem',
                                    color: 'var(--foreground)'
                                }}>
                                    {section.title}
                                </h2>
                                <p style={{
                                    color: 'var(--secondary)',
                                    lineHeight: 1.8,
                                    fontSize: '1.05rem'
                                }}>
                                    {section.content}
                                </p>
                            </div>
                        ))}

                        <div style={{
                            marginTop: '4rem',
                            paddingTop: '3rem',
                            borderTop: '1px solid var(--card-border)',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: 'var(--secondary)', marginBottom: '1.5rem' }}>
                                Have questions about our Privacy Policy?
                            </p>
                            <a href="/contact" className="btn btn-secondary" style={{ borderRadius: '1rem' }}>
                                Contact Legal Team
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
