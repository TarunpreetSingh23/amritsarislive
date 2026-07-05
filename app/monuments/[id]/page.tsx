'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';

interface MonumentDetail {
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

export default function MonumentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [monument, setMonument] = useState<MonumentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchMonument = async () => {
      try {
        const res = await fetch(`/api/monuments/${id}`);
        const data = await res.json();
        setMonument(data.monument || null);
      } catch (e) {
        console.error('Failed to fetch monument:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchMonument();
  }, [id]);

  const copyAddress = () => {
    if (monument?.address) {
      navigator.clipboard.writeText(monument.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="detail-loader">
        <div className="detail-loader-ring" />
        <p>Loading monument details...</p>
      </div>
    );
  }

  if (!monument) {
    return (
      <div className="detail-not-found">
        <h1>Monument Not Found</h1>
        <p>The monument you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/#monuments" className="btn-gold">← Back to Monuments</Link>
      </div>
    );
  }

  const img = monument.originalimage || monument.thumbnail;

  return (
    <div className="detail-page">
      {/* Back navigation */}
      <Link href="/#monuments" className="detail-back-btn">
        ← Back to Amritsar
      </Link>

      {/* Hero Section */}
      <div className="detail-hero">
        {img ? (
          <img src={img} alt={monument.title} className="detail-hero-img" referrerPolicy="no-referrer" />
        ) : (
          <div className="detail-hero-placeholder">🏛️</div>
        )}
        <div className="detail-hero-overlay">
          <span className="detail-hero-category">{monument.category}</span>
          <h1 className="detail-hero-title">{monument.title}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="detail-content">
        {/* Info Panel */}
        <aside className="detail-info-panel">
          <h3 className="detail-panel-title">📌 Visitor Info</h3>

          <div className="detail-info-grid">
            {monument.timings && (
              <div className="detail-info-item">
                <span className="detail-info-icon">🕐</span>
                <div>
                  <strong>Timings</strong>
                  <p>{monument.timings}</p>
                </div>
              </div>
            )}
            {monument.entryFee && (
              <div className="detail-info-item">
                <span className="detail-info-icon">🎟️</span>
                <div>
                  <strong>Entry Fee</strong>
                  <p>{monument.entryFee}</p>
                </div>
              </div>
            )}
            {monument.timeRequired && (
              <div className="detail-info-item">
                <span className="detail-info-icon">⏱️</span>
                <div>
                  <strong>Time Required</strong>
                  <p>{monument.timeRequired}</p>
                </div>
              </div>
            )}
            {monument.bestTime && (
              <div className="detail-info-item">
                <span className="detail-info-icon">☀️</span>
                <div>
                  <strong>Best Time to Visit</strong>
                  <p>{monument.bestTime}</p>
                </div>
              </div>
            )}
          </div>

          {monument.address && (
            <div className="detail-address">
              <div className="detail-address-header">
                <span>📍 Address</span>
                <button className="detail-copy-btn" onClick={copyAddress}>
                  {copied ? '✅ Copied!' : '📋 Copy'}
                </button>
              </div>
              <p>{monument.address}</p>
            </div>
          )}

          {monument.mapUrl && (
            <a href={monument.mapUrl} target="_blank" rel="noopener noreferrer" className="detail-map-btn">
              🗺️ Open in Google Maps
            </a>
          )}
        </aside>

        {/* Main Content */}
        <main className="detail-main">
          {/* Description */}
          <section className="detail-section">
            <h2 className="detail-section-title">📖 History & Overview</h2>
            <p className="detail-description">{monument.extract}</p>
          </section>

          {/* Highlights */}
          {monument.highlights && monument.highlights.length > 0 && (
            <section className="detail-section">
              <h2 className="detail-section-title">✨ Highlights</h2>
              <div className="detail-highlights-grid">
                {monument.highlights.map((h, i) => (
                  <div key={i} className="detail-highlight-card">
                    <span className="detail-highlight-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Bullet Points / Traveler Tips */}
          {monument.bulletPoints && monument.bulletPoints.length > 0 && (
            <section className="detail-section">
              <h2 className="detail-section-title">💡 Traveler Tips & Facts</h2>
              <ul className="detail-tips-list">
                {monument.bulletPoints.map((tip, i) => (
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
            <a href={monument.pageUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
              📖 Read Full Wikipedia Article
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
