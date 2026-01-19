'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function TiltCard({ children, className, ...props }: any) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
            className={className}
            {...props}
        >
            <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    );
}

export default function ProjectsPage() {
    const [filter, setFilter] = useState('all');
    const [projects] = useState([
        { id: 1, name: 'E-commerce Platform', description: 'Next.js + Stripe store with inventory management.', lastEdited: '2 mins ago', icon: '🛍️', color: '#ec4899', category: 'ecommerce' },
        { id: 2, name: 'Portfolio Site', description: 'Personal branding website with blog.', lastEdited: '2 days ago', icon: '👨‍💻', color: '#6366f1', category: 'portfolio' },
        { id: 3, name: 'Saas Starter', description: 'Authentication, database, and payments setup.', lastEdited: '5 days ago', icon: '🚀', color: '#10b981', category: 'saas' },
        { id: 4, name: 'Internal Dashboard', description: 'Admin panel for internal tools.', lastEdited: '1 week ago', icon: '📊', color: '#f59e0b', category: 'internal' },
        { id: 5, name: 'Landing Page V2', description: 'High-conversion landing page.', lastEdited: '2 weeks ago', icon: '✨', color: '#3b82f6', category: 'landing' },
    ]);

    const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    return (
        <div className="projects-page">
            <div className="header-actions">
                <div className="filters">
                    {['all', 'ecommerce', 'saas', 'portfolio', 'internal'].map(f => (
                        <button
                            key={f}
                            className={`filter-btn ${filter === f ? 'active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="view-toggle">
                    <button className="icon-btn active">▦</button>
                    <button className="icon-btn">☰</button>
                </div>
            </div>

            <motion.div
                className="projects-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                {filteredProjects.map((project, i) => (
                    <Link key={project.id} href="/build">
                        <TiltCard
                            className="project-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <div className="card-top">
                                <div className="icon-box" style={{ background: `${project.color}15`, color: project.color }}>
                                    {project.icon}
                                </div>
                                <button className="more-btn">•••</button>
                            </div>
                            <h3 className="project-name">{project.name}</h3>
                            <p className="project-desc">{project.description}</p>
                            <div className="meta">
                                <span>Edited {project.lastEdited}</span>
                                <span className="category-tag">{project.category}</span>
                            </div>
                        </TiltCard>
                    </Link>
                ))}
            </motion.div>

            <style jsx>{`
                .projects-page {
                    perspective: 1000px;
                }
                
                .header-actions {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 2rem;
                }

                .filters {
                    display: flex;
                    gap: 0.5rem;
                    background: white;
                    padding: 0.25rem;
                    border-radius: 10px;
                    border: 1px solid #e2e8f0;
                }

                .filter-btn {
                    padding: 0.5rem 1rem;
                    border: none;
                    background: transparent;
                    border-radius: 8px;
                    color: #64748b;
                    font-size: 0.85rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .filter-btn.active {
                    background: #0f172a;
                    color: white;
                }

                .view-toggle {
                    display: flex;
                    gap: 0.25rem;
                    background: white;
                    padding: 0.25rem;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                }

                .icon-btn {
                    width: 32px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: none;
                    background: transparent;
                    color: #94a3b8;
                    cursor: pointer;
                    border-radius: 6px;
                }
                .icon-btn.active { background: #f1f5f9; color: #0f172a; }

                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.5rem;
                }

                :global(.project-card) {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 1.5rem;
                    cursor: pointer;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    display: flex;
                    flex-direction: column;
                    height: 220px;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
                }
                
                :global(.project-card:hover) {
                    border-color: #6366f1;
                    box-shadow: 0 15px 30px -5px rgba(99, 102, 241, 0.1);
                }

                .card-top {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    transform: translateZ(20px);
                }

                .icon-box {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }

                .more-btn {
                    width: 32px;
                    height: 32px;
                    border: none;
                    background: transparent;
                    color: #cbd5e1;
                    cursor: pointer;
                    border-radius: 50%;
                }
                .more-btn:hover { background: #f8fafc; color: #64748b; }

                .project-name {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #0f172a;
                    transform: translateZ(15px);
                }

                .project-desc {
                    font-size: 0.9rem;
                    color: #64748b;
                    line-height: 1.5;
                    margin-bottom: auto;
                    transform: translateZ(10px);
                }

                .meta {
                    padding-top: 1rem;
                    border-top: 1px solid #f1f5f9;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 0.75rem;
                    color: #94a3b8;
                    transform: translateZ(5px);
                }

                .category-tag {
                    background: #f1f5f9;
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    text-transform: capitalize;
                }
            `}</style>
        </div>
    );
}
