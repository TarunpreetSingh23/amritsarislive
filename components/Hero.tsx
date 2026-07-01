'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  Smartphone,
  Landmark,
  UtensilsCrossed,
  MessageSquare
} from "lucide-react";

export default function Hero() {
  const particlesRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: "socials", label: "Posts", icon: Smartphone },
    { id: "monuments", label: "Monuments", icon: Landmark },
    { id: "food", label: "Famous Food", icon: UtensilsCrossed },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
  ];

  const socialLinks = [
    { 
      href: "https://instagram.com/amritsarislive", 
      label: "Instagram", 
      hoverClass: "hover:text-[#E1306C] hover:border-[#E1306C] hover:bg-[#E1306C]/5", 
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    { 
      href: "https://youtube.com/@amritsarislive", 
      label: "YouTube", 
      hoverClass: "hover:text-[#ff0000] hover:border-[#ff0000] hover:bg-[#ff0000]/5", 
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    { 
      href: "https://facebook.com/amritsarislive", 
      label: "Facebook", 
      hoverClass: "hover:text-[#1877f2] hover:border-[#1877f2] hover:bg-[#1877f2]/5", 
      svg: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
  ];

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const particlesCount = 40;
    const particles: HTMLDivElement[] = [];
    
    for (let i = 0; i < particlesCount; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 3 + 1;
      p.style.cssText = `
        position: absolute;
        bottom: -10px;
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background: radial-gradient(circle, rgba(212,175,55,0.8) 0%, rgba(212,175,55,0) 100%);
        border-radius: 50%;
        pointer-events: none;
        opacity: ${Math.random() * 0.6 + 0.1};
        transform: translateY(0) scale(1);
        transition: transform 0.5s ease-out;
        animation: float-up ${Math.random() * 10 + 8}s linear infinite;
        animation-delay: -${Math.random() * 10}s;
      `;
      container.appendChild(p);
      particles.push(p);
    }

    return () => particles.forEach((p) => p.remove());
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-up {
          0% { transform: translateY(10vh) scale(0); opacity: 0; }
          20% { opacity: 1; transform: translateY(-20vh) scale(1); }
          80% { opacity: 1; transform: translateY(-80vh) scale(1); }
          100% { transform: translateY(-110vh) scale(0); opacity: 0; }
        }
        @keyframes subtle-pan {
          0% { transform: scale(1.05) translate(0, 0); }
          50% { transform: scale(1.1) translate(-1%, 1%); }
          100% { transform: scale(1.05) translate(0, 0); }
        }
      `}} />

<section className="relative min-h-[87dvh] flex flex-col items-center pb-24 overflow-hidden bg-[#FAFAFA] text-center" id="home" style={{ paddingTop: '10vh' }}>        
        {/* Deep Background Setup - Premium Ambient Glow */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#FDFCF8]">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#E8C84A]/20 blur-[120px] animate-[subtle-pan_20s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#C9A227]/15 blur-[150px] animate-[subtle-pan_25s_ease-in-out_infinite_reverse]" />
          <div className="absolute top-[40%] left-[60%] w-[30vw] h-[30vw] rounded-full bg-white/60 blur-[80px]" />
        </div>

        {/* Dynamic Golden Dust */}
        <div className="absolute inset-0 pointer-events-none z-[1]" ref={particlesRef} />

        {/* Central Content - Removing the heavy box, embracing open space */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-[1000px] px-6 sm:px-12 py-2 gap-10">
          
          {/* Profile / Logo Area - Elevated */}
          <div className="relative group mt-6 sm:mt-10">
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#D4AF37]/30 via-white/0 to-[#D4AF37]/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full p-[3px] bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#B8860B] shadow-2xl">
              <div className="absolute inset-0 rounded-full bg-black/5" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/90 bg-white">
                <Image
                  src="/logo.jpeg"
                  alt="Amritsar is Live logo"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
              {/* Refined Verified Badge */}
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#B8860B] rounded-full flex items-center justify-center text-white border-[3px] border-white shadow-lg" title="Verified">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </div>
          </div>

          {/* Typography - The Award Winning Touch */}
          <div className="flex flex-col items-center space-y-6 max-w-3xl mx-auto">
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl font-medium text-[#1A1A1A] tracking-tight leading-[1.1]">
              Amritsar{' '}
              <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#D4AF37] pr-2">
                is Live
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-[#666666] font-light max-w-[600px] leading-relaxed">
              Celebrating the heartbeat of the holy city. From majestic golden spires to aromatic food lanes, discover the soul of Amritsar.
            </p>
          </div>

          {/* Elegant Stats Divider */}
          {/* <div className="w-full max-w-[600px] mt-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent h-[1px] top-1/2 -translate-y-1/2" />
            <div className="relative flex justify-between items-center bg-[#FDFCF8]/60 backdrop-blur-xl border border-white/80 rounded-2xl px-8 py-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <div className="flex flex-col items-center gap-1">
                <span className="font-serif text-3xl sm:text-4xl text-[#1A1A1A]">50K<span className="text-[#D4AF37]">+</span></span>
                <span className="text-[10px] sm:text-xs text-[#808080] uppercase tracking-[0.2em] font-medium">Followers</span>
              </div>
              <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />
              <div className="flex flex-col items-center gap-1">
                <span className="font-serif text-3xl sm:text-4xl text-[#1A1A1A]">200<span className="text-[#D4AF37]">+</span></span>
                <span className="text-[10px] sm:text-xs text-[#808080] uppercase tracking-[0.2em] font-medium">Posts</span>
              </div>
              <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[#D4AF37]/30 to-transparent" />
              <div className="flex flex-col items-center gap-1">
                <span className="font-serif text-3xl sm:text-4xl text-[#1A1A1A]">8<span className="text-[#D4AF37]">+</span></span>
                <span className="text-[10px] sm:text-xs text-[#808080] uppercase tracking-[0.2em] font-medium">Monuments</span>
              </div>
            </div>
          </div> */}

          {/* Sophisticated Social Icons */}
          <div className="flex gap-4 sm:gap-6 mt-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-white/80 backdrop-blur-sm border border-black/5 text-[#404040] shadow-[0_4px_15px_rgb(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 ${link.hoverClass}`}
                aria-label={link.label}
              >
                {link.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Attached Bottom Navigation Bar - Matches Navbar Size & Design */}
        <div className="fixed bottom-0 left-0 right-0 w-full h-16 z-50 bg-white/90 backdrop-blur-md border-t border-[var(--gold-primary)]/20 shadow-[0_-2px_20px_rgba(0,0,0,0.06)] flex items-center justify-center px-4">
          <div className="flex items-center justify-around w-full max-w-[480px]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all duration-300 text-[var(--gold-dark)] hover:text-[var(--gold-primary)] hover:bg-[var(--gold-primary)]/5"
                >
                  <Icon
                    size={20}
                    strokeWidth={1.75}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                  <span className="mt-1 text-[10px] font-semibold tracking-wide uppercase leading-none">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}