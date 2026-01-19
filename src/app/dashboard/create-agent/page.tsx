'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import TiltCard from '@/components/TiltCard';

export default function CreateAgentPage() {
    const [agent, setAgent] = useState({
        name: '',
        role: '',
        description: '',
        avatar: '🤖',
        color: '#6366f1',
        specialties: [] as string[]
    });

    const [currentSpecialty, setCurrentSpecialty] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSpecialtyAdd = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && currentSpecialty.trim()) {
            e.preventDefault();
            if (!agent.specialties.includes(currentSpecialty.trim())) {
                setAgent(prev => ({
                    ...prev,
                    specialties: [...prev.specialties, currentSpecialty.trim()]
                }));
            }
            setCurrentSpecialty('');
        }
    };

    const removeSpecialty = (spec: string) => {
        setAgent(prev => ({
            ...prev,
            specialties: prev.specialties.filter(s => s !== spec)
        }));
    };

    return (
        <div style={{ padding: '0 0 4rem', maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: '2rem' }}
            >
                <Link href="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 500 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                    Back to Dashboard
                </Link>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
                    Create New <span className="gradient-text-animated">Agent</span>
                </h1>
                <p style={{ color: '#64748b', marginTop: '0.5rem' }}>Design a custom AI agent for your specific workflow needs.</p>
            </motion.div>

            <div className="creation-grid">
                {/* Configuration Form */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="config-panel"
                >
                    <div className="form-group">
                        <label>Agent Name</label>
                        <input
                            type="text"
                            placeholder="e.g. CodeReviewer"
                            value={agent.name}
                            onChange={(e) => setAgent({ ...agent, name: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Role / Title</label>
                        <input
                            type="text"
                            placeholder="e.g. Senior Security Analyst"
                            value={agent.role}
                            onChange={(e) => setAgent({ ...agent, role: e.target.value })}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Avatar (Emoji)</label>
                            <input
                                type="text"
                                maxLength={2}
                                style={{ textAlign: 'center', fontSize: '1.5rem' }}
                                value={agent.avatar}
                                onChange={(e) => setAgent({ ...agent, avatar: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Theme Color</label>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4', '#ef4444'].map(c => (
                                    <button
                                        key={c}
                                        onClick={() => setAgent({ ...agent, color: c })}
                                        style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: c,
                                            border: agent.color === c ? '3px solid white' : 'none',
                                            boxShadow: agent.color === c ? `0 0 0 2px ${c}` : 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Specialties (Press Enter)</label>
                        <input
                            type="text"
                            placeholder="Add a skill..."
                            value={currentSpecialty}
                            onChange={(e) => setCurrentSpecialty(e.target.value)}
                            onKeyDown={handleSpecialtyAdd}
                        />
                        <div className="tags-container">
                            {agent.specialties.map(spec => (
                                <span key={spec} className="tag" style={{ background: `${agent.color}15`, color: agent.color, borderColor: `${agent.color}30` }}>
                                    {spec}
                                    <button onClick={() => removeSpecialty(spec)}>×</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>System Instructions</label>
                        <textarea
                            rows={5}
                            placeholder="Describe how this agent should behave..."
                            value={agent.description}
                            onChange={(e) => setAgent({ ...agent, description: e.target.value })}
                        />
                    </div>

                    <button
                        className="btn-create"
                        style={{ background: agent.color }}
                        onClick={() => setIsSubmitting(true)}
                    >
                        {isSubmitting ? 'Deploying Agent...' : 'Create Agent'}
                    </button>
                </motion.div>

                {/* Live Preview */}
                <div className="preview-panel">
                    <div style={{ marginBottom: '1rem', fontWeight: 600, color: '#64748b', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Live Preview
                    </div>

                    <TiltCard
                        className="agent-preview-card"
                        style={{
                            borderTop: `4px solid ${agent.color}`,
                            height: 'auto',
                            minHeight: '400px'
                        }}
                    >
                        <div className="preview-header">
                            <div className="agent-avatar-large" style={{ background: `${agent.color}15`, border: `2px solid ${agent.color}30` }}>
                                {agent.avatar}
                            </div>
                            <div className="agent-status-badge">
                                <span className="status-dot"></span> Idle
                            </div>
                        </div>

                        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.25rem', color: '#0f172a' }}>
                            {agent.name || 'Agent Name'}
                        </h2>
                        <div style={{ color: agent.color, fontWeight: 600, fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                            {agent.role || 'Agent Role'}
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h4 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                                Capabilities
                            </h4>
                            <div className="tags-container">
                                {agent.specialties.length > 0 ? agent.specialties.map(spec => (
                                    <span key={spec} className="tag-preview">
                                        {spec}
                                    </span>
                                )) : (
                                    <span className="tag-placeholder">Add skills to see them here</span>
                                )}
                            </div>
                        </div>

                        <div className="preview-stats">
                            <div className="stat-item">
                                <div className="stat-label">Tasks</div>
                                <div className="stat-value">0</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-label">Success Rate</div>
                                <div className="stat-value">100%</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-label">Model</div>
                                <div className="stat-value">Prime-1</div>
                            </div>
                        </div>
                    </TiltCard>

                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                            This agent will be available in your build workflows immediately after creation.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .creation-grid {
                    display: grid;
                    grid-template-columns: 1.2fr 0.8fr;
                    gap: 4rem;
                    align-items: start;
                }
                
                .config-panel {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 20px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }
                
                .form-row {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 1.5rem;
                }

                label {
                    display: block;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: #475569;
                    margin-bottom: 0.5rem;
                }

                input, textarea {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    font-size: 0.95rem;
                    transition: all 0.2s;
                    font-family: inherit;
                    background: #f8fafc;
                }
                input:focus, textarea:focus {
                    outline: none;
                    border-color: ${agent.color};
                    background: white;
                    box-shadow: 0 0 0 3px ${agent.color}20;
                }

                .tags-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    margin-top: 0.75rem;
                }

                .tag {
                    padding: 0.35rem 0.75rem;
                    border-radius: 100px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    border: 1px solid;
                }

                .tag button {
                    background: none;
                    border: none;
                    color: currentColor;
                    cursor: pointer;
                    font-size: 1.1rem;
                    line-height: 1;
                    opacity: 0.6;
                }
                .tag button:hover { opacity: 1; }

                .btn-create {
                    width: 100%;
                    padding: 1rem;
                    border: none;
                    border-radius: 12px;
                    color: white;
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: transform 0.2s, box-shadow 0.2s;
                    margin-top: 1rem;
                }
                .btn-create:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 20px -5px ${agent.color}40;
                }

                /* Preview Styles */
                :global(.agent-preview-card) {
                    background: white;
                    border-radius: 20px;
                    padding: 2.5rem;
                    box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
                }

                .preview-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1.5rem;
                }

                .agent-avatar-large {
                    width: 80px;
                    height: 80px;
                    border-radius: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 3rem;
                    transform: translateZ(30px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
                }

                .agent-status-badge {
                    background: #f1f5f9;
                    color: #64748b;
                    padding: 0.5rem 1rem;
                    border-radius: 100px;
                    font-size: 0.8rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transform: translateZ(10px);
                }

                .status-dot {
                    width: 8px;
                    height: 8px;
                    background: #cbd5e1;
                    border-radius: 50%;
                }

                .tag-preview {
                    background: #f1f5f9;
                    color: #475569;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    font-size: 0.85rem;
                    font-weight: 600;
                }

                .tag-placeholder {
                    color: #cbd5e1;
                    font-style: italic;
                    font-size: 0.9rem;
                }

                .preview-stats {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-top: 2rem;
                    padding-top: 2rem;
                    border-top: 1px solid #f1f5f9;
                }

                .stat-item {
                    text-align: center;
                }

                .stat-label {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    color: #94a3b8;
                    font-weight: 700;
                    margin-bottom: 0.25rem;
                }

                .stat-value {
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: #0f172a;
                }

                @media (max-width: 900px) {
                    .creation-grid {
                        grid-template-columns: 1fr;
                    }
                    .preview-panel {
                        order: -1; 
                        margin-bottom: 2rem;
                    }
                }
            `}</style>
        </div>
    );
}
