import { useRef, useState, useEffect } from "react";
import { Content } from "@/types/content";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Plus, Check, ThumbsUp, Volume2, VolumeX } from "lucide-react";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { toast } from "sonner";
import { DownloadButton } from "@/components/DownloadButton";
import { useVolumePreference } from "@/hooks/useVolumePreference";

interface ContentCardProps {
  content: Content;
  className?: string;
  index?: number;
}

// How long the pointer must stay over a card before the preview clip starts —
// mirrors Netflix's short delay so quick mouse passes don't all trigger playback.
const PREVIEW_DELAY_MS = 550;

export const ContentCard = ({ content, className }: ContentCardProps) => {
  const navigate = useNavigate();
  const { toggle, has } = useWatchlist();
  const { isMuted, toggleMuted } = useVolumePreference();
  const inWatchlist = has(content.id);

  const [isPreviewing, setIsPreviewing] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const hasVideo = Boolean(content.videoUrl);

  const handleMouseEnter = () => {
    if (!hasVideo) return;
    hoverTimer.current = setTimeout(() => setIsPreviewing(true), PREVIEW_DELAY_MS);
  };

  const handleMouseLeave = () => {
    setIsPreviewing(false);
    setIsPreviewing(false);
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    if (!isPreviewing || !videoRef.current) return;
    const video = videoRef.current;
    video.currentTime = 0;
    const p = video.play();
    if (p !== undefined) p.catch(() => {}); // autoplay can be blocked; fail silently
  }, [isPreviewing]);

  useEffect(() => () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);

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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

      {/* Netflix-style hover pop: scales up, crops to a landscape preview, and — after a short
          delay — starts playing a muted clip of the trailer, exactly like Netflix's row hover. */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-30 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto origin-top hidden md:block"
        initial={false}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.35 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
          className="bg-sterring-charcoal rounded-sm shadow-2xl shadow-black/60 overflow-hidden"
        >
          {/* Media area — landscape crop; swaps from poster to a playing clip once the hover delay elapses */}
          <div className="relative w-full aspect-video bg-black">
            <img
              src={content.imageUrl}
              alt=""
              className={`absolute inset-0 w-full h-full object-contain bg-black transition-opacity duration-300 ${
                isPreviewing && hasVideo ? "opacity-0" : "opacity-100"
              }`}
            />
            {hasVideo && (
              <video
                ref={videoRef}
                src={content.videoUrl}
                muted={isMuted}
                loop
                playsInline
                preload="none"
                className={`absolute inset-0 w-full h-full object-contain bg-black transition-opacity duration-300 ${
                  isPreviewing ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

            {/* Mute toggle — only relevant once a clip is actually playing */}
            {hasVideo && isPreviewing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMuted();
                }}
                className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/60 border border-white/40 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                aria-label={isMuted ? "Unmute preview" : "Mute preview"}
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            )}
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
            <h3 className="text-xs font-bold text-white mb-1.5 line-clamp-1">{content.title}</h3>
            <div className="flex items-center gap-2 text-[11px] text-white/70 font-medium mb-1.5">
              <span className="text-sterring-green font-bold">{content.rating}</span>
              <span>{content.year}</span>
              <span>{content.duration}</span>
            </div>
            {content.genres && content.genres.length > 0 && (
              <div className="flex items-center flex-wrap gap-x-1.5 text-[10px] text-white/60">
                {content.genres.slice(0, 3).map((genre, i) => (
                  <span key={genre} className="flex items-center gap-1.5">
                    {i > 0 && <span className="w-0.5 h-0.5 rounded-full bg-white/40" />}
                    {genre}
                  </span>
                ))}
              </div>
            )}
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
