'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, Smartphone, Landmark, UtensilsCrossed, Library, Map, Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '#home', label: 'Home', page: false },
  { href: '#socials', label: 'Socials', page: false },
  { href: '#monuments', label: 'Monuments', page: false },
  { href: '#food', label: 'Food', page: false },
  { href: '#museums', label: 'Museums', page: false },
  { href: '/itinerary', label: 'Itinerary', page: true },
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

              {/* <span className="ml-1 mb-1 h-2.5 w-2.5 rounded-full bg-[var(--gold-primary)] animate-pulse" /> */}
            </h1>
          </a>

          {/* Desktop */}

          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                {link.page ? (
                  <Link
                    href={link.href}
                    className="relative text-sm font-medium text-gray-600 transition hover:text-black after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[var(--gold-primary)] after:transition-all hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="relative text-sm font-medium text-gray-600 transition hover:text-black after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[var(--gold-primary)] after:transition-all hover:after:w-full"
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Button */}

          {/* <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/80 backdrop-blur transition hover:bg-white text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button> */}
        </div>

        {/* Mobile Menu Backdrop */}
        <div
          className={`fixed inset-0 bg-black/20 backdrop-blur-xs md:hidden transition-opacity duration-300 z-40 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
          onClick={() => setMenuOpen(false)}
        />

        {/* Mobile Menu Side Drawer */}
        <div
          className={`fixed top-0 right-0 bottom-0 h-full w-[280px] sm:w-[320px] bg-white/95 backdrop-blur-xl border-l border-gray-100 shadow-[0_0_40px_rgba(0,0,0,0.05)] md:hidden z-50 transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${menuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-7 py-6 border-b border-gray-100/80 bg-white/50 relative z-10">
            <div className="flex flex-col pb-4">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1A1A1A] leading-none">
                Amritsar is Live
              </span>
              {/* <span className="font-serif italic text-[#6B6B67] text-sm font-light mt-0.5">
        is Live
      </span> */}
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-gray-200/60 bg-gray-50 shadow-sm transition-all hover:bg-white hover:border-gray-300 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
              aria-label="Close menu"
            >
              <X size={18} className="transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 px-5 py-8 flex flex-col gap-3 relative overflow-y-auto scrollbar-hide">
            {/* Background Ambient Glow inside Mobile Dropdown */}
            <div className="absolute top-0 right-0 w-[200px] h-[200px] rounded-full bg-[#D4AF37]/[0.03] blur-[40px] pointer-events-none" />
            <div className="absolute bottom-10 left-[-20%] w-[180px] h-[180px] rounded-full bg-[#D4AF37]/[0.04] blur-[40px] pointer-events-none" />

            {NAV_LINKS.filter(link => link.href !== '#home').map((link, idx) => {
              let Icon = Smartphone;
              if (link.href === '#monuments') Icon = Landmark;
              else if (link.href === '#food') Icon = UtensilsCrossed;
              else if (link.href === '#museums') Icon = Library;
              else if (link.href === '/itinerary') Icon = Map;

              const commonClasses = "flex items-center gap-4 rounded-2xl px-3 py-2.5 text-gray-600 transition-all duration-300 hover:bg-[#F9F8F5] hover:text-[#1A1A1A] active:scale-[0.98] group relative overflow-hidden";
              const inner = (
                <>
                  {/* Subtle hover background highlight */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Icon Wrapper */}
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-gray-100 text-gray-400 group-hover:border-[#D4AF37]/30 group-hover:bg-[#D4AF37]/10 group-hover:text-[#B8860B] transition-all duration-300 shadow-sm group-hover:shadow">
                    <Icon size={18} strokeWidth={2} />
                  </div>

                  {/* Text Label */}
                  <span className="relative text-[12px] font-bold tracking-[0.1em] uppercase group-hover:translate-x-1 transition-transform duration-300">
                    {link.label}
                  </span>
                </>
              );

              return link.page ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={commonClasses}
                >
                  {inner}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className={commonClasses}
                >
                  {inner}
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}