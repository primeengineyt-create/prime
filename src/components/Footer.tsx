'use client';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const links = {
        Product: ['Features', 'AI Core', 'DevOps', 'Security', 'Pricing'],
        Company: ['About', 'Careers', 'Blog', 'Newsroom', 'Brand'],
        Resources: ['Documentation', 'API Reference', 'Status', 'Community', 'Github'],
        Legal: ['Privacy', 'Terms', 'Security', 'Cookies', 'DPA']
    };

    return (
        <footer style={{ background: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.05)', padding: 'var(--space-xl) 0 4rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '4rem', marginBottom: 'var(--space-lg)' }}>

                    {/* Brand Column */}
                    <div style={{ gridColumn: 'span 2' }}>
                        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '10px',
                                background: 'var(--foreground)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                    <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
                                </svg>
                            </div>
                            <span style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.04em' }}>Prime Engine</span>
                        </Link>
                        <p style={{ fontSize: '1rem', color: 'var(--secondary)', fontWeight: 500, lineHeight: 1.6, maxWidth: '280px', marginBottom: '2rem' }}>
                            The autonomous platform for modern engineering teams. Built for high-speed, high-thinking developers.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            {[
                                {
                                    icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
                                    href: 'https://twitter.com'
                                },
                                {
                                    icon: <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.17.66-.48 0-.24-.01-.87-.01-1.71-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.68 0 3.84-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85 0 1.34-.01 2.42-.01 2.74 0 .31.16.57.67.48A10.02 10.02 0 0 0 22 12 10 10 0 0 0 12 2z" />,
                                    href: 'https://github.com'
                                },
                                {
                                    icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />,
                                    href: 'https://linkedin.com'
                                },
                                {
                                    icon: <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />,
                                    href: 'https://discord.com'
                                }
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        background: 'var(--silver-gradient)',
                                        border: '1px solid rgba(0,0,0,0.05)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        color: 'var(--secondary)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(0,0,0,0.1)';
                                        e.currentTarget.style.color = 'var(--foreground)';
                                        e.currentTarget.style.background = 'white';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                        e.currentTarget.style.color = 'var(--secondary)';
                                        e.currentTarget.style.background = 'var(--silver-gradient)';
                                    }}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                        {social.icon}
                                    </svg>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    {Object.entries(links).map(([category, items]) => (
                        <div key={category}>
                            <h4 style={{ fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--foreground)', marginBottom: '1.5rem' }}>
                                {category}
                            </h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {items.map(item => (
                                    <li key={item}>
                                        <Link href="#" style={{ fontSize: '0.9rem', color: 'var(--secondary)', fontWeight: 500, transition: 'color 0.3s ease' }}>
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div style={{
                    borderTop: '1px solid rgba(0,0,0,0.05)',
                    paddingTop: '2.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '1.5rem'
                }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 500 }}>
                        © {currentYear} Prime Intelligence Inc. All rights reserved.
                    </div>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <div className="glass-pill" style={{ padding: '0.5rem 1rem', fontSize: '0.7rem' }}>
                            <span style={{ width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', display: 'inline-block', marginRight: '0.5rem' }} />
                            ALL SYSTEMS OPERATIONAL
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--secondary)', fontWeight: 600 }}>Region: GLOBAL</span>
                            <div style={{ width: '24px', height: '16px', background: 'var(--silver-gradient)', borderRadius: '2px' }} />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
