'use client';
import { useEffect, useRef, useState } from 'react';
import TiltCard from '@/components/TiltCard';

export default function PoweredByAI() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeNode, setActiveNode] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            },
            { threshold: 0.1 }
        );

        const elements = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
        elements?.forEach(el => observer.observe(el));

        const nodeInterval = setInterval(() => {
            setActiveNode(prev => (prev + 1) % 6);
        }, 800);

        return () => {
            observer.disconnect();
            clearInterval(nodeInterval);
        };
    }, []);

    const metrics = [
        { label: 'SPEED', value: '10x', desc: 'Faster than coding' },
        { label: 'MODELS', value: '12', desc: 'AI agents working' },
        { label: 'UPTIME', value: '99.9%', desc: 'Always running' }
    ];

    return (
        <section ref={sectionRef} className="section" style={{ background: '#020617', color: 'white', overflow: 'hidden', position: 'relative', padding: '4rem 0' }}>
            <div className="grid-bg" />

            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="glass-pill" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', fontSize: '0.6rem' }}>
                        THE CORE
                    </div>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'white', marginTop: '1rem', letterSpacing: '-0.03em' }}>
                        Powered by <span className="gradient-text">Prime AI</span>
                    </h2>
                </div>

                {/* Neural Network */}
                <div className="neural-container reveal-on-scroll">
                    <svg className="neural-network" viewBox="0 0 400 150" preserveAspectRatio="xMidYMid meet">
                        {[0, 1, 2].map(i => [0, 1, 2].map(j => (
                            <line
                                key={`${i}-${j}`}
                                x1={50 + i * 100} y1={30 + i * 40}
                                x2={150 + j * 100} y2={30 + j * 40}
                                className={`neural-line ${activeNode === i || activeNode === j + 3 ? 'active' : ''}`}
                            />
                        )))}

                        {[0, 1, 2, 3, 4, 5].map(i => (
                            <circle
                                key={i}
                                cx={i < 3 ? 50 + i * 100 : 150 + (i - 3) * 100}
                                cy={i < 3 ? 30 + i * 40 : 30 + (i - 3) * 40}
                                r="8"
                                className={`neural-node ${activeNode === i ? 'active' : ''}`}
                            />
                        ))}
                    </svg>
                </div>

                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
                    {metrics.map((m, i) => (
                        <TiltCard
                            key={m.label}
                            className="metric-card reveal-on-scroll"
                            delay={i * 0.1}
                            style={{
                                padding: '2rem',
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                borderRadius: 'var(--radius-md)',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div className="metric-glow" style={{ transform: 'translateZ(-10px)' }} />
                            <div className="metric-label" style={{ transform: 'translateZ(10px)' }}>{m.label}</div>
                            <div className="metric-value" style={{ transform: 'translateZ(20px)' }}>{m.value}</div>
                            <div className="metric-desc" style={{ transform: 'translateZ(10px)' }}>{m.desc}</div>
                        </TiltCard>
                    ))}
                </div>

                {/* Orbits */}
                <div className="orbit-container">
                    <div className="orbit orbit-1"><div className="orbit-dot" /></div>
                    <div className="orbit orbit-2"><div className="orbit-dot" /></div>
                    <div className="orbit-center">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
                        </svg>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .grid-bg {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(110, 56, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(110, 56, 255, 0.02) 1px, transparent 1px);
                    background-size: 40px 40px;
                    animation: grid-move 25s linear infinite;
                }
                @keyframes grid-move {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(40px, 40px); }
                }
                
                .gradient-text {
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
                
                .reveal-on-scroll {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.8s var(--bezier-cinematic);
                }
                .reveal-on-scroll.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .neural-container {
                    max-width: 450px;
                    margin: 0 auto;
                }
                .neural-network {
                    width: 100%;
                    height: auto;
                }
                .neural-line {
                    stroke: rgba(110, 56, 255, 0.15);
                    stroke-width: 1;
                    transition: all 0.3s;
                }
                .neural-line.active {
                    stroke: var(--primary);
                    stroke-width: 1.5;
                    filter: drop-shadow(0 0 6px var(--primary));
                }
                .neural-node {
                    fill: rgba(110, 56, 255, 0.25);
                    transition: all 0.3s;
                }
                .neural-node.active {
                    fill: var(--primary);
                    filter: drop-shadow(0 0 12px var(--primary));
                }
                
                .metric-card {
                    /* tilt card handles structure */
                    transition: border-color 0.4s;
                }
                .metric-card:hover {
                    border-color: rgba(110, 56, 255, 0.25) !important;
                }
                .metric-glow {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    width: 80px;
                    height: 80px;
                    background: var(--primary);
                    filter: blur(50px);
                    opacity: 0;
                    transition: opacity 0.4s;
                    transform: translateX(-50%);
                }
                .metric-card:hover .metric-glow {
                    opacity: 0.15;
                }
                .metric-label {
                    font-size: 0.6rem;
                    font-weight: 700;
                    letter-spacing: 0.15em;
                    color: rgba(255,255,255,0.35);
                    margin-bottom: 0.75rem;
                }
                .metric-value {
                    font-size: 2rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, white, rgba(255,255,255,0.6));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    letter-spacing: -0.03em;
                }
                .metric-desc {
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.4);
                    margin-top: 0.25rem;
                }
                
                .orbit-container {
                    position: absolute;
                    top: 50%;
                    right: 5%;
                    transform: translateY(-50%);
                    width: 180px;
                    height: 180px;
                    opacity: 0.25;
                }
                .orbit {
                    position: absolute;
                    inset: 0;
                    border: 1px dashed rgba(110, 56, 255, 0.25);
                    border-radius: 50%;
                }
                .orbit-1 { animation: spin 15s linear infinite; }
                .orbit-2 { 
                    inset: 25px; 
                    animation: spin 10s linear infinite reverse; 
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .orbit-dot {
                    position: absolute;
                    top: -3px;
                    left: 50%;
                    width: 6px;
                    height: 6px;
                    background: var(--primary);
                    border-radius: 50%;
                    box-shadow: 0 0 10px var(--primary);
                }
                .orbit-center {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #FF4D00, #6E38FF);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: pulse-glow 3s ease-in-out infinite;
                }
                @keyframes pulse-glow {
                    0%, 100% { box-shadow: 0 0 15px rgba(110, 56, 255, 0.4); }
                    50% { box-shadow: 0 0 25px rgba(110, 56, 255, 0.6); }
                }
            `}</style>
        </section>
    );
}
