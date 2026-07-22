import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Play, Pause, ArrowLeft, Star, Plus, Check, VolumeX, Volume2, Expand } from "lucide-react";
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

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = allContent.find((m) => m.id === id);
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
          video.play().catch((e) => console.error("Video play failed:", e));
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
    if (!showVideo || !movie) return;
    const interval = setInterval(() => {
      if (!videoRef.current) return;
      upsert({
        id: movie.id,
        title: movie.title,
        imageUrl: movie.imageUrl,
        type: movie.type,
        progressSeconds: Math.floor(videoRef.current.currentTime),
        durationSeconds: Math.floor(videoRef.current.duration || 3600),
        timestamp: Date.now(),
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [showVideo, movie, upsert]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  const similarMovies = allContent
    .filter((m) => m.id !== movie.id && m.genres.some((genre) => movie.genres.includes(genre)))
    .slice(0, 6);

  const hasVideo = Boolean(movie.videoUrl);
  const hasCast = (movie.cast?.length ?? 0) > 0;
  const inWatchlist = has(movie.id);

  const toggleMute = () => {
    if (videoRef.current) {
      const next = !isMuted;
      videoRef.current.muted = next;
      setMuted(next);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  // This is the one click handler — toggles pause/play on the video
  const handleVideoClick = () => {
    if (!videoRef.current || !showVideo) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  // "Play Now" should work immediately, even before the 5s preview countdown
  // finishes — skip straight to the video and start it in the same click.
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
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <ContentProtection className="w-full">
        <div className="relative w-full h-[85vh] min-h-[600px] max-h-[1000px] overflow-hidden bg-black flex flex-col justify-end">

          {/* Layer 1: Poster */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
            style={{ backgroundImage: `url(${movie.imageUrl})` }}
          />

          {/* Layer 2: Video */}
          {hasVideo && (
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out pointer-events-none ${showVideo ? "opacity-100" : "opacity-0"}`}>
              <video
                key={movie.id}
                ref={videoRef}
                src={movie.videoUrl}
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

          {/* Layer 3: Transparent click-catcher over the video — sits above video, below UI */}
          {hasVideo && showVideo && (
            <div
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={handleVideoClick}
              title={isPaused ? "Click to play" : "Click to pause"}
            />
          )}

          {/* Layer 4: Gradients — pointer-events-none so clicks pass through to catcher */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-[60vh] bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent z-20 pointer-events-none" />

          {/* Layer 5: X-Ray Panel */}
          {hasVideo && hasCast && (
            <div className="absolute inset-0 z-30 pointer-events-none">
              <div className="pointer-events-auto">
                <XRayPanel
                  cast={movie.cast || []}
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
                className="absolute bottom-28 right-6 z-40 flex items-center gap-2 bg-black/70 border border-white/10 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-xl pointer-events-none"
              >
                <div className="w-2 h-2 rounded-full bg-sterring-orange animate-pulse" />
                <span className="text-white/80 text-sm font-medium">Pause to see who's in this scene</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Layer 7: UI controls — highest z, clickable */}
          <div className="absolute inset-0 z-50 flex flex-col justify-end pointer-events-none">
            <div className="w-full max-w-[1920px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20 pb-12 sm:pb-16 flex justify-between items-end">

              {/* Info block — re-enable pointer events for buttons */}
              <div className="max-w-2xl flex flex-col pointer-events-auto">
                <Button
                  variant="ghost"
                  onClick={() => navigate(-1)}
                  className="w-fit mb-6 text-white/70 hover:text-white hover:bg-white/10 -ml-4"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>

                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4 drop-shadow-xl"
                >
                  {movie.title}
                </motion.h1>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 text-sm text-white/80 font-medium"
                >
                  <div className="flex items-center gap-1 text-sterring-orange">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold text-white">8.5</span>
                  </div>
                  <span className="text-white/30">•</span>
                  <span>{movie.year}</span>
                  <span className="text-white/30">•</span>
                  <span>{movie.duration}</span>
                  <span className="text-white/30">•</span>
                  <span className="px-2 py-0.5 border border-white/20 rounded text-xs text-white/60 uppercase tracking-widest">{movie.rating}</span>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-wrap gap-2 mb-8"
                >
                  {movie.genres.map((genre) => (
                    <span key={genre} className="px-3 py-1 bg-white/10 border border-white/5 text-white/90 rounded-full text-sm backdrop-blur-md shadow-sm">
                      {genre}
                    </span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <Button
                    size="lg"
                    className="bg-sterring-orange hover:bg-sterring-orange/90 text-white shadow-lg shadow-sterring-orange/25 text-base md:text-lg px-8 py-6 rounded-xl font-bold transition-all hover:scale-105"
                    onClick={handlePlayNow}
                  >
                    <Play className="mr-2 h-6 w-6 fill-white" />
                    Play Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className={`text-base md:text-lg px-8 py-6 rounded-xl font-semibold backdrop-blur-md transition-all hover:scale-105 ${
                      inWatchlist
                        ? "bg-sterring-orange/20 border-sterring-orange text-sterring-orange"
                        : "bg-white/10 hover:bg-white/20 border-white/20 text-white"
                    }`}
                    onClick={() => toggle(movie)}
                  >
                    {inWatchlist ? <Check className="mr-2 h-6 w-6" /> : <Plus className="mr-2 h-6 w-6" />}
                    {inWatchlist ? "In Watchlist" : "Watchlist"}
                  </Button>
                  <DownloadButton content={movie} />
                </motion.div>

                <AnimatePresence>
                  {showVideo && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.8 }}
                      className="mt-8 overflow-hidden"
                    >
                      <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl border-l-2 border-sterring-orange/50 pl-4 py-1 bg-black/20 backdrop-blur-sm rounded-r-xl">
                        {movie.synopsis || movie.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Video controls — re-enable pointer events */}
              {hasVideo && showVideo && (
                <div className="flex items-center gap-3 pb-2 pointer-events-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md text-white w-12 h-12 transition-all hover:scale-110"
                    onClick={handleVideoClick}
                    title={isPaused ? "Play" : "Pause"}
                  >
                    {isPaused
                      ? <Play className="w-5 h-5 fill-white" />
                      : <Pause className="w-5 h-5" />
                    }
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md text-white w-12 h-12 transition-all hover:scale-110"
                    onClick={toggleMute}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-black/40 hover:bg-black/60 border border-white/20 backdrop-blur-md text-white w-12 h-12 transition-all hover:scale-110"
                    onClick={toggleFullscreen}
                  >
                    <Expand className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* 5s countdown bar */}
          {hasVideo && !showVideo && !isVideoLoading && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-sterring-orange z-50 shadow-[0_0_10px_rgba(255,107,0,0.8)]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
            />
          )}
        </div>
      </ContentProtection>

      <div className="relative z-20 max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16">
        {!showVideo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 max-w-4xl"
          >
            <h2 className="text-2xl font-bold text-white mb-4">About the Movie</h2>
            <p className="text-white/70 text-lg leading-relaxed">
              {movie.synopsis || movie.description}
            </p>
          </motion.div>
        )}

        {similarMovies.length > 0 && (
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 tracking-tight">More Like This</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
              {similarMovies.map((item, index) => (
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

export default MovieDetail;

