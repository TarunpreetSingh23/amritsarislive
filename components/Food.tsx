'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Modal from './Modal';

interface FoodPlace {
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

const FOOD_EMOJIS: Record<string, string> = {
  'kesar-da-dhaba': '🍲',
  'bhai-kulwant-singh-kulcha': '🥞',
  'beera-chicken-house': '🍗',
  'gurdas-ram-jalebi': '🍯',
  'giani-tea-stall': '☕',
  'ahuja-milk-bhandar': '🥛',
};

export default function Food() {
  const [foodPlaces, setFoodPlaces] = useState<FoodPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<FoodPlace | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const fetchFood = useCallback(async () => {
    try {
      const res = await fetch('/api/food');
      const data = await res.json();
      setFoodPlaces(data.food || []);
    } catch (e) {
      console.error('Failed to fetch food places:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFood();
  }, [fetchFood]);

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
  }, [foodPlaces]);

  return (
    <>
      <section className="section monuments-section" id="food" ref={sectionRef} style={{ background: '#fff' }}>
        <div className="section-header">
          <span className="section-label">Flavors & Tradition</span>
          <h2 className="section-title"><span>Food Places</span> of Amritsar</h2>
          <p className="section-desc">
            Explore legendary culinary institutions, famous street dhabas, and traditional sweets of the culinary capital.
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
            {foodPlaces.map((f) => (
              <div
                key={f.id}
                className="monument-card"
                onClick={() => setSelected(f)}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${f.title}`}
                id={`food-${f.id}`}
                style={{
                  opacity: 0,
                  transform: 'translateY(30px)',
                  transition: 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.4s ease, border-color 0.4s ease',
                  borderColor: 'rgba(212,175,55,0.15)',
                }}
                onKeyDown={(e) => e.key === 'Enter' && setSelected(f)}
              >
                <div className="monument-img-wrap">
                  {f.thumbnail ? (
                    <img
                      src={f.thumbnail}
                      alt={f.title}
                      className="monument-img"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="monument-img-placeholder">
                      {FOOD_EMOJIS[f.id] || '🍲'}
                    </div>
                  )}
                </div>

                <div className="monument-card-body">
                  <h3
                    className="monument-card-title"
                    dangerouslySetInnerHTML={{ __html: f.title }}
                  />
                  <p className="monument-card-excerpt">{f.extract}</p>
                </div>

                <div className="monument-card-footer">
                  <span className="monument-card-tag" style={{ background: 'rgba(212,175,55,0.1)', color: '#8B6914' }}>
                    {f.category || 'Culinary'}
                  </span>
                  <Link
                    href={`/food/${f.id}`}
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
          type="food"
        />
      )}
    </>
  );
}
