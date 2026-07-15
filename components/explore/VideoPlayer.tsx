'use client';

import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VideoPlayerProps {
  src: string;
  isActive: boolean;
  isMuted: boolean;
  onDoubleTap: () => void;
}

export interface VideoPlayerRef {
  togglePlay: () => void;
}

export const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  ({ src, isActive, isMuted, onDoubleTap }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [showIndicator, setShowIndicator] = useState<'play' | 'pause' | null>(null);
    const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
    const lastTap = useRef<number>(0);

    // Play/Pause when isActive changes
    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      if (isActive) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((err) => {
              console.warn('Auto-play blocked or interrupted:', err);
              setIsPlaying(false);
            });
        }
      } else {
        video.pause();
        video.currentTime = 0;
        setIsPlaying(false);
      }
    }, [isActive, src]);

    // Expose control functions to parent if needed
    useImperativeHandle(ref, () => ({
      togglePlay: () => {
        handleTapToggle();
      },
    }));

    const handleTapToggle = () => {
      const video = videoRef.current;
      if (!video) return;

      if (video.paused) {
        video.play();
        setIsPlaying(true);
        setShowIndicator('play');
      } else {
        video.pause();
        setIsPlaying(false);
        setShowIndicator('pause');
      }

      setTimeout(() => setShowIndicator(null), 800);
    };

    const handleTouchOrClick = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      const now = Date.now();
      const DOUBLE_PRESS_DELAY = 300;
      if (now - lastTap.current < DOUBLE_PRESS_DELAY) {
        // Double Tap triggered
        onDoubleTap();

        // Get coordinates for pop heart
        let clientX = window.innerWidth / 2;
        let clientY = window.innerHeight / 2;

        if ('touches' in e && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else if ('clientX' in e) {
          clientX = e.clientX;
          clientY = e.clientY;
        }

        const newHeart = {
          id: now,
          x: clientX,
          y: clientY,
        };

        setHearts((prev) => [...prev, newHeart]);

        // Clean up heart after animation
        setTimeout(() => {
          setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
        }, 1000);
      } else {
        // Single Tap delay
        setTimeout(() => {
          if (Date.now() - lastTap.current >= DOUBLE_PRESS_DELAY) {
            handleTapToggle();
          }
        }, DOUBLE_PRESS_DELAY);
      }
      lastTap.current = now;
    };

    return (
      <div
        className="relative w-full h-full cursor-pointer select-none bg-[#1A1A1A] overflow-hidden"
        onClick={handleTouchOrClick}
      >
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
        />

        {/* Play/Pause Indicator Animation */}
        <AnimatePresence>
          {showIndicator && (
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 0.9 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="absolute inset-0 m-auto w-20 h-20 bg-black/40 rounded-full flex items-center justify-center pointer-events-none z-20"
            >
              {showIndicator === 'play' ? (
                <Play className="text-[#F5F4F1] fill-white" size={32} />
              ) : (
                <Pause className="text-[#F5F4F1] fill-white" size={32} />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Double-tap Burst Hearts */}
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ scale: 0, opacity: 0, y: -20, rotate: Math.random() * 40 - 20 }}
              animate={{
                scale: [1, 1.8, 1.4],
                opacity: [1, 1, 0],
                y: -100,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="absolute pointer-events-none z-30"
              style={{
                left: heart.x - 40,
                top: heart.y - 40,
                width: 80,
                height: 80,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-full h-full text-red-500 fill-current drop-shadow-[0_10px_20px_rgba(239,68,68,0.5)]"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  }
);

VideoPlayer.displayName = 'VideoPlayer';
export default VideoPlayer;
