'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing or using Prime Engine, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
        },
        {
            title: "2. Use License",
            content: "Permission is granted to temporarily download one copy of the materials (information or software) on Prime Engine's website for personal, non-commercial transitory viewing only."
        },
        {
            title: "3. Disclaimer",
            content: "The materials on Prime Engine's website are provided on an 'as is' basis. Prime Engine makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability."
        },
        {
            title: "4. Limitations",
            content: "In no event shall Prime Engine or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Prime Engine's website."
        },
        {
            title: "5. Accuracy of Materials",
            content: "The materials appearing on Prime Engine's website could include technical, typographical, or photographic errors. Prime Engine does not warrant that any of the materials on its website are accurate, complete or current."
        },
        {
            title: "6. Links",
            content: "Prime Engine has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Prime Engine of the site."
        },
        {
            title: "7. Governing Law",
            content: "These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location."
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
                        Terms & Conditions
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
                                Questions about our Terms of Service?
                            </p>
                            <a href="/contact" className="btn btn-secondary" style={{ borderRadius: '1rem' }}>
                                Contact Support
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
