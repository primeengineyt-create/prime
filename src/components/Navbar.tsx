'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '#features' },
    { name: 'Engineering', href: '#how-it-works' },
    { name: 'Customers', href: '#trust' },
    { name: 'Pricing', href: '#pricing' }
  ];

  return (
    <nav
      style={{
        height: 'var(--nav-height)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        transition: 'all 0.5s var(--bezier-cinematic)',
        background: scrolled ? 'rgba(255, 255, 255, 0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid transparent',
        boxShadow: scrolled ? '0 10px 40px -10px rgba(0,0,0,0.05)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', perspective: '500px' }}>
          <div className="nav-logo" style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--foreground)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z" />
            </svg>
          </div>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: 'var(--foreground)'
          }}>
            Prime Engine
          </span>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--secondary)',
                transition: 'color 0.3s ease',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--foreground)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--secondary)')}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link href="/signin" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--foreground)' }}>Log In</Link>
          <Link href="/signup">
            <button className="btn-billion" style={{ padding: '0.6rem 1.75rem', fontSize: '0.85rem' }}>
              Get Started
            </button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        :global(.nav-logo:hover) {
          transform: rotateY(180deg);
        }
      `}</style>
    </nav>
  );
}
