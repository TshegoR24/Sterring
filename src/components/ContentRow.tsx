import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ContentCard } from "./ContentCard";
import { Category } from "@/types/content";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

interface ContentRowProps {
  category: Category;
}

export const ContentRow = ({ category }: ContentRowProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-16"
    >
      {/* Category Header - Spotify-style clean and bold */}
      <div className="flex items-center justify-between mb-6 px-8 md:px-12">
        <motion.h2
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-2xl md:text-3xl font-bold text-white tracking-tight"
        >
          {category.name}
        </motion.h2>
        <div className="flex items-center gap-3">
          {/* Navigation Controls - Refined */}
          <motion.button
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scroll("left")}
            className="h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-white/40 flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-lg group"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scroll("right")}
            className="h-10 w-10 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 hover:border-white/40 flex items-center justify-center transition-all duration-300 backdrop-blur-md shadow-lg group"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-white group-hover:scale-110 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Scrollable Content - Netflix-style horizontal scrolling */}
      <div
        ref={scrollRef}
        className="flex gap-3 md:gap-4 overflow-x-scroll scrollbar-hide px-8 md:px-12 pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {category.content.map((item, index) => (
          <ContentCard
            key={item.id}
            content={item}
            index={index}
            className="flex-shrink-0"
          />
        ))}
      </div>
    </motion.div>
  );
};

