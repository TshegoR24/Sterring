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
    <div className="mb-12">
      <div className="flex items-center justify-between mb-5 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{category.name}</h2>
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 h-9 w-9 rounded-full"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 h-9 w-9 rounded-full"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-4"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {category.content.map((item) => (
          <ContentCard
            key={item.id}
            content={item}
            className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px]"
          />
        ))}
      </div>
    </div>
  );
};
