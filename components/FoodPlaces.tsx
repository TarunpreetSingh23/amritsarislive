'use client';
import { useEffect, useRef, useState } from 'react';

interface FoodPlace {
  id: string;
  name: string;
  category: string;
  description: string;
  specialty: string;
  img: string;
  reelUrl: string;
  location: string;
}

const FOOD_PLACES: FoodPlace[] = [
  {
    id: 'kanha-sweets',
    name: 'Kanha Sweets',
    category: 'Sweets & Desserts',
    description: 'The legendary home of Amritsari Kulcha. Crispy, buttery, and stuffed with spiced potatoes — a true Punjabi masterpiece.',
    specialty: 'Amritsari Kulcha & Lassi',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Amritsari_kulcha.jpg/800px-Amritsari_kulcha.jpg',
    reelUrl: 'https://www.instagram.com/reel/C0000000001/embed',
    location: 'Lawrence Road, Amritsar',
  },
  {
    id: 'brothers-dhaba',
    name: "Brothers' Dhaba",
    category: 'Punjabi Dhabha',
    description: 'Famous for authentic Punjabi dal makhani cooked overnight on slow wood fire, paired with fresh makki di roti.',
    specialty: 'Dal Makhani & Makki Roti',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Dal_makhani.jpg/800px-Dal_makhani.jpg',
    reelUrl: 'https://www.instagram.com/reel/C0000000002/embed',
    location: 'Near Golden Temple, Amritsar',
  },
  {
    id: 'crystal-restaurant',
    name: 'Crystal Restaurant',
    category: 'Multi-Cuisine',
    description: 'An Amritsar institution since 1972. Known for butter chicken that started a revolution, and their iconic fish fry.',
    specialty: 'Butter Chicken & Fish Fry',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG',
    reelUrl: 'https://www.instagram.com/reel/C0000000003/embed',
    location: 'Crystal Chowk, Amritsar',
  },
  {
    id: 'gurdas-ram',
    name: 'Gurdas Ram Jalebi',
    category: 'Street Food',
    description: 'A 100-year-old jalebi shop near the Golden Temple. Hot, crispy, sugar-dipped jalebis served with rabri — a spiritual experience.',
    specialty: 'Jalebi & Rabri',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Jalebi.jpg/800px-Jalebi.jpg',
    reelUrl: 'https://www.instagram.com/reel/C0000000004/embed',
    location: 'Hall Bazar, Amritsar',
  },
  {
    id: 'bharawan-da-dhaba',
    name: "Bharawan Da Dhaba",
    category: 'Heritage Dhabha',
    description: "Operating since 1912, this dhaba near the Golden Temple serves the most soul-warming sarson da saag and makki di roti.",
    specialty: 'Sarson Da Saag & Parantha',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Sarson_ka_saag.jpg/800px-Sarson_ka_saag.jpg',
    reelUrl: 'https://www.instagram.com/reel/C0000000005/embed',
    location: 'Town Hall Chowk, Amritsar',
  },
  {
    id: 'punjab-da-nasha',
    name: 'Punjab Da Nasha',
    category: 'Street Food',
    description: "Amritsar\'s best pindi chole bhature — fluffy, deep-fried bhature paired with tangy chole, garnished with fresh onions and pickle.",
    specialty: 'Chole Bhature & Lassi',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Chole_bhature.jpg/800px-Chole_bhature.jpg',
    reelUrl: 'https://www.instagram.com/reel/C0000000006/embed',
    location: 'Majitha Road, Amritsar',
  },
];

export default function FoodPlaces() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeReel, setActiveReel] = useState<FoodPlace | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.food-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, i * 120);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!activeReel) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveReel(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeReel]);

  return (
    <>
      <section className="food-section" id="food" ref={sectionRef}>
        <div className="section-header">
          <span className="section-label">Culinary Heritage</span>
          <h2 className="section-title">Famous <span>Food Places</span></h2>
          <p className="section-desc" style={{ color: '#999' }}>
            From the golden lanes near Darbar Sahib to the bustling chowks — taste the flavours that define Amritsar.
          </p>
          <div className="section-divider" />
        </div>

        <div className="food-grid">
          {FOOD_PLACES.map((place) => (
            <div
              key={place.id}
              className="food-card"
              id={`food-${place.id}`}
              style={{
                opacity: 0,
                transform: 'translateY(30px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.4s ease, border-color 0.4s ease',
              }}
            >
              <div className="food-card-img-wrap">
                <img
                  src={place.img}
                  alt={place.name}
                  className="food-card-img"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(place.name)}&background=1C1C1E&color=C9A227&size=400`;
                  }}
                />
                <div className="food-card-overlay" />
                <div className="food-reel-badge">
                  📸 Instagram
                </div>
              </div>

              <div className="food-card-body">
                <div className="food-card-tag">{place.category}</div>
                <h3 className="food-card-name">{place.name}</h3>
                <p className="food-card-desc">{place.description}</p>
                <p style={{ fontSize: '0.78rem', color: '#888', marginBottom: 14 }}>
                  📍 {place.location}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    className="food-reel-btn"
                    onClick={() => setActiveReel(place)}
                    id={`reel-${place.id}`}
                  >
                    ▶ View Instagram Reel
                  </button>
                  <span style={{
                    fontSize: '0.78rem', color: 'var(--gold-primary)',
                    display: 'flex', alignItems: 'center', gap: 4,
                  }}>
                    🍽 {place.specialty}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reel Modal */}
      {activeReel && (
        <div
          className="reel-modal-overlay"
          ref={overlayRef}
          onClick={(e) => e.target === overlayRef.current && setActiveReel(null)}
        >
          <div className="reel-iframe-wrap">
            <button className="reel-close" onClick={() => setActiveReel(null)}>✕</button>
            <div style={{ padding: '16px', background: '#1C1C1E', borderRadius: '12px 12px 0 0' }}>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', margin: 0 }}>
                📸 {activeReel.name}
              </p>
              <p style={{ color: '#888', fontSize: '0.75rem', margin: '4px 0 0' }}>
                {activeReel.specialty}
              </p>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, #833ab4, #fd1d1d)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', minHeight: 400, padding: 32, gap: 20,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '4rem' }}>📱</div>
              <p style={{ color: 'white', fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                {activeReel.name}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: 0 }}>
                {activeReel.specialty}
              </p>
              <a
                href={`https://www.instagram.com/explore/tags/amritsarfood/`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: 'white', color: '#833ab4', fontWeight: 700,
                  padding: '12px 24px', borderRadius: 30, textDecoration: 'none',
                  fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                📸 View on Instagram
              </a>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem', margin: 0 }}>
                📍 {activeReel.location}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
