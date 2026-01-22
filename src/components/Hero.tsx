'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import Orb3D from '@/components/Orb3D';

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    const [typedText, setTypedText] = useState('');
    const [prompt, setPrompt] = useState('');
    const heroRef = useRef<HTMLElement>(null);
    const magicBarRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const fullText = "Build Anything.";

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1.0] as const
            }
        }
    };

    useEffect(() => {
        setMounted(true);

        let index = 0;
        const typeInterval = setInterval(() => {
            if (index <= fullText.length) {
                setTypedText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);

        const handleMouseMove = (e: MouseEvent) => {
            if (magicBarRef.current) {
                const rect = magicBarRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                magicBarRef.current.style.setProperty('--mouse-x', `${x}px`);
                magicBarRef.current.style.setProperty('--mouse-y', `${y}px`);
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(typeInterval);
        };
    }, []);

    return (
        <section
            ref={heroRef}
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: 'var(--nav-height) 0 3rem',
                zIndex: 1
            }}
        >
            {/* 3D Orb Background Element */}
            <div className="orb-position">
                <Orb3D />
            </div>

            <motion.div
                className="container"
                style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}
                variants={containerVariants}
                initial="hidden"
                animate={mounted ? "visible" : "hidden"}
            >
                {/* Badge */}
                <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
                    <div className="glass-pill shimmer" style={{ padding: '0.6rem 1.25rem', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)' }}>
                        <span className="pulse-dot" />
                        <span style={{ letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.65rem', fontWeight: 700 }}>
                            Build Anything with AI
                        </span>
                    </div>
                </motion.div>

                {/* Headline */}
                <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                    <motion.h1
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                            fontWeight: 800,
                            lineHeight: 0.95,
                            letterSpacing: '-0.05em',
                            marginBottom: '1.5rem'
                        }}
                    >
                        <span className="gradient-text-animated">{typedText}</span>
                        <span className="cursor-blink">|</span>
                        <br />
                        No <span style={{ color: 'var(--primary)' }}>Code</span> Needed.
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        style={{
                            fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
                            maxWidth: '550px',
                            margin: '0 auto 2.5rem',
                            color: 'var(--secondary)',
                            fontWeight: 500,
                            lineHeight: 1.6,
                        }}
                    >
                        Just talk to our AI and watch your ideas come to life.
                        The fastest way to go from idea to live app.
                    </motion.p>
                </div>

                {/* Magic Input */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        width: '100%',
                        maxWidth: '650px',
                        margin: '0 auto',
                    }}
                >
                    <form
                        ref={magicBarRef}
                        className="magic-bar"
                        onSubmit={(e) => {
                            e.preventDefault();
                            router.push('/build');
                        }}
                    >
                        <div className="ai-orb">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
                            </svg>
                        </div>

                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="What do you want to build?"
                            style={{
                                flex: 1,
                                background: 'none',
                                border: 'none',
                                outline: 'none',
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                color: 'var(--foreground)',
                                letterSpacing: '-0.01em',
                                minWidth: '100px'
                            }}
                        />

                        <button type="submit" className="btn-billion glow-on-hover">
                            Build Now
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </form>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '1rem',
                        marginTop: '1rem',
                        fontSize: '0.75rem',
                        color: 'var(--secondary)',
                        opacity: 0.5,
                        fontWeight: 500,
                        flexWrap: 'wrap'
                    }}>
                        {['A food app', 'A simple shop', 'A tracker'].map((txt, i) => (
                            <span key={txt} className="hint-tag" style={{ animationDelay: `${i * 0.1}s` }}>Try: "{txt}"</span>
                        ))}
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        marginTop: '5rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                        gap: '2rem',
                        maxWidth: '500px',
                        margin: '5rem auto 0',
                    }}
                >
                    {[
                        { value: '10K+', label: 'Creators' },
                        { value: '50K+', label: 'Apps Built' },
                        { value: '99.9%', label: 'Uptime' }
                    ].map((stat, i) => (
                        <div key={stat.label} className="stat-card" style={{ animationDelay: `${1 + i * 0.2}s` }}>
                            <div className="stat-value">{stat.value}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            <style jsx>{`
                .pulse-dot {
                    display: inline-block;
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: var(--accent-gradient);
                    animation: pulse 2s infinite;
                    margin-right: 0.5rem;
                }
                @keyframes pulse {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.3); opacity: 0.5; }
                    100% { transform: scale(1); opacity: 1; }
                }
                
                .shimmer {
                    position: relative;
                    overflow: hidden;
                }
                .shimmer::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
                    animation: shimmer 3s infinite;
                }
                @keyframes shimmer {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
                
                .gradient-text-animated {
                    background: linear-gradient(135deg, #FF4D00 0%, #6E38FF 50%, #001AFF 100%);
                    background-size: 200% 200%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradient-shift 4s ease infinite;
                }
                @keyframes gradient-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                .cursor-blink {
                    display: inline-block;
                    color: var(--primary);
                    animation: blink 1s step-end infinite;
                    margin-left: 0.05em;
                    font-weight: 300;
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                
                /* Magic Bar Enhancements */
                .magic-bar {
                    padding: 0.75rem 0.75rem 0.75rem 1.25rem;
                    border-radius: 100px;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    background: rgba(255, 255, 255, 0.85);
                    backdrop-filter: blur(20px);
                    position: relative;
                    z-index: 10;
                    border: 1px solid rgba(255, 255, 255, 0.5);
                    box-shadow: 
                        0 20px 40px -10px rgba(0, 0, 0, 0.08),
                        0 0 0 1px rgba(0,0,0,0.02);
                    transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                
                @media (max-width: 500px) {
                    .magic-bar {
                        flex-direction: column;
                        border-radius: 24px;
                        padding: 1.25rem;
                        gap: 1rem;
                    }
                    .magic-bar input {
                        width: 100%;
                        text-align: center;
                        padding: 0.5rem 0;
                    }
                    .magic-bar .btn-billion {
                        width: 100%;
                        justify-content: center;
                    }
                    .ai-orb {
                        display: none;
                    }
                }
                .magic-bar:hover, .magic-bar:focus-within {
                    transform: translateY(-2px);
                    background: white;
                    box-shadow: 
                        0 30px 60px -15px rgba(110, 56, 255, 0.15),
                        0 0 0 1px rgba(110, 56, 255, 0.1);
                }
                
                .magic-bar::before {
                    content: '';
                    position: absolute;
                    inset: -2px;
                    border-radius: 100px;
                    background: linear-gradient(135deg, #FF4D00, #6E38FF, #001AFF);
                    z-index: -1;
                    opacity: 0;
                    filter: blur(10px);
                    transition: opacity 0.4s;
                }
                .magic-bar:focus-within::before {
                    opacity: 0.4;
                }
                
                .ai-orb {
                    width: 42px;
                    height: 42px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
                    flex-shrink: 0;
                    color: white;
                }
                
                .btn-billion {
                    padding: 0.8rem 1.5rem;
                    border-radius: 100px;
                    font-size: 0.95rem;
                    background: #0f172a;
                    color: white;
                    border: none;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-billion:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    background: black;
                }
                
                .hint-tag {
                    opacity: 0;
                    animation: fade-in 0.6s forwards;
                    background: rgba(255,255,255,0.5);
                    padding: 0.25rem 0.75rem;
                    border-radius: 100px;
                    border: 1px solid rgba(0,0,0,0.05);
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(5px); }
                    to { opacity: 0.8; transform: translateY(0); }
                }

                .stat-card {
                    text-align: center;
                    opacity: 0;
                    animation: stat-appear 0.8s var(--bezier-cinematic) forwards;
                    background: rgba(255,255,255,0.6);
                    backdrop-filter: blur(10px);
                    padding: 1.25rem;
                    border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.5);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.02);
                }
                @keyframes stat-appear {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .stat-value {
                    font-size: 1.75rem;
                    font-weight: 800;
                    letter-spacing: -0.03em;
                    color: #0f172a;
                }
                .stat-label {
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #64748b;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                .orb-position {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 0;
                    overflow: hidden;
                }
                
                @media (max-width: 1024px) {
                    .orb-position {
                        opacity: 0.6;
                        transform: scale(0.8) translate(10%, -10%);
                    }
                }
                @media (max-width: 768px) {
                    .orb-position {
                         opacity: 0.4;
                         transform: scale(0.6) translateY(-20%);
                    }
                }
            `}</style>
        </section>
    );
}
