import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, X, Clock } from "lucide-react";
import { useContinueWatching, WatchProgress } from "@/contexts/ContinueWatchingContext";

const ProgressBar = ({ progress, duration }: { progress: number; duration: number }) => {
  const pct = duration > 0 ? Math.min((progress / duration) * 100, 100) : 0;
  return (
    <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mt-2">
      <div className="h-full bg-sterring-orange rounded-full" style={{ width: `${pct}%` }} />
    </div>
  );
};

const ContinueWatchingCard = ({ item, onRemove }: { item: WatchProgress; onRemove: () => void }) => {
  const navigate = useNavigate();
  const route = item.type === "series" ? `/show/${item.id}` : `/movie/${item.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      layout
      className="relative w-[140px] sm:w-[180px] md:w-[220px] lg:w-[240px] flex-none cursor-pointer group"
      onClick={() => navigate(route)}
    >
      {/* Thumbnail */}
      <div className="relative h-[200px] sm:h-[240px] md:h-[260px] rounded-sm overflow-hidden bg-sterring-charcoal">
        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-sterring-orange flex items-center justify-center shadow-lg">
            <Play className="w-5 h-5 fill-white text-white ml-0.5" />
          </div>
        </div>
        {/* Remove button */}
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 hover:bg-red-600/90 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
          aria-label="Remove"
        >
          <X className="w-3.5 h-3.5 text-white" />
        </button>
        {/* Progress bar at bottom of thumbnail */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-sterring-orange"
            style={{ width: `${Math.min((item.progressSeconds / item.durationSeconds) * 100, 100)}%` }}
          />
        </div>
      </div>
      {/* Info */}
      <div className="mt-2 px-0.5">
        <p className="text-white text-sm font-semibold truncate">{item.title}</p>
        <div className="flex items-center gap-1 mt-0.5 text-white/40 text-xs">
          <Clock className="w-3 h-3" />
          <span>{Math.round((item.durationSeconds - item.progressSeconds) / 60)} min left</span>
        </div>
      </div>
    </motion.div>
  );
};

export const ContinueWatchingRow = () => {
  const { items, remove } = useContinueWatching();

  if (items.length === 0) return null;

  return (
    <div className="py-6">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 px-4 sm:px-6 md:px-8 lg:px-12 tracking-tight">
        Continue Watching
      </h2>
      <div className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 md:px-8 lg:px-12 pb-2">
        {items.map((item) => (
          <ContinueWatchingCard key={item.id} item={item} onRemove={() => remove(item.id)} />
        ))}
      </div>
    </div>
  );
};
