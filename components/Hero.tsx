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

    const particlesCount = 20; 
    const particles: HTMLDivElement[] = [];
    
    for (let i = 0; i < particlesCount; i++) {
      const p = document.createElement('div');
      const size = Math.random() * 2 + 1;
      p.style.cssText = `
        position: absolute;
        bottom: -10px;
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size}px;
        background: #A0A0A0;
        border-radius: 50%;
        pointer-events: none;
        opacity: ${Math.random() * 0.3 + 0.1};
        transform: translateY(0) scale(1);
        transition: transform 0.5s ease-out;
        animation: float-up ${Math.random() * 12 + 10}s linear infinite;
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
          0% { transform: scale(1.02) translate(0, 0); }
          50% { transform: scale(1.05) translate(-0.5%, 0.5%); }
          100% { transform: scale(1.02) translate(0, 0); }
        }
      `}} />

      <section className="relative min-h-[100dvh] flex flex-col items-center pb-24 overflow-hidden bg-[#F2F1EC] text-center" id="home" style={{ paddingTop: '200px' }}>        
        
        {/* Sky Blue & Cream Ambient Layer + Geometric Rings */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#F9F8F5]">
          <div className="absolute top-0 left-0 right-0 h-[45vh] bg-gradient-to-b from-[#D2E4F1]/40 to-transparent blur-[100px] animate-[subtle-pan_20s_ease-in-out_infinite]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#EAE8E3]/60 blur-[120px]" />

          {/* Top-Left Embedded Geometric Ring */}
          <div className="absolute -top-16 -left-16 sm:top-10 sm:left-10 w-64 h-64 flex items-center justify-center opacity-40 mix-blend-multiply pointer-events-none">
            <div className="absolute inset-0 rounded-full border border-t-[#D4AF37] border-r-[#D4AF37]/40 border-b-[#D4AF37]/10 border-l-[#D4AF37]/20 animate-spin" style={{ animationDuration: '10s' }} />
            <div className="absolute inset-6 rounded-full border border-t-[#D4AF37]/15 border-r-[#D4AF37]/60 border-b-[#D4AF37] border-l-[#D4AF37]/30 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '7s' }} />
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] opacity-30 blur-xl animate-pulse" />
          </div>

          {/* Bottom-Right Embedded Geometric Ring */}
          <div className="absolute bottom-10 -right-16 sm:bottom-24 sm:right-10 w-72 h-72 flex items-center justify-center opacity-30 mix-blend-multiply pointer-events-none">
            <div className="absolute inset-0 rounded-full border border-t-[#D4AF37]/20 border-r-[#D4AF37] border-b-[#D4AF37]/40 border-l-[#D4AF37]/10 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
            <div className="absolute inset-8 rounded-full border border-t-[#D4AF37] border-r-[#D4AF37]/30 border-b-[#D4AF37]/15 border-l-[#D4AF37]/60 animate-spin" style={{ animationDuration: '8s' }} />
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] opacity-20 blur-xl animate-pulse" />
          </div>
        </div>

        {/* Dynamic Light Dust */}
        <div className="absolute inset-0 pointer-events-none z-[1]" ref={particlesRef} />

        {/* Central Content */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-[1200px] px-6 sm:px-12 py-2 gap-8">
          
          {/* Profile Area */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-black/[0.02] rounded-full blur-xl" />
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full p-[2px] bg-gradient-to-b from-[#EAE8E3] to-[#CCCCCC] shadow-[0_16px_36px_rgba(0,0,0,0.06)]">
              <div className="relative w-full h-full rounded-full overflow-hidden border-[6px] border-white bg-white">
                <Image
                  src="/logo.jpeg"
                  alt="Amritsar is Live logo"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-[#2C2C2C] rounded-full flex items-center justify-center text-[#D4AF37] border-[3px] border-white shadow-md" title="Verified">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </div>
          </div>

          {/* Typography - Forced Single Line & Amazing Font Styling */}
          <div className="flex flex-col items-center space-y-4 w-full">
            <h1 className="font-serif text-[10.5vw] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-semibold text-[#1A1A1A] tracking-tighter leading-none whitespace-nowrap drop-shadow-sm">
              Amritsar{' '}
              <span className="font-serif italic text-[#3A3A3A] font-light">
                is Live
              </span>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-[#5A5A5A] font-normal max-w-[580px] leading-relaxed">
              Celebrating the heartbeat of the holy city. From majestic golden spires to aromatic food lanes, discover the soul of Amritsar.
            </p>
          </div>

          {/* Sophisticated Social Icons */}
          <div className="flex gap-4 sm:gap-5 mt-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-white border border-[#E5E5E5] text-[#2C2C2C] shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] ${link.hoverClass}`}
                aria-label={link.label}
              >
                {link.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Attached Bottom Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 w-full h-16 z-50 bg-white/95 backdrop-blur-md border-t border-[#EAEAE6] shadow-[0_-4px_24px_rgba(0,0,0,0.03)] flex items-center justify-center px-4">
          <div className="flex items-center justify-around w-full max-w-[480px]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all duration-300 text-[#555555] hover:text-[#1A1A1A] hover:bg-[#F4F4F2]"
                >
                  <Icon
                    size={20}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5"
                  />
                  <span className="mt-1 text-[10px] font-bold tracking-wider uppercase leading-none text-[#777777] group-hover:text-[#1A1A1A]">
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