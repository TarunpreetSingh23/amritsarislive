'use client';
import { useEffect, useRef } from 'react';

const SOCIALS = [
  {
    platform: 'Instagram',
    name: '@AmritsarIsLive',
    meta: 'Stories, Reels & City Vibes',
    followers: '38.4K',
    href: 'https://instagram.com/amritsarislive',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="url(#igGrad)">
        <defs>
          <linearGradient id="igGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fcb045"/>
            <stop offset="50%" stopColor="#fd1d1d"/>
            <stop offset="100%" stopColor="#833ab4"/>
          </linearGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    accent: '#fd1d1d',
    accentMuted: 'rgba(253,29,29,0.12)',
    delay: 0,
  },
  {
    platform: 'YouTube',
    name: 'Amritsar is Live',
    meta: 'City Vlogs, Docs & Events',
    followers: '12.1K',
    href: 'https://youtube.com/@amritsarislive',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#ff0000">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    accent: '#ff0000',
    accentMuted: 'rgba(255,0,0,0.12)',
    delay: 150,
  },
  {
    platform: 'Facebook',
    name: 'Amritsar is Live',
    meta: 'Community, Events & Updates',
    followers: '21.7K',
    href: 'https://facebook.com/amritsarislive',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#1877f2">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    accent: '#1877f2',
    accentMuted: 'rgba(24,119,242,0.12)',
    delay: 300,
  },
];

export default function SocialLinks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.social-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateX(0)';
              }, i * 200);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="socials-section" id="socials" ref={sectionRef}>
      <div className="section-header">
        <span className="section-label">Connect With Us</span>
        <h2 className="section-title">Find Us on <span>Social Media</span></h2>
        <p className="section-desc">
          Follow our journey across platforms — stories, reels, vlogs, and live events from the heart of Amritsar.
        </p>
        <div className="section-divider" />
      </div>

      <div className="social-cards-wrapper">
        {SOCIALS.map((s) => (
          <a
            key={s.platform}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-card"
            id={`social-${s.platform.toLowerCase()}`}
            style={{
              '--card-accent': s.accent,
              '--card-accent-muted': s.accentMuted,
              opacity: 0,
              transform: 'translateX(-40px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.4s ease, border-color 0.4s ease',
            } as React.CSSProperties}
          >
            <div className="social-card-icon">{s.icon}</div>

            <div className="social-card-info">
              <div className="social-card-platform">{s.platform}</div>
              <div className="social-card-name">{s.name}</div>
              <div className="social-card-meta">{s.meta}</div>
            </div>

            <div className="social-card-followers">
              <strong>{s.followers}</strong>
              <span>followers</span>
            </div>

            <span className="social-card-arrow">→</span>
          </a>
        ))}
      </div>
    </section>
  );
}
