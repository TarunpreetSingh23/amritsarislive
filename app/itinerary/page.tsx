'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Compass,
  Ticket,
  ChevronRight,
  Navigation,
  MapPin,
  Sun,
  Moon,
  Sunrise,
  Coffee,
  Star,
} from 'lucide-react';

import monumentsData from '../../monuments.json';
import museumsData from '../../museums.json';
import foodData from '../../food.json';

interface ItineraryStop {
  id: string;
  type: 'monument' | 'museum';
  title: string;
  category: string;
  timeSlot: string;
  duration: string;
  cost: string;
  description: string;
  tip: string;
  image?: string | null;
  address?: string;
  dbId?: string;
  dbType?: 'monument' | 'museum' | 'food';
}

interface DaySummary {
  totalStops: number;
  totalHours: string;
  theme: string;
  tagline: string;
  icon: React.ReactNode;
}

export default function ItineraryPage() {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3 | 4>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Smooth tab switch with fade transition
  const handleDaySwitch = (day: 1 | 2 | 3 | 4) => {
    if (day === activeDay) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveDay(day);
      window.scrollTo(0, 0);
      setIsTransitioning(false);
    }, 300);
  };

  // Intersection Observer for scroll-reveal animations — re-run when tab changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      const elements = document.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => {
        el.classList.remove('reveal-visible');
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [activeDay]);

  // Helper to enrich stop data from JSON
  const enrichStop = (id: string, type: 'monument' | 'museum' | 'food') => {
    if (type === 'monument') {
      const m = monumentsData.find((x) => x.id === id);
      return {
        dbId: id,
        dbType: 'monument' as const,
        image: m?.images?.[0] ?? null,
        address: m?.address ?? ''
      };
    } else if (type === 'museum') {
      const m = museumsData.find((x) => x.image === id || x.id === id);
      return {
        dbId: m?.id ?? id,
        dbType: 'museum' as const,
        image: m?.image ?? null,
        address: m?.address ?? ''
      };
    } else if (type === 'food') {
      const f = foodData.find((x) => x.id === id);
      return {
        dbId: id,
        dbType: 'food' as const,
        image: f?.image ?? null,
        address: f?.address ?? ''
      };
    }
    return {};
  };

  // ========================= DAY 1 DATA =========================
  const day1Stops: ItineraryStop[] = useMemo(
    () => [
      {
        id: 'arrival',
        type: 'monument',
        title: 'Arrival & Check-in',
        category: 'Logistics',
        timeSlot: 'Afternoon / Evening',
        duration: 'Varies',
        cost: 'Varies',
        description: 'Arrive in Amritsar, check into your hotel, and settle in. Prepare for a spiritually rich and culinary tour ahead.',
        tip: 'Keep your camera ready for the vibrant city streets and heritage architecture!',
      },
      {
        id: 'lunch-arrival',
        type: 'monument',
        title: 'Lunch at Local Dhaba',
        category: 'Culinary',
        timeSlot: '01:30 PM – 02:30 PM',
        duration: '1 Hour',
        cost: '₹300 for two',
        description: 'Have a hearty traditional lunch at your hotel or a local dhaba like Bharawan Da Dhaba or Kesar Da Dhaba.',
        tip: 'Save some appetite for the delicious street food in the evening!',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'gurdwara-shaheedan',
        type: 'monument',
        title: 'Gurdwara Shaheedan Sahib',
        category: 'Spiritual Shrine',
        timeSlot: '03:30 PM – 04:30 PM',
        duration: '1 Hour',
        cost: 'Free Entry',
        description: 'Visit the sacred Gurdwara Shaheedan Sahib, dedicated to Baba Deep Singh Ji. It is a highly revered shrine carrying deep history and immense spiritual energy.',
        tip: 'Head covering is mandatory inside the temple complex. Scarves are provided at the entrance.',
        image: '/baba.jpg',
      },
      {
        id: 'beera-samosa-snack',
        type: 'monument',
        title: 'Beera’s Satpura snack',
        category: 'Famous Snacks',
        timeSlot: '05:00 PM – 05:45 PM',
        duration: '45 Minutes',
        cost: '₹50 for two',
        description: 'Stop at the legendary Beera Samosa Wala in Atta Mandi and enjoy their famous crispy Satpura (multi-layered pastry) served with warm potato curry.',
        tip: 'Try their fresh piping hot samosas as well.',
        ...enrichStop('beera-samosa-wala', 'food'),
        image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'guru-ka-mahal',
        type: 'monument',
        title: 'Guru Ka Mahal',
        category: 'Heritage Landmark',
        timeSlot: '06:15 PM – 07:00 PM',
        duration: '45 Minutes',
        cost: 'Free Entry',
        description: 'Visit Guru Ka Mahal, the historical house built by Guru Ram Das Ji. This is the Janam Asthan (birthplace) of Guru Tegh Bahadur Ji.',
        tip: 'It is situated in the old city lanes near the Golden Temple, perfect for a short walking tour.',
        image: '/mahal.jpg',
      },
      {
        id: 'sukh-asan',
        type: 'monument',
        title: 'Attend Sukh Asan at Golden Temple',
        category: 'Spiritual Ceremony',
        timeSlot: '09:30 PM – 10:30 PM',
        duration: '1 Hour',
        cost: 'Free Entry',
        description: 'Attend the peaceful Sukh Asan ceremony at the Golden Temple, where the holy Guru Granth Sahib is carried in a golden palanquin back to its resting room.',
        tip: 'Stand along the bridge early to catch a clear view of the palanquin processional.',
        ...enrichStop('Harmandir_Sahib', 'monument'),
        image: '/sukh-asan.jpg',
      },
      {
        id: 'kesar-dhaba-dinner',
        type: 'monument',
        title: 'Dinner at Kesar Da Dhaba',
        category: 'Culinary Heritage',
        timeSlot: '10:30 PM – 11:30 PM',
        duration: '1 Hour',
        cost: '₹400 for two',
        description: 'Enjoy a traditional dinner of slow-cooked Dal Makhani, buttery lachha parathas, and shahi paneer at Kesar Da Dhaba or Bharawan Da Dhaba.',
        tip: 'Dal Makhani is simmered for 12 hours here in clay pots. Be prepared for narrow lanes leading to the dhaba.',
        image: '/kesar.jpg',
      },
    ],
    []
  );

  // ========================= DAY 2 DATA =========================
  const day2Stops: ItineraryStop[] = useMemo(
    () => [
      {
        id: 'amrit-vela',
        type: 'monument',
        title: 'Amrit Vela Prakash at Golden Temple',
        category: 'Spiritual Ceremony',
        timeSlot: '03:30 AM – 05:00 AM',
        duration: '1.5 Hours',
        cost: 'Free Entry',
        description: 'Witness the early morning Prakash ceremony at the Golden Temple when the holy Guru Granth Sahib is brought out to the main sanctum.',
        tip: 'It is the most serene and peaceful time of the day to experience the spiritual core of the shrine.',
        ...enrichStop('Harmandir_Sahib', 'monument'),
        image: '/golden-temple1.jpg',
      },
      {
        id: 'langar-breakfast',
        type: 'monument',
        title: 'Breakfast at Langar',
        category: 'Culinary Community',
        timeSlot: '07:30 AM – 08:30 AM',
        duration: '1 Hour',
        cost: 'Free Entry',
        description: 'Partake in the Guru Ka Langar, a massive community kitchen serving free vegetarian meals to all visitors without discrimination.',
        tip: 'Sit cross-legged on the floor mat and enjoy the hot dal, roti, and kheer prepared by volunteers.',
        image: '/l.webp',
      },
      {
        id: 'Jallianwala_Bagh',
        type: 'monument',
        title: 'Visit Jallianwala Bagh',
        category: 'Historic Memorial',
        timeSlot: '09:30 AM – 10:45 AM',
        duration: '1.25 Hours',
        cost: 'Free Entry',
        description: 'Walk through the historic walled public garden where the 1919 massacre occurred. Bullet marks are still preserved in the walls.',
        tip: 'Read the memorial plaques along the narrow entryway used by General Dyer\'s troops.',
        ...enrichStop('Jallianwala_Bagh', 'monument'),
        image: '/jb.jpg',
      },
      {
        id: 'partition-museum',
        type: 'museum',
        title: 'Explore the Partition Museum',
        category: 'History Museum',
        timeSlot: '11:00 AM – 01:00 PM',
        duration: '2 Hours',
        cost: '₹10 Indians · ₹100 Foreign',
        description: 'Explore the world\'s first museum dedicated to the 1947 Partition of British India, housed in the restored Town Hall building.',
        tip: 'Oral survivor stories in the later galleries are deeply moving. Take your time.',
        ...enrichStop('partition-museum', 'museum'),
        image: '/partition-museum.jpg',
      },
      {
        id: 'war-memorial',
        type: 'museum',
        title: 'Visit War Heroes’ Memorial and Museum',
        category: 'Military Museum',
        timeSlot: '02:00 PM – 03:30 PM',
        duration: '1.5 Hours',
        cost: '₹30 Adults · ₹10 Children',
        description: 'Visit the state war heroes\' memorial museum showcasing military history. Features a massive 45-meter-high stainless steel sword monument.',
        tip: 'Perfect place to appreciate the bravery of Punjab soldiers from ancient times to the modern era.',
        ...enrichStop('war-memorial', 'museum'),
        image: '/w.jpg',
      },
      {
        id: 'Wagah',
        type: 'monument',
        title: 'Watch Wagah Border Beating Retreat',
        category: 'National Landmark',
        timeSlot: '04:30 PM – 07:00 PM',
        duration: '2.5 Hours',
        cost: 'Free Entry',
        description: 'Watch the high-stepping military ceremony and border retreat drills between the Indian BSF and Pakistani Rangers.',
        tip: 'Arrive early by 3:30 PM to claim good seats. Large bags are not allowed in the stadium.',
        ...enrichStop('Wagah', 'monument'),
        image: '/wb.jpg',
      },
      {
        id: 'brothers-dhaba-dinner',
        type: 'monument',
        title: 'Dinner at Brothers Dhaba',
        category: 'Culinary Spot',
        timeSlot: '08:30 PM – 09:30 PM',
        duration: '1 Hour',
        cost: '₹400 for two',
        description: 'Have a traditional Punjabi dinner at Brothers Dhaba near Town Hall.',
        tip: 'Try their special stuffed Amritsari parathas and badam milk.',
        image: '/bro.webp',
      },
    ],
    []
  );

  // ========================= DAY 3 DATA =========================
  const day3Stops: ItineraryStop[] = useMemo(
    () => [
      {
        id: 'shastri-market',
        type: 'monument',
        title: 'Shop at Shastri Market',
        category: 'Shopping Bazaars',
        timeSlot: '10:00 AM – 11:30 AM',
        duration: '1.5 Hours',
        cost: 'Varies',
        description: 'Shop for traditional colorful Punjabi suits, Phulkari embroidery, and handcrafted Punjabi juttis in the old market lanes.',
        tip: 'Bargaining is expected. It is best to shop early to avoid heavy daytime crowds.',
        image: '/s.jpg',
      },
      {
        id: 'kulcha-lunch',
        type: 'monument',
        title: 'Enjoy Amritsari Kulcha & Lassi',
        category: 'Culinary Landmark',
        timeSlot: '12:00 PM – 01:00 PM',
        duration: '1 Hour',
        cost: '₹200 for two',
        description: 'Enjoy a classic crispy wood-fired Amritsari Kulcha topped with butter and served with chole and a tall glass of thick, creamy lassi.',
        tip: 'Gian Chand Lassi on Cooper Road is highly recommended after your kulcha meal.',
        ...enrichStop('gian-chand-lassi', 'food'),
        image: '/gian.jpg',
      },
      {
        id: 'Durgiana_Temple',
        type: 'monument',
        title: 'Visit Durgiana Temple',
        category: 'Spiritual Shrine',
        timeSlot: '01:30 PM – 02:30 PM',
        duration: '1 Hour',
        cost: 'Free Entry',
        description: 'Visit the sacred Durgiana Hindu Temple, architecturally similar to the Golden Temple, built inside a water tank.',
        tip: 'Also known as the Silver Temple due to its stunning silver doors and carved marble exterior.',
        ...enrichStop('Durgiana_Temple', 'monument'),
        image: 'https://res.cloudinary.com/dstgn8brb/image/upload/v1784091001/2023_08_22_17_49_IMG_8407_wljo0r.jpg',
      },
      {
        id: 'Mata_Lal_Devi_Temple',
        type: 'monument',
        title: 'Visit Mata Lal Devi Temple',
        category: 'Unique Shrine',
        timeSlot: '03:00 PM – 04:00 PM',
        duration: '1 Hour',
        cost: 'Free Entry',
        description: 'Navigate the artificial cave labyrinths and mirrored corridors in this unique temple dedicated to Mata Lal Devi.',
        tip: 'Be prepared to crawl through small sections of the cave. Kids love this labyrinth!',
        ...enrichStop('Mata_Lal_Devi_Temple', 'monument'),
        image: '/mld.jpg',
      },
      {
        id: 'ram-tirath',
        type: 'monument',
        title: 'Visit Ram Tirath Temple',
        category: 'Heritage Spot',
        timeSlot: '04:30 PM – 05:30 PM',
        duration: '1 Hour',
        cost: 'Free Entry',
        description: 'Visit the ancient Ram Tirath Temple, associated with the Ramayana, believed to be the place where Luv and Kush were born.',
        tip: 'It has a large sacred pool surrounding the temple complex, perfect for a sunset walk.',
        ...enrichStop('Ram_Tirth', 'monument'),
        image: '/ram-tirth.jpg',
      },
      {
        id: 'sadda-pind',
        type: 'monument',
        title: 'Spend Afternoon at Sadda Pind',
        category: 'Cultural Village',
        timeSlot: '06:00 PM – 09:00 PM',
        duration: '3 Hours',
        cost: '₹700 (includes dinner)',
        description: 'Experience the traditional village life of Punjab at Sadda Pind. Enjoy bhangra performances, local crafts, and a traditional dinner.',
        tip: 'Keep at least 3 hours to explore the full village. The ticket includes interactive cultural activities.',
        image: '/sada.png',
      },
      {
        id: 'Gobindgarh_Fort',
        type: 'monument',
        title: 'Gobindgarh Fort Laser Show',
        category: 'Military Heritage',
        timeSlot: '09:15 PM – 10:00 PM',
        duration: '45 Minutes',
        cost: '₹150',
        description: 'Stroll through the 18th-century Gobindgarh Fort and watch the Sher-e-Punjab light & sound mapping show.',
        tip: 'The show starts after dark on the fort walls. Book tickets in advance.',
        ...enrichStop('Gobindgarh_Fort', 'monument'),
        image: '/laser.jpg',
      },
    ],
    []
  );

  // ========================= DAY 4 DATA =========================
  const day4Stops: ItineraryStop[] = useMemo(
    () => [
      {
        id: 'checkout',
        type: 'monument',
        title: 'Check out from Hotel',
        category: 'Logistics',
        timeSlot: '09:00 AM – 09:30 AM',
        duration: '30 Minutes',
        cost: 'Varies',
        description: 'Pack your luggage, check out from the hotel, and prepare for departure.',
        tip: 'You can store your bags at the hotel cloakroom while completing the yatra.',
        // image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'panj-sarovar-yatra',
        type: 'monument',
        title: 'Visit sacred Five Sarovars of Amritsar',
        category: 'Spiritual Yatra',
        timeSlot: '10:00 AM – 01:30 PM',
        duration: '3.5 Hours',
        cost: 'Free Entry',
        description: 'Complete the sacred Panj Sarovar Yatra by visiting the five holy pools of Amritsar: Bibeksar Sahib, Ramsar Sahib, Harmandir Sahib, Santokhsar Sahib, and Kaulsar Sahib.',
        tip: 'It is a highly auspicious spiritual yatra in Amritsar. Walk peacefully through each gurdwara.',
        // ...enrichStop('Harmandir_Sahib', 'monument'),
        image: '/5s.jpg',
      },
      {
        id: 'prayers-yatra',
        type: 'monument',
        title: 'Offer Prayers & Yatra Completion',
        category: 'Spiritual',
        timeSlot: '01:30 PM – 02:00 PM',
        duration: '30 Minutes',
        cost: 'Free Entry',
        description: 'Offer prayers at the final stop of the yatra, receive karah prasad, and complete your yatra rituals.',
        tip: 'Maintain silence and reflect on your trip.',
        image: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'departure',
        type: 'monument',
        title: 'Departure & Onward Journey',
        category: 'Logistics',
        timeSlot: '03:00 PM onward',
        duration: 'Varies',
        cost: 'Varies',
        description: 'Collect your luggage and depart for your onward journey back home.',
        tip: 'We hope you had a wonderful and spiritually fulfilling trip to Amritsar!',
      },
    ],
    []
  );

  const activeStops = useMemo(() => {
    switch (activeDay) {
      case 1:
        return day1Stops;
      case 2:
        return day2Stops;
      case 3:
        return day3Stops;
      case 4:
        return day4Stops;
      default:
        return day1Stops;
    }
  }, [activeDay, day1Stops, day2Stops, day3Stops, day4Stops]);

  const daySummaries: Record<1 | 2 | 3 | 4, DaySummary> = {
    1: {
      totalStops: 7,
      totalHours: '~12 Hours',
      theme: 'Arrival & Spiritual Evening',
      tagline: 'Settle in, explore the Gurdwara of Baba Deep Singh, and attend the night Sukh Asan.',
      icon: <Sun size={24} />,
    },
    2: {
      totalStops: 7,
      totalHours: '~15 Hours',
      theme: 'Heritage & Border Experience',
      tagline: 'Attend Amrit Vela, learn local war history, and witness the Wagah border beating retreat.',
      icon: <Sunrise size={24} />,
    },
    3: {
      totalStops: 7,
      totalHours: '~12 Hours',
      theme: 'Temples, Food & Culture',
      tagline: 'Traditional shopping, iconic kulchas, cave labyrinths, and Sadda Pind Punjabi village.',
      icon: <Star size={24} />,
    },
    4: {
      totalStops: 4,
      totalHours: '~6 Hours',
      theme: 'Panj Sarovar Yatra & Departure',
      tagline: 'Complete the sacred yatra across five holy sarovars before departing home.',
      icon: <Compass size={24} />,
    },
  };

  const summary = daySummaries[activeDay];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:wght@300;400;500;600;700;800&display=swap');

        /* ======================== THEME VARIABLES ======================== */
        :root {
          --primary: #5E3120;
          --dark: #23201C;
          --bg-color: #F5F4F1;
          --card-bg: #FFFFFF;
          --light-border: #E8E2D8;
          --gold: #C9A14A;
          --gold-muted: #B58F3B;
          --gold-glow: rgba(201, 161, 74, 0.3);
          --blue-accent: #6F9DD0;
          --text: #2F2F2F;
          --text-secondary: #666666;
          --text-muted: #888888;

          --font-serif: 'Playfair Display', Georgia, serif;
          --font-sans: 'Poppins', 'Inter', system-ui, sans-serif;

          --shadow-sm: 0 2px 8px rgba(35, 32, 28, 0.05);
          --shadow-md: 0 8px 28px rgba(35, 32, 28, 0.07);
          --shadow-lg: 0 20px 56px rgba(35, 32, 28, 0.10);

          --transition-smooth: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          --transition-bounce: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* ======================== PAGE BASE ======================== */
        .iti-page {
          font-family: var(--font-sans);
          color: var(--text);
          background-color: var(--bg-color);
          line-height: 1.6;
          min-height: 100vh;
        }

        .iti-page-wrapper {
          position: relative;
          background-color: var(--bg-color);
          background-image:
            radial-gradient(ellipse at 12% 8%, rgba(201, 161, 74, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 88% 90%, rgba(94, 49, 32, 0.04) 0%, transparent 50%);
          overflow-x: clip;
        }

        /* Geometric pattern overlay */
        .iti-pattern-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.12;
          z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A14A' stroke-width='0.4' stroke-opacity='0.35'%3E%3Ccircle cx='40' cy='40' r='30'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='0' cy='0' r='15'/%3E%3Ccircle cx='80' cy='0' r='15'/%3E%3Ccircle cx='0' cy='80' r='15'/%3E%3Ccircle cx='80' cy='80' r='15'/%3E%3C/g%3E%3C/svg%3E");
        }

        .iti-ambient-orb {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(100px);
          z-index: 0;
        }

        /* ======================== INNER CONTENT ======================== */
        .iti-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 24px 120px;
          position: relative;
          z-index: 1;
        }

        /* ======================== BACK BUTTON ======================== */
        .mon-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--primary);
          text-decoration: none;
          font-size: 13px;
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
          flex-shrink: 0;
        }

        .mon-back-btn:hover .mon-back-arrow {
          background: var(--primary);
          color: #FFFFFF;
          border-color: var(--primary);
        }

        /* ======================== HERO HEADER ======================== */
        .iti-hero {
          text-align: center;
          max-width: 780px;
          margin: 48px auto 56px;
          padding: 0 24px;
        }

        .iti-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(201, 161, 74, 0.1);
          border: 1px solid rgba(201, 161, 74, 0.3);
          color: var(--gold-muted);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          padding: 8px 20px;
          border-radius: 100px;
          margin-bottom: 20px;
        }

        .iti-hero-title {
          font-family: var(--font-serif);
          font-size: 56px;
          font-weight: 800;
          line-height: 1.1;
          color: var(--primary);
          margin-bottom: 20px;
        }

        .iti-hero-title span {
          background: linear-gradient(135deg, var(--gold), var(--gold-muted));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .iti-hero-desc {
          font-size: 17px;
          color: var(--text-secondary);
          line-height: 1.75;
          max-width: 620px;
          margin: 0 auto;
        }

        /* Gold ornament divider */
        .iti-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          max-width: 320px;
          margin: 28px auto;
        }

        .iti-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--gold), transparent);
        }

        .iti-divider-diamond {
          width: 8px;
          height: 8px;
          background: var(--gold);
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        /* ======================== TAB SWITCHER ======================== */
        .iti-tabs-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 56px;
          gap: 15px;
          position: sticky;
          top: 0px;
          z-index: 45;
          padding: 12px 0;
          background: rgba(245, 244, 241, 0.9);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          width: 100%;
        }

        .iti-tabs {
          display: flex;
          gap: 8px;
          background: var(--card-bg);
          border: 1px solid var(--light-border);
          border-radius: 100px;
          padding: 6px;
          box-shadow: var(--shadow-sm);
        }

        .iti-tab-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 15px;
          padding: 14px 32px;
          border-radius: 100px;
          cursor: pointer;
          transition: var(--transition-bounce);
          white-space: nowrap;
        }

        .iti-tab-btn:hover {
          color: var(--primary);
          background: rgba(94, 49, 32, 0.04);
        }

        .iti-tab-btn-active {
          background: linear-gradient(135deg, var(--primary), #482315) !important;
          color: #FFFFFF !important;
          box-shadow: 0 4px 16px rgba(94, 49, 32, 0.2);
        }

        /* ======================== DAY SUMMARY CARD ======================== */
        .iti-day-summary {
          background: linear-gradient(135deg, var(--primary) 0%, #3D1E0F 100%);
          border-radius: 24px;
          padding: 36px 40px;
          margin-bottom: 72px;
          display: flex;
          gap: 40px;
          align-items: center;
          flex-wrap: wrap;
          position: relative;
          overflow: hidden;
          box-shadow: var(--shadow-lg);
        }

        .iti-day-summary::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='0.5'%3E%3Ccircle cx='30' cy='30' r='25'/%3E%3Ccircle cx='30' cy='30' r='12'/%3E%3Ccircle cx='0' cy='0' r='12'/%3E%3Ccircle cx='60' cy='60' r='12'/%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
          border-radius: 24px;
        }

        .iti-day-summary-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(201, 161, 74, 0.2);
          border: 2px solid rgba(201, 161, 74, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gold);
          flex-shrink: 0;
        }

        .iti-day-summary-text {
          flex: 1;
          min-width: 200px;
        }

        .iti-day-summary-theme {
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 6px;
        }

        .iti-day-summary-tagline {
          font-size: 15px;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.6;
        }

        .iti-day-stats {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
        }

        .iti-day-stat {
          text-align: center;
          min-width: 72px;
        }

        .iti-day-stat-value {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--gold);
          display: block;
          line-height: 1;
          margin-bottom: 4px;
        }

        .iti-day-stat-label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.5);
        }

        /* ======================== TIMELINE (ROAD) ======================== */
        .iti-timeline {
          position: relative;
          max-width: 960px;
          margin: 0 auto;
        }

        /* Fade transition when switching days */
        .iti-timeline-fade-out {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.25s ease, transform 0.25s ease;
        }

        .iti-timeline-fade-in {
          opacity: 1;
          transform: translateY(0);
          transition: opacity 0.35s ease 0.05s, transform 0.35s ease 0.05s;
        }

        /* ─── Single Stop Row ─── */
        .iti-stop {
          display: flex;
          gap: 0;
          position: relative;
          margin-bottom: 0;
        }

        /* ─── Road Centre Column ─── */
        .road-col {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 72px;
          flex-shrink: 0;
          position: relative;
          z-index: 2;
        }

        /* Circular Milestone Node */
        .road-node {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary), #3D1E0F);
          border: 4px solid var(--gold);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-serif);
          font-weight: 800;
          font-size: 20px;
          box-shadow: var(--shadow-md), 0 0 18px var(--gold-glow);
          transition: var(--transition-bounce);
          position: relative;
          cursor: default;
          flex-shrink: 0;
        }

        .iti-stop:hover .road-node {
          transform: scale(1.18);
          background: linear-gradient(135deg, var(--gold), var(--gold-muted));
          border-color: var(--primary);
          box-shadow: var(--shadow-lg), 0 0 28px var(--gold-glow);
        }

        /* Animated road connector between nodes */
        .road-connector {
          width: 20px;
          flex-grow: 1;
          min-height: 100px;
          background: linear-gradient(to bottom, #2A2420, #3A3028);
          position: relative;
          border-left: 1.5px solid rgba(255, 255, 255, 0.08);
          border-right: 1.5px solid rgba(255, 255, 255, 0.08);
        }

        /* Dashed centre line */
        .road-connector::after {
          content: '';
          position: absolute;
          inset-block: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 2.5px;
          background-image: repeating-linear-gradient(
            to bottom,
            #FFFFFF 0px,
            #FFFFFF 10px,
            transparent 10px,
            transparent 20px
          );
          animation: road-flow 0.7s linear infinite;
        }

        .iti-stop:last-child .road-connector {
          display: none;
        }

        /* ─── Card Column ─── */
        .stop-col {
          flex: 1;
          padding-left: 28px;
          padding-bottom: 64px;
        }

        .iti-stop:last-child .stop-col {
          padding-bottom: 0;
        }

        /* ─── Stop Card ─── */
        .stop-card {
          background: var(--card-bg);
          border: 1px solid var(--light-border);
          border-radius: 20px;
          padding: 30px 32px;
          box-shadow: var(--shadow-md);
          transition: var(--transition-smooth);
          position: relative;
          overflow: hidden;
        }

        /* Subtle gold left accent on card */
        .stop-card::before {
          content: '';
          position: absolute;
          left: 0;
          top: 20px;
          bottom: 20px;
          width: 4px;
          background: linear-gradient(to bottom, var(--gold), transparent);
          border-radius: 0 4px 4px 0;
          opacity: 0;
          transition: var(--transition-smooth);
        }

        .stop-card:hover {
          transform: translateX(6px);
          box-shadow: var(--shadow-lg);
          border-color: rgba(201, 161, 74, 0.3);
        }

        .stop-card:hover::before {
          opacity: 1;
        }

        /* Number badge top-right of card */
        .stop-num-badge {
          position: absolute;
          top: 24px;
          right: 28px;
          font-family: var(--font-serif);
          font-size: 64px;
          font-weight: 900;
          color: rgba(94, 49, 32, 0.04);
          line-height: 1;
          pointer-events: none;
          user-select: none;
          transition: var(--transition-smooth);
        }

        .stop-card:hover .stop-num-badge {
          color: rgba(201, 161, 74, 0.07);
        }

        .stop-card-image-container {
          width: 100%;
          height: 200px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 20px;
          border: 1px solid var(--light-border);
        }

        .stop-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: var(--transition-smooth);
        }

        .stop-card:hover .stop-card-image {
          transform: scale(1.04);
        }

        /* Category badge */
        .stop-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(94, 49, 32, 0.07);
          color: var(--primary);
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 12px;
        }

        /* Type indicator dot */
        .stop-type-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--gold);
        }

        .stop-title-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }

        .stop-title {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--primary);
          line-height: 1.3;
        }

        .stop-time-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(201, 161, 74, 0.09);
          border: 1px solid rgba(201, 161, 74, 0.22);
          color: #7A6030;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 100px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .stop-meta-row {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          border-top: 1px solid var(--light-border);
          border-bottom: 1px solid var(--light-border);
          padding: 12px 0;
          margin: 12px 0 18px;
          font-size: 13px;
          color: var(--text-secondary);
        }

        .stop-meta-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-weight: 500;
        }

        .stop-meta-item svg {
          color: var(--gold);
          flex-shrink: 0;
        }

        .stop-desc {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .stop-tip {
          display: flex;
          gap: 12px;
          background: linear-gradient(135deg, rgba(232, 226, 216, 0.4), rgba(245, 244, 241, 0.5));
          border: 1px solid rgba(201, 161, 74, 0.18);
          border-radius: 12px;
          padding: 16px 18px;
          margin-bottom: 24px;
        }

        .stop-tip-icon {
          font-size: 20px;
          flex-shrink: 0;
          line-height: 1.4;
        }

        .stop-tip-body {
          flex: 1;
        }

        .stop-tip-label {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--gold-muted);
          margin-bottom: 4px;
        }

        .stop-tip-text {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.65;
        }

        .stop-cta-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .stop-explore-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, var(--primary), #3D1E0F);
          color: #FFFFFF;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          padding: 12px 26px;
          border-radius: 100px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(94, 49, 32, 0.22);
          transition: var(--transition-bounce);
        }

        .stop-explore-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 8px 22px rgba(94, 49, 32, 0.28);
          background: linear-gradient(135deg, var(--gold), var(--gold-muted));
        }

        .stop-map-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 500;
        }

        .stop-map-tag svg {
          color: var(--gold);
        }

        /* ======================== ANIMATIONS ======================== */
        @keyframes road-flow {
          to { background-position-y: 20px; }
        }

        @keyframes iti-pulse {
          0%, 100% { box-shadow: var(--shadow-md), 0 0 18px var(--gold-glow); }
          50% { box-shadow: var(--shadow-lg), 0 0 32px rgba(201, 161, 74, 0.5); }
        }

        .road-node {
          animation: iti-pulse 4s ease-in-out infinite;
        }

        .iti-stop:hover .road-node {
          animation: none;
        }

        /* Scroll reveal */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .reveal-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        /* Staggered delays for stop cards */
        .iti-stop:nth-child(1) { transition-delay: 0ms; }
        .iti-stop:nth-child(2).reveal-on-scroll { transition-delay: 120ms; }
        .iti-stop:nth-child(3).reveal-on-scroll { transition-delay: 240ms; }
        .iti-stop:nth-child(4).reveal-on-scroll { transition-delay: 360ms; }
        .iti-stop:nth-child(5).reveal-on-scroll { transition-delay: 480ms; }

        /* ======================== RESPONSIVE ======================== */
        @media (max-width: 768px) {
          .iti-hero-title { font-size: 38px; }
          .iti-day-summary { padding: 24px; gap: 24px; }
          .iti-day-summary-theme { font-size: 20px; }
          .road-col { width: 48px; }
          .road-node { width: 44px; height: 44px; font-size: 16px; }
          .road-connector { width: 14px; }
          .stop-col { padding-left: 16px; }
          .stop-card { padding: 22px 20px; }
          .stop-title { font-size: 18px; }
          .iti-tabs {
            flex-direction: row;
            border-radius: 100px;
            overflow-x: auto;
            max-width: 100%;
            padding: 4px;
            gap: 6px;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          .iti-tabs::-webkit-scrollbar {
            display: none;
          }
          .iti-tab-btn {
            padding: 10px 18px;
            font-size: 13px;
            gap: 6px;
            flex-shrink: 0;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .iti-hero-title { font-size: 30px; }
          .iti-inner { padding: 24px 16px 80px; }
          .iti-day-stat-value { font-size: 22px; }
          .stop-meta-row { gap: 14px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-on-scroll, .reveal-visible {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .road-node { animation: none !important; }
          .road-connector::after { animation: none !important; }
        }
      `}</style>

      <div className="iti-page-wrapper">
        {/* Ambient Background */}
        <div className="iti-pattern-bg" />
        <div
          className="iti-ambient-orb"
          style={{ width: 600, height: 600, background: 'rgba(201,161,74,0.04)', top: '-15%', right: '-10%' }}
        />
        <div
          className="iti-ambient-orb"
          style={{ width: 500, height: 500, background: 'rgba(94,49,32,0.03)', bottom: '5%', left: '-12%' }}
        />

        <div className="iti-page">
          <div className="iti-inner">

            {/* Back Button */}
            <Link href="/" className="mon-back-btn">
              <span className="mon-back-arrow">
                <ArrowLeft size={16} />
              </span>
              Back to Home
            </Link>

            {/* ─── Hero Header ─── */}
            <header className="iti-hero reveal-on-scroll">
              <div className="iti-hero-eyebrow">
                <Compass size={14} />
                Plan Your Journey
              </div>
              <h1 className="iti-hero-title">
                Amritsar <span>Explorer</span> Itinerary
              </h1>
              <p className="iti-hero-desc">
                Handcrafted day-by-day routes through the most iconic spiritual, historical, and royal landmarks of Amritsar — optimised for time, distance, and wonder.
              </p>
              <div className="iti-divider">
                <div className="iti-divider-line" />
                <div className="iti-divider-diamond" />
                <div className="iti-divider-line" />
              </div>
            </header>

            {/* ─── Day Switcher Tabs ─── */}
            <div className="iti-tabs-section">
              <div className="iti-tabs">
                {[1, 2, 3, 4].map((dayNum) => (
                  <button
                    key={dayNum}
                    className={`iti-tab-btn ${activeDay === dayNum ? 'iti-tab-btn-active' : ''}`}
                    onClick={() => handleDaySwitch(dayNum as 1 | 2 | 3 | 4)}
                    aria-pressed={activeDay === dayNum}
                  >
                    {/* {dayNum === 1 && <Sunrise size={18} />}
                    {dayNum === 2 && <Calendar size={18} />}
                    {dayNum === 3 && <Star size={18} />}
                    {dayNum === 4 && <Compass size={18} />} */}
                    Day {dayNum}
                  </button>
                ))}
              </div>
            </div>

            {/* ─── Day Summary Banner ─── */}
            <div className={`iti-day-summary reveal-on-scroll ${isTransitioning ? 'iti-timeline-fade-out' : 'iti-timeline-fade-in'}`}>
              <div className="iti-day-summary-icon">
                {summary.icon}
              </div>
              <div className="iti-day-summary-text">
                <div className="iti-day-summary-theme">Day {activeDay}: {summary.theme}</div>
                <div className="iti-day-summary-tagline">{summary.tagline}</div>
              </div>
              <div className="iti-day-stats">
                <div className="iti-day-stat">
                  <span className="iti-day-stat-value">{summary.totalStops}</span>
                  <span className="iti-day-stat-label">Stops</span>
                </div>
                <div className="iti-day-stat">
                  <span className="iti-day-stat-value">{summary.totalHours}</span>
                  <span className="iti-day-stat-label">Total Time</span>
                </div>
                <div className="iti-day-stat">
                  <span className="iti-day-stat-value">Amritsar</span>
                  <span className="iti-day-stat-label">City</span>
                </div>
              </div>
            </div>

            {/* ─── Timeline Road ─── */}
            <div
              className={`iti-timeline ${isTransitioning ? 'iti-timeline-fade-out' : 'iti-timeline-fade-in'}`}
              key={activeDay}
            >
              {activeStops.map((stop, index) => {
                // Determine if this stop has a guide route in DB
                let href = '';
                if (stop.dbId && stop.dbType) {
                  if (stop.dbType === 'monument') {
                    href = `/monuments/${stop.dbId}`;
                  } else if (stop.dbType === 'museum') {
                    href = `/museums/${stop.dbId}`;
                  } else if (stop.dbType === 'food') {
                    href = `/food/${stop.dbId}`;
                  }
                }

                return (
                  <div
                    key={stop.id}
                    className="iti-stop reveal-on-scroll"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    {/* Road Column */}
                    <div className="road-col">
                      <div className="road-node">{index + 1}</div>
                      <div className="road-connector" />
                    </div>

                    {/* Card Column */}
                    <div className="stop-col">
                      <div className="stop-card">
                        {/* Ghost number background */}
                        <div className="stop-num-badge">{index + 1}</div>

                        {/* Category badge */}
                        <div className="stop-badge">
                          <span className="stop-type-dot" />
                          {stop.category}
                        </div>

                        {/* Title + Time chip */}
                        <div className="stop-title-row">
                          <h2 className="stop-title">{stop.title}</h2>
                          <span className="stop-time-chip">
                            <Clock size={12} />
                            {stop.timeSlot}
                          </span>
                        </div>

                        {/* Meta row */}
                        <div className="stop-meta-row">
                          <div className="stop-meta-item">
                            <Clock size={13} />
                            <span>Duration: <strong>{stop.duration}</strong></span>
                          </div>
                          <div className="stop-meta-item">
                            <Ticket size={13} />
                            <span>Entry: <strong>{stop.cost}</strong></span>
                          </div>
                          {stop.address && (
                            <div className="stop-meta-item">
                              <MapPin size={13} />
                              <span>{stop.address.split(',').slice(-2).join(',').trim()}</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="stop-desc">{stop.description}</p>

                        {/* Image display */}
                        {stop.image && (
                          <div className="stop-card-image-container">
                            <img src={stop.image} alt={stop.title} className="stop-card-image" loading="lazy" />
                          </div>
                        )}

                        {/* Traveler tip */}
                        <div className="stop-tip">
                          <div className="stop-tip-icon">💡</div>
                          <div className="stop-tip-body">
                            <div className="stop-tip-label">Pro Tip</div>
                            <div className="stop-tip-text">{stop.tip}</div>
                          </div>
                        </div>

                        {/* CTA / Address Row */}
                        {(href || stop.address) && (
                          <div className="stop-cta-row">
                            {href && (
                              <Link href={href} className="stop-explore-btn">
                                View Full Guide <ChevronRight size={15} />
                              </Link>
                            )}
                            {stop.address && (
                              <span className="stop-map-tag">
                                <MapPin size={13} />
                                {stop.address.split(',')[0]}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
