'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IVideo } from '@/types/video';
import VideoCard from '@/components/explore/VideoCard';
import LoadingSkeleton from '@/components/explore/LoadingSkeleton';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ExplorePage() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch videos from API
  const fetchVideos = useCallback(async (pageNum: number, append = false) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setFetchingMore(true);

      const res = await fetch(`/api/videos?page=${pageNum}&limit=5`, {
        cache: 'no-store',
      });
      const data = await res.json();

      if (data.videos) {
        setVideos((prev) => (append ? [...prev, ...data.videos] : data.videos));
        setHasMore(data.pagination.hasMore);
      }
    } catch (err) {
      console.error('Failed to load explore videos:', err);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  }, []);

  // Fetch initial videos
  useEffect(() => {
    fetchVideos(1, false);
    setActiveIndex(0);
    setPage(1);
  }, [fetchVideos]);

  // Infinite Scroll Trigger
  useEffect(() => {
    if (videos.length === 0 || !hasMore || fetchingMore) return;

    // Fetch next page when active index approaches the end of the loaded list
    if (activeIndex >= videos.length - 2) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchVideos(nextPage, true);
    }
  }, [activeIndex, videos.length, hasMore, fetchingMore, page, fetchVideos]);

  // Keyboard navigation support (Arrow Up / Down)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (videos.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIdx = Math.min(activeIndex + 1, videos.length - 1);
        scrollToIndex(nextIdx);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIdx = Math.max(activeIndex - 0, 0);
        scrollToIndex(prevIdx);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, videos.length]);

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.children;
    if (children && children[index]) {
      children[index].scrollIntoView({ behavior: 'smooth' });
      setActiveIndex(index);
    }
  };

  const handleMuteToggle = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const handleVideoActive = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 w-full h-[100dvh] bg-[#23201C] z-[100] flex flex-col overflow-hidden text-[#F5F4F1] font-sans"
    >
      {/* Header Panel */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-between px-4 z-40 pointer-events-none">
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white pointer-events-auto hover:bg-black/50 active:scale-95 transition"
        >
          <ArrowLeft size={20} />
        </Link>
        <span className="font-serif text-base font-semibold tracking-widest text-[#F5F4F1] drop-shadow-md uppercase select-none pointer-events-auto">
          Explore Reels
        </span>
        <div className="w-10 h-10" /> {/* Spacer */}
      </div>

      {/* Main Reels Swiper Container */}
      <div className="flex-1 w-full h-full relative">
        {loading ? (
          <LoadingSkeleton />
        ) : videos.length > 0 ? (
          <div
            ref={containerRef}
            className="w-full h-full overflow-y-scroll scroll-snap-y mandatory scrollbar-hide flex flex-col select-none"
            style={{
              scrollSnapType: 'y mandatory',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {videos.map((video, index) => {
              const isRendered = Math.abs(index - activeIndex) <= 1;
              return (
                <VideoCard
                  key={video._id || index}
                  video={video}
                  index={index}
                  isActive={index === activeIndex}
                  isRendered={isRendered}
                  isMuted={isMuted}
                  onMuteToggle={handleMuteToggle}
                  onVideoActive={handleVideoActive}
                />
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-[#23201C] px-6 text-center">
            <span className="text-4xl">🎬</span>
            <h3 className="font-serif text-lg font-bold text-[#C9A14A]">No Reels Found</h3>
            <p className="text-xs text-white/50 max-w-[260px] leading-relaxed">
              We couldn't find any videos in this category. Check back later or explore another category!
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
