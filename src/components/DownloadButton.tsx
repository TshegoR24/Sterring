import { useState, useEffect } from "react";
import { Download, CheckCircle2, Loader2, X, Wifi } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Content } from "@/types/content";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

/* ─── localStorage helpers ─────────────────────────────────────────────── */
const DL_KEY = "sterring_downloads";

const getDownloads = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(DL_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveDownload = (id: string) => {
  const dl = getDownloads();
  if (!dl.includes(id)) localStorage.setItem(DL_KEY, JSON.stringify([...dl, id]));
};

const removeDownload = (id: string) => {
  const dl = getDownloads().filter((d) => d !== id);
  localStorage.setItem(DL_KEY, JSON.stringify(dl));
};

/* ─── Component ────────────────────────────────────────────────────────── */
interface DownloadButtonProps {
  content: Content;
  variant?: "icon" | "full";
}

export const DownloadButton = ({ content, variant = "full" }: DownloadButtonProps) => {
  const { isAuthenticated } = useAuth();
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setIsDownloaded(getDownloads().includes(content.id));
  }, [content.id]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Sign in to download content for offline viewing");
      return;
    }

    if (isDownloaded) {
      // Remove download
      removeDownload(content.id);
      setIsDownloaded(false);
      toast.info(`"${content.title}" removed from downloads`);
      return;
    }

    setShowModal(true);
    setProgress(0);
    setIsDownloading(true);
  };

  // Simulate download progress
  useEffect(() => {
    if (!isDownloading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          saveDownload(content.id);
          setIsDownloaded(true);
          toast.success(`"${content.title}" is now available offline!`);
          setTimeout(() => setShowModal(false), 1500);
          return 100;
        }
        // Simulate variable speed: fast start, slow middle, fast end
        const remaining = 100 - prev;
        const step = Math.max(1, Math.min(remaining * 0.15 + Math.random() * 3, 12));
        return Math.min(prev + step, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isDownloading, content.id, content.title]);

  const closeModal = () => {
    setShowModal(false);
    setIsDownloading(false);
    setProgress(0);
  };

  /* ─── Icon-only variant (for cards) ─────────────────────────────────── */
  if (variant === "icon") {
    return (
      <button
        onClick={handleClick}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md border ${
          isDownloaded
            ? "bg-green-500/20 border-green-500/50 text-green-400"
            : "bg-black/50 border-white/20 text-white/80 hover:bg-white/20 hover:text-white"
        }`}
        aria-label={isDownloaded ? "Remove download" : "Download for offline"}
        title={isDownloaded ? "Available offline — click to remove" : "Download for offline"}
      >
        {isDownloaded ? (
          <CheckCircle2 className="w-4 h-4" />
        ) : (
          <Download className="w-4 h-4" />
        )}
      </button>
    );
  }

  /* ─── Full button variant (for detail pages) ────────────────────────── */
  return (
    <>
      <motion.button
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleClick}
        className={`inline-flex items-center gap-2.5 text-base md:text-lg px-7 py-4 rounded-xl font-semibold backdrop-blur-md transition-all border ${
          isDownloaded
            ? "bg-green-500/15 border-green-500/40 text-green-400 hover:bg-green-500/25"
            : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
        }`}
      >
        {isDownloaded ? (
          <>
            <Wifi className="h-5 w-5" />
            <span>Downloaded</span>
          </>
        ) : (
          <>
            <Download className="h-5 w-5" />
            <span>Download</span>
          </>
        )}
      </motion.button>

      {/* ── Download Modal ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
            onClick={(e) => {
              if (e.target === e.currentTarget && !isDownloading) closeModal();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Close button */}
              {!isDownloading && (
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Thumbnail header */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={content.imageUrl}
                  alt={content.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
                <div className="absolute bottom-4 left-5 right-12">
                  <h3 className="text-white font-bold text-lg truncate">{content.title}</h3>
                  <p className="text-white/50 text-sm">
                    {content.year} · {content.duration} · {content.rating}
                  </p>
                </div>
              </div>

              {/* Progress section */}
              <div className="px-5 pb-6 pt-2">
                {progress < 100 ? (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <Loader2 className="w-4 h-4 animate-spin text-sterring-orange" />
                        <span>Downloading for offline…</span>
                      </div>
                      <span className="text-sterring-orange font-bold text-sm">
                        {Math.round(progress)}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-sterring-orange to-orange-400 rounded-full"
                        style={{ width: `${progress}%` }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      />
                      {/* Glow */}
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-sterring-orange/30 rounded-full blur-sm"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <p className="text-white/40 text-xs mt-3">
                      Do not close this window while downloading
                    </p>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center py-4 gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 12, stiffness: 200 }}
                    >
                      <CheckCircle2 className="w-14 h-14 text-green-400" />
                    </motion.div>
                    <h4 className="text-white font-bold text-lg">Available Offline</h4>
                    <p className="text-white/50 text-sm text-center max-w-[260px]">
                      You can now watch "{content.title}" without an internet connection.
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
