'use client';
import { motion } from 'framer-motion';
import TiltCard from '@/components/TiltCard';

export default function TeamPage() {
    const members = [
        { id: 1, name: 'Alice Chen', role: 'Frontend Lead', email: 'alice@example.com', avatar: 'AC', color: '#ec4899' },
        { id: 2, name: 'Marcus Johnson', role: 'Backend Engineer', email: 'marcus@example.com', avatar: 'MJ', color: '#6366f1' },
        { id: 3, name: 'Sarah Davis', role: 'Product Designer', email: 'sarah@example.com', avatar: 'SD', color: '#10b981' },
    ];

    return (
        <div className="team-page">
            <div className="page-header">
                <div>
                    <h3>Team Members</h3>
                    <p>Manage who has access to your workspace.</p>
                </div>
                <button className="invite-btn">Invite Member</button>
            </div>

            <div className="members-list">
                {members.map((member, i) => (
                    <TiltCard
                        key={member.id}
                        className="member-card"
                        delay={i * 0.1}
                    >
                        <div className="member-info">
                            <div className="member-avatar" style={{ background: member.color, transform: 'translateZ(20px)' }}>{member.avatar}</div>
                            <div style={{ transform: 'translateZ(10px)' }}>
                                <div className="member-name">{member.name}</div>
                                <div className="member-email">{member.email}</div>
                            </div>
                        </div>
                        <div className="member-meta" style={{ transform: 'translateZ(10px)' }}>
                            <span className="role-badge">{member.role}</span>
                            <button className="more-btn">•••</button>
                        </div>
                    </TiltCard>
                ))}
            </div>

            <style jsx>{`
                .team-page {
                    max-width: 900px;
                    perspective: 1000px;
                }

                .page-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .page-header h3 {
                    font-size: 1.25rem;
                    margin-bottom: 0.25rem;
                }

                .page-header p {
                    color: #64748b;
                }

                .invite-btn {
                    background: #0f172a;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    border: none;
                    font-weight: 500;
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                .invite-btn:hover { transform: translateY(-1px); }

                .members-list {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                :global(.member-card) {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    transition: border-color 0.2s;
                }
                
                :global(.member-card:hover) {
                    border-color: #6366f1;
                    box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.15);
                }

                .member-info {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .member-avatar {
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    font-size: 1rem;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                }

                .member-name {
                    font-weight: 600;
                    color: #0f172a;
                }

                .member-email {
                    font-size: 0.85rem;
                    color: #64748b;
                }

                .member-meta {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                }

                .role-badge {
                    background: #eef2ff;
                    color: #64748b;
                    padding: 0.25rem 0.75rem;
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    transition: background 0.3s, color 0.3s;
                }
                
                :global(.member-card:hover .role-badge) {
                    background: #6366f1;
                    color: white;
                }

                .more-btn {
                    background: transparent;
                    border: none;
                    color: #94a3b8;
                    cursor: pointer;
                    font-size: 1.25rem;
                    padding: 0 0.5rem;
                }
                .more-btn:hover { color: #0f172a; }
            `}</style>
        </div>
    );
}
