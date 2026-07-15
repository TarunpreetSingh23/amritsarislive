import React from 'react';

export default function LoadingSkeleton() {
  return (
    <div className="relative w-full h-[100dvh] bg-[#23201C] flex items-center justify-center overflow-hidden">
      {/* Background blur */}
      <div className="absolute inset-0 bg-[#23201C]/90" />
      
      {/* Animated pulsing background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent animate-pulse" />

      {/* Main Center Spinner/Icon Placeholder */}
      <div className="relative flex flex-col items-center gap-4 z-10">
        <div className="w-16 h-16 rounded-full border-4 border-[#C9A14A]/30 border-t-[#C9A14A] animate-spin" />
        <span className="font-serif text-sm italic tracking-widest text-[#F5F4F1]/60 uppercase">
          Amritsar is Live
        </span>
      </div>

      {/* Left Bottom Details Skeleton */}
      <div className="absolute bottom-24 left-4 right-16 flex flex-col gap-3 z-10 max-w-[280px]">
        <div className="h-6 w-32 bg-white/10 rounded-md animate-pulse" />
        <div className="h-4 w-48 bg-white/5 rounded-md animate-pulse" />
        <div className="h-4 w-40 bg-white/5 rounded-md animate-pulse" />
        <div className="flex gap-2 mt-2">
          <div className="h-5 w-16 bg-[#C9A14A]/10 rounded-full animate-pulse" />
          <div className="h-5 w-16 bg-[#C9A14A]/10 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Right Actions Skeleton */}
      <div className="absolute bottom-24 right-4 flex flex-col gap-6 items-center z-10">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-11 h-11 rounded-full bg-white/10 animate-pulse" />
            <div className="w-6 h-3 bg-white/5 rounded-sm animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
