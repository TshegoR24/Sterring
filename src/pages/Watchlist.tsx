import { Navbar } from "@/components/Navbar";
import { ContentCard } from "@/components/ContentCard";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { Bookmark, Play, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const { items, remove } = useWatchlist();

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
            <p className="text-white/50 text-sm mt-0.5">
              {items.length > 0 ? `${items.length} title${items.length !== 1 ? "s" : ""} saved` : "Keep track of what you want to watch next"}
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-white/10 mt-8 mb-10" />

        {/* Content */}
        <AnimatePresence mode="wait">
          {items.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
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
                Browse movies and TV shows, then hit the <strong>+ Watchlist</strong> button to save them here.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2.5 px-7 py-3 bg-sterring-orange hover:bg-sterring-orange/90 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-sterring-orange/25 hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4" />
                Browse Content
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
            >
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="relative"
                >
                  <ContentCard content={item} index={i} className="w-full" />
                  {/* Remove from watchlist button */}
                  <button
                    onClick={() => remove(item.id)}
                    className="absolute top-2 right-2 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-red-600/90 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                    aria-label="Remove from watchlist"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-white" />
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Watchlist;
