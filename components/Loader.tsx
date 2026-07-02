'use client';
import { useEffect, useState } from 'react';

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Premium intro duration (1.6s) to allow page components to settle
    const fadeTimer = setTimeout(() => {
      setVisible(false);
    }, 1600);

    const unmountTimer = setTimeout(() => {
      setMounted(false);
    }, 2200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FDFCF8] transition-all duration-700 ease-out ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03] pointer-events-none'
        }`}
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#E8C84A]/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#C9A227]/10 blur-[120px] pointer-events-none" />

      {/* Unique Golden Ring Geometric Loader */}
      <div className="relative w-36 h-36 flex items-center justify-center mb-8">
        {/* Outer slow-spinning thin gold ring */}
        <div className="absolute inset-0 rounded-full border border-t-[#D4AF37] border-r-[#D4AF37]/40 border-b-[#D4AF37]/10 border-l-[#D4AF37]/20 animate-spin" style={{ animationDuration: '4s' }} />

        {/* Inner fast-reverse-spinning thin gold ring */}
        <div className="absolute inset-3 rounded-full border border-t-[#D4AF37]/15 border-r-[#D4AF37]/60 border-b-[#D4AF37] border-l-[#D4AF37]/30 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '2.5s' }} />

        {/* Central glowing golden core */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] shadow-[0_0_25px_rgba(212,175,55,0.5)] animate-pulse" />

        {/* Floating orbital particles inside ring */}
        <div className="absolute w-2 h-2 rounded-full bg-[#D4AF37] top-4 left-4 animate-ping" />
        <div className="absolute w-1.5 h-1.5 rounded-full bg-[#E8C84A] bottom-4 right-4 animate-pulse" />
      </div>

      {/* Typography Fade-In */}
      <div className="flex flex-col items-center space-y-2 text-center select-none px-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1A1A] tracking-tight">
          Amritsar <span className="font-serif italic text-[#D4AF37] pr-1">is Live</span>
        </h2>
        <div className="h-[1.5px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent my-1" />
        <p className="text-[9px] sm:text-[10px] text-[#808080] font-semibold uppercase tracking-[0.25em]">
          Discovering the Soul of the Holy City
        </p>
      </div>
    </div>
  );
}
