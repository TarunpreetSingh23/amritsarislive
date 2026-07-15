'use client';

import React, { useState, memo } from 'react';
import { IVideo } from '@/types/video';
import VideoPlayer from './VideoPlayer';
import { useVideoIntersection } from '@/hooks/useVideoIntersection';
import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface VideoCardProps {
  video: IVideo;
  index: number;
  isActive: boolean;
  isRendered: boolean;
  isMuted: boolean;
  onMuteToggle: () => void;
  onVideoActive: (index: number) => void;
}

const VideoCardComponent = ({
  video,
  index,
  isActive,
  isRendered,
  isMuted,
  onMuteToggle,
  onVideoActive,
}: VideoCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const containerRef = useVideoIntersection(index, onVideoActive, 0.6);

  const handleDoubleTap = () => {
    setIsLiked(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] snap-start snap-always shrink-0 flex flex-col justify-between overflow-hidden bg-[#23201C]"
    >
      {isRendered ? (
        <>
          {/* Main Video Player */}
          <VideoPlayer
            src={video.cloudinaryVideoUrl}
            isActive={isActive}
            isMuted={isMuted}
            onDoubleTap={handleDoubleTap}
          />

          {/* Direct Floating Mute Button at bottom-right (TikTok/Reels style) */}
          <div className="absolute bottom-6 right-4 z-30 pointer-events-auto">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={(e) => {
                e.stopPropagation();
                onMuteToggle();
              }}
              className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#F5F4F1] shadow-lg cursor-pointer hover:bg-black/60 transition"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={20} className="text-[#C9A14A]" /> : <Volume2 size={20} />}
            </motion.button>
          </div>
        </>
      ) : (
        /* Unrendered Placeholder to preserve scrolling bounds & layout height */
        <div className="w-full h-full bg-[#1F1D1A]" />
      )}
    </div>
  );
};

export const VideoCard = memo(VideoCardComponent);
export default VideoCard;
