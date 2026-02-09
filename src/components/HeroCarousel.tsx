import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Content } from "@/types/content";
import { useNavigate } from "react-router-dom";

interface HeroCarouselProps {
  featuredContent: Content[];
}

export const HeroCarousel = ({ featuredContent }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const currentContent = featuredContent[currentIndex];
  const hasVideo = !!currentContent?.videoUrl;

  useEffect(() => {
    // If there is a video, we don't auto-rotate until the video finishes (or we just let it loop and don't rotate?)
    // For now, let's pause auto-rotation if there's a video playing, 
    // or set a very long timeout if we want it to eventually rotate.
    // Given the request "play from 0:03 to 1:49", it's a long clip. 
    // Let's disable auto-rotation for video slides to let the user watch.

    if (hasVideo) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [featuredContent.length, hasVideo]);

  // Handle video segment looping
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !currentContent.videoUrl) return;

    const handleTimeUpdate = () => {
      const startTime = currentContent.videoStart || 0;
      const endTime = currentContent.videoEnd || video.duration;

      if (video.currentTime >= endTime) {
        video.currentTime = startTime;
        video.play();
      }
    };

    // Set initial time
    if (currentContent.videoStart) {
      video.currentTime = currentContent.videoStart;
    }

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [currentIndex, currentContent]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredContent.length) % featuredContent.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!currentContent) return null;

  return (
    <div className="relative h-[75vh] w-full overflow-hidden bg-black">
      {/* Film Grain Overlay */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.03] film-grain" />

      {/* Background Media */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 h-full w-full"
        >
          {hasVideo ? (
            <video
              ref={videoRef}
              src={currentContent.videoUrl}
              className="absolute inset-0 h-full w-full object-cover scale-105"
              autoPlay
              muted={isMuted}
              loop
              playsInline
            />
          ) : (
            <motion.img
              src={currentContent.imageUrl}
              alt={currentContent.title}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1.05 }}
              transition={{ duration: 10, ease: "linear" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Primary Gradient Overlay - Netflix-style */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />

      {/* Secondary depth layers */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 z-10" />

      {/* Navigation Arrows */}
      <motion.button
        onClick={goToPrevious}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
        whileTap={{ scale: 0.95 }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 rounded-full p-4 transition-all backdrop-blur-md border border-white/10 shadow-2xl"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </motion.button>
      <motion.button
        onClick={goToNext}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.8)" }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 rounded-full p-4 transition-all backdrop-blur-md border border-white/10 shadow-2xl"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </motion.button>

      {/* Mute Button for Video */}
      {hasVideo && (
        <motion.button
          onClick={toggleMute}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute right-24 bottom-32 z-30 p-2 rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </motion.button>
      )}

      {/* Content */}
      <div className="relative z-20 max-w-2xl px-10 pt-40 h-full flex flex-col justify-end pb-20">
        <motion.div
          key={`content-${currentIndex}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Title - Larger, bolder */}
          <motion.h1
            className="text-6xl font-extrabold tracking-tight text-white mb-4"
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.7)",
            }}
          >
            {currentContent.title}
          </motion.h1>

          {/* Description - Better contrast */}
          <p className="mt-4 text-neutral-300 leading-relaxed max-w-xl line-clamp-3 text-lg">
            {currentContent.description}
          </p>

          {/* Metadata - Cleaner, more readable */}
          <div className="mt-4 flex gap-4 text-sm text-neutral-400">
            <span>{currentContent.year}</span>
            <span>{currentContent.duration}</span>
            <span>{currentContent.genres[0]}</span>
          </div>

          {/* Action Buttons - Netflix-style */}
          <div className="mt-8 flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-md bg-white px-6 py-3 text-black font-semibold hover:bg-neutral-200 transition"
              onClick={() => navigate(`/movie/${currentContent.id}`)}
            >
              <Play className="h-4 w-4 fill-black" /> Watch Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-md bg-white/20 px-6 py-3 text-white backdrop-blur hover:bg-white/30 transition"
              onClick={() => navigate(`/movie/${currentContent.id}`)}
            >
              <Plus className="h-4 w-4" /> Add to Watchlist
            </motion.button>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {featuredContent.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`h-2 rounded-full transition-all ${index === currentIndex
              ? "w-12 bg-white shadow-lg"
              : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};


