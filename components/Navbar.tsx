'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#socials', label: 'Socials' },
  { href: '#monuments', label: 'Monuments' },
  { href: '#food', label: 'Food' },
  { href: '#feedback', label: 'Feedback' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="navbar"
      style={{ boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.08)' : 'none' }}
      id="main-navbar"
    >
      <a href="#home" className="navbar-brand" onClick={(e) => scrollTo(e, '#home')}>
        <Image src="/logo.jpeg" alt="Amritsar is Live" width={42} height={42} className="navbar-logo" />
        <span className="navbar-title">Amritsar is Live</span>
      </a>

      {/* Desktop links */}
      <ul className="navbar-links" role="list">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={(e) => scrollTo(e, link.href)}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        id="mobile-menu-btn"
        aria-label="Toggle menu"
        style={{
          display: 'none',
          background: 'rgba(201,162,39,0.1)',
          border: '1px solid rgba(201,162,39,0.3)',
          borderRadius: 8,
          width: 40, height: 40,
          color: '#C9A227',
          fontSize: '1.2rem',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="mobile-menu-btn"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          top: 64, left: 0, right: 0,
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(201,162,39,0.15)',
          padding: '16px 24px',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          animation: 'fadeIn 0.2s ease',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
        }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              style={{
                color: 'var(--text-muted)', textDecoration: 'none',
                fontSize: '1rem', fontWeight: 500,
                padding: '12px 16px', borderRadius: 10,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(201,162,39,0.08)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
