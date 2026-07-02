'use client';
import { useEffect, useRef, useState } from 'react';
import { MapPin, Utensils, Play, X } from 'lucide-react';

// Custom Instagram SVG to fix the lucide-react export error
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

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
    reelUrl: 'https://www.instagram.com/reel/C-LCgYbPhbB/?igsh=MWV3anlqbDk4NTRwMA==',
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
    description: "Amritsar's best pindi chole bhature — fluffy, deep-fried bhature paired with tangy chole, garnished with fresh onions and pickle.",
    specialty: 'Chole Bhature & Lassi',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Chole_bhature.jpg/800px-Chole_bhature.jpg',
    reelUrl: 'https://www.instagram.com/reel/C0000000006/embed',
    location: 'Majitha Road, Amritsar',
  },
];

export default function FoodPlaces() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeReel, setActiveReel] = useState<FoodPlace | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeReel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveReel(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeReel]);

  return (
    <section className="relative py-24 px-6 sm:px-12 bg-[#F9F8F5]" id="food" ref={sectionRef}>
      
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <span className="text-[#D4AF37] font-bold tracking-widest uppercase text-sm mb-3 block">
          Culinary Heritage
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1A1A] mb-6">
          Famous <span className="italic font-light text-[#6B6B67]">Food Places</span>
        </h2>
        <p className="text-gray-500 text-lg leading-relaxed">
          From the golden lanes near Darbar Sahib to the bustling chowks — taste the flavours that define the soul of Amritsar.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-8 opacity-70" />
      </div>

      {/* Grid Section */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FOOD_PLACES.map((place, index) => (
          <div
            key={place.id}
            className={`group bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(212,175,55,0.15)] transition-all duration-500 border border-gray-100 flex flex-col
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            `}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            {/* Image Wrapper */}
            <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => setActiveReel(place)}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <img
                src={place.img}
                alt={place.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                loading="lazy"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(place.name)}&background=F9F8F5&color=D4AF37&size=400`;
                }}
              />
              
              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#8B6914]">
                  {place.category}
                </span>
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg text-[#D4AF37] transform scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Play className="w-6 h-6 ml-1" fill="currentColor" />
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-2xl font-serif font-bold text-[#1A1A1A] mb-2 group-hover:text-[#D4AF37] transition-colors">
                {place.name}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-grow">
                {place.description}
              </p>
              
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPin className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  {place.location}
                </div>
                <div className="flex items-center text-sm font-medium text-[#8B6914]">
                  <Utensils className="w-4 h-4 mr-2" />
                  {place.specialty}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modern Glassmorphic Modal */}
      {activeReel && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setActiveReel(null)}
        >
          <div 
            className="relative w-full max-w-md bg-[#121212] rounded-3xl overflow-hidden shadow-2xl border border-white/10 animate-[scaleIn_0.2s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-black transition-colors"
              onClick={() => setActiveReel(null)}
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent z-40 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#D4AF37] overflow-hidden">
                <img src={activeReel.img} alt={activeReel.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm leading-tight">{activeReel.name}</h4>
                <p className="text-white/70 text-xs">{activeReel.category}</p>
              </div>
            </div>

            {/* Reel Content Placeholder (Blurred Background variant) */}
            <div className="relative aspect-[9/16] w-full flex flex-col items-center justify-center overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center blur-xl opacity-40 scale-110"
                style={{ backgroundImage: `url(${activeReel.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
              
              <div className="relative z-10 flex flex-col items-center text-center px-6">
                <div className="w-20 h-20 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-full p-1 mb-6 animate-pulse">
                  <div className="w-full h-full bg-[#121212] rounded-full flex items-center justify-center">
                    <InstagramIcon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Watch the Reel</h3>
                <p className="text-white/60 text-sm mb-8">
                  Experience the making of {activeReel.specialty} on Instagram.
                </p>
                <a
                  href="https://www.instagram.com/explore/tags/amritsarfood/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <Play className="w-4 h-4" fill="currentColor" />
                  Open in Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Required for Modal Animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}} />
    </section>
  );
}