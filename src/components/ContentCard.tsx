import { Content } from "@/types/content";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Plus, Check, ThumbsUp } from "lucide-react";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";
import { DownloadButton } from "@/components/DownloadButton";

interface ContentCardProps {
  content: Content;
  className?: string;
  index?: number;
}

export const ContentCard = ({ content, className }: ContentCardProps) => {
  const navigate = useNavigate();
  const { toggle, has } = useWatchlist();
  const inWatchlist = has(content.id);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggle(content);
    if (!inWatchlist) {
      toast.success(`Added "${content.title}" to watchlist`);
    } else {
      toast.info(`Removed "${content.title}" from watchlist`);
    }
  };

  const goToDetail = () =>
    navigate(content.type === "series" ? `/show/${content.id}` : `/movie/${content.id}`);

  return (
    <div
      className={cn(
        "group relative w-[130px] sm:w-[170px] md:w-[210px] lg:w-[230px] flex-none cursor-pointer",
        className
      )}
      onClick={goToDetail}
    >
      {/* Poster - stays fixed size; the card that grows is the hover panel below */}
      <div className="relative w-full h-[195px] sm:h-[255px] md:h-[315px] lg:h-[345px] overflow-hidden rounded-sm bg-sterring-charcoal">
        <img
          src={content.imageUrl}
          alt={content.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* Netflix-style hover pop: scales up and reveals a solid info panel below the poster */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-30 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto origin-top hidden md:block"
        initial={false}
        whileHover={{}}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.35 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
          className="bg-sterring-charcoal rounded-sm shadow-2xl shadow-black/60 overflow-hidden"
        >
          <div className="relative w-full aspect-[2/3]">
            <img
              src={content.imageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-3">
            <div className="flex items-center gap-2 mb-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToDetail();
                }}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black hover:bg-white/85 transition-colors"
                aria-label="Play"
              >
                <Play className="h-4 w-4 fill-black ml-0.5" />
              </button>
              <button
                onClick={handleWatchlistToggle}
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white/50 text-white hover:border-white transition-colors"
                aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
              >
                {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
              <button
                className="flex items-center justify-center w-8 h-8 rounded-full border border-white/50 text-white hover:border-white transition-colors"
                aria-label="Rate"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <div className="ml-auto">
                <DownloadButton content={content} variant="icon" />
              </div>
            </div>
            <h3 className="text-xs font-bold text-white mb-1 line-clamp-1">{content.title}</h3>
            <div className="flex items-center gap-2 text-[11px] text-white/70 font-medium">
              <span className="text-sterring-green font-bold">{content.rating}</span>
              <span>{content.year}</span>
              {content.genres?.[0] && <span>{content.genres[0]}</span>}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Watchlist bookmark for touch devices, always tappable */}
      <button
        onClick={handleWatchlistToggle}
        className={`md:hidden absolute top-2 right-2 z-20 w-8 h-8 rounded-sm flex items-center justify-center transition-colors
          ${inWatchlist ? "bg-sterring-orange text-white" : "bg-black/60 text-white/90"}`}
        aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      >
        {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      </button>

      {/* Title shown under the poster on mobile / touch, since hover panel is desktop-only */}
      <div className="md:hidden mt-1.5">
        <h3 className="text-xs font-semibold text-white line-clamp-1">{content.title}</h3>
      </div>
    </div>
  );
};
