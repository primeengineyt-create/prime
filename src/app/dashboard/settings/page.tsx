'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import TiltCard from '@/components/TiltCard';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="settings-page">
            <div className="settings-container">
                <nav className="settings-tabs">
                    {['profile', 'account', 'billing', 'notifications', 'api_keys'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                        >
                            {tab.replace('_', ' ')}
                        </button>
                    ))}
                </nav>

                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="settings-content"
                >
                    {activeTab === 'profile' && (
                        <div className="settings-section">
                            <h3>Public Profile</h3>
                            <TiltCard className="form-card" style={{ padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <div className="form-group" style={{ transform: 'translateZ(10px)' }}>
                                    <label>Display Name</label>
                                    <input type="text" readOnly defaultValue="John Doe" />
                                </div>
                                <div className="form-group" style={{ transform: 'translateZ(10px)' }}>
                                    <label>Bio</label>
                                    <textarea rows={4} readOnly defaultValue="Full Stack Developer building cool things with AI." />
                                </div>
                                <div className="form-group" style={{ transform: 'translateZ(10px)' }}>
                                    <label>Website</label>
                                    <input type="url" readOnly defaultValue="https://johndoe.com" />
                                </div>
                            </TiltCard>
                        </div>
                    )}
                    {activeTab === 'api_keys' && (
                        <div className="settings-section">
                            <h3>API Keys</h3>
                            <p className="section-desc">Manage your API keys for accessing the PrimeEngine API.</p>

                            <TiltCard className="api-key-card">
                                <div className="key-info" style={{ transform: 'translateZ(15px)' }}>
                                    <div className="key-name">Production Key</div>
                                    <code className="key-value">pk_live_51M...89s</code>
                                </div>
                                <div style={{ transform: 'translateZ(20px)' }}>
                                    <button className="btn-outline">Revoke</button>
                                </div>
                            </TiltCard>

                            <button className="btn-primary-outline">+ Create New Key</button>
                        </div>
                    )}
                    {/* Other tabs placeholders */}
                    {(activeTab !== 'profile' && activeTab !== 'api_keys') && (
                        <div className="placeholder-state">
                            <span className="placeholder-icon">🚧</span>
                            <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Settings</h3>
                            <p>This section is coming soon.</p>
                        </div>
                    )}
                </motion.div>
            </div>

            <style jsx>{`
                .settings-page {
                    perspective: 1000px;
                }
                .settings-container {
                    background: transparent;
                    max-width: 800px;
                }

                .settings-tabs {
                    display: flex;
                    margin-bottom: 2rem;
                    gap: 0.5rem;
                    background: white;
                    padding: 0.5rem;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    display: inline-flex;
                }

                .tab-btn {
                    padding: 0.5rem 1rem;
                    border: none;
                    background: transparent;
                    color: #64748b;
                    font-weight: 600;
                    cursor: pointer;
                    text-transform: capitalize;
                    border-radius: 8px;
                    transition: all 0.2s;
                    font-size: 0.9rem;
                }

                .tab-btn.active {
                    background: #0f172a;
                    color: white;
                }

                .settings-content {
                    /* padding: 2rem; removed padding as we are using cards now */
                }

                .settings-section h3 {
                    font-size: 1.25rem;
                    margin-bottom: 1.5rem;
                    color: #0f172a;
                }

                .section-desc {
                    color: #64748b;
                    margin-bottom: 1.5rem;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }
                .form-group:last-child { margin-bottom: 0; }

                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: #334155;
                    font-size: 0.9rem;
                }

                .form-group input,
                .form-group textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #cbd5e1;
                    border-radius: 8px;
                    font-size: 0.95rem;
                    color: #0f172a;
                    transition: border-color 0.2s;
                    background: #f8fafc;
                }
                .form-group input:focus,
                .form-group textarea:focus {
                    outline: none;
                    border-color: #6366f1;
                    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
                    background: white;
                }

                :global(.api-key-card) {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    margin-bottom: 1.5rem;
                    background: white;
                    transition: box-shadow 0.3s, border-color 0.3s;
                }
                :global(.api-key-card:hover) {
                    border-color: #6366f1;
                    box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.15);
                }

                .key-name {
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #0f172a;
                }

                .key-value {
                    font-family: monospace;
                    color: #64748b;
                    background: #f1f5f9;
                    padding: 4px 8px;
                    border-radius: 6px;
                    font-size: 0.85rem;
                    border: 1px solid #e2e8f0;
                }

                .btn-outline {
                    padding: 0.5rem 1rem;
                    border: 1px solid #cbd5e1;
                    background: white;
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 0.85rem;
                    color: #64748b;
                    font-weight: 500;
                    transition: all 0.2s;
                }
                .btn-outline:hover {
                    color: #ef4444;
                    border-color: #ef4444;
                    background: #fef2f2;
                }

                .btn-primary-outline {
                    background: transparent;
                    border: 2px dashed #e2e8f0;
                    color: #64748b;
                    padding: 1rem;
                    border-radius: 12px;
                    width: 100%;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                .btn-primary-outline:hover {
                    border-color: #6366f1;
                    color: #6366f1;
                    background: #eef2ff;
                }

                .placeholder-state {
                    text-align: center;
                    padding: 3rem 0;
                    color: #94a3b8;
                    background: white;
                    border-radius: 16px;
                    border: 1px solid #e2e8f0;
                }
                .placeholder-icon {
                    font-size: 3rem;
                    display: block;
                    margin-bottom: 1rem;
                }
            `}</style>
        </div>
    );
}
