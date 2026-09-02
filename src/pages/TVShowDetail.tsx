import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Pause, ArrowLeft, Star, Plus, Check, VolumeX, Volume2, Expand, Tv, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allContent } from "@/data/content";
import { ContentCard } from "@/components/ContentCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { useContinueWatching } from "@/contexts/ContinueWatchingContext";
import { useVolumePreference } from "@/hooks/useVolumePreference";
import { DownloadButton } from "@/components/DownloadButton";
import { ContentProtection } from "@/components/ContentProtection";
import { XRayPanel } from "@/components/XRayPanel";

const TVShowDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const show = allContent.find((m) => m.id === id);
  const { toggle, has } = useWatchlist();
  const { upsert } = useContinueWatching();
  const { isMuted, setMuted } = useVolumePreference();

  const [showVideo, setShowVideo] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [showXRayHint, setShowXRayHint] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setShowVideo(false);
    setIsVideoLoading(true);
    if (!id) return;
    const timer = setTimeout(() => setShowVideo(true), 5000);
    return () => clearTimeout(timer);
  }, [id]);

  useEffect(() => {
    if (!showVideo || !videoRef.current) return;
    const video = videoRef.current;
    video.volume = 1;
    const attemptPlay = () => {
      const p = video.play();
      if (p !== undefined) {
        p.then(() => {
          setTimeout(() => setShowXRayHint(true), 1500);
          setTimeout(() => setShowXRayHint(false), 5000);
        }).catch(() => {
          setMuted(true);
          video.muted = true;
          video.play().catch(console.error);
        });
      }
    };
    if (video.readyState >= 3) {
      attemptPlay();
    } else {
      video.addEventListener("canplay", attemptPlay, { once: true });
      return () => video.removeEventListener("canplay", attemptPlay);
    }
  }, [showVideo, setMuted]);

  useEffect(() => {
    if (!showVideo || !show) return;
    const interval = setInterval(() => {
      if (!videoRef.current) return;
      upsert({
        id: show.id,
        title: show.title,
        imageUrl: show.imageUrl,
        type: show.type,
        progressSeconds: Math.floor(videoRef.current.currentTime),
        durationSeconds: Math.floor(videoRef.current.duration || 3600),
        timestamp: Date.now(),
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [showVideo, show, upsert]);

  if (!show) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Show Not Found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const similarShows = allContent
    .filter((m) => m.id !== show.id && m.type === "series")
    .slice(0, 6);

  const hasVideo = Boolean(show.videoUrl);
  const hasCast = (show.cast?.length ?? 0) > 0;
  const inWatchlist = has(show.id);

  const toggleMuteHandler = () => {
    if (videoRef.current) {
      const next = !isMuted;
      videoRef.current.muted = next;
      setMuted(next);
    }
  };

  const toggleFullscreen = () => {
    videoRef.current?.requestFullscreen?.();
  };

  const handleVideoClick = () => {
    if (!videoRef.current || !showVideo) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  // "Watch Episode 1" should work immediately, even before the 5s preview
  // countdown finishes — skip straight to the video and start it in the same click.
  const handlePlayNow = () => {
    setShowVideo(true);
    const video = videoRef.current;
    if (!video) return;
    const p = video.play();
    if (p !== undefined) {
      p.catch(() => {
        setMuted(true);
        video.muted = true;
        video.play().catch(() => {});
      });
    }
    video.requestFullscreen?.();
  };

  return (
    <div className="min-h-screen bg-sterring-ink">
      <Navbar />

      <ContentProtection className="w-full">
        <div className="relative w-full h-[85vh] min-h-[600px] max-h-[1000px] overflow-hidden bg-black flex flex-col justify-end">

          {/* Layer 1: Poster */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: `url(${show.imageUrl})` }}
          />

          {/* Layer 2: Video */}
          {hasVideo && (
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out pointer-events-none ${showVideo ? "opacity-100" : "opacity-0"}`}>
              <video
                key={show.id}
                ref={videoRef}
                src={show.videoUrl}
                className="w-full h-full object-cover"
                loop
                playsInline
                preload="auto"
                muted={isMuted}
                onCanPlay={() => setIsVideoLoading(false)}
                onPlay={() => setIsPaused(false)}
                onPause={() => setIsPaused(true)}
                onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          )}

          {/* Layer 3: Transparent click-catcher */}
          {hasVideo && showVideo && (
            <div
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={handleVideoClick}
              title={isPaused ? "Click to play" : "Click to pause"}
            />
          )}

          {/* Layer 4: Gradients — pointer-events-none so clicks pass through */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-sterring-ink via-sterring-ink/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-sterring-ink/90 via-sterring-ink/40 to-transparent z-20 pointer-events-none" />

          {/* Layer 5: X-Ray Panel */}
          {hasVideo && hasCast && (
            <div className="absolute inset-0 z-30 pointer-events-none">
              <div className="pointer-events-auto">
                <XRayPanel
                  cast={show.cast || []}
                  currentTime={currentTime}
                  isPaused={isPaused && showVideo}
                />
              </div>
            </div>
          )}

          {/* Layer 6: X-Ray hint toast */}
          <AnimatePresence>
            {showXRayHint && hasCast && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-28 right-6 z-40 flex items-center gap-2 bg-black/80 border border-white/10 rounded-sm px-4 py-2.5 shadow-xl pointer-events-none"
              >
                <div className="w-2 h-2 rounded-full bg-sterring-orange animate-pulse" />
                <span className="text-white/80 text-sm font-medium">Pause to see who's in this scene</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Layer 7: UI controls */}
          <div className="absolute inset-0 z-50 flex flex-col justify-end pointer-events-none">
            <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 pb-12 sm:pb-16 flex justify-between items-end">

              <div className="max-w-2xl flex flex-col pointer-events-auto">
                <Button variant="ghost" onClick={() => navigate(-1)} className="w-fit mb-6 text-white/70 hover:text-white hover:bg-white/10 -ml-4">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>

                <div className="flex items-center gap-2 mb-3">
                  <Tv className="w-4 h-4 text-sterring-orange" />
                  <span className="text-sterring-orange text-xs font-bold uppercase tracking-widest">TV Series</span>
                </div>

                <motion.h1
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-4"
                >
                  {show.title}
                </motion.h1>

                <motion.div
                  initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-wrap items-center gap-3 mb-6 text-sm text-white/80 font-medium"
                >
                  <div className="flex items-center gap-1 text-sterring-orange">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold text-white">8.5</span>
                  </div>
                  <span className="text-white/30">•</span>
                  <span>{show.year}</span>
                  <span className="text-white/30">•</span>
                  <div className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /><span>{show.duration}</span></div>
                  <span className="text-white/30">•</span>
                  <span className="px-2 py-0.5 border border-white/20 rounded text-xs text-white/60 uppercase tracking-widest">{show.rating}</span>
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-wrap gap-2 mb-8">
                  {show.genres.map((genre) => (
                    <span key={genre} className="px-3 py-1 bg-white/10 border border-white/10 text-white/90 rounded-sm text-sm">
                      {genre}
                    </span>
                  ))}
                </motion.div>

                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-wrap items-center gap-3">
                  <Button
                    size="lg"
                    className="bg-sterring-orange hover:bg-sterring-orange-dark text-white text-base md:text-lg px-8 py-6 rounded-sm font-bold transition-colors duration-150"
                    onClick={handlePlayNow}
                  >
                    <Play className="mr-2 h-6 w-6 fill-white" />
                    Watch Episode 1
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className={`text-base md:text-lg px-8 py-6 rounded-sm font-semibold transition-colors duration-150 ${
                      inWatchlist
                        ? "bg-sterring-orange/20 border-sterring-orange text-sterring-orange"
                        : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                    }`}
                    onClick={() => toggle(show)}
                  >
                    {inWatchlist ? <Check className="mr-2 h-6 w-6" /> : <Plus className="mr-2 h-6 w-6" />}
                    {inWatchlist ? "In Watchlist" : "Watchlist"}
                  </Button>
                  <DownloadButton content={show} />
                </motion.div>

                <AnimatePresence>
                  {showVideo && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.8 }} className="mt-8 overflow-hidden">
                      <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl border-l-2 border-sterring-orange/50 pl-4 py-1 bg-black/30 rounded-r-sm">
                        {show.synopsis || show.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Video controls */}
              {hasVideo && showVideo && (
                <div className="flex items-center gap-3 pb-2 pointer-events-auto">
                  <Button
                    variant="ghost" size="icon"
                    className="rounded-full bg-black/50 hover:bg-black/70 border border-white/20 text-white w-12 h-12 transition-colors duration-150"
                    onClick={handleVideoClick}
                    title={isPaused ? "Play" : "Pause"}
                  >
                    {isPaused ? <Play className="w-5 h-5 fill-white" /> : <Pause className="w-5 h-5" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full bg-black/50 hover:bg-black/70 border border-white/20 text-white w-12 h-12 transition-colors duration-150" onClick={toggleMuteHandler}>
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full bg-black/50 hover:bg-black/70 border border-white/20 text-white w-12 h-12 transition-colors duration-150" onClick={toggleFullscreen}>
                    <Expand className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {hasVideo && !showVideo && !isVideoLoading && (
            <motion.div className="absolute bottom-0 left-0 h-1 bg-sterring-orange z-50 "
              initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 5, ease: "linear" }}
            />
          )}
        </div>
      </ContentProtection>

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12">
        <h2 className="text-2xl font-bold text-white mb-6">Episodes</h2>
        <div className="flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/8 rounded-sm p-4 cursor-pointer transition-colors duration-150 group"
            onClick={handlePlayNow}
          >
            <div className="relative w-40 h-24 flex-shrink-0 rounded-sm overflow-hidden bg-sterring-charcoal">
              <img src={show.imageUrl} alt={show.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-black/60 flex items-center justify-center group-hover:bg-sterring-orange transition-colors">
                  <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/40 text-sm font-medium">S1 · E1</span>
              </div>
              <h3 className="text-white font-semibold text-lg truncate">{show.title} — Episode 1</h3>
              <p className="text-white/60 text-sm line-clamp-2 mt-1">{show.synopsis || show.description}</p>
            </div>
            <div className="text-white/40 text-sm flex-shrink-0 hidden sm:block">{show.duration}</div>
          </motion.div>
        </div>

        <div className="mt-12 mb-16 max-w-4xl">
          <h2 className="text-2xl font-bold text-white mb-4">About {show.title}</h2>
          <p className="text-white/70 text-lg leading-relaxed">{show.synopsis || show.description}</p>
        </div>

        {similarShows.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 tracking-tight">More Shows</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
              {similarShows.map((item, index) => (
                <ContentCard key={item.id} content={item} index={index} className="w-full" />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TVShowDetail;
