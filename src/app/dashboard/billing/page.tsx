'use client';
import { motion } from 'framer-motion';

export default function BillingPage() {
    return (
        <div className="billing-page">
            <div className="page-header">
                <div>
                    <h3>Billing & Plans</h3>
                    <p>Manage your subscription and billing information.</p>
                </div>
            </div>

            <div className="plans-grid">
                <motion.div
                    className="plan-card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="plan-name">Free</div>
                    <div className="plan-price">$0<span>/mo</span></div>
                    <ul className="plan-features">
                        <li>1 Project</li>
                        <li>Community Support</li>
                        <li>Basic Analytics</li>
                    </ul>
                    <button className="plan-btn outline">Current Plan</button>
                </motion.div>

                <motion.div
                    className="plan-card active"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="plan-badge">POPULAR</div>
                    <div className="plan-name">Pro</div>
                    <div className="plan-price">$29<span>/mo</span></div>
                    <ul className="plan-features">
                        <li>Unlimited Projects</li>
                        <li>Priority Support</li>
                        <li>Advanced Analytics</li>
                        <li>Custom Domains</li>
                    </ul>
                    <button className="plan-btn primary">Upgrade</button>
                </motion.div>

                <motion.div
                    className="plan-card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="plan-name">Enterprise</div>
                    <div className="plan-price">$99<span>/mo</span></div>
                    <ul className="plan-features">
                        <li>Everything in Pro</li>
                        <li>Dedicated Manager</li>
                        <li>SLA</li>
                        <li>SSO</li>
                    </ul>
                    <button className="plan-btn outline">Contact Sales</button>
                </motion.div>
            </div>

            <style jsx>{`
                .billing-page {
                    max-width: 1000px;
                }

                .page-header {
                    margin-bottom: 2rem;
                }

                .page-header h3 {
                    font-size: 1.25rem;
                    margin-bottom: 0.25rem;
                }

                .page-header p {
                    color: #64748b;
                }

                .plans-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 2rem;
                    align-items: start;
                }

                .plan-card {
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 16px;
                    padding: 2rem;
                    position: relative;
                }

                .plan-card.active {
                    border-color: #6366f1;
                    box-shadow: 0 10px 30px -10px rgba(99, 102, 241, 0.2);
                }

                .plan-badge {
                    position: absolute;
                    top: -12px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #6366f1;
                    color: white;
                    font-size: 0.75rem;
                    font-weight: 700;
                    padding: 0.25rem 0.75rem;
                    border-radius: 100px;
                }

                .plan-name {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                    color: #0f172a;
                }

                .plan-price {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #0f172a;
                    margin-bottom: 1.5rem;
                }

                .plan-price span {
                    font-size: 1rem;
                    color: #64748b;
                    font-weight: 500;
                }

                .plan-features {
                    list-style: none;
                    margin-bottom: 2rem;
                    color: #64748b;
                }

                .plan-features li {
                    margin-bottom: 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .plan-features li::before {
                    content: '✓';
                    color: #10b981;
                    font-weight: bold;
                }

                .plan-btn {
                    width: 100%;
                    padding: 0.75rem;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .plan-btn.primary {
                    background: #6366f1;
                    color: white;
                    border: none;
                }
                .plan-btn.primary:hover {
                    background: #4f46e5;
                }

                .plan-btn.outline {
                    background: transparent;
                    border: 1px solid #cbd5e1;
                    color: #64748b;
                }
                .plan-btn.outline:hover {
                    border-color: #94a3b8;
                    color: #0f172a;
                }
            `}</style>
        </div>
    );
}
