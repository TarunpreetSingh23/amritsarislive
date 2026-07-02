'use client';

import { useEffect, useState } from 'react';
import { Home, Smartphone, Landmark, UtensilsCrossed, Library } from 'lucide-react';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#socials', label: 'Socials' },
  { href: '#monuments', label: 'Monuments' },
  { href: '#food', label: 'Food' },
  { href: '#museums', label: 'Museums' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 15);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    href: string
  ) => {
    e.preventDefault();

    setMenuOpen(false);

    const id = href.replace('#', '');

    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm'
            : 'bg-white/80'
          }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-around gap-25 px-4 sm:px-6 lg:px-8">

          {/* Logo */}

          <a
            href="#home"
            onClick={(e) => scrollTo(e, '#home')}
            className="flex items-center"
          >
            <h1 className="flex items-end leading-none">
              <span className="font-extrabold text-[28px] tracking-[-0.04em] text-[#1F1F1F]">
                Amritsar
              </span>

              <span className="ml-1 font-light text-[28px] tracking-[-0.04em] text-gray-500">
                is Live
              </span>

              <span className="ml-1 mb-1 h-2.5 w-2.5 rounded-full bg-[var(--gold-primary)] animate-pulse" />
            </h1>
          </a>

          {/* Desktop */}

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="relative text-sm font-medium text-gray-600 transition hover:text-black after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[var(--gold-primary)] after:transition-all hover:after:w-full"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Button */}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/80 backdrop-blur transition hover:bg-white"
          >
            {menuOpen ? (
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${menuOpen ? 'max-h-[300px] border-b border-[#D4AF37]/20 shadow-2xl opacity-100' : 'max-h-0 opacity-0'
            }`}
        >
          <div className="bg-white/98 backdrop-blur-2xl px-6 py-4 flex flex-col gap-1 relative overflow-hidden">
            {/* Background Ambient Glow inside Mobile Dropdown */}
            <div className="absolute top-[-30%] right-[-20%] w-[180px] h-[180px] rounded-full bg-[#E8C84A]/10 blur-[40px] pointer-events-none" />

            {NAV_LINKS.filter(link => link.href !== '#home').map((link, idx) => {
              let Icon = Smartphone;
              if (link.href === '#monuments') Icon = Landmark;
              else if (link.href === '#food') Icon = UtensilsCrossed;
              else if (link.href === '#museums') Icon = Library;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-[#56450f] transition-all duration-300 hover:bg-[#D4AF37]/10 hover:text-[#B8860B] active:scale-95"
                  style={{
                    animationDelay: `${idx * 40}ms`,
                    animation: menuOpen ? 'slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) both' : 'none'
                  }}
                >
                  <Icon size={18} strokeWidth={2} className="text-[#B8860B]" />
                  <span className="text-xs font-bold tracking-wide uppercase">{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}