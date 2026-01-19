'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const menuItems = [
        { name: 'Overview', href: '/dashboard', icon: '📊' },
        { name: 'Projects', href: '/dashboard/projects', icon: '🚀' },
        { name: 'Team', href: '/dashboard/team', icon: '👥' },
        { name: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
        { name: 'Billing', href: '/dashboard/billing', icon: '💳' },
    ];

    return (
        <div className="dashboard-layout">
            {/* Sidebar */}
            <motion.aside
                className="sidebar"
                animate={{ width: isSidebarOpen ? 280 : 80 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                <div className="sidebar-header">
                    <div className="logo-container">
                        <div className="logo-icon">✨</div>
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.span
                                    className="logo-text"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    PrimeEngine
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                    <button
                        className="toggle-btn"
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? '◀' : '▶'}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                        return (
                            <Link key={item.href} href={item.href}>
                                <div className={`nav-item ${isActive ? 'active' : ''}`}>
                                    <span className="nav-icon">{item.icon}</span>
                                    <AnimatePresence>
                                        {isSidebarOpen && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                className="nav-label"
                                            >
                                                {item.name}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            className="active-indicator"
                                            layoutId="activeIndicator"
                                        />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <div className="avatar">JD</div>
                        <AnimatePresence>
                            {isSidebarOpen && (
                                <motion.div
                                    className="user-info"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="user-name">John Doe</div>
                                    <div className="user-plan">Pro Plan</div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="main-content-wrapper">
                <header className="top-header">
                    <h2 className="page-title">
                        {menuItems.find(i => i.href === pathname)?.name || 'Dashboard'}
                    </h2>
                    <div className="header-actions">
                        <button className="btn-icon">🔔</button>
                        <button className="btn-primary-sm">+ New Project</button>
                    </div>
                </header>
                <div className="content-scroll">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        style={{ height: '100%', transformStyle: 'preserve-3d' }}
                    >
                        {children}
                    </motion.div>
                </div>
            </main>

            <style jsx global>{`
                .dashboard-layout {
                    display: flex;
                    height: 100vh;
                    background: #f8fafc;
                    overflow: hidden;
                    perspective: 1200px;
                }

                .sidebar {
                    background: white;
                    border-right: 1px solid #e2e8f0;
                    display: flex;
                    flex-direction: column;
                    padding: 1.5rem;
                    z-index: 10;
                    box-shadow: 4px 0 24px rgba(0,0,0,0.02);
                }

                .sidebar-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 3rem;
                    height: 40px;
                }

                .logo-container {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    overflow: hidden;
                }

                .logo-icon {
                    width: 32px;
                    height: 32px;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    flex-shrink: 0;
                }

                .logo-text {
                    font-weight: 800;
                    font-size: 1.25rem;
                    color: #0f172a;
                    white-space: nowrap;
                }

                .toggle-btn {
                    background: transparent;
                    border: none;
                    color: #94a3b8;
                    cursor: pointer;
                    padding: 4px;
                }

                .sidebar-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    flex: 1;
                }

                .nav-item {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 0.75rem 1rem;
                    border-radius: 12px;
                    color: #64748b;
                    cursor: pointer;
                    position: relative;
                    transition: all 0.2s;
                    overflow: hidden;
                    white-space: nowrap;
                }

                .nav-item:hover {
                    background: #f1f5f9;
                    color: #0f172a;
                }

                .nav-item.active {
                    background: #eef2ff;
                    color: #6366f1;
                }

                .active-indicator {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 3px;
                    height: 16px;
                    background: #6366f1;
                    border-radius: 0 4px 4px 0;
                }

                .sidebar-footer {
                    margin-top: auto;
                    border-top: 1px solid #e2e8f0;
                    padding-top: 1.5rem;
                }

                .user-profile {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    overflow: hidden;
                }

                .avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: #0f172a;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 600;
                    flex-shrink: 0;
                }

                .user-info {
                    white-space: nowrap;
                }

                .user-name {
                    font-weight: 600;
                    font-size: 0.9rem;
                    color: #0f172a;
                }

                .user-plan {
                    font-size: 0.75rem;
                    color: #94a3b8;
                }

                .main-content-wrapper {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    background: #f8fafc;
                }

                .top-header {
                    height: 80px;
                    padding: 0 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: white;
                    border-bottom: 1px solid #e2e8f0;
                }

                .page-title {
                    font-size: 1.5rem;
                    color: #0f172a;
                }

                .header-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .btn-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 1px solid #e2e8f0;
                    background: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.25rem;
                    cursor: pointer;
                    transition: all 0.2s;
                }
                .btn-icon:hover { background: #f8fafc; }

                .btn-primary-sm {
                    padding: 0.6rem 1.2rem;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 0.9rem;
                    cursor: pointer;
                }

                .content-scroll {
                    flex: 1;
                    overflow-y: auto;
                    padding: 2rem;
                }
            `}</style>
        </div>
    );
}
