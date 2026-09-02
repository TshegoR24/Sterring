import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Play,
  Trash2,
  WifiOff,
  CheckCircle2,
  Clock,
  Film,
  Tv,
  AlertTriangle,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useDownloads } from "@/contexts/DownloadContext";
import { toast } from "sonner";

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const formatDate = (ts: number) => {
  const d = new Date(ts);
  return d.toLocaleDateString("en-ZA", { day: "numeric", month: "short", year: "numeric" });
};

const Downloads = () => {
  const navigate = useNavigate();
  const { downloads, remove } = useDownloads();
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const handleDelete = (id: string, title: string) => {
    remove(id);
    setConfirmId(null);
    toast.info(`"${title}" removed from downloads`);
  };

  return (
    <div className="min-h-screen bg-sterring-ink">
      <Navbar />

      {/* ── Page header ───────────────────────────────────────────────── */}
      <div className="pt-24 pb-8 px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-2"
        >
          <div className="w-12 h-12 rounded-sm bg-sterring-orange/15 border border-sterring-orange/30 flex items-center justify-center">
            <Download className="w-6 h-6 text-sterring-orange" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              My Downloads
            </h1>
            <p className="text-white/50 text-sm mt-0.5">
              {downloads.length === 0
                ? "No downloads yet"
                : `${downloads.length} title${downloads.length !== 1 ? "s" : ""} available offline`}
            </p>
          </div>
        </motion.div>

        {/* Offline badge */}
        {downloads.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-green-500/10 border border-green-500/25 text-green-400 text-xs font-semibold"
          >
            <WifiOff className="w-3.5 h-3.5" />
            <span>Available without internet</span>
          </motion.div>
        )}
      </div>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="px-4 sm:px-6 md:px-8 lg:px-12 max-w-[1920px] mx-auto pb-32">
        {downloads.length === 0 ? (
          /* ── Empty state ─────────────────────────────────────────── */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <Download className="w-14 h-14 text-white/20" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-sterring-orange/20 border border-sterring-orange/40 flex items-center justify-center">
                <WifiOff className="w-5 h-5 text-sterring-orange" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No Downloads Yet</h2>
            <p className="text-white/50 text-base max-w-sm leading-relaxed mb-8">
              Download movies and TV shows to watch them offline — even without an internet
              connection.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => navigate("/movies")}
                className="bg-sterring-orange hover:bg-sterring-orange-dark text-white font-semibold px-6 py-3 rounded-sm"
              >
                <Film className="w-4 h-4 mr-2" />
                Browse Movies
              </Button>
              <Button
                onClick={() => navigate("/tv-shows")}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-6 py-3 rounded-sm"
              >
                <Tv className="w-4 h-4 mr-2" />
                Browse TV Shows
              </Button>
            </div>
          </motion.div>
        ) : (
          /* ── Downloads grid ──────────────────────────────────────── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence>
              {downloads.map(({ content, downloadedAt }, index) => (
                <motion.div
                  key={content.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  transition={{
                    duration: 0.3,
                    layout: { duration: 0.3 },
                  }}
                  className="group relative bg-sterring-charcoal border border-white/8 rounded-sm overflow-hidden hover:border-white/20 transition-colors duration-200"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={content.imageUrl}
                      alt={content.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Offline badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-green-500/20 border border-green-500/40">
                      <CheckCircle2 className="w-3 h-3 text-green-400" />
                      <span className="text-green-400 text-[10px] font-bold uppercase tracking-wider">
                        Offline
                      </span>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => setConfirmId(content.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-sm bg-black/60 hover:bg-red-500/80 border border-white/20 hover:border-red-400/50 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-150 opacity-0 group-hover:opacity-100"
                      aria-label="Remove download"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Type badge */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-sm bg-black/60">
                      {content.type === "series" ? (
                        <Tv className="w-3 h-3 text-white/70" />
                      ) : (
                        <Film className="w-3 h-3 text-white/70" />
                      )}
                      <span className="text-white/70 text-[10px] font-medium">
                        {content.type === "series" ? "Series" : "Movie"}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-white font-bold text-base mb-1 truncate">
                      {content.title}
                    </h3>
                    <div className="flex items-center gap-2 text-white/50 text-xs mb-3 flex-wrap">
                      <span>{content.year}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{content.duration}</span>
                      </div>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="uppercase tracking-wider">{content.rating}</span>
                    </div>

                    {/* Downloaded date */}
                    <p className="text-white/30 text-xs mb-4 flex items-center gap-1.5">
                      <Download className="w-3 h-3" />
                      Downloaded {formatDate(downloadedAt)}
                    </p>

                    {/* Action buttons */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() =>
                          navigate(
                            content.type === "series"
                              ? `/show/${content.id}`
                              : `/movie/${content.id}`
                          )
                        }
                        className="flex-1 bg-sterring-orange hover:bg-sterring-orange-dark text-white font-semibold rounded-sm py-2.5 text-sm"
                      >
                        <Play className="w-4 h-4 mr-1.5 fill-white" />
                        Play
                      </Button>
                      <Button
                        onClick={() => setConfirmId(content.id)}
                        variant="outline"
                        className="border-white/15 text-white/60 hover:text-red-400 hover:border-red-400/40 hover:bg-red-500/10 rounded-sm px-3"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ── Confirm delete modal ────────────────────────────────────── */}
      <AnimatePresence>
        {confirmId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 px-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setConfirmId(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-sm bg-sterring-charcoal border border-white/10 rounded-sm p-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-white font-bold text-lg">Remove Download?</h3>
              </div>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                "
                {downloads.find((d) => d.content.id === confirmId)?.content.title}
                " will be removed from your offline downloads.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => setConfirmId(null)}
                  variant="outline"
                  className="flex-1 border-white/20 text-white hover:bg-white/10 rounded-sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    const item = downloads.find((d) => d.content.id === confirmId);
                    if (item) handleDelete(item.content.id, item.content.title);
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-sm"
                >
                  <Trash2 className="w-4 h-4 mr-1.5" />
                  Remove
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Downloads;
