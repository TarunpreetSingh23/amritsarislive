'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

interface MonumentData {
  id: string;
  title: string;
  extract: string;
  thumbnail: string | null;
  originalimage: string | null;
  pageUrl: string;
  category?: string;
  bestTime?: string;
  timeRequired?: string;
  highlights?: string[];
  entryFee?: string;
  timings?: string;
  address?: string;
  mapUrl?: string;
  bulletPoints?: string[];
}

interface ModalProps {
  monument: MonumentData | null;
  onClose: () => void;
  type?: 'monument' | 'museum';
}

export default function Modal({ monument, onClose, type = 'monument' }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!monument) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [monument, onClose]);

  if (!monument) return null;

  const img = monument.originalimage || monument.thumbnail;
  const detailHref = type === 'museum'
    ? `/museums/${monument.id}`
    : `/monuments/${monument.id}`;

  return (
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={monument.title}
    >
      <div className="modal-box" style={{ position: 'relative' }}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        {img ? (
          <img
            src={img}
            alt={monument.title}
            className="modal-img"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div style={{
            width: '100%', height: '220px',
            background: 'linear-gradient(135deg, #1C1C1E, #2C2C2E)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '4rem', borderRadius: '20px 20px 0 0',
          }}>🏛️</div>
        )}

        <div className="modal-body">
          <div className="modal-badge">{monument.category || 'Heritage Site'} · Amritsar</div>
          <h2 className="modal-title"
            dangerouslySetInnerHTML={{ __html: monument.title }}
          />

          {/* Quick Info Pills */}
          {(monument.timings || monument.entryFee || monument.timeRequired) && (
            <div className="modal-pills">
              {monument.timings && (
                <span className="modal-pill">
                  🕐 {monument.timings}
                </span>
              )}
              {monument.entryFee && (
                <span className="modal-pill">
                  🎟️ {monument.entryFee}
                </span>
              )}
              {monument.timeRequired && (
                <span className="modal-pill">
                  ⏱️ {monument.timeRequired}
                </span>
              )}
            </div>
          )}

          {/* Highlights Badges */}
          {monument.highlights && monument.highlights.length > 0 && (
            <div className="modal-highlights">
              {monument.highlights.slice(0, 4).map((h, i) => (
                <span key={i} className="modal-highlight-badge">✦ {h}</span>
              ))}
            </div>
          )}

          <p className="modal-text">{monument.extract}</p>

          <div className="modal-actions flex  w-full justify-center">
            <Link
              href={detailHref}
              className="btn-gold"
              onClick={onClose}
            >
              🗺️ View Full Interactive Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
