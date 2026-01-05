import { useState, useEffect } from "react";
import { Play, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Content } from "@/types/content";
import { useNavigate } from "react-router-dom";

interface HeroCarouselProps {
  featuredContent: Content[];
}

export const HeroCarousel = ({ featuredContent }: HeroCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
    }, 8000);

    return () => clearInterval(timer);
  }, [featuredContent.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredContent.length) % featuredContent.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
  };

  const currentContent = featuredContent[currentIndex];

  if (!currentContent) return null;

  return (
    <div className="relative h-[75vh] w-full overflow-hidden">
      {/* Film Grain Overlay */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.03] film-grain" />
      
      {/* Background Image with Fade Animation - Overscaled for cinematic effect */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={currentContent.imageUrl}
          alt={currentContent.title}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 h-full w-full object-cover scale-105"
        />
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

      {/* Content */}
      <div className="relative z-20 max-w-2xl px-10 pt-40 h-full flex flex-col justify-end pb-20">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Title - Larger, bolder */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-4"
            style={{
              textShadow: "0 4px 20px rgba(0,0,0,0.9), 0 2px 10px rgba(0,0,0,0.7)",
            }}
          >
            {currentContent.title}
          </motion.h1>

          {/* Description - Better contrast */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-4 text-neutral-300 leading-relaxed text-lg md:text-xl max-w-xl line-clamp-3"
          >
            {currentContent.description}
          </motion.p>

          {/* Metadata - Cleaner, more readable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-4 flex gap-4 text-sm text-neutral-400"
          >
            <span>{currentContent.year}</span>
            <span>{currentContent.duration}</span>
            <span>{currentContent.rating}</span>
            <span>{currentContent.genres[0]}</span>
          </motion.div>

          {/* Action Buttons - Netflix-style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 flex gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 rounded-md bg-white px-6 py-3 text-black font-semibold hover:bg-neutral-200 transition-colors shadow-xl"
              onClick={() => navigate(`/movie/${currentContent.id}`)}
            >
              <Play className="h-5 w-5" fill="black" />
              Play
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-md bg-white/20 px-6 py-3 text-white backdrop-blur hover:bg-white/30 transition-colors font-semibold"
              onClick={() => navigate(`/movie/${currentContent.id}`)}
            >
              <Info className="mr-2 h-5 w-5 inline" />
              More Info
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {featuredContent.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
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
