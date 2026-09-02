import { ChevronLeft, ChevronRight } from "lucide-react";
import { ContentCard } from "./ContentCard";
import { Category } from "@/types/content";
import { useRef } from "react";

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
    <div className="mb-10 md:mb-14">
      {/* Category Header */}
      <div className="flex items-center justify-between mb-3 md:mb-4 px-4 sm:px-6 md:px-8 lg:px-12">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">
          {category.name}
        </h2>
        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={() => scroll("left")}
            className="h-9 w-9 rounded-sm bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors duration-150"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 text-white/80" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="h-9 w-9 rounded-sm bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors duration-150"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 text-white/80" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        ref={scrollRef}
        className="flex gap-1.5 sm:gap-2 md:gap-2.5 overflow-x-scroll scrollbar-hide px-4 sm:px-6 md:px-8 lg:px-12 pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {category.content.map((item, index) => (
          <ContentCard key={item.id} content={item} index={index} className="flex-shrink-0" />
        ))}
      </div>
    </div>
  );
};
