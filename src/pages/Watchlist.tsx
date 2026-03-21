import { Navbar } from "@/components/Navbar";
import { Bookmark, Film, Play, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Placeholder watchlist items – replace with real data/context later
const watchlistItems: { id: string; title: string; type: string; year: number; thumbnail: string }[] = [];

const Watchlist = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* Page Header */}
      <div className="pt-28 pb-10 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-2"
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-sterring-orange/15 text-sterring-orange">
            <Bookmark className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">My Watchlist</h1>
            <p className="text-white/50 text-sm mt-0.5">Keep track of what you want to watch next</p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-white/10 mt-8 mb-10" />

        {/* Content */}
        {watchlistItems.length === 0 ? (
          <EmptyState />
        ) : (
          <WatchlistGrid items={watchlistItems} />
        )}
      </div>
    </div>
  );
};

/* ─── Empty State ─────────────────────────────────────────────────────── */
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.1 }}
    className="flex flex-col items-center justify-center py-24 text-center"
  >
    {/* Animated icon ring */}
    <div className="relative mb-8">
      <div className="w-28 h-28 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
        <Bookmark className="w-12 h-12 text-sterring-orange/70" strokeWidth={1.5} />
      </div>
      <motion.div
        className="absolute inset-0 rounded-full border border-sterring-orange/30"
        animate={{ scale: [1, 1.18, 1], opacity: [0.8, 0, 0.8] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>

    <h2 className="text-2xl font-bold mb-3 text-white">Your watchlist is empty</h2>
    <p className="text-white/50 max-w-sm leading-relaxed mb-8">
      Browse movies and TV shows, then hit the bookmark icon to save them here for later.
    </p>

    <Link
      to="/"
      className="inline-flex items-center gap-2.5 px-7 py-3 bg-sterring-orange hover:bg-sterring-orange/90 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-sterring-orange/25 hover:shadow-sterring-orange/40 hover:-translate-y-0.5"
    >
      <Play className="w-4 h-4" />
      Browse Content
    </Link>
  </motion.div>
);

/* ─── Watchlist Grid (shown when items exist) ──────────────────────────── */
const WatchlistGrid = ({ items }: { items: typeof watchlistItems }) => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
    {items.map((item, i) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: i * 0.06 }}
        className="group relative rounded-xl overflow-hidden bg-white/5 border border-white/8 hover:border-sterring-orange/40 transition-all duration-300"
      >
        {/* Thumbnail */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <button className="w-10 h-10 rounded-full bg-sterring-orange flex items-center justify-center hover:scale-110 transition-transform">
              <Play className="w-4 h-4 text-white fill-white" />
            </button>
            <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-red-500/70 hover:scale-110 transition-all">
              <Trash2 className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="text-white text-sm font-semibold truncate">{item.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-white/40 text-xs">{item.year}</span>
            <span className="w-1 h-1 rounded-full bg-white/25" />
            <span className="text-sterring-orange text-xs font-medium flex items-center gap-1">
              <Film className="w-3 h-3" />
              {item.type}
            </span>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default Watchlist;
