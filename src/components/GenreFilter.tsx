import { useState, useMemo } from "react";
import { Content } from "@/types/content";

interface GenreFilterProps {
  content: Content[];
  onFilter: (filtered: Content[]) => void;
}

export const GenreFilter = ({ content, onFilter }: GenreFilterProps) => {
  const [activeGenre, setActiveGenre] = useState("All");

  const genres = useMemo(() => {
    const all = content.flatMap((c) => c.genres);
    return ["All", ...Array.from(new Set(all)).sort()];
  }, [content]);

  const handleSelect = (genre: string) => {
    setActiveGenre(genre);
    if (genre === "All") {
      onFilter(content);
    } else {
      onFilter(content.filter((c) => c.genres.includes(genre)));
    }
  };

  return (
    <div className="flex flex-wrap gap-2 px-4 sm:px-6 md:px-8 lg:px-12 mb-6">
      {genres.map((genre) => {
        const isActive = genre === activeGenre;
        return (
          <button
            key={genre}
            onClick={() => handleSelect(genre)}
            className={`px-4 py-1.5 rounded-sm text-sm font-semibold border transition-colors duration-150 ${
              isActive
                ? "bg-sterring-orange border-sterring-orange text-white"
                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20"
            }`}
          >
            {genre}
          </button>
        );
      })}
    </div>
  );
};
