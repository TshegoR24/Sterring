import { Navbar } from "@/components/Navbar";
import { ContentCard } from "@/components/ContentCard";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { Bookmark, Play, Trash2, Share2, Copy, Plus, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { allContent } from "@/data/content";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { Content } from "@/types/content";

const Watchlist = () => {
  const { items, remove, add, has } = useWatchlist();
  const [searchParams] = useSearchParams();
  const [displayItems, setDisplayItems] = useState<Content[]>([]);
  const [isSharedView, setIsSharedView] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const sharedIds = searchParams.get("ids");
    if (sharedIds) {
      const ids = sharedIds.split(",");
      const sharedItems = allContent.filter((item) => ids.includes(item.id));
      setDisplayItems(sharedItems);
      setIsSharedView(true);
    } else {
      setDisplayItems(items);
      setIsSharedView(false);
    }
  }, [searchParams, items]);

  const handleShare = () => {
    if (items.length === 0) {
      toast.error("Your watchlist is empty!");
      return;
    }
    const ids = items.map((i) => i.id).join(",");
    const url = `${window.location.origin}/watchlist?ids=${ids}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Watchlist link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveAll = () => {
    displayItems.forEach((item) => {
      if (!has(item.id)) {
        add(item);
      }
    });
    toast.success("All items added to your watchlist!");
  };

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
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              {isSharedView ? "Shared Watchlist" : "My Watchlist"}
            </h1>
            <p className="text-white/50 text-sm mt-0.5">
              {displayItems.length > 0 
                ? `${displayItems.length} title${displayItems.length !== 1 ? "s" : ""} ${isSharedView ? "shared with you" : "saved"}` 
                : isSharedView ? "This shared list is empty" : "Keep track of what you want to watch next"}
            </p>
          </div>

          {/* Share/Save Button */}
          {!isSharedView ? (
            <button
              onClick={handleShare}
              className="ml-auto flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-lg text-sm font-semibold transition-all group/share"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Share2 className="w-4 h-4 text-white/70 group-hover/share:text-white transition-colors" />}
              <span>{copied ? "Copied!" : "Share"}</span>
            </button>
          ) : (
            <button
              onClick={handleSaveAll}
              className="ml-auto flex items-center gap-2 px-4 py-2 bg-sterring-orange hover:bg-sterring-orange/90 rounded-lg text-sm font-semibold transition-all shadow-lg shadow-sterring-orange/20"
            >
              <Plus className="w-4 h-4" />
              Save All to My Watchlist
            </button>
          )}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-white/10 mt-8 mb-10" />

        {/* Content */}
        <AnimatePresence mode="wait">
          {displayItems.length === 0 ? (
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
              <h2 className="text-2xl font-bold mb-3 text-white">
                {isSharedView ? "This shared watchlist is empty" : "Your watchlist is empty"}
              </h2>
              <p className="text-white/50 max-w-sm leading-relaxed mb-8">
                {isSharedView 
                  ? "The link you followed doesn't contain any titles, or they are no longer available."
                  : "Browse movies and TV shows, then hit the + Watchlist button to save them here."}
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
              {displayItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="relative group"
                >
                  <ContentCard content={item} index={i} className="w-full" />
                  {/* Remove from watchlist button — only in personal view */}
                  {!isSharedView && (
                    <button
                      onClick={() => remove(item.id)}
                      className="absolute top-2 right-2 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-red-600/90 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                      aria-label="Remove from watchlist"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-white" />
                    </button>
                  )}
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
