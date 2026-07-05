'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Modal from './Modal';

interface Museum {
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

const MUSEUM_EMOJIS: Record<string, string> = {
  'war-memorial': '🎖️',
  'company-bagh-palace': '🏰',
  'partition-museum': '📜',
  'ranjit-singh-panorama': '🎨',
  'digital-sikh-museum': '📱',
};

export default function Museums() {
  const [museums, setMuseums] = useState<Museum[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Museum | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const fetchMuseums = useCallback(async () => {
    try {
      const res = await fetch('/api/museums');
      const data = await res.json();
      setMuseums(data.museums || []);
    } catch (e) {
      console.error('Failed to fetch museums:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMuseums();
  }, [fetchMuseums]);

  return (
    <>
      <section className="section monuments-section" id="museums" ref={sectionRef} style={{ background: '#fff' }}>
        <div className="section-header">
          <span className="section-label">Art & Archives</span>
          <h2 className="section-title"><span>Museums</span> of Amritsar</h2>
          <p className="section-desc">
            Explore state-of-the-art archives, historic military exhibitions, and galleries that capture the memory of Punjab.
          </p>
          <div className="section-divider" />
        </div>

        {loading ? (
          <div className="monuments-grid">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: 16, overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
              }}>
                <div className="skeleton" style={{ height: 180 }} />
                <div style={{ padding: 20 }}>
                  <div className="skeleton" style={{ height: 18, marginBottom: 12 }} />
                  <div className="skeleton" style={{ height: 14, marginBottom: 8 }} />
                  <div className="skeleton" style={{ height: 14, width: '70%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="monuments-grid">
            {museums.map((m) => (
              <div
                key={m.id}
                className="monument-card"
                onClick={() => setSelected(m)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${m.title}`}
                id={`museum-${m.id}`}
                style={{
                  transition: 'box-shadow 0.4s ease, border-color 0.4s ease, transform 0.4s ease',
                  borderColor: 'rgba(212,175,55,0.15)',
                }}
                onKeyDown={(e) => e.key === 'Enter' && setSelected(m)}
              >
                <div className="monument-img-wrap">
                  {m.thumbnail ? (
                    <img
                      src={m.thumbnail}
                      alt={m.title}
                      className="monument-img"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="monument-img-placeholder">
                      {MUSEUM_EMOJIS[m.id] || '🏛️'}
                    </div>
                  )}
                </div>

                <div className="monument-card-body">
                  <h3
                    className="monument-card-title"
                    dangerouslySetInnerHTML={{ __html: m.title }}
                  />
                  <p className="monument-card-excerpt">{m.extract}</p>
                </div>

                <div className="monument-card-footer">
                  <span className="monument-card-tag" style={{ background: 'rgba(212,175,55,0.1)', color: '#8B6914' }}>
                    {m.category || 'Gallery'}
                  </span>
                  <Link
                    href={`/museums/${m.id}`}
                    className="monument-read-more"
                    style={{ color: '#8B6914' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Detail Modal */}
      {selected && (
        <Modal
          monument={selected}
          onClose={() => setSelected(null)}
          type="museum"
        />
      )}
    </>
  );
}
