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

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={className}
            {...props}
        >
            <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    );
}

export default function Dashboard() {
    const [projects] = useState([
        { id: 1, name: 'E-commerce Platform', description: 'Next.js + Stripe store with inventory management.', lastEdited: '2 mins ago', icon: '🛍️', color: '#ec4899' },
        { id: 2, name: 'Portfolio Site', description: 'Personal branding website with blog.', lastEdited: '2 days ago', icon: '👨‍💻', color: '#6366f1' },
        { id: 3, name: 'Saas Starter', description: 'Authentication, database, and payments setup.', lastEdited: '5 days ago', icon: '🚀', color: '#10b981' },
    ]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
        }
    };

    return (
        <div className="dashboard-page">
            <motion.div
                className="dashboard-header"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div>
                    <h1 className="welcome-title">
                        Welcome back, <span className="gradient-text-animated">Creator</span>.
                    </h1>
                    <p className="subtitle">Here's what you've been working on.</p>
                </div>
            </motion.div>

            <motion.div
                className="projects-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* New Project Card */}
                <Link href="/dashboard/create-agent">
                    <TiltCard className="project-card new-project">
                        <div className="new-icon">+</div>
                        <span className="new-label">Create New Agent</span>
                    </TiltCard>
                </Link>

                {projects.map((project, idx) => (
                    <Link key={project.id} href="/build">
                        <TiltCard className="project-card">
                            <div
                                className="card-gradient-top"
                                style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }}
                            />

                            <div className="card-header">
                                <div
                                    className="project-icon"
                                    style={{ background: `${project.color}15`, color: project.color, borderColor: `${project.color}30` }}
                                >
                                    {project.icon}
                                </div>
                                <div className="more-options">•••</div>
                            </div>

                            <h3 className="project-name">{project.name}</h3>
                            <p className="project-desc">{project.description}</p>

                            <div className="card-footer">
                                <span className="status-dot" />
                                Edited {project.lastEdited}
                            </div>
                        </TiltCard>
                    </Link>
                ))}
            </motion.div>

            <style jsx>{`
                .dashboard-page {
                    perspective: 1000px;
                }

                .dashboard-header {
                    margin-bottom: 2.5rem;
                }

                .welcome-title {
                    font-size: clamp(1.5rem, 3vw, 2rem);
                    font-weight: 800;
                    margin-bottom: 0.5rem;
                    letter-spacing: -0.02em;
                    color: #0f172a;
                }

                .subtitle {
                    color: #64748b;
                    font-size: 1rem;
                    font-weight: 500;
                }

                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 1.5rem;
                }

                /* Adjusted for TiltCard wrapper */
                :global(.project-card) {
                    height: 240px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 20px;
                    padding: 1.5rem;
                    display: flex;
                    flex-direction: column;
                    cursor: pointer;
                    position: relative;
                    /* overflow: hidden; Removed for 3D elements to stick out if needed, but usually safer kept. 
                       However, for 3D tilt, overflow hidden clips 3D transforms sometimes. 
                       Let's keep it but rely on the inner container. */
                    transition: border-color 0.3s, box-shadow 0.3s;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
                }

                :global(.project-card:hover) {
                    border-color: #6366f1;
                    box-shadow: 0 20px 40px -10px rgba(99, 102, 241, 0.15);
                }

                :global(.new-project) {
                    border: 2px dashed #cbd5e1;
                    background: transparent;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    box-shadow: none;
                }

                .new-icon {
                    width: 56px;
                    height: 56px;
                    border-radius: 16px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.75rem;
                    color: #cbd5e1;
                    transition: all 0.3s;
                    transform: translateZ(20px);
                }

                :global(.new-project:hover .new-icon) {
                    color: #6366f1;
                    transform: scale(1.1) translateZ(30px);
                    box-shadow: 0 10px 20px rgba(99, 102, 241, 0.15);
                }

                .new-label {
                    font-weight: 700;
                    color: #94a3b8;
                    transition: color 0.3s;
                    transform: translateZ(10px);
                }
                :global(.new-project:hover .new-label) { color: #6366f1; }

                .card-gradient-top {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    opacity: 0;
                    transition: opacity 0.3s;
                    border-radius: 20px 20px 0 0;
                }
                :global(.project-card:hover .card-gradient-top) { opacity: 1; }

                .card-header {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 1.5rem;
                    transform: translateZ(20px);
                }

                .project-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                    border: 1px solid;
                    transform: translateZ(10px);
                }

                .more-options {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #cbd5e1;
                    cursor: pointer;
                }
                .more-options:hover { background: #f1f5f9; color: #64748b; }

                .project-name {
                    font-size: 1.1rem;
                    font-weight: 700;
                    margin-bottom: 0.5rem;
                    color: #0f172a;
                    transform: translateZ(15px);
                }

                .project-desc {
                    font-size: 0.85rem;
                    color: #64748b;
                    line-height: 1.5;
                    margin-bottom: auto;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    transform: translateZ(10px);
                }

                .card-footer {
                    padding-top: 1rem;
                    border-top: 1px solid #f1f5f9;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: #94a3b8;
                    transform: translateZ(5px);
                }

                .status-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #10b981;
                }
            `}</style>
        </div>
    );
}
