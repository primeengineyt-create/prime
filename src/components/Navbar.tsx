'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '/#features' },
    { name: 'Engineering', href: '/#how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' }
  ];

  return (
    <>
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
          background: scrolled || mobileMenuOpen ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
          backdropFilter: scrolled || mobileMenuOpen ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled || mobileMenuOpen ? '1px solid rgba(0, 0, 0, 0.05)' : '1px solid transparent',
          boxShadow: scrolled ? '0 10px 40px -10px rgba(0,0,0,0.05)' : 'none'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', perspective: '500px', zIndex: 1001 }}>
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
            <span className="brand-name" style={{
              fontSize: '1.25rem',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: 'var(--foreground)'
            }}>
              Prime Engine
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="desktop-links" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
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

          {/* Action & Mobile Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div className="auth-buttons">
              <Link href="/signin" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--foreground)', marginRight: '1.5rem' }}>Log In</Link>
              <Link href="/signup">
                <button className="btn-billion" style={{ padding: '0.6rem 1.75rem', fontSize: '0.85rem' }}>
                  Get Started
                </button>
              </Link>
            </div>

            {/* Hamburger */}
            <button
              className="hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                zIndex: 1001,
                display: 'none' // Hidden by default, shown in media query
              }}
            >
              <div style={{ width: '24px', height: '2px', background: 'var(--foreground)', marginBottom: '6px', transition: 'all 0.3s', transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}></div>
              <div style={{ width: '24px', height: '2px', background: 'var(--foreground)', marginBottom: '6px', opacity: mobileMenuOpen ? 0 : 1, transition: 'all 0.3s' }}></div>
              <div style={{ width: '24px', height: '2px', background: 'var(--foreground)', transition: 'all 0.3s', transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(30px) saturate(200%)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          transition: 'all 0.6s var(--bezier-cinematic)',
          opacity: mobileMenuOpen ? 1 : 0,
          pointerEvents: mobileMenuOpen ? 'all' : 'none',
          transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-20px)'
        }}
      >
        <div style={{ position: 'absolute', top: '15%', opacity: 0.05, fontSize: '10rem', fontWeight: 900, pointerEvents: 'none' }}>PRIME</div>

        {navLinks.map((link, i) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontSize: '2rem',
              fontWeight: 900,
              color: 'var(--foreground)',
              letterSpacing: '-0.04em',
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.6s var(--bezier-cinematic) ${0.1 + i * 0.1}s`,
              opacity: mobileMenuOpen ? 1 : 0,
              textDecoration: 'none'
            }}
          >
            {link.name}
          </Link>
        ))}
        <div style={{ height: '1px', width: '60px', background: 'rgba(0,0,0,0.1)', margin: '1.5rem 0' }} />
        <Link
          href="/signin"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--secondary)',
            opacity: mobileMenuOpen ? 1 : 0,
            transition: 'all 0.6s var(--bezier-cinematic) 0.5s',
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(10px)'
          }}
        >
          Log In
        </Link>
        <Link
          href="/signup"
          onClick={() => setMobileMenuOpen(false)}
          style={{
            opacity: mobileMenuOpen ? 1 : 0,
            transition: 'all 0.6s var(--bezier-cinematic) 0.6s',
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(10px)'
          }}
        >
          <button className="btn-billion" style={{ fontSize: '1.1rem', padding: '1.25rem 3rem' }}>Get Started</button>
        </Link>
      </div>

      <style jsx>{`
        :global(.nav-logo:hover) {
          transform: rotateY(180deg);
        }
        
        @media (max-width: 768px) {
          .desktop-links, .auth-buttons {
            display: none !important;
          }
          .hamburger {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
