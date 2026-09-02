import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ContentCard } from "@/components/ContentCard";
import { GenreFilter } from "@/components/GenreFilter";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Content } from "@/types/content";

type SortOption = "suggested" | "az" | "year-desc" | "year-asc";

interface GenreGridPageProps {
  title: string;
  description?: string;
  content: Content[];
  accentClassName?: string; // e.g. "text-purple-400" for Anime
}

export const GenreGridPage = ({
  title,
  description,
  content,
  accentClassName = "text-sterring-orange",
}: GenreGridPageProps) => {
  const [filtered, setFiltered] = useState<Content[]>(content);
  const [sort, setSort] = useState<SortOption>("suggested");

  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (sort) {
      case "az":
        return list.sort((a, b) => a.title.localeCompare(b.title));
      case "year-desc":
        return list.sort((a, b) => b.year - a.year);
      case "year-asc":
        return list.sort((a, b) => a.year - b.year);
      default:
        return list;
    }
  }, [filtered, sort]);

  // Hero rotates through clips from this genre — items with an actual video clip
  // come first so playback isn't just a static image most of the time.
  const heroContent = useMemo(() => {
    const withVideo = content.filter((c) => c.videoUrl);
    const withoutVideo = content.filter((c) => !c.videoUrl);
    return [...withVideo, ...withoutVideo].slice(0, 5);
  }, [content]);

  return (
    <div className="min-h-screen bg-sterring-ink text-white">
      <Navbar />

      {heroContent.length > 0 && <HeroCarousel featuredContent={heroContent} />}

      <div
        className={`${
          heroContent.length > 0 ? "relative z-10 -mt-8 md:-mt-16 pt-6" : "pt-24 md:pt-28"
        } pb-20 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1920px] mx-auto`}
      >
        {/* Plain header, genre-page style */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2">
              {title}
            </h1>
            {description && (
              <p className={`text-white/50 text-sm md:text-base max-w-xl`}>{description}</p>
            )}
            <p className={`text-xs font-bold uppercase tracking-widest mt-3 ${accentClassName}`}>
              {content.length} title{content.length !== 1 ? "s" : ""}
            </p>
          </div>

          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-[200px] bg-white/5 border-white/15 text-white rounded-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-sterring-charcoal border-white/10 text-white">
              <SelectItem value="suggested">Suggestions For You</SelectItem>
              <SelectItem value="az">A–Z</SelectItem>
              <SelectItem value="year-desc">Year: Newest</SelectItem>
              <SelectItem value="year-asc">Year: Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="mt-6">
          <GenreFilter content={content} onFilter={setFiltered} />
        </div>

        {/* Dense grid, not a scrolling row — matches Netflix's genre browse pages */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {sorted.map((item) => (
              <ContentCard key={item.id} content={item} className="w-full" />
            ))}
          </div>
        ) : (
          <p className="text-white/40 text-sm py-16 text-center">No titles match this filter.</p>
        )}
      </div>

      <Footer />
    </div>
  );
};
