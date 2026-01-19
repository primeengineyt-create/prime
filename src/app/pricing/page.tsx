'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PricingPage() {
    const [isAnnual, setIsAnnual] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const plans = [
        {
            name: 'Starter',
            desc: 'Perfect for side projects and learning',
            price: { monthly: 0, annual: 0 },
            features: [
                '3 Projects',
                '1,000 AI generations/month',
                'Community support',
                'Basic templates',
                'Subdomain hosting',
            ],
            cta: 'Start Free',
            popular: false,
            color: '#A3A3C2',
        },
        {
            name: 'Pro',
            desc: 'For professionals and growing teams',
            price: { monthly: 29, annual: 24 },
            features: [
                'Unlimited Projects',
                '50,000 AI generations/month',
                'Priority support',
                'All templates',
                'Custom domain',
                'Team collaboration (5 seats)',
                'API access',
                'Analytics dashboard',
            ],
            cta: 'Start Pro Trial',
            popular: true,
            color: '#9F0FFF',
        },
        {
            name: 'Enterprise',
            desc: 'For large teams and organizations',
            price: { monthly: 99, annual: 79 },
            features: [
                'Everything in Pro',
                'Unlimited AI generations',
                'Dedicated support',
                'Custom integrations',
                'SSO & SAML',
                'Unlimited team seats',
                'SLA guarantee',
                'On-premise option',
                'Custom training',
            ],
            cta: 'Contact Sales',
            popular: false,
            color: '#FF4D00',
        },
    ];

    return (
        <main style={{ minHeight: '100vh', background: 'var(--background)' }}>
            <Navbar />

            <section style={{ paddingTop: 'calc(var(--nav-height) + 6rem)', paddingBottom: '12rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.1,
                        backgroundImage: 'url("/pricing_cards_nebula_toggled_1768641052036.png")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'grayscale(1) brightness(1.2)',
                    }} />
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: 0.05,
                        backgroundImage: 'url("/technical_blueprint_mesh_1768645608388.png")',
                        backgroundSize: '200px',
                        backgroundRepeat: 'repeat',
                    }} />
                </div>
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.6rem 1.25rem', background: 'rgba(110, 56, 255, 0.1)',
                            border: '1px solid rgba(110, 56, 255, 0.2)', borderRadius: '50px',
                            fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary-light)',
                            marginBottom: '1.5rem',
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
                            </svg>
                            Simple, Transparent Pricing
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(3rem, 10vw, 6rem)',
                            color: '#0f172a',
                            marginBottom: '1rem',
                            fontWeight: 900,
                            letterSpacing: '-0.06em',
                            lineHeight: 0.9
                        }}>
                            Ready to scale?
                        </h1>
                        <p style={{ color: 'var(--secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                            Start free and scale as you grow. No hidden fees. Transform your ideas into production-ready apps with Nebula Intelligence.
                        </p>

                        {/* Toggle */}
                        <div style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            gap: '1rem', marginTop: '2.5rem',
                        }}>
                            <span style={{ color: !isAnnual ? 'var(--foreground)' : 'var(--secondary)', fontWeight: 600 }}>Monthly</span>
                            <button
                                onClick={() => setIsAnnual(!isAnnual)}
                                style={{
                                    width: '64px', height: '34px', borderRadius: '17px',
                                    background: isAnnual ? 'var(--nebula-purple)' : 'rgba(0,0,0,0.04)',
                                    border: '1px solid rgba(0,0,0,0.08)', cursor: 'pointer', position: 'relative',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                            >
                                <div style={{
                                    width: '26px', height: '26px', borderRadius: '50%',
                                    background: 'white', position: 'absolute', top: '3px',
                                    left: isAnnual ? '34px' : '3px',
                                    transition: 'all 0.3s cubic-bezier(0.19, 1, 0.22, 1)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                                }} />
                            </button>
                            <span style={{ color: isAnnual ? 'var(--foreground)' : 'var(--secondary)', fontWeight: 600 }}>
                                Annual <span style={{ color: 'var(--primary-light)' }}>(-20%)</span>
                            </span>
                        </div>
                    </div>

                    {/* Pricing Cards */}
                    <div className="grid-3" style={{ maxWidth: '1200px', margin: '0 auto', gap: '2rem' }}>
                        {plans.map((plan, i) => (
                            <div
                                key={i}
                                className="card glass-premium glass-hover-zone"
                                style={{
                                    padding: '3rem 2.5rem',
                                    position: 'relative',
                                    opacity: mounted ? 1 : 0,
                                    transform: mounted ? 'translateY(0)' : 'translateY(10px)',
                                    transition: `all 0.8s cubic-bezier(0.19, 1, 0.22, 1) ${i * 0.1}s`,
                                    border: plan.popular ? '1px solid #7c3aed' : '1px solid var(--card-border)',
                                    background: plan.popular ? 'rgba(124, 58, 237, 0.02)' : 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: plan.popular ? '0 30px 60px -12px rgba(124, 58, 237, 0.08)' : '0 10px 30px rgba(0,0,0,0.02)',
                                }}
                            >
                                {plan.popular && (
                                    <div style={{
                                        position: 'absolute', top: '-14px', left: '50%',
                                        transform: 'translateX(-50%)',
                                        background: 'var(--accent-gradient)', color: 'white',
                                        padding: '0.5rem 1.5rem', borderRadius: '50px',
                                        fontSize: '0.8rem', fontWeight: 800,
                                        boxShadow: '0 4px 20px rgba(110, 56, 255, 0.5)',
                                        letterSpacing: '0.05em',
                                        zIndex: 10,
                                        whiteSpace: 'nowrap'
                                    }}>
                                        ⭐ RECOMMENDED
                                    </div>
                                )}

                                <div style={{ marginBottom: '2rem' }}>
                                    <h3 style={{
                                        fontSize: '2rem',
                                        marginBottom: '0.5rem',
                                        fontWeight: 900,
                                        color: '#0f172a',
                                        letterSpacing: '-0.04em'
                                    }}>
                                        {plan.name}
                                    </h3>
                                    <p style={{ color: 'var(--secondary)', fontSize: '0.95rem' }}>
                                        {plan.desc}
                                    </p>
                                </div>

                                <div style={{ marginBottom: '2.5rem' }}>
                                    <span style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
                                        ${isAnnual ? plan.price.annual : plan.price.monthly}
                                    </span>
                                    <span style={{ color: 'var(--secondary)', fontSize: '1.1rem', marginLeft: '0.5rem' }}>/month</span>
                                </div>

                                <Link
                                    href="/signup"
                                    className={plan.popular ? 'btn btn-primary' : 'btn btn-secondary'}
                                    style={{ width: '100%', marginBottom: '2.5rem', padding: '1.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', textDecoration: 'none' }}
                                >
                                    {plan.cta}
                                </Link>

                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: 'auto' }}>
                                    {plan.features.map((feature, j) => (
                                        <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', fontSize: '0.95rem', color: 'var(--foreground)' }}>
                                            <div style={{
                                                width: '20px', height: '20px', background: 'rgba(34, 197, 94, 0.1)',
                                                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                border: '1px solid rgba(34, 197, 94, 0.2)'
                                            }}>
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* FAQ Teaser */}
                    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                        <p style={{ color: 'var(--secondary)', fontSize: '1.1rem' }}>
                            Have questions? <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>Check our FAQ</a> or <a href="#" style={{ color: 'var(--primary)', fontWeight: 600 }}>contact us</a>
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
