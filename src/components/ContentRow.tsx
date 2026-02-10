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
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-12 md:mb-16"
    >
      {/* Category Header - Mobile optimized */}
      <div className="flex items-center justify-between mb-4 md:mb-6 px-4 sm:px-6 md:px-8 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-tight leading-tight"
        >
          {category.name}
        </motion.h2>
        <div className="flex items-center gap-2">
          {/* Navigation Controls - Mobile optimized */}
          <motion.button
            whileHover={{
              scale: 1.08,
              x: -2,
              transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }
            }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scroll("left")}
            className="h-11 w-11 md:h-10 md:w-10 rounded-full bg-black/50 hover:bg-black/70 border border-white/15 hover:border-white/30 flex items-center justify-center transition-all duration-250 backdrop-blur-lg shadow-lg group"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-white/90 group-hover:text-white transition-colors" />
          </motion.button>
          <motion.button
            whileHover={{
              scale: 1.08,
              x: 2,
              transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }
            }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scroll("right")}
            className="h-11 w-11 md:h-10 md:w-10 rounded-full bg-black/50 hover:bg-black/70 border border-white/15 hover:border-white/30 flex items-center justify-center transition-all duration-250 backdrop-blur-lg shadow-lg group"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-white/90 group-hover:text-white transition-colors" />
          </motion.button>
        </div>
      </div>

      {/* Scrollable Content - Mobile optimized */}
      <div
        ref={scrollRef}
        className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-scroll scrollbar-hide px-4 sm:px-6 md:px-8 lg:px-12 pb-4"
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

