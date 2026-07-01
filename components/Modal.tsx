'use client';
import { useEffect, useRef } from 'react';

interface MonumentData {
  id: string;
  title: string;
  extract: string;
  thumbnail: string | null;
  originalimage: string | null;
  pageUrl: string;
}

interface ModalProps {
  monument: MonumentData | null;
  onClose: () => void;
}

export default function Modal({ monument, onClose }: ModalProps) {
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
          <div className="modal-badge">Heritage Site · Amritsar</div>
          <h2 className="modal-title"
            dangerouslySetInnerHTML={{ __html: monument.title }}
          />
          <p className="modal-text">{monument.extract}</p>

          <div className="modal-actions">
            <a
              href={monument.pageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              📖 Read Full History
            </a>
            <button className="btn-outline" onClick={onClose}>
              ← Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
