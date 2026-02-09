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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      {/* Category Header - Premium OTT style */}
      <div className="flex items-center justify-between mb-6 px-8">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          {category.name}
        </motion.h2>
        <div className="flex items-center gap-4">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-neutral-400 hover:text-white cursor-pointer transition-colors"
          >
            View all →
          </motion.span>
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-10 w-10 rounded-full border border-white/20 backdrop-blur-sm"
                onClick={() => scroll("left")}
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-10 w-10 rounded-full border border-white/20 backdrop-blur-sm"
                onClick={() => scroll("right")}
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scrollable Content - Horizontal scrolling */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-scroll scrollbar-hide px-8 pb-6"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {category.content.map((item) => (
          <ContentCard
            key={item.id}
            content={item}
            className="flex-shrink-0"
          />
        ))}
      </div>
    </motion.div>
  );
};

