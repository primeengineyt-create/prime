'use client';
import { useEffect, useRef, useState } from 'react';
import TiltCard from '@/components/TiltCard';

export default function HowItWorks() {
    const [activeStep, setActiveStep] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);
    const [progress, setProgress] = useState(0);

    const steps = [
        { title: 'Tell the AI', desc: 'Type what you want in simple words.', label: 'STEP 01', icon: '💬' },
        { title: 'Watch it Build', desc: 'AI writes code and designs screens.', label: 'STEP 02', icon: '⚡' },
        { title: 'Launch Live', desc: 'One click to go online.', label: 'STEP 03', icon: '🚀' }
    ];

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

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    setActiveStep(s => (s + 1) % steps.length);
                    return 0;
                }
                return prev + 2;
            });
        }, 100);

        return () => {
            observer.disconnect();
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <section ref={sectionRef} id="how-it-works" className="section" style={{ background: '#ffffff', padding: '4rem 0' }}>
            <div className="container">
                <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="glass-pill shimmer">SIMPLE STEPS</div>
                    <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1, marginTop: '1rem' }}>
                        Build in <span className="text-gradient">Three Steps</span>.
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '4rem', alignItems: 'center' }}>

                    {/* Device */}
                    <div className="reveal-on-scroll device-container">
                        <TiltCard
                            className="device-frame"
                            style={{
                                width: '240px',
                                height: '300px',
                                background: 'var(--foreground)',
                                borderRadius: '24px',
                                padding: '8px',
                                boxShadow: '0 30px 60px rgba(0,0,0,0.12)'
                            }}
                        >
                            <div className="device-screen" style={{ transform: 'translateZ(20px)' }}>
                                <div className="screen-content">
                                    <div className="screen-header">
                                        <div className="screen-dot" />
                                        <div className="screen-dot" />
                                        <div className="screen-dot" />
                                    </div>

                                    <div className="screen-body">
                                        <div className="typing-effect" style={{ opacity: activeStep === 0 ? 1 : 0 }}>
                                            <div className="typing-line" />
                                            <div className="typing-cursor" />
                                        </div>

                                        <div className="building-effect" style={{ opacity: activeStep === 1 ? 1 : 0 }}>
                                            <div className="code-line" style={{ width: '80%', animationDelay: '0s' }} />
                                            <div className="code-line" style={{ width: '60%', animationDelay: '0.1s' }} />
                                            <div className="code-line" style={{ width: '90%', animationDelay: '0.2s' }} />
                                        </div>

                                        <div className="launch-effect" style={{ opacity: activeStep === 2 ? 1 : 0 }}>
                                            <div className="check-mark">✓</div>
                                            <div className="launch-text">LIVE!</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="float-element float-1" style={{ transform: 'translateZ(40px)' }}>🎨</div>
                            <div className="float-element float-2" style={{ transform: 'translateZ(30px)' }}>⚙️</div>
                        </TiltCard>

                        <div className="device-glow" />
                    </div>

                    {/* Steps */}
                    <div className="reveal-on-scroll">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {steps.map((step, i) => (
                                <div
                                    key={step.title}
                                    className={`step-card ${activeStep === i ? 'active' : ''}`}
                                    onClick={() => { setActiveStep(i); setProgress(0); }}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="step-number">
                                        <span className="step-icon">{step.icon}</span>
                                        {activeStep === i && (
                                            <svg className="progress-ring" viewBox="0 0 36 36">
                                                <circle className="progress-ring-bg" cx="18" cy="18" r="16" />
                                                <circle className="progress-ring-fill" cx="18" cy="18" r="16" style={{ strokeDashoffset: 100 - progress }} />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="step-content">
                                        <div className="step-label">{step.label}</div>
                                        <h3 className="step-title">{step.title}</h3>
                                        <p className="step-desc">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
                .shimmer {
                    position: relative;
                    overflow: hidden;
                    font-size: 0.65rem;
                }
                .shimmer::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    animation: shimmer 3s infinite;
                }
                @keyframes shimmer {
                    0% { left: -100%; }
                    100% { left: 100%; }
                }
                
                .text-gradient { color: var(--primary); }
                
                .reveal-on-scroll {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.8s var(--bezier-cinematic);
                }
                .reveal-on-scroll.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                
                .device-container {
                    position: relative;
                    display: flex;
                    justify-content: center;
                }
                .device-frame {
                    position: relative;
                    width: 240px;
                    height: 300px;
                    background: var(--foreground);
                    border-radius: 24px;
                    padding: 8px;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.12);
                }
                .device-screen {
                    width: 100%;
                    height: 100%;
                    background: white;
                    border-radius: 18px;
                    overflow: hidden;
                }
                .screen-content {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }
                .screen-header {
                    padding: 8px;
                    display: flex;
                    gap: 4px;
                    border-bottom: 1px solid rgba(0,0,0,0.05);
                }
                .screen-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #e2e8f0;
                }
                .screen-body {
                    flex: 1;
                    padding: 16px;
                    position: relative;
                }
                
                .typing-effect, .building-effect, .launch-effect {
                    position: absolute;
                    inset: 16px;
                    transition: opacity 0.4s;
                }
                .typing-line {
                    height: 14px;
                    background: linear-gradient(90deg, #e2e8f0 0%, transparent 60%);
                    border-radius: 3px;
                    animation: typing 2s infinite;
                }
                @keyframes typing {
                    0%, 100% { width: 0; }
                    50% { width: 75%; }
                }
                .typing-cursor {
                    display: inline-block;
                    width: 2px;
                    height: 14px;
                    background: var(--primary);
                    animation: blink 1s step-end infinite;
                    margin-left: 2px;
                }
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                
                .building-effect {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }
                .code-line {
                    height: 8px;
                    background: linear-gradient(90deg, var(--primary) 0%, rgba(110, 56, 255, 0.3) 100%);
                    border-radius: 3px;
                    animation: code-appear 0.4s forwards;
                    opacity: 0;
                }
                @keyframes code-appear {
                    from { opacity: 0; width: 0; }
                    to { opacity: 1; }
                }
                
                .launch-effect {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .check-mark {
                    font-size: 2.5rem;
                    color: #10b981;
                    animation: pop-in 0.4s var(--bezier-cinematic);
                }
                @keyframes pop-in {
                    0% { transform: scale(0); }
                    50% { transform: scale(1.15); }
                    100% { transform: scale(1); }
                }
                .launch-text {
                    font-size: 0.9rem;
                    font-weight: 800;
                    color: var(--primary);
                    letter-spacing: 0.15em;
                    margin-top: 0.5rem;
                }
                
                .float-element {
                    position: absolute;
                    font-size: 1.25rem;
                    animation: float 3s ease-in-out infinite;
                }
                .float-1 { top: 10%; right: -15%; animation-delay: 0s; }
                .float-2 { bottom: 15%; left: -15%; animation-delay: 0.5s; }
                @keyframes float {
                    0%, 100% { transform: translateY(0) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(5deg); }
                }
                
                .device-glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 260px;
                    height: 300px;
                    background: var(--primary);
                    filter: blur(60px);
                    opacity: 0.08;
                    z-index: -1;
                }
                
                .step-card {
                    display: flex;
                    gap: 1rem;
                    padding: 1rem;
                    border-radius: 14px;
                    transition: all 0.4s var(--bezier-cinematic);
                    background: transparent;
                    border: 1px solid transparent;
                }
                .step-card:hover {
                    background: rgba(110, 56, 255, 0.02);
                }
                .step-card.active {
                    background: white;
                    border-color: rgba(110, 56, 255, 0.08);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.04);
                    transform: translateX(5px);
                }
                
                .step-number {
                    position: relative;
                    width: 44px;
                    height: 44px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .step-icon { font-size: 1.1rem; z-index: 1; }
                .progress-ring {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    transform: rotate(-90deg);
                }
                .progress-ring-bg {
                    fill: none;
                    stroke: rgba(110, 56, 255, 0.1);
                    stroke-width: 2;
                }
                .progress-ring-fill {
                    fill: none;
                    stroke: var(--primary);
                    stroke-width: 2;
                    stroke-dasharray: 100;
                    transition: stroke-dashoffset 0.1s;
                }
                
                .step-content { flex: 1; }
                .step-label {
                    font-size: 0.6rem;
                    font-weight: 700;
                    color: var(--primary);
                    letter-spacing: 0.1em;
                    margin-bottom: 0.25rem;
                }
                .step-title {
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin-bottom: 0.25rem;
                    color: var(--foreground);
                }
                .step-desc {
                    font-size: 0.85rem;
                    color: var(--secondary);
                    font-weight: 500;
                    line-height: 1.4;
                }
            `}</style>
        </section>
    );
}
