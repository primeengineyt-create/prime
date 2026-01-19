'use client';
import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function FeaturesPage() {
    const [activeTab, setActiveTab] = useState(0);
    const [visibleSections, setVisibleSections] = useState<number[]>([]);

    const tabs = [
        { id: 'apps', label: 'App Builder', color: '#FF4D00' },
        { id: 'agents', label: 'AI Agents', color: '#9F0FFF' },
        { id: 'models', label: 'AI Models', color: '#6E38FF' },
    ];

    const features = {
        apps: [
            { title: 'Visual Drag & Drop', desc: 'Build interfaces by dragging components. No code needed.', color: '#FF4D00' },
            { title: 'Database Integration', desc: 'Connect to any database with visual query builders.', color: '#FF4D00' },
            { title: 'Real-time Preview', desc: 'See changes instantly as you build your application.', color: '#FF4D00' },
            { title: 'Responsive Design', desc: 'Automatically adapts to mobile, tablet, and desktop.', color: '#FF4D00' },
            { title: 'Component Library', desc: '500+ pre-built components ready to customize.', color: '#FF4D00' },
            { title: 'Version Control', desc: 'Built-in Git integration with visual diff viewer.', color: '#FF4D00' },
        ],
        agents: [
            { title: 'Multi-Step Reasoning', desc: 'Agents that think through complex problems step by step.', color: '#9F0FFF' },
            { title: 'Tool Integration', desc: 'Connect to APIs, databases, and external services.', color: '#9F0FFF' },
            { title: 'Memory & Context', desc: 'Long-term memory for personalized interactions.', color: '#9F0FFF' },
            { title: 'Autonomous Actions', desc: 'Agents that can browse, click, and interact with the web.', color: '#9F0FFF' },
            { title: 'Custom Personas', desc: 'Define personality, tone, and behavior patterns.', color: '#9F0FFF' },
            { title: 'Workflow Automation', desc: 'Chain agents together for complex workflows.', color: '#9F0FFF' },
        ],
        models: [
            { title: 'Fine-Tuning Studio', desc: 'Train models on your own data with visual tools.', color: '#6E38FF' },
            { title: 'Dataset Management', desc: 'Upload, clean, and manage training datasets.', color: '#6E38FF' },
            { title: 'Model Evaluation', desc: 'Benchmark performance with automated testing.', color: '#6E38FF' },
            { title: 'One-Click Deploy', desc: 'Deploy models to production with autoscaling.', color: '#6E38FF' },
            { title: 'API Generation', desc: 'Automatic REST API endpoints for your models.', color: '#6E38FF' },
            { title: 'Cost Optimization', desc: 'Smart caching and batching to reduce costs.', color: '#6E38FF' },
        ],
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setVisibleSections(prev => {
                if (prev.length < 6) return [...prev, prev.length];
                return prev;
            });
        }, 80);
        return () => clearInterval(timer);
    }, [activeTab]);

    useEffect(() => {
        setVisibleSections([]);
    }, [activeTab]);

    const currentFeatures = features[tabs[activeTab].id as keyof typeof features];

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
                            Powerful Features
                        </h1>
                        <p style={{ color: 'var(--secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                            Explore the technical core of Nebula Intelligence. Everything you need to scale.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div style={{
                        display: 'flex', justifyContent: 'center', gap: '1rem',
                        marginBottom: '4rem', flexWrap: 'wrap',
                    }}>
                        {tabs.map((tab, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTab(i)}
                                style={{
                                    padding: '1rem 2.5rem', borderRadius: '50px',
                                    background: activeTab === i ? tab.color : 'rgba(255,255,255,0.05)',
                                    border: `1px solid ${activeTab === i ? tab.color : 'var(--card-border)'}`,
                                    color: activeTab === i ? 'white' : 'var(--secondary)',
                                    fontSize: '0.95rem', fontWeight: 800, cursor: 'pointer',
                                    transition: 'all 0.4s cubic-bezier(0.19, 1, 0.22, 1)',
                                    boxShadow: activeTab === i ? `0 10px 30px ${tab.color}33` : 'none',
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase'
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Feature Grid */}
                    <div className="grid-3" style={{ maxWidth: '1200px', margin: '0 auto', gap: '2rem' }}>
                        {currentFeatures.map((feature, i) => (
                            <div
                                key={`${activeTab}-${i}`}
                                className="card glass-premium glass-hover-zone"
                                style={{
                                    opacity: visibleSections.includes(i) ? 1 : 0,
                                    transform: visibleSections.includes(i) ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                                    transition: 'all 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
                                    padding: '3rem 2.5rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center'
                                }}
                            >
                                <div style={{
                                    width: '64px', height: '64px', marginBottom: '2rem',
                                    background: `radial-gradient(circle at 30% 30%, ${tabs[activeTab].color}22, transparent 70%)`,
                                    borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    border: `1px solid ${tabs[activeTab].color}20`
                                }}>
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" fill={tabs[activeTab].color} />
                                    </svg>
                                </div>
                                <h3 style={{ marginBottom: '1rem', color: 'white', fontWeight: 800, fontSize: '1.4rem' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: 'var(--secondary)', lineHeight: 1.7, fontSize: '1rem' }}>
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* CTA */}
                    <div style={{ textAlign: 'center', marginTop: '6rem' }}>
                        <a href="/pricing" className="btn btn-primary" style={{ padding: '1.25rem 3.5rem', fontSize: '1.1rem', borderRadius: '1.25rem' }}>
                            🚀 Start Building Now
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
