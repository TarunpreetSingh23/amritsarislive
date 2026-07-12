'use client';

import { useEffect, useState, use, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Clock,
  Ticket,
  Timer,
  Sun,
  MapPin,
  Copy,
  Check,
  Map,
  BookOpen,
  Sparkles,
  Lightbulb,
  Pin,
  Landmark,
} from 'lucide-react';

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
  const [imgLoaded, setImgLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Fetch Museum Data (Keep API exactly the same)
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

  // Parallax Scroll Event Listener
  useEffect(() => {
    if (loading || !museum) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, museum]);

  // Scroll-Reveal Intersection Observer
  useEffect(() => {
    if (loading || !museum) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target); // Animate only once
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [loading, museum]);

  // Clipboard Copier
  const copyAddress = () => {
    if (museum?.address) {
      navigator.clipboard.writeText(museum.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Memoize Sidebar Information Items to prevent unnecessary renders
  const infoItems = useMemo(() => {
    if (!museum) return [];
    return [
      { icon: <Clock size={18} />, label: 'Timings', value: museum.timings },
      { icon: <Ticket size={18} />, label: 'Entry Fee', value: museum.entryFee },
      { icon: <Timer size={18} />, label: 'Time Required', value: museum.timeRequired },
      { icon: <Sun size={18} />, label: 'Best Time to Visit', value: museum.bestTime },
    ].filter((i) => i.value);
  }, [museum]);

  // Elegant Luxury Loading Screen
  if (loading) {
    return (
      <div className="mon-loader-container">
        <style>{`
          .mon-loader-container {
            min-height: 100vh;
            background-color: #F5F4F1;
            background-image: 
              radial-gradient(circle at 10% 20%, rgba(201, 161, 74, 0.03) 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(94, 49, 32, 0.03) 0%, transparent 40%),
              linear-gradient(135deg, #F5F4F1 0%, #E8E2D8 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            font-family: 'Poppins', sans-serif;
          }
          @keyframes mon-spin { to { transform: rotate(360deg); } }
          @keyframes mon-pulse { 0%,100%{opacity:1; transform: scale(1);} 50%{opacity:0.6; transform: scale(0.98);} }
          .mon-loader-spinner {
            width: 64px;
            height: 64px;
            border: 3px solid rgba(201, 161, 74, 0.15);
            border-top: 3px solid #C9A14A;
            border-radius: 50%;
            animation: mon-spin 0.9s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          }
          .mon-loader-text {
            color: #5E3120;
            font-size: 0.95rem;
            font-weight: 600;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            animation: mon-pulse 2s ease-in-out infinite;
          }
        `}</style>
        <div className="mon-loader-spinner" />
        <p className="mon-loader-text">Loading Museum</p>
      </div>
    );
  }

  // Elegant Luxury Not Found Screen
  if (!museum) {
    return (
      <div className="mon-notfound-container">
        <style>{`
          .mon-notfound-container {
            min-height: 100vh;
            background-color: #F5F4F1;
            background-image: 
              radial-gradient(circle at 10% 20%, rgba(201, 161, 74, 0.03) 0%, transparent 40%),
              radial-gradient(circle at 90% 80%, rgba(94, 49, 32, 0.03) 0%, transparent 40%),
              linear-gradient(135deg, #F5F4F1 0%, #E8E2D8 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 24px;
            font-family: 'Poppins', sans-serif;
            text-align: center;
            padding: 24px;
          }
          .mon-notfound-icon {
            color: #5E3120;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: mon-float 6s ease-in-out infinite;
          }
          .mon-notfound-title {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            color: #5E3120;
            font-weight: 700;
            margin: 0;
          }
          .mon-notfound-text {
            color: #666666;
            font-size: 1.05rem;
            max-w: 400px;
            margin: 0;
            line-height: 1.6;
          }
          .mon-notfound-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: linear-gradient(135deg, #C9A14A, #B58F3B);
            color: #FFFFFF;
            font-weight: 700;
            padding: 14px 32px;
            border-radius: 50px;
            text-decoration: none;
            font-size: 0.95rem;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            box-shadow: 0 8px 24px rgba(201, 161, 74, 0.25);
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          .mon-notfound-btn:hover {
            transform: translateY(-3px) scale(1.03);
            box-shadow: 0 12px 30px rgba(201, 161, 74, 0.35);
          }
          @keyframes mon-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
        <div className="mon-notfound-icon">
          <Landmark size={80} strokeWidth={1.25} />
        </div>
        <h1 className="mon-notfound-title">Museum Not Found</h1>
        <p className="mon-notfound-text">This museum doesn&apos;t exist or has been relocated to another gallery.</p>
        <Link href="/#museums" className="mon-notfound-btn">
          ← Back to Museums
        </Link>
      </div>
    );
  }

  const img = museum.originalimage || museum.thumbnail;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

        /* ===================== THEME VARIABLES ===================== */
        :root {
          --primary: #5E3120;
          --dark: #23201C;
          --bg-color: #F5F4F1;
          --card-bg: #FFFFFF;
          --light-border: #E8E2D8;
          --gold: #C9A14A;
          --gold-glow: rgba(201, 161, 74, 0.35);
          --blue-accent: #6F9DD0;
          --text: #2F2F2F;
          --text-secondary: #666666;
          --text-muted: #888888;
          
          --font-serif: 'Playfair Display', Georgia, serif;
          --font-sans: 'Poppins', 'Inter', system-ui, sans-serif;
          
          --shadow-sm: 0 2px 8px rgba(35, 32, 28, 0.04);
          --shadow-md: 0 10px 30px rgba(35, 32, 28, 0.06);
          --shadow-lg: 0 20px 50px rgba(35, 32, 28, 0.09);
          
          --transition-smooth: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          --transition-bounce: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* ===================== BASE TYPOGRAPHY ===================== */
        .mon-page {
          font-family: var(--font-sans);
          color: var(--text);
          background-color: var(--bg-color);
          line-height: 1.6;
        }

        .mon-title-serif {
          font-family: var(--font-serif);
          font-weight: 700;
          color: var(--primary);
        }

        .mon-text-secondary {
          color: var(--text-secondary);
          font-size: 17px;
        }

        .mon-text-muted {
          color: var(--text-muted);
          font-size: 14px;
        }

        /* ===================== HERO ===================== */
        .mon-hero {
          position: relative;
          height: 520px;
          border-radius: 32px;
          overflow: hidden;
          margin: 20px 0 48px;
          border: 1px solid var(--light-border);
          box-shadow: var(--shadow-lg);
          z-index: 2;
        }

        .mon-hero-img-container {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
          background: #E8E2D8;
        }

        .mon-hero-img {
          width: 100%;
          height: 115%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          transition: transform 0.15s ease-out;
          will-change: transform;
          display: block;
        }

        .mon-hero-img-loaded {
          animation: mon-scaleIn 0.85s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .mon-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(35, 32, 28, 0.95) 0%, rgba(35, 32, 28, 0.4) 45%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 56px 48px;
          z-index: 2;
        }

        .mon-hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(201, 161, 74, 0.15);
          border: 1px solid rgba(201, 161, 74, 0.4);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: var(--gold);
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          padding: 8px 20px;
          border-radius: 50px;
          margin-bottom: 18px;
          width: fit-content;
          box-shadow: 0 4px 12px rgba(201, 161, 74, 0.1);
        }

        .mon-hero-title {
          font-family: var(--font-serif);
          font-size: 64px;
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1.1;
          text-shadow: 0 4px 20px rgba(35, 32, 28, 0.4);
          max-w: 800px;
        }

        .mon-hero-rule {
          width: 80px;
          height: 3px;
          border-radius: 2px;
          background: linear-gradient(90deg, var(--gold), rgba(201, 161, 74, 0));
          margin-top: 20px;
        }

        /* ===================== SIDEBAR ===================== */
        .mon-sidebar {
          display: flex;
          flex-direction: column;
          gap: 24px;
          z-index: 2;
        }

        /* ===================== CARDS (PREMIUM) ===================== */
        .mon-card {
          background: var(--card-bg);
          border: 1px solid var(--light-border);
          border-radius: 24px;
          padding: 36px;
          box-shadow: var(--shadow-md);
          transition: var(--transition-smooth);
          position: relative;
          overflow: hidden;
          z-index: 1;
        }

        .mon-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          border: 2px solid transparent;
          background: linear-gradient(135deg, var(--gold), transparent) border-box;
          -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: destination-out;
          mask-composite: exclude;
          opacity: 0;
          transition: var(--transition-smooth);
          pointer-events: none;
        }

        .mon-card:hover {
          transform: translateY(-6px) rotate(0.5deg);
          box-shadow: var(--shadow-lg), 0 12px 30px rgba(201, 161, 74, 0.08);
          border-color: rgba(201, 161, 74, 0.35);
        }

        .mon-card:hover::after {
          opacity: 1;
        }

        .mon-panel-heading {
          display: flex;
          align-items: center;
          gap: 14px;
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--light-border);
        }

        .mon-panel-heading-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(201, 161, 74, 0.15), rgba(201, 161, 74, 0.03));
          border: 1px solid rgba(201, 161, 74, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          transition: transform 0.5s ease;
        }

        .mon-card:hover .mon-panel-heading-icon {
          transform: rotate(360deg);
        }

        .mon-info-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid var(--light-border);
          transition: var(--transition-smooth);
        }

        .mon-info-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .mon-info-row:hover {
          transform: translateX(4px);
        }

        .mon-info-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          flex-shrink: 0;
          background: linear-gradient(135deg, rgba(201, 161, 74, 0.15), rgba(201, 161, 74, 0.05));
          border: 1px solid rgba(201, 161, 74, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          transition: transform 0.4s ease;
        }

        .mon-info-row:hover .mon-info-icon-box {
          transform: scale(1.1) rotate(15deg);
        }

        .mon-info-lbl {
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--gold);
          display: block;
          margin-bottom: 4px;
        }

        .mon-info-val {
          font-size: 17px;
          font-weight: 600;
          color: var(--text);
          line-height: 1.4;
        }

        .mon-addr-box {
          background: rgba(232, 226, 216, 0.3);
          border: 1px solid var(--light-border);
          border-radius: 18px;
          padding: 20px;
          transition: var(--transition-smooth);
        }

        .mon-addr-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .mon-addr-label {
          font-size: 14px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--primary);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .mon-copy-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--card-bg);
          border: 1px solid var(--light-border);
          color: var(--primary);
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          padding: 6px 12px;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: var(--transition-bounce);
        }

        .mon-copy-btn:hover {
          background: var(--primary);
          color: var(--card-bg);
          border-color: var(--primary);
          transform: scale(1.05);
        }

        .mon-addr-text {
          font-size: 17px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* ===================== BUTTONS ===================== */
        .mon-map-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: linear-gradient(135deg, var(--gold), #B58F3B);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 17px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          padding: 18px;
          border-radius: 20px;
          text-decoration: none;
          box-shadow: 0 8px 24px rgba(201, 161, 74, 0.3);
          transition: var(--transition-bounce);
          position: relative;
          overflow: hidden;
          z-index: 1;
          border: none;
        }

        .mon-map-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
          transform: skewX(-25deg);
          transition: 0.75s;
        }

        .mon-map-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 14px 35px rgba(201, 161, 74, 0.45);
        }

        .mon-map-btn:hover::before {
          left: 150%;
        }

        .mon-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--primary);
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 10px 0;
          transition: var(--transition-smooth);
          position: relative;
        }

        .mon-back-btn::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 48px;
          width: 0;
          height: 2px;
          background-color: var(--gold);
          transition: var(--transition-smooth);
        }

        .mon-back-btn:hover {
          color: var(--gold);
          transform: translateX(-4px);
        }

        .mon-back-btn:hover::after {
          width: calc(100% - 48px);
        }

        .mon-back-arrow {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1.5px solid var(--light-border);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--card-bg);
          box-shadow: var(--shadow-sm);
          transition: var(--transition-smooth);
        }

        .mon-back-btn:hover .mon-back-arrow {
          background: var(--primary);
          color: #FFFFFF;
          border-color: var(--primary);
        }

        /* ===================== MAIN LAYOUT ===================== */
        .mon-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }

        .mon-main {
          display: flex;
          flex-direction: column;
          gap: 32px;
          z-index: 2;
        }

        .mon-sec-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 8px;
        }

        .mon-sec-title-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
        }

        .mon-sec-rule {
          width: 60px;
          height: 3px;
          border-radius: 2px;
          margin-bottom: 28px;
          background: linear-gradient(90deg, var(--gold), rgba(201, 161, 74, 0));
        }

        .mon-description {
          font-size: 17px;
          line-height: 1.85;
          color: var(--text-secondary);
          font-weight: 400;
        }

        /* Highlights Grid */
        .mon-highlights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 16px;
        }

        .mon-highlight-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(232, 226, 216, 0.25);
          border: 1px solid var(--light-border);
          border-radius: 18px;
          padding: 20px 24px;
          cursor: default;
          transition: var(--transition-smooth);
        }

        .mon-highlight-card:hover {
          background: var(--card-bg);
          border-color: var(--gold);
          transform: translateY(-3px) scale(1.02);
          box-shadow: var(--shadow-md);
        }

        .mon-hl-num {
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 900;
          background: linear-gradient(135deg, var(--gold), #B58F3B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          flex-shrink: 0;
        }

        .mon-hl-text {
          font-size: 17px;
          font-weight: 600;
          color: var(--text);
          line-height: 1.4;
        }

        /* Tips List */
        .mon-tips-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .mon-tip-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 18px 24px;
          border-radius: 18px;
          background: rgba(232, 226, 216, 0.25);
          border: 1px solid var(--light-border);
          font-size: 17px;
          line-height: 1.7;
          color: var(--text-secondary);
          transition: var(--transition-smooth);
        }

        .mon-tip-item:hover {
          background: var(--card-bg);
          border-color: var(--gold);
          transform: translateX(4px);
          box-shadow: var(--shadow-sm);
        }

        .mon-tip-marker {
          color: var(--gold);
          font-weight: 900;
          font-size: 20px;
          line-height: 1;
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* ===================== ANIMATIONS & SCROLL REVEAL ===================== */
        @keyframes mon-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.05); }
        }

        @keyframes mon-spin {
          to { transform: rotate(360deg); }
        }

        @keyframes mon-scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .delay-100 { transition-delay: 100ms !important; }
        .delay-200 { transition-delay: 200ms !important; }
        .delay-300 { transition-delay: 300ms !important; }

        @media (prefers-reduced-motion: reduce) {
          .reveal-on-scroll {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .mon-hero:hover .mon-hero-img {
            transform: none !important;
          }
          .mon-card:hover {
            transform: none !important;
          }
          .mon-orb {
            animation: none !important;
          }
        }

        /* ===================== RESPONSIVE BREAKPOINTS ===================== */
        @media (min-width: 960px) {
          .mon-layout {
            grid-template-columns: 340px 1fr;
            align-items: start;
          }
          .mon-sidebar-sticky {
            position: sticky;
            top: 88px;
            height: fit-content;
          }
        }

        @media (max-width: 959px) {
          .mon-hero {
            height: 400px;
            border-radius: 24px;
          }
          .mon-hero-title {
            font-size: 48px;
          }
          .mon-sec-title {
            font-size: 30px;
          }
        }

        @media (max-width: 640px) {
          .mon-hero {
            height: 320px;
            border-radius: 20px;
          }
          .mon-hero-overlay {
            padding: 32px 24px;
          }
          .mon-hero-title {
            font-size: 34px;
          }
          .mon-sec-title {
            font-size: 24px;
          }
          .mon-section {
            padding: 24px;
            border-radius: 20px;
          }
          .mon-card {
            padding: 24px;
          }
        }
      `}</style>

      <div className="mon-page-container">
        {/* Luxury Background Patterns & Floating Orbs */}
        <div className="mon-background-patterns" />
        {/* <div className="mon-orb" style={{ width: 500, height: 500, background: 'rgba(201, 161, 74, 0.06)', top: '-10%', right: '-5%' }} />
        <div className="mon-orb" style={{ width: 400, height: 400, background: 'rgba(94, 49, 32, 0.04)', bottom: '10%', left: '-5%', animationDelay: '-3s' }} /> */}

        <div className="mon-page" style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 24px 100px', position: 'relative', zIndex: 1 }}>

          {/* Back link */}
          <Link href="/#museums" className="mon-back-btn">
            <span className="mon-back-arrow">
              <ArrowLeft size={16} />
            </span>
            Back to Museums
          </Link>

          {/* Hero Banner with Zoom & Parallax */}
          <div className="mon-hero">
            <div className="mon-hero-img-container">
              {img ? (
                <img
                  src={img}
                  alt={museum.title}
                  className={`mon-hero-img${imgLoaded ? ' mon-hero-img-loaded' : ''}`}
                  referrerPolicy="no-referrer"
                  onLoad={() => setImgLoaded(true)}
                  style={{ transform: `scale(${imgLoaded ? 1.05 : 1}) translateY(${scrollY * 0.12}px)` }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #5E3120, #23201C)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>
                  <Landmark size={80} strokeWidth={1.5} />
                </div>
              )}
            </div>
            <div className="mon-hero-overlay">
              <div className="mon-hero-badge">
                <Landmark size={14} style={{ marginRight: '6px' }} /> {museum.category || 'Museum'}
              </div>
              <h1 className="mon-hero-title">{museum.title}</h1>
              <div className="mon-hero-rule" />
            </div>
          </div>

          {/* Layout Content Grid */}
          <div className="mon-layout">

            {/* Sidebar */}
            <aside className="mon-sidebar">
              <div className="mon-sidebar-sticky">
                
                {/* Visitor Info Card */}
                {infoItems.length > 0 && (
                  <div className="mon-card reveal-on-scroll delay-100" style={{ marginBottom: '24px' }}>
                    <div className="mon-panel-heading">
                      <div className="mon-panel-heading-icon">
                        <Pin size={18} />
                      </div>
                      Visitor Info
                    </div>
                    {infoItems.map((item, i) => (
                      <div key={i} className="mon-info-row">
                        <div className="mon-info-icon-box">{item.icon}</div>
                        <div>
                          <span className="mon-info-lbl">{item.label}</span>
                          <span className="mon-info-val">{item.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Address Info Card */}
                {museum.address && (
                  <div className="mon-card reveal-on-scroll delay-200" style={{ marginBottom: '24px' }}>
                    <div className="mon-addr-box">
                      <div className="mon-addr-top">
                        <span className="mon-addr-label">
                          <MapPin size={14} /> Address
                        </span>
                        <button className="mon-copy-btn" onClick={copyAddress}>
                          {copied ? (
                            <>
                              <Check size={12} /> Copied
                            </>
                          ) : (
                            <>
                              <Copy size={12} /> Copy
                            </>
                          )}
                        </button>
                      </div>
                      <p className="mon-addr-text">{museum.address}</p>
                    </div>
                  </div>
                )}

                {/* Google Maps Premium Button */}
                {museum.mapUrl && (
                  <a href={museum.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-gold mon-map-btn reveal-on-scroll delay-300" style={{ display: 'flex' }}>
                    <Map size={18} />
                    Open in Google Maps
                  </a>
                )}
              </div>
            </aside>

            {/* Main Content Areas */}
            <main className="mon-main">

              {/* History & Overview */}
              <section className="mon-card reveal-on-scroll">
                <h2 className="mon-sec-title">
                  <span className="mon-sec-title-icon">
                    <BookOpen size={24} />
                  </span>
                  History &amp; Overview
                </h2>
                <div className="mon-sec-rule" />
                <p className="mon-description">{museum.extract}</p>
              </section>

              {/* Highlights */}
              {museum.highlights && museum.highlights.length > 0 && (
                <section className="mon-card reveal-on-scroll">
                  <h2 className="mon-sec-title">
                    <span className="mon-sec-title-icon">
                      <Sparkles size={24} />
                    </span>
                    Highlights
                  </h2>
                  <div className="mon-sec-rule" />
                  <div className="mon-highlights-grid">
                    {museum.highlights.map((h, i) => (
                      <div 
                        key={i} 
                        className="mon-highlight-card"
                        style={{ transitionDelay: `${i * 100}ms` }}
                      >
                        <span className="mon-hl-num">{String(i + 1).padStart(2, '0')}</span>
                        <span className="mon-hl-text">{h}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Traveler Tips & Facts */}
              {museum.bulletPoints && museum.bulletPoints.length > 0 && (
                <section className="mon-card reveal-on-scroll">
                  <h2 className="mon-sec-title">
                    <span className="mon-sec-title-icon">
                      <Lightbulb size={24} />
                    </span>
                    Traveler Tips &amp; Facts
                  </h2>
                  <div className="mon-sec-rule" />
                  <ul className="mon-tips-list">
                    {museum.bulletPoints.map((tip, i) => (
                      <li 
                        key={i} 
                        className="mon-tip-item"
                        style={{ transitionDelay: `${i * 100}ms` }}
                      >
                        <span className="mon-tip-marker">→</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

            </main>
          </div>
        </div>
      </div>
    </>
  );
}
