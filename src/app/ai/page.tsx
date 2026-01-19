'use client';
import { useEffect, useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AIFeaturePage() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const features = [
        {
            title: "Text to Website",
            desc: "Generate complete, responsive websites from a single prompt. No coding required.",
            icon: "🌐"
        },
        {
            title: "AI 3D Interaction",
            desc: "Add immersive 3D elements that respond to user behavior automatically.",
            icon: "🧊"
        },
        {
            title: "Intelligent Layouts",
            desc: "Our AI understands visual hierarchy and crafts perfect layouts for your content.",
            icon: "📐"
        },
        {
            title: "Dynamic Content",
            desc: "Personalize every visitor's experience with AI-driven content adaptation.",
            icon: "✨"
        }
    ];

    return (
        <main style={{ minHeight: '100vh', background: '#fdfdff', overflowX: 'hidden' }}>
            <Navbar />

            {/* Cinematic Hero Section */}
            <section style={{
                paddingTop: 'calc(var(--nav-height) + 4rem)',
                paddingBottom: '10rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 30 }}>
                    <div style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted ? 'translateY(0)' : 'translateY(15px)',
                        transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                        marginBottom: '2rem'
                    }}>
                        <span style={{
                            padding: '0.6rem 1.25rem',
                            background: 'rgba(124, 58, 237, 0.08)',
                            border: '1px solid rgba(124, 58, 237, 0.15)',
                            borderRadius: '50px',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: '#7c3aed',
                            letterSpacing: '0.05em'
                        }}>
                            INTRODUCING PRIME AI 2.0
                        </span>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(3rem, 10vw, 7rem)',
                        fontWeight: 900,
                        lineHeight: 0.9,
                        letterSpacing: '-0.05em',
                        color: '#0f172a',
                        marginBottom: '2.5rem'
                    }}>
                        Build your vision,<br />
                        <span style={{
                            background: 'linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 30px rgba(124, 58, 237, 0.2))'
                        }}>Driven by AI.</span>
                    </h1>

                    <p style={{
                        fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
                        color: '#475569',
                        maxWidth: '800px',
                        margin: '0 auto 4rem',
                        lineHeight: 1.5,
                        opacity: 0.8
                    }}>
                        The next generation of web development is here.
                        Experience 3D-native AI generation that understands your vision.
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <button className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>Get Started Free</button>
                        <button className="btn btn-secondary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>Watch the Film</button>
                    </div>
                </div>

                {/* Floating 3D Orb & Mockups Area */}
                <div style={{
                    marginTop: '4rem',
                    width: '100%',
                    height: '800px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    perspective: '2000px'
                }}>
                    {/* Central Glow */}
                    <div style={{
                        position: 'absolute',
                        width: '1000px',
                        height: '1000px',
                        background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
                        filter: 'blur(120px)',
                        pointerEvents: 'none'
                    }} />

                    {/* The AI Orb (Using Generated Asset) */}
                    <div style={{
                        width: '400px',
                        height: '400px',
                        borderRadius: '50%',
                        position: 'relative',
                        zIndex: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: 'cinematic-float 8s ease-in-out infinite',
                        cursor: 'pointer'
                    }}>
                        <img
                            src="/ai_orb_preview_1768645289383.png"
                            alt="AI Orb"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                filter: 'drop-shadow(0 40px 80px rgba(124, 58, 237, 0.4))'
                            }}
                        />
                        {/* Interactive Aura */}
                        <div style={{
                            position: 'absolute',
                            inset: -40,
                            borderRadius: '50%',
                            border: '1px solid rgba(124, 58, 237, 0.1)',
                            animation: 'spin-slow 30s linear infinite'
                        }} />
                    </div>

                    {/* Floating Mockups (Using Generated Asset) */}
                    <div className="container" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                        {/* Dynamic floating elements across the grid */}
                        <div style={{
                            position: 'absolute', left: '2%', top: '15%',
                            width: '320px', height: '220px',
                            borderRadius: '1.5rem',
                            overflow: 'hidden',
                            border: '1px solid rgba(0,0,0,0.05)',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                            transform: 'rotate(-8deg) translateZ(100px)',
                            animation: 'float 12s ease-in-out infinite'
                        }}>
                            <img src="/ai_landing_mockups_1768645271089.png" alt="Mockup 1" style={{ width: '200%', height: '200%', objectPosition: 'top left', objectFit: 'cover' }} />
                        </div>

                        <div style={{
                            position: 'absolute', right: '5%', top: '10%',
                            width: '350px', height: '250px',
                            borderRadius: '1.5rem',
                            overflow: 'hidden',
                            border: '1px solid rgba(0,0,0,0.05)',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                            transform: 'rotate(6deg) translateZ(-50px)',
                            animation: 'float 10s ease-in-out infinite reverse 1s'
                        }}>
                            <img src="/ai_landing_mockups_1768645271089.png" alt="Mockup 2" style={{ width: '200%', height: '200%', objectPosition: 'bottom right', objectFit: 'cover' }} />
                        </div>

                        <div style={{
                            position: 'absolute', left: '15%', bottom: '10%',
                            width: '300px', height: '200px',
                            borderRadius: '1.5rem',
                            overflow: 'hidden',
                            border: '1px solid rgba(0,0,0,0.05)',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                            transform: 'rotate(4deg) translateZ(50px)',
                            animation: 'float 14s ease-in-out infinite 2s'
                        }}>
                            <img src="/ai_landing_mockups_1768645271089.png" alt="Mockup 3" style={{ width: '200%', height: '200%', objectPosition: 'center', objectFit: 'cover' }} />
                        </div>

                        <div style={{
                            position: 'absolute', right: '12%', bottom: '15%',
                            width: '340px', height: '240px',
                            borderRadius: '1.5rem',
                            overflow: 'hidden',
                            border: '1px solid rgba(0,0,0,0.05)',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                            transform: 'rotate(-5deg) translateZ(-20px)',
                            animation: 'float 9s ease-in-out infinite reverse 0.5s'
                        }}>
                            <img src="/ai_landing_mockups_1768645271089.png" alt="Mockup 4" style={{ width: '200%', height: '200%', objectPosition: 'top right', objectFit: 'cover' }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Grid Section */}
            <section style={{ padding: '10rem 0', background: 'white', position: 'relative', zIndex: 40 }}>
                <div className="container">
                    <div style={{ textAlign: 'left', marginBottom: '6rem', maxWidth: '800px' }}>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, color: '#0f172a', marginBottom: '1.5rem' }}>
                            Supercharge your creativity.
                        </h2>
                        <p style={{ fontSize: '1.25rem', color: '#64748b' }}>
                            We've built tools that feel like magic, powered by the most sophisticated AI models ever created for the web.
                        </p>
                    </div>

                    <div className="grid-2" style={{ gap: '4rem' }}>
                        {features.map((f, i) => (
                            <div key={i} className="card" style={{
                                padding: '4rem',
                                border: '1px solid rgba(0,0,0,0.03)',
                                background: '#f8fafc',
                                borderRadius: '2.5rem'
                            }}>
                                <div style={{ fontSize: '3rem', marginBottom: '2rem' }}>{f.icon}</div>
                                <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#0f172a' }}>{f.title}</h3>
                                <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.6 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Large Interactive CTA */}
            <section style={{ padding: '10rem 0' }}>
                <div className="container">
                    <div style={{
                        background: '#0f172a',
                        borderRadius: '4rem',
                        padding: '8rem 4rem',
                        textAlign: 'center',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            position: 'absolute', top: '-20%', left: '-10%',
                            width: '600px', height: '600px', borderRadius: '50%',
                            background: 'rgba(124, 58, 237, 0.15)', filter: 'blur(100px)',
                        }} />

                        <h2 style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', fontWeight: 900, marginBottom: '2rem', position: 'relative', zIndex: 1 }}>
                            Ready to ship?
                        </h2>
                        <p style={{ fontSize: '1.5rem', opacity: 0.7, marginBottom: '4rem', maxWidth: '700px', margin: '0 auto 4rem', position: 'relative', zIndex: 1 }}>
                            Join 50,000+ creators building the next generation of the web with Prime AI.
                        </p>
                        <button className="btn btn-primary" style={{ padding: '1.5rem 4rem', fontSize: '1.2rem', background: 'white', color: '#0f172a' }}>
                            Join the Waitlist
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
