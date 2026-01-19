'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TiltCard from '@/components/TiltCard';

export default function Pricing() {
    const [isYearly, setIsYearly] = useState(true);

    const plans = [
        {
            name: 'Starter',
            price: isYearly ? '0' : '0',
            desc: 'For people building their first idea.',
            features: ['5 AI Agents', 'Standard Speed', 'Basic Help'],
            cta: 'Start Free',
            popular: false
        },
        {
            name: 'Pro',
            price: isYearly ? '199' : '249',
            desc: 'For creators who need more power.',
            features: ['Unlimited Agents', 'Fast Speed', 'Priority Support', 'Custom Training'],
            cta: 'Go Pro',
            popular: true
        },
        {
            name: 'Team',
            price: 'Custom',
            desc: 'For big teams and projects.',
            features: ['Private Server', 'Personal Helper', 'Unlimited Power'],
            cta: 'Talk to Us',
            popular: false
        }
    ];

    return (
        <section id="pricing" className="section" style={{ background: 'var(--background)', padding: '6rem 0' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <div className="glass-pill shimmer" style={{ marginBottom: '1rem', display: 'inline-block' }}>Pricing</div>
                    <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '1.5rem', color: 'var(--foreground)' }}>
                        Plans for <span className="gradient-text-animated">Everyone</span>.
                    </h2>

                    <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(0,0,0,0.03)', padding: '0.3rem', borderRadius: '100px', gap: '0.25rem' }}>
                        <button
                            onClick={() => setIsYearly(false)}
                            style={{ padding: '0.6rem 1.25rem', borderRadius: '100px', border: 'none', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', background: !isYearly ? 'white' : 'transparent', color: !isYearly ? 'var(--foreground)' : 'var(--secondary)', boxShadow: !isYearly ? '0 2px 8px rgba(0,0,0,0.04)' : 'none' }}
                        >Monthly</button>
                        <button
                            onClick={() => setIsYearly(true)}
                            style={{ padding: '0.6rem 1.25rem', borderRadius: '100px', border: 'none', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', background: isYearly ? 'white' : 'transparent', color: isYearly ? 'var(--foreground)' : 'var(--secondary)', boxShadow: isYearly ? '0 2px 8px rgba(0,0,0,0.04)' : 'none' }}
                        >Yearly <span style={{ color: 'var(--primary)', fontSize: '0.7rem', marginLeft: '4px' }}>-20%</span></button>
                    </div>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
                    {plans.map((plan, i) => (
                        <TiltCard
                            key={plan.name}
                            delay={i * 0.1}
                            style={{
                                padding: '2.5rem',
                                background: plan.popular ? 'var(--foreground)' : 'white',
                                color: plan.popular ? 'white' : 'var(--foreground)',
                                borderRadius: '24px',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                                boxShadow: plan.popular ? '0 25px 50px -12px rgba(0,0,0,0.25)' : '0 10px 30px -5px rgba(0,0,0,0.05)',
                                border: plan.popular ? 'none' : '1px solid rgba(0,0,0,0.05)',
                                height: '100%'
                            }}
                        >
                            {plan.popular && (
                                <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
                                    <div className="glass-pill" style={{ background: 'var(--primary)', color: 'white', border: 'none', fontSize: '0.65rem', padding: '0.4rem 0.85rem', fontWeight: 700 }}>POPULAR</div>
                                </div>
                            )}

                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>{plan.name}</h3>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>{plan.price === 'Custom' ? '' : '$'}{plan.price}</span>
                                {plan.price !== 'Custom' && <span style={{ opacity: 0.6, fontWeight: 500, fontSize: '0.95rem' }}>/mo</span>}
                            </div>
                            <p style={{ fontSize: '0.95rem', opacity: 0.7, fontWeight: 500, lineHeight: 1.5, marginBottom: '2rem' }}>{plan.desc}</p>

                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                                {plan.features.map(f => (
                                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 500, fontSize: '0.9rem' }}>
                                        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: plan.popular ? 'rgba(255,255,255,0.2)' : 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={plan.popular ? 'white' : 'var(--primary)'} strokeWidth="4">
                                                <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Link href={plan.name === 'Team' ? '/contact' : '/signup'} style={{ marginTop: 'auto', width: '100%' }}>
                                <button
                                    className="btn-billion"
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        background: plan.popular ? 'white' : 'var(--foreground)',
                                        color: plan.popular ? 'var(--foreground)' : 'white',
                                        border: 'none',
                                        padding: '0.85rem 1.5rem',
                                        fontSize: '0.95rem',
                                        boxShadow: plan.popular ? '0 10px 20px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    {plan.cta}
                                </button>
                            </Link>
                        </TiltCard>
                    ))}
                </div>
            </div>
            <style jsx>{`
                .shimmer {
                    position: relative;
                    overflow: hidden;
                }
                .shimmer::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    transform: translateX(-100%);
                    background-image: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0,
                        rgba(255, 255, 255, 0.2) 20%,
                        rgba(255, 255, 255, 0.5) 60%,
                        rgba(255, 255, 255, 0)
                    );
                    animation: shimmer 2s infinite;
                }
                
                @keyframes shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </section>
    );
}
