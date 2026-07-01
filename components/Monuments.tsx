'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Modal from './Modal';

interface Monument {
  id: string;
  title: string;
  extract: string;
  thumbnail: string | null;
  originalimage: string | null;
  pageUrl: string;
}

const MONUMENT_EMOJIS: Record<string, string> = {
  Harmandir_Sahib: '🕌',
  Jallianwala_Bagh: '🌹',
  Durgiana_Temple: '🛕',
  Gobindgarh_Fort: '🏰',
  'Ram_Bagh,_Amritsar': '🌳',
  Wagah: '🚩',
  Akal_Takht: '⚔️',
  Mata_Lal_Devi_Temple: '🪔',
};

export default function Monuments() {
  const [monuments, setMonuments] = useState<Monument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Monument | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const fetchMonuments = useCallback(async () => {
    try {
      const res = await fetch('/api/monuments');
      const data = await res.json();
      setMonuments(data.monuments || []);
    } catch (e) {
      console.error('Failed to fetch monuments:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMonuments();
  }, [fetchMonuments]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.monument-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [monuments]);

  return (
    <>
      <section className="section monuments-section" id="monuments" ref={sectionRef}>
        <div className="section-header">
          <span className="section-label">Heritage & History</span>
          <h2 className="section-title"><span>Monuments</span> of Amritsar</h2>
          <p className="section-desc">
            Click any monument to uncover its full history, architecture, and significance.
          </p>
          <div className="section-divider" />
        </div>

        {loading ? (
          <div className="monuments-grid">
            {Array.from({ length: 6 }).map((_, i) => (
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
            {monuments.map((m) => (
              <div
                key={m.id}
                className="monument-card"
                onClick={() => setSelected(m)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${m.title}`}
                id={`monument-${m.id}`}
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.4s ease, border-color 0.4s ease',
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
                    />
                  ) : (
                    <div className="monument-img-placeholder">
                      {MONUMENT_EMOJIS[m.id] || '🏛️'}
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
                  <span className="monument-card-tag">Heritage</span>
                  <span className="monument-read-more">Read more →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Modal monument={selected} onClose={() => setSelected(null)} />
    </>
  );
}
