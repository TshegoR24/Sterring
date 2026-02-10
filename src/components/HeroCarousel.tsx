import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Volume2, VolumeX, Play, Info } from "lucide-react";
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
    if (hasVideo) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [featuredContent.length, hasVideo]);

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
    <div className="relative h-[85vh] w-full overflow-hidden bg-black">
      {/* Film Grain Overlay - Subtle cinematic texture */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.02] film-grain mix-blend-overlay" />

      {/* Background Media - Cinematic crossfade with subtle scale */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            opacity: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
            scale: { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }
          }}
          className="absolute inset-0 h-full w-full"
        >
          {hasVideo ? (
            <video
              ref={videoRef}
              src={currentContent.videoUrl}
              className="absolute inset-0 h-full w-full object-cover"
              autoPlay
              muted={isMuted}
              loop
              playsInline
            />
          ) : (
            <img
              src={currentContent.imageUrl}
              alt={currentContent.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Gradient Overlays - Premium text contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 via-30% to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 via-60% to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black z-10" />
      {/* Vignette effect for cinematic depth */}
      <div className="absolute inset-0 z-10" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(0,0,0,0.6) 100%)' }} />

      {/* Navigation Arrows - Premium glass morphism */}
      <motion.button
        onClick={goToPrevious}
        whileHover={{ scale: 1.1, x: -4 }}
        whileTap={{ scale: 0.95 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 rounded-full p-4 transition-all duration-300 backdrop-blur-xl border border-white/10 shadow-2xl group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
      </motion.button>
      <motion.button
        onClick={goToNext}
        whileHover={{ scale: 1.1, x: 4 }}
        whileTap={{ scale: 0.95 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 rounded-full p-4 transition-all duration-300 backdrop-blur-xl border border-white/10 shadow-2xl group"
        aria-label="Next slide"
      >
        <ChevronRight className="h-8 w-8 text-white group-hover:scale-110 transition-transform" />
      </motion.button>

      {/* Mute Button - Refined positioning */}
      {hasVideo && (
        <motion.button
          onClick={toggleMute}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="absolute right-8 bottom-32 z-30 p-3 rounded-full border-2 border-white/30 bg-black/40 text-white backdrop-blur-xl hover:bg-black/60 hover:border-white/50 transition-all duration-300 shadow-xl"
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </motion.button>
      )}

      {/* Content - Cinematic presentation */}
      <div className="relative z-20 max-w-4xl px-12 lg:px-16 pt-32 h-full flex flex-col justify-center pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Title - Maximum cinematic impact */}
            <motion.h1
              className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter text-white mb-6 leading-[0.9]"
              style={{
                textShadow: '0 8px 32px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.7)',
              }}
            >
              {currentContent.title}
            </motion.h1>

            {/* Description - Premium readability */}
            <motion.p
              className="mt-6 text-white leading-relaxed max-w-2xl text-lg md:text-xl lg:text-2xl font-light"
              style={{
                textShadow: '0 4px 16px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.7)',
                lineClamp: 3,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {currentContent.description}
            </motion.p>

            {/* Metadata - Clean and refined */}
            <motion.div
              className="mt-6 flex items-center gap-4 text-base text-white/90"
              style={{
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}
            >
              <span className="font-bold text-lg">{currentContent.year}</span>
              <span className="w-1 h-1 rounded-full bg-white/60" />
              <span className="font-medium">{currentContent.duration}</span>
              <span className="w-1 h-1 rounded-full bg-white/60" />
              <span className="px-3 py-1 border-2 border-white/40 rounded-md text-sm font-semibold backdrop-blur-sm bg-white/5">
                {currentContent.genres[0]}
              </span>
            </motion.div>

            {/* Action Buttons - Premium CTAs with glow */}
            <motion.div
              className="mt-10 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255,255,255,0.3)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 rounded-lg bg-white px-10 py-4 text-black text-lg font-bold hover:bg-white/95 transition-all duration-300 shadow-2xl relative overflow-hidden group"
                onClick={() => navigate(`/movie/${currentContent.id}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Play className="h-6 w-6 fill-black relative z-10" />
                <span className="relative z-10">Watch Now</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.6)' }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-3 rounded-lg bg-white/20 px-10 py-4 text-white text-lg font-semibold backdrop-blur-xl hover:bg-white/30 transition-all duration-300 border-2 border-white/30 shadow-xl"
                onClick={() => navigate(`/movie/${currentContent.id}`)}
              >
                <Info className="h-6 w-6" />
                More Info
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Indicators - Refined and smooth */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {featuredContent.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`h-1 rounded-full transition-all duration-500 ${index === currentIndex
                  ? "w-12 bg-white shadow-lg shadow-white/50"
                  : "w-8 bg-white/40 group-hover:bg-white/60"
                }`}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};


