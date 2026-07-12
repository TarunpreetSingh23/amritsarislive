'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  MapPin,
  Star,
  Utensils,
  ChevronRight,
  Award,
  Heart,
  Clock,
  Users,
  Quote,
  Store,
} from 'lucide-react';

interface FoodShop {
  name: string;
  location: string;
  since: string;
  rating: string;
  description: string;
  famousDishes: string[];
}

interface FoodItem {
  id: string;
  name: string;
  subtitle: string;
  emoji: string;
  category: string;
  description: string;
  whyLove: string;
  shops: FoodShop[];
  funFact: string;
}

const FOOD_ITEMS: FoodItem[] = [
  {
    id: 'amritsari-kulcha',
    name: 'Amritsari Kulcha',
    subtitle: 'The Golden Crisp',
    emoji: '🫓',
    category: 'Street Food Legend',
    description:
      'A crispy, buttery, stuffed flatbread baked in a clay oven (tandoor), filled with spiced mashed potatoes, paneer, or onions. Served piping hot with tangy chole (chickpea curry), fresh chutneys, and a generous pat of butter — this is the undisputed king of Amritsari breakfast.',
    whyLove:
      'The perfect marriage of flaky exterior and flavorful filling. Each bite is a symphony of textures and spices that has made it famous worldwide.',
    shops: [
      {
        name: 'Kanha Sweets',
        location: 'Lawrence Road, Amritsar',
        since: 'Founded 1950s',
        rating: '4.6/5',
        description:
          'The legendary destination for Amritsari Kulcha. Their kulchas are loaded with butter, perfectly crisp on the outside, and served with chole that has been slow-simmered to perfection.',
        famousDishes: ['Amritsari Kulcha', 'Chole Bhature', 'Lassi'],
      },
      {
        name: 'Kulcha King',
        location: 'Ranjit Avenue, Amritsar',
        since: 'Founded 1985',
        rating: '4.5/5',
        description:
          'A modern institution that has elevated the Amritsari Kulcha to an art form. Their innovative varieties include paneer-stuffed, onion-based, and even chocolate-filled kulchas.',
        famousDishes: ['Paneer Kulcha', 'Onion Kulcha', 'Special Tandoori Kulcha'],
      },
      {
        name: 'Bharawan Da Dhaba',
        location: 'Town Hall Chowk, Amritsar',
        since: 'Since 1912',
        rating: '4.7/5',
        description:
          'Operating for over a century near the Golden Temple, their kulchas are legendary among locals and tourists alike. The authentic taste of old Amritsar in every bite.',
        famousDishes: ['Amritsari Kulcha', 'Sarson Da Saag', 'Makki Di Roti'],
      },
    ],
    funFact: 'Amritsari Kulcha is so iconic that it was featured in the Netflix series "The World\'s Best Street Food" as one of India\'s must-try dishes.',
  },
  {
    id: 'sarson-da-saag',
    name: 'Sarson Da Saag & Makki Di Roti',
    subtitle: 'The Punjabi Soul Food',
    emoji: '🥬',
    category: 'Traditional Punjabi',
    description:
      'The quintessential winter delicacy of Punjab — slow-cooked mustard greens (sarson) tempered with garlic, ginger, and ghee, served with golden cornmeal flatbreads (makki di roti) slathered in white butter. A dollop of jaggery on the side completes the experience.',
    whyLove:
      'It\'s not just food — it\'s a celebration of Punjab\'s agricultural heritage. The smoky aroma of saag cooking for hours fills the air with pure nostalgia.',
    shops: [
      {
        name: 'Bharawan Da Dhaba',
        location: 'Town Hall Chowk, Amritsar',
        since: 'Since 1912',
        rating: '4.7/5',
        description:
          'The most iconic place to enjoy Sarson Da Saag in Amritsar. Cooked traditionally overnight on wood fire, their saag is creamy, flavorful, and served with unlimited makki di roti.',
        famousDishes: ['Sarson Da Saag', 'Makki Di Roti', 'Dal Makhani'],
      },
      {
        name: 'Kesar Da Dhaba',
        location: 'Near Golden Temple, Amritsar',
        since: 'Since 1916',
        rating: '4.6/5',
        description:
          'A historic dhaba that has served generations of pilgrims. Their Sarson Da Saag is made using a secret family recipe passed down through four generations.',
        famousDishes: ['Sarson Da Saag', 'Dal Tadka', 'Paneer Butter Masala'],
      },
      {
        name: 'Surjit Food Plaza',
        location: 'Majitha Road, Amritsar',
        since: 'Founded 1980',
        rating: '4.4/5',
        description:
          'A popular spot among locals for authentic Punjabi cuisine. Their winter special Sarson Da Saag draws crowds from across the city.',
        famousDishes: ['Sarson Da Saag', 'Makki Di Roti', 'Butter Chicken'],
      },
    ],
    funFact: 'Traditionally, Sarson Da Saag is cooked on a low flame for 6-8 hours. The longer it simmers, the richer and more flavorful it becomes!',
  },
  {
    id: 'dal-makhani',
    name: 'Dal Makhani',
    subtitle: 'The Royal Black Lentils',
    emoji: '🫘',
    category: 'Punjabi Dhaba Classic',
    description:
      'Whole black lentils (urad dal) slow-cooked overnight with cream, butter, and aromatic spices until they reach a velvety, rich consistency. This dish originated in Punjab and has become a global ambassador of Indian cuisine.',
    whyLove:
      'The creamy, buttery texture paired with the deep, smoky flavor from slow cooking on charcoal makes this dish absolutely irresistible.',
    shops: [
      {
        name: "Brothers' Dhaba",
        location: 'Near Golden Temple, Amritsar',
        since: 'Founded 1970s',
        rating: '4.5/5',
        description:
          'Famous for dal makhani cooked on a slow wood fire overnight. The smoky flavor (dhungar) they achieve is unmatched. Served with unlimited naan and butter.',
        famousDishes: ['Dal Makhani', 'Makki Di Roti', 'Paneer Tikka'],
      },
      {
        name: 'Kesar Da Dhaba',
        location: 'Near Golden Temple, Amritsar',
        since: 'Since 1916',
        rating: '4.6/5',
        description:
          'Their Dal Makhani is a century-old recipe. Made with hand-churned butter and slow-cooked for 12+ hours, it\'s a taste of history.',
        famousDishes: ['Dal Makhani', 'Sarson Da Saag', 'Special Thali'],
      },
    ],
    funFact: 'Dal Makhani was once served only to royalty. It gained popularity when Punjabi dhabas started serving it to travelers along the Grand Trunk Road.',
  },
  {
    id: 'jalebi-rabri',
    name: 'Jalebi & Rabri',
    subtitle: 'The Sweet Temptation',
    emoji: '🟡',
    category: 'Traditional Desserts',
    description:
      'Crispy, orange-hued spirals of deep-fried batter soaked in saffron-tinged sugar syrup, served with thick, creamy condensed milk (rabri) garnished with cardamom and dry fruits.',
    whyLove:
      'The contrast of hot, crispy jalebis with cold, creamy rabri is a match made in dessert heaven. Each bite is pure bliss.',
    shops: [
      {
        name: 'Gurdas Ram Jalebi',
        location: 'Hall Bazar, Amritsar',
        since: 'Since 1920',
        rating: '4.8/5',
        description:
          'A 100-year-old institution near the Golden Temple. Their jalebis are made fresh throughout the day — hot, crispy, and drenched in sugar syrup. The rabri is thick, sweet, and heavenly.',
        famousDishes: ['Jalebi', 'Rabri', 'Lassi'],
      },
      {
        name: 'Makhan Fish & Sweets',
        location: 'Putlighar, Amritsar',
        since: 'Founded 1975',
        rating: '4.3/5',
        description:
          'Known for their unique take on traditional sweets. Their jalebis are perfectly sized and their rabri is exceptionally creamy.',
        famousDishes: ['Jalebi', 'Rabri', 'Gulab Jamun'],
      },
    ],
    funFact: 'Some jalebi shops in Amritsar have been operating for over 100 years, with recipes passed down through five generations of halwais.',
  },
  {
    id: 'chole-bhature',
    name: 'Chole Bhature',
    subtitle: 'The Punjabi Power Meal',
    emoji: '🧆',
    category: 'Street Food Favorite',
    description:
      'Fluffy, deep-fried leavened bread (bhatura) served with spicy, tangy chickpea curry (chole) garnished with chopped onions, green chilies, and a squeeze of lemon. A classic north Indian indulgence that Amritsar does exceptionally well.',
    whyLove:
      'The combination of airy, golden bhatura and intensely flavorful chole is deeply satisfying. It\'s the ultimate comfort food.',
    shops: [
      {
        name: 'Punjab Da Nasha',
        location: 'Majitha Road, Amritsar',
        since: 'Founded 1990s',
        rating: '4.5/5',
        description:
          "Amritsar's hidden gem for chole bhature. Their bhature are perfectly puffed, golden, and served with chole that has the perfect balance of spice and tanginess.",
        famousDishes: ['Chole Bhature', 'Lassi', 'Amritsari Naan'],
      },
      {
        name: 'Bhai Kulwant Singh Chole Bhature',
        location: 'Ranjit Avenue, Amritsar',
        since: 'Founded 1988',
        rating: '4.4/5',
        description:
          'A local favorite that serves some of the best chole bhature in town. Their chole is slow-cooked with a unique spice blend that keeps customers coming back.',
        famousDishes: ['Chole Bhature', 'Chana Kulcha', 'Aloo Paratha'],
      },
    ],
    funFact: 'The key to perfect bhature lies in the fermentation of the dough — Amritsari bhature are known for being light, airy, and never greasy.',
  },
  {
    id: 'butter-chicken',
    name: 'Butter Chicken',
    subtitle: 'The Global Icon',
    emoji: '🍗',
    category: 'Punjabi Signature',
    description:
      'Tender pieces of char-grilled chicken simmered in a rich, creamy tomato-based sauce with butter, cream, and a delicate blend of aromatic spices. While it originated in Delhi, Amritsar has perfected its own robust, smoky version.',
    whyLove:
      'Silky, rich, and deeply flavorful — the butter chicken in Amritsar carries the legacy of Punjabi dhaba cooking at its finest.',
    shops: [
      {
        name: 'Crystal Restaurant',
        location: 'Crystal Chowk, Amritsar',
        since: 'Since 1972',
        rating: '4.6/5',
        description:
          'An Amritsar institution that pioneered the city\'s butter chicken. Their recipe — a closely guarded secret — uses a signature blend of spices and a unique smoking technique.',
        famousDishes: ['Butter Chicken', 'Fish Fry', 'Dal Makhani'],
      },
      {
        name: 'Surjit Food Plaza',
        location: 'Majitha Road, Amritsar',
        since: 'Founded 1980',
        rating: '4.4/5',
        description:
          'Known for their robust, smoky butter chicken that rivals the best in the country. Their tandoor specialties are equally impressive.',
        famousDishes: ['Butter Chicken', 'Chicken Tikka', 'Naan Basket'],
      },
    ],
    funFact: 'Crystal Restaurant claims their butter chicken recipe has remained unchanged since 1972 — the same spices, same process, same love.',
  },
  {
    id: 'lassi',
    name: 'Amritsari Lassi',
    subtitle: 'The Creamy Elixir',
    emoji: '🥛',
    category: 'Refreshing Beverage',
    description:
      'A thick, creamy yogurt-based drink served in large steel glasses (or earthen pots), topped with a generous layer of malai (cream) and garnished with cardamom, saffron, and dry fruits. Amritsari lassi is famous for its richness — it\'s a meal in itself!',
    whyLove:
      'There\'s nothing more refreshing than a tall glass of chilled, creamy lassi after walking through the bustling streets of Amritsar.',
    shops: [
      {
        name: 'Kanha Sweets',
        location: 'Lawrence Road, Amritsar',
        since: 'Founded 1950s',
        rating: '4.6/5',
        description:
          'Their lassi is legendary — thick, creamy, served in generous portions with a thick layer of malai on top. Available in sweet, salted, and mango flavors.',
        famousDishes: ['Sweet Lassi', 'Mango Lassi', 'Kulcha'],
      },
      {
        name: 'Gurdas Ram Jalebi',
        location: 'Hall Bazar, Amritsar',
        since: 'Since 1920',
        rating: '4.8/5',
        description:
          "Serves the most authentic Amritsari lassi in the heart of the old city. Their lassi is so thick you can eat it with a spoon!",
        famousDishes: ['Lassi', 'Jalebi', 'Rabri'],
      },
    ],
    funFact: 'Amritsari lassi is traditionally churned with a wooden hand churner (madhaani) for at least 20 minutes until it reaches a perfect, creamy consistency.',
  },
  {
    id: 'amritsari-fish',
    name: 'Amritsari Fish Fry',
    subtitle: 'The Golden Catch',
    emoji: '🐟',
    category: 'Signature Non-Veg',
    description:
      'Freshwater fish (usually singhara or rahu) marinated in a spicy gram flour (besan) batter with amchur (dry mango powder), ajwain (carom seeds), and a blend of Punjabi spices, then deep-fried to golden perfection. Crispy on the outside, flaky inside.',
    whyLove:
      'The unique tang from amchur combined with the aromatic spices creates a flavor profile that is distinctly Amritsari and absolutely addictive.',
    shops: [
      {
        name: 'Beera Chicken House',
        location: 'Near Golden Temple, Amritsar',
        since: 'Founded 1965',
        rating: '4.5/5',
        description:
          'Despite the name, their fish fry is legendary. Marinated for hours and fried to golden perfection, it\'s a must-try for every visitor to Amritsar.',
        famousDishes: ['Fish Fry', 'Chicken Tikka', 'Tandoori Chicken'],
      },
      {
        name: 'Makhan Fish & Chicken',
        location: 'Putlighar, Amritsar',
        since: 'Founded 1975',
        rating: '4.4/5',
        description:
          'Specializes in Amritsari-style fish fry. Their secret marinade and perfect frying technique make their fish fry a local favorite.',
        famousDishes: ['Amritsari Fish Fry', 'Chicken Fry', 'Jalebi'],
      },
    ],
    funFact: 'The unique tangy flavor of Amritsari Fish Fry comes from amchur (dry mango powder) — a key ingredient that distinguishes it from other Indian fish fries.',
  },
  {
    id: 'phirni',
    name: 'Phirni',
    subtitle: 'The Royal Cream',
    emoji: '🍮',
    category: 'Traditional Dessert',
    description:
      'A delicate, creamy rice pudding made from ground rice, milk, sugar, and flavored with cardamom, saffron, and rose water. Served in traditional earthenware pots (shikoras) that give it a distinct earthy aroma.',
    whyLove:
      'Silky, aromatic, and not too sweet — Phirni from Amritsar\'s old city is the perfect way to end any meal.',
    shops: [
      {
        name: 'Hall Bazar Sweet Shops',
        location: 'Hall Bazar, Amritsar',
        since: 'Various since early 1900s',
        rating: '4.5/5',
        description:
          'Multiple historic sweet shops in Hall Bazar serve Phirni that has been made using traditional methods for over a century. The earthenware pots add an unmatched earthy flavor.',
        famousDishes: ['Phirni', 'Kheer', 'Rabri'],
      },
      {
        name: 'Kanha Sweets',
        location: 'Lawrence Road, Amritsar',
        since: 'Founded 1950s',
        rating: '4.6/5',
        description:
          'Their Phirni is delicate, perfectly sweetened, and served chilled in traditional clay pots. A popular choice among locals for festive occasions.',
        famousDishes: ['Phirni', 'Kheer', 'Gulab Jamun'],
      },
    ],
    funFact: 'The clay pots (shikoras) used to serve Phirni are made from special soil that is believed to add beneficial minerals to the dessert.',
  },
  {
    id: 'gulab-jamun',
    name: 'Gulab Jamun',
    subtitle: 'The Golden Orbs',
    emoji: '🟤',
    category: 'Festival Sweet',
    description:
      'Soft, spongy balls made from khoya (reduced milk solids) and soaked in a cardamom-scented sugar syrup infused with rose water and saffron. Amritsar\'s version is known for being exceptionally soft and syrup-soaked.',
    whyLove:
      'Warm, melt-in-your-mouth gulab jamuns dripping with fragrant syrup — a sweet embrace in every bite.',
    shops: [
      {
        name: 'Gurdas Ram Jalebi',
        location: 'Hall Bazar, Amritsar',
        since: 'Since 1920',
        rating: '4.8/5',
        description:
          'Their gulab jamuns are legendary — incredibly soft, perfectly sized, and soaked in beautifully scented sugar syrup. Always served warm.',
        famousDishes: ['Gulab Jamun', 'Jalebi', 'Lassi'],
      },
      {
        name: 'Makhan Fish & Sweets',
        location: 'Putlighar, Amritsar',
        since: 'Founded 1975',
        rating: '4.3/5',
        description:
          'Known for their exceptionally soft and spongy gulab jamuns. The sugar syrup is infused with cardamom and rose water for that perfect aroma.',
        famousDishes: ['Gulab Jamun', 'Jalebi', 'Rabri'],
      },
    ],
    funFact: 'The best gulab jamuns in Amritsar are aged in sugar syrup for several hours before serving — this slow soaking makes them incredibly soft and flavorful.',
  },
];

