'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';

interface MuseumDetail {
  id: string;
  title: string;
  extract: string;
  thumbnail: string | null;
  originalimage: string | null;
  pageUrl: string;
  category: string;
  bestTime: string;
  timeRequired: string;
  highlights: string[];
  entryFee: string;
  timings: string;
  address: string;
  mapUrl: string;
  bulletPoints: string[];
}

export default function MuseumDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [museum, setMuseum] = useState<MuseumDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchMuseum = async () => {
      try {
        const res = await fetch(`/api/museums/${id}`);
        const data = await res.json();
        setMuseum(data.museum || null);
      } catch (e) {
        console.error('Failed to fetch museum:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchMuseum();
  }, [id]);

  const copyAddress = () => {
    if (museum?.address) {
      navigator.clipboard.writeText(museum.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="detail-loader">
        <div className="detail-loader-ring" />
        <p>Loading museum details...</p>
      </div>
    );
  }

  if (!museum) {
    return (
      <div className="detail-not-found">
        <h1>Museum Not Found</h1>
        <p>The museum you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/#museums" className="btn-gold">← Back to Museums</Link>
      </div>
    );
  }

  const img = museum.originalimage || museum.thumbnail;

  return (
    <div className="detail-page">
      {/* Back navigation */}
      <Link href="/#museums" className="detail-back-btn">
        ← Back to Amritsar
      </Link>

      {/* Hero Section */}
      <div className="detail-hero">
        {img ? (
          <img src={img} alt={museum.title} className="detail-hero-img" referrerPolicy="no-referrer" />
        ) : (
          <div className="detail-hero-placeholder">🏛️</div>
        )}
        <div className="detail-hero-overlay">
          <span className="detail-hero-category">{museum.category}</span>
          <h1 className="detail-hero-title">{museum.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="detail-content">
        {/* Info Panel */}
        <aside className="detail-info-panel">
          <h3 className="detail-panel-title">📌 Visitor Info</h3>

          <div className="detail-info-grid">
            {museum.timings && (
              <div className="detail-info-item">
                <span className="detail-info-icon">🕐</span>
                <div>
                  <strong>Timings</strong>
                  <p>{museum.timings}</p>
                </div>
              </div>
            )}
            {museum.entryFee && (
              <div className="detail-info-item">
                <span className="detail-info-icon">🎟️</span>
                <div>
                  <strong>Entry Fee</strong>
                  <p>{museum.entryFee}</p>
                </div>
              </div>
            )}
            {museum.timeRequired && (
              <div className="detail-info-item">
                <span className="detail-info-icon">⏱️</span>
                <div>
                  <strong>Time Required</strong>
                  <p>{museum.timeRequired}</p>
                </div>
              </div>
            )}
            {museum.bestTime && (
              <div className="detail-info-item">
                <span className="detail-info-icon">☀️</span>
                <div>
                  <strong>Best Time to Visit</strong>
                  <p>{museum.bestTime}</p>
                </div>
              </div>
            )}
          </div>

          {museum.address && (
            <div className="detail-address">
              <div className="detail-address-header">
                <span>📍 Address</span>
                <button className="detail-copy-btn" onClick={copyAddress}>
                  {copied ? '✅ Copied!' : '📋 Copy'}
                </button>
              </div>
              <p>{museum.address}</p>
            </div>
          )}

          {museum.mapUrl && (
            <a href={museum.mapUrl} target="_blank" rel="noopener noreferrer" className="detail-map-btn">
              🗺️ Open in Google Maps
            </a>
          )}
        </aside>

        {/* Main Content */}
        <main className="detail-main">
          {/* Description */}
          <section className="detail-section">
            <h2 className="detail-section-title">📖 History & Overview</h2>
            <p className="detail-description">{museum.extract}</p>
          </section>

          {/* Highlights */}
          {museum.highlights && museum.highlights.length > 0 && (
            <section className="detail-section">
              <h2 className="detail-section-title">✨ Highlights</h2>
              <div className="detail-highlights-grid">
                {museum.highlights.map((h, i) => (
                  <div key={i} className="detail-highlight-card">
                    <span className="detail-highlight-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Bullet Points / Traveler Tips */}
          {museum.bulletPoints && museum.bulletPoints.length > 0 && (
            <section className="detail-section">
              <h2 className="detail-section-title">💡 Traveler Tips & Facts</h2>
              <ul className="detail-tips-list">
                {museum.bulletPoints.map((tip, i) => (
                  <li key={i} className="detail-tip-item">
                    <span className="detail-tip-marker">→</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* External Link */}
          <div className="detail-external-links">
            <a href={museum.pageUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
              📖 Read Full Wikipedia Article
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
