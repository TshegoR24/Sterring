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
    <div className="relative h-[64vh] md:h-[78vh] lg:h-[88vh] w-full overflow-hidden bg-sterring-ink">
      {/* Film Grain Overlay - subtle texture, kept understated */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.015] film-grain mix-blend-overlay" />

      {/* Background Media - hard cut with a touch of scale, no bounce */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
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

      {/* Single deliberate gradient system - left-to-right for text, bottom fade to blend into the page */}
      <div className="absolute inset-0 bg-gradient-to-r from-sterring-ink via-sterring-ink/70 via-40% to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-sterring-ink via-transparent to-transparent z-10" />

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/75 rounded-sm p-2.5 md:p-3 transition-colors duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 md:h-7 md:w-7 text-white" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/75 rounded-sm p-2.5 md:p-3 transition-colors duration-200"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 md:h-7 md:w-7 text-white" />
      </button>

      {/* Mute Button */}
      {hasVideo && (
        <button
          onClick={toggleMute}
          className="absolute right-4 md:right-8 bottom-20 md:bottom-24 z-30 p-2.5 md:p-3 rounded-full border border-white/40 bg-black/40 text-white hover:bg-black/60 transition-colors duration-200"
        >
          {isMuted ? <VolumeX className="w-5 h-5 md:w-6 md:h-6" /> : <Volume2 className="w-5 h-5 md:w-6 md:h-6" />}
        </button>
      )}

      {/* Content */}
      <div className="relative z-20 max-w-3xl px-6 sm:px-8 md:px-12 lg:px-16 pt-24 md:pt-32 h-full flex flex-col justify-center pb-20 md:pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-4 leading-[0.95] max-w-2xl"
              style={{ textShadow: "0 4px 20px rgba(0,0,0,0.85)" }}
            >
              {currentContent.title}
            </h1>

            {/* Metadata row - square chips, no pill shapes */}
            <div className="flex items-center gap-2.5 md:gap-3 text-sm md:text-base text-white/85 mb-4 md:mb-5">
              <span className="font-bold text-sterring-orange-light">{currentContent.genres[0]}</span>
              <span className="font-medium">{currentContent.year}</span>
              <span className="px-1.5 py-0.5 border border-white/40 text-xs font-medium">
                {currentContent.rating}
              </span>
              <span className="font-medium hidden sm:inline">{currentContent.duration}</span>
            </div>

            {/* Description */}
            <p
              className="text-white/90 leading-relaxed max-w-xl text-sm sm:text-base md:text-lg mb-6 md:mb-8"
              style={{
                textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {currentContent.description}
            </p>

            {/* Action Buttons - solid, square-cornered, no shimmer sweep */}
            <div className="flex items-center gap-3">
              <button
                className="flex items-center justify-center gap-2 rounded-sm bg-white px-6 md:px-8 py-3 md:py-3.5 text-base md:text-lg text-black font-bold hover:bg-white/85 transition-colors duration-150 min-h-[44px]"
                onClick={() => navigate(currentContent.type === "series" ? `/show/${currentContent.id}` : `/movie/${currentContent.id}`)}
              >
                <Play className="h-5 w-5 md:h-6 md:w-6 fill-black" />
                Play
              </button>

              <button
                className="flex items-center justify-center gap-2 rounded-sm bg-white/20 px-6 md:px-8 py-3 md:py-3.5 text-base md:text-lg text-white font-bold hover:bg-white/30 transition-colors duration-150 min-h-[44px]"
                onClick={() => navigate(currentContent.type === "series" ? `/show/${currentContent.id}` : `/movie/${currentContent.id}`)}
              >
                <Info className="h-5 w-5 md:h-6 md:w-6" />
                More Info
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators - thin lines, no glow */}
      <div className="absolute bottom-6 md:bottom-10 left-6 md:left-12 flex gap-1.5 z-30">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`h-[3px] rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-sterring-orange" : "w-4 bg-white/35 hover:bg-white/55"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