export default function FoodPage() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  // Intersection Observer for scroll-reveal animations
  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('food-reveal-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      const elements = document.querySelectorAll('.food-reveal-on-scroll');
      elements.forEach((el) => {
        el.classList.remove('food-reveal-visible');
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  const categories = [...new Set(FOOD_ITEMS.map((f) => f.category))];

  const filteredItems = selectedCategory
    ? FOOD_ITEMS.filter((f) => f.category === selectedCategory)
    : FOOD_ITEMS;

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
        .food-page {
          font-family: var(--font-sans);
          color: var(--text);
          background-color: var(--bg-color);
          line-height: 1.6;
          min-height: 100vh;
        }

        .food-page-wrapper {
          position: relative;
          background-color: var(--bg-color);
          background-image:
            radial-gradient(ellipse at 15% 10%, rgba(201, 161, 74, 0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 85% 95%, rgba(94, 49, 32, 0.04) 0%, transparent 50%);
          overflow-x: hidden;
        }

        .food-pattern-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.12;
          z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C9A14A' stroke-width='0.4' stroke-opacity='0.35'%3E%3Ccircle cx='40' cy='40' r='30'/%3E%3Ccircle cx='40' cy='40' r='15'/%3E%3Ccircle cx='0' cy='0' r='15'/%3E%3Ccircle cx='80' cy='0' r='15'/%3E%3Ccircle cx='0' cy='80' r='15'/%3E%3Ccircle cx='80' cy='80' r='15'/%3E%3C/g%3E%3C/svg%3E");
        }

        .food-ambient-orb {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(100px);
          z-index: 0;
        }

        .food-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 24px 120px;
          position: relative;
          z-index: 1;
        }

        /* ======================== BACK BUTTON ======================== */
        .food-back-btn {
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

        .food-back-btn::after {
          content: '';
          position: absolute;
          bottom: 6px;
          left: 48px;
          width: 0;
          height: 2px;
          background-color: var(--gold);
          transition: var(--transition-smooth);
        }

        .food-back-btn:hover {
          color: var(--gold);
          transform: translateX(-4px);
        }

        .food-back-btn:hover::after {
          width: calc(100% - 48px);
        }

        .food-back-arrow {
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

        .food-back-btn:hover .food-back-arrow {
          background: var(--primary);
          color: #FFFFFF;
          border-color: var(--primary);
        }

        /* ======================== HERO HEADER ======================== */
        .food-hero {
          text-align: center;
          max-width: 780px;
          margin: 48px auto 56px;
          padding: 0 24px;
        }

        .food-hero-eyebrow {
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

        .food-hero-title {
          font-family: var(--font-serif);
          font-size: 56px;
          font-weight: 800;
          line-height: 1.1;
          color: var(--primary);
          margin-bottom: 20px;
        }

        .food-hero-title span {
          background: linear-gradient(135deg, var(--gold), var(--gold-muted));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .food-hero-desc {
          font-size: 17px;
          color: var(--text-secondary);
          line-height: 1.75;
          max-width: 620px;
          margin: 0 auto;
        }

        .food-divider {
          display: flex;
          align-items: center;
          gap: 16px;
          max-width: 320px;
          margin: 28px auto;
        }

        .food-divider-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, var(--gold), transparent);
        }

        .food-divider-diamond {
          width: 8px;
          height: 8px;
          background: var(--gold);
          transform: rotate(45deg);
          flex-shrink: 0;
        }

        /* ======================== CATEGORY FILTER ======================== */
        .food-categories {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-bottom: 56px;
        }

        .food-cat-btn {
          background: var(--card-bg);
          border: 1px solid var(--light-border);
          color: var(--text-secondary);
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 13px;
          padding: 10px 22px;
          border-radius: 100px;
          cursor: pointer;
          transition: var(--transition-bounce);
          white-space: nowrap;
        }

        .food-cat-btn:hover {
          color: var(--primary);
          border-color: rgba(201, 161, 74, 0.4);
          background: rgba(201, 161, 74, 0.05);
          transform: translateY(-1px);
        }

        .food-cat-btn-active {
          background: linear-gradient(135deg, var(--primary), #482315) !important;
          color: #FFFFFF !important;
          border-color: var(--primary) !important;
          box-shadow: 0 4px 16px rgba(94, 49, 32, 0.2);
        }

        /* ======================== FOOD CARD ======================== */
        .food-card {
          background: var(--card-bg);
          border: 1px solid var(--light-border);
          border-radius: 20px;
          padding: 36px 32px;
          box-shadow: var(--shadow-md);
          transition: var(--transition-smooth);
          position: relative;
          overflow: hidden;
          margin-bottom: 32px;
        }

        .food-card::before {
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

        .food-card:hover {
          transform: translateX(6px);
          box-shadow: var(--shadow-lg);
          border-color: rgba(201, 161, 74, 0.3);
        }

        .food-card:hover::before {
          opacity: 1;
        }

        .food-card-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .food-card-emoji {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(201, 161, 74, 0.12), rgba(201, 161, 74, 0.04));
          border: 1.5px solid rgba(201, 161, 74, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          flex-shrink: 0;
        }

        .food-card-title-group {
          flex: 1;
          min-width: 200px;
        }

        .food-card-title-row {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 6px;
        }

        .food-card-name {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--primary);
          line-height: 1.2;
        }

        .food-card-subtitle {
          font-family: var(--font-serif);
          font-size: 15px;
          font-style: italic;
          color: var(--gold-muted);
          font-weight: 400;
        }

        .food-card-category-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(94, 49, 32, 0.07);
          color: var(--primary);
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          padding: 5px 14px;
          border-radius: 100px;
          margin-top: 4px;
        }

        .food-card-desc {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 14px;
        }

        .food-card-why {
          display: flex;
          gap: 12px;
          background: linear-gradient(135deg, rgba(201, 161, 74, 0.06), rgba(245, 244, 241, 0.5));
          border: 1px solid rgba(201, 161, 74, 0.15);
          border-radius: 12px;
          padding: 16px 18px;
          margin-bottom: 24px;
        }

        .food-card-why-icon {
          color: var(--gold);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .food-card-why-text {
          flex: 1;
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.65;
          font-style: italic;
        }

        /* ======================== SHOPS SECTION ======================== */
        .food-shops-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--gold-muted);
          margin-bottom: 16px;
        }

        .food-shops-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 14px;
        }

        .food-shop-card {
          background: rgba(245, 244, 241, 0.5);
          border: 1px solid var(--light-border);
          border-radius: 14px;
          padding: 20px;
          transition: var(--transition-smooth);
        }

        .food-shop-card:hover {
          background: rgba(245, 244, 241, 0.9);
          border-color: rgba(201, 161, 74, 0.25);
          transform: translateX(4px);
        }

        .food-shop-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }

        .food-shop-name {
          font-family: var(--font-serif);
          font-size: 17px;
          font-weight: 700;
          color: var(--primary);
        }

        .food-shop-rating {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          font-weight: 700;
          color: var(--gold-muted);
          background: rgba(201, 161, 74, 0.08);
          padding: 4px 12px;
          border-radius: 100px;
        }

        .food-shop-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 10px;
          font-size: 13px;
          color: var(--text-muted);
        }

        .food-shop-meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .food-shop-meta-item svg {
          color: var(--gold);
          flex-shrink: 0;
        }

        .food-shop-desc {
          font-size: 14px;
          color: var(--text-secondary);
          line-height: 1.65;
          margin-bottom: 12px;
        }

        .food-shop-dishes {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .food-shop-dish-tag {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(201, 161, 74, 0.08);
          color: #7A6030;
          font-size: 11px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 100px;
        }

        /* ======================== FUN FACT ======================== */
        .food-fun-fact {
          display: flex;
          gap: 12px;
          background: linear-gradient(135deg, var(--primary) 0%, #3D1E0F 100%);
          border-radius: 14px;
          padding: 18px 22px;
          margin-top: 20px;
          position: relative;
          overflow: hidden;
        }

        .food-fun-fact::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='rgba(255,255,255,0.06)' stroke-width='0.4'%3E%3Ccircle cx='20' cy='20' r='16'/%3E%3Ccircle cx='20' cy='20' r='8'/%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
          border-radius: 14px;
        }

        .food-fun-fact-icon {
          color: var(--gold);
          flex-shrink: 0;
          margin-top: 2px;
          z-index: 1;
        }

        .food-fun-fact-text {
          flex: 1;
          z-index: 1;
        }

        .food-fun-fact-label {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: var(--gold);
          margin-bottom: 4px;
        }

        .food-fun-fact-body {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.65;
        }

        /* ======================== ANIMATIONS ======================== */
        @keyframes food-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .food-card-emoji {
          animation: food-pulse 4s ease-in-out infinite;
        }

        .food-reveal-on-scroll {
          opacity: 0;
          transform: translateY(36px);
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
                      transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .food-reveal-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .food-item:nth-child(1).food-reveal-on-scroll { transition-delay: 0ms; }
        .food-item:nth-child(2).food-reveal-on-scroll { transition-delay: 80ms; }
        .food-item:nth-child(3).food-reveal-on-scroll { transition-delay: 160ms; }
        .food-item:nth-child(4).food-reveal-on-scroll { transition-delay: 240ms; }
        .food-item:nth-child(5).food-reveal-on-scroll { transition-delay: 320ms; }
        .food-item:nth-child(6).food-reveal-on-scroll { transition-delay: 400ms; }
        .food-item:nth-child(7).food-reveal-on-scroll { transition-delay: 480ms; }
        .food-item:nth-child(8).food-reveal-on-scroll { transition-delay: 560ms; }
        .food-item:nth-child(9).food-reveal-on-scroll { transition-delay: 640ms; }
        .food-item:nth-child(10).food-reveal-on-scroll { transition-delay: 720ms; }

        @media (min-width: 768px) {
          .food-shops-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 768px) {
          .food-hero-title { font-size: 38px; }
          .food-card { padding: 24px 20px; }
          .food-card-name { font-size: 22px; }
          .food-inner { padding: 24px 16px 80px; }
          .food-shops-grid { grid-template-columns: 1fr; }
        }

        @media (max-width: 480px) {
          .food-hero-title { font-size: 30px; }
          .food-card-header { gap: 14px; }
          .food-card-emoji { width: 48px; height: 48px; font-size: 22px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .food-reveal-on-scroll, .food-reveal-visible {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .food-card-emoji { animation: none !important; }
        }
      `}</style>

      <div className="food-page-wrapper">
        <div className="food-pattern-bg" />
        <div
          className="food-ambient-orb"
          style={{ width: 600, height: 600, background: 'rgba(201,161,74,0.04)', top: '-15%', right: '-10%' }}
        />
        <div
          className="food-ambient-orb"
          style={{ width: 500, height: 500, background: 'rgba(94,49,32,0.03)', bottom: '5%', left: '-12%' }}
        />

        <div className="food-page">
          <div className="food-inner">
            {/* Back Button */}
            <Link href="/" className="food-back-btn">
              <span className="food-back-arrow">
                <ArrowLeft size={16} />
              </span>
              Back to Home
            </Link>

            {/* ─── Hero Header ─── */}
            <header className="food-hero food-reveal-on-scroll">
              <div className="food-hero-eyebrow">
                <Utensils size={14} />
                Taste of Amritsar
              </div>
              <h1 className="food-hero-title">
                Famous <span>Food & Shops</span>
              </h1>
              <p className="food-hero-desc">
                A curated journey through Amritsar's legendary culinary landscape — discover iconic dishes and the historic shops that have perfected them over generations.
              </p>
              <div className="food-divider">
                <div className="food-divider-line" />
                <div className="food-divider-diamond" />
                <div className="food-divider-line" />
              </div>
            </header>

            {/* ─── Category Filter ─── */}
            <div className="food-categories food-reveal-on-scroll">
              <button
                className={`food-cat-btn ${!selectedCategory ? 'food-cat-btn-active' : ''}`}
                onClick={() => setSelectedCategory(null)}
              >
                All Foods
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`food-cat-btn ${selectedCategory === cat ? 'food-cat-btn-active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* ─── Food Items ─── */}
            <div className="food-list">
              {filteredItems.map((food, index) => (
                <div
                  key={food.id}
                  className="food-item food-reveal-on-scroll"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="food-card">
                    {/* Card Header */}
                    <div className="food-card-header">
                      <div className="food-card-emoji">{food.emoji}</div>
                      <div className="food-card-title-group">
                        <div className="food-card-title-row">
                          <span className="food-card-name">{food.name}</span>
                          <span className="food-card-subtitle">— {food.subtitle}</span>
                        </div>
                        <div className="food-card-category-badge">
                          <Award size={12} />
                          {food.category}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="food-card-desc">{food.description}</p>

                    {/* Why We Love It */}
                    <div className="food-card-why">
                      <Heart size={16} className="food-card-why-icon" />
                      <div className="food-card-why-text">{food.whyLove}</div>
                    </div>

                    {/* Famous Shops */}
                    <div className="food-shops-label">
                      <Store size={14} />
                      Famous Shops for {food.name}
                    </div>

                    <div className="food-shops-grid">
                      {food.shops.map((shop) => (
                        <div key={shop.name} className="food-shop-card">
                          <div className="food-shop-header">
                            <span className="food-shop-name">{shop.name}</span>
                            <span className="food-shop-rating">
                              <Star size={11} fill="currentColor" />
                              {shop.rating}
                            </span>
                          </div>
                          <div className="food-shop-meta">
                            <div className="food-shop-meta-item">
                              <MapPin size={13} />
                              {shop.location}
                            </div>
                            <div className="food-shop-meta-item">
                              <Clock size={13} />
                              {shop.since}
                            </div>
                          </div>
                          <p className="food-shop-desc">{shop.description}</p>
                          <div className="food-shop-dishes">
                            {shop.famousDishes.map((dish) => (
                              <span key={dish} className="food-shop-dish-tag">
                                {dish}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Fun Fact */}
                    <div className="food-fun-fact">
                      <Quote size={18} className="food-fun-fact-icon" />
                      <div className="food-fun-fact-text">
                        <div className="food-fun-fact-label">Did You Know?</div>
                        <div className="food-fun-fact-body">{food.funFact}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}