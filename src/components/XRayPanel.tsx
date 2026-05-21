import { motion, AnimatePresence } from "framer-motion";
import { CastMember } from "@/types/content";
import { useState, useMemo } from "react";
import { User, Film, ChevronRight, X, MapPin, Calendar, Ruler } from "lucide-react";

interface XRayPanelProps {
  cast: CastMember[];
  currentTime: number;
  isPaused: boolean;
}

type ActiveTab = "in-scene" | "cast";

export const XRayPanel = ({ cast, currentTime, isPaused }: XRayPanelProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>("in-scene");
  const [selectedActor, setSelectedActor] = useState<CastMember | null>(null);

  // Determine actors "in scene" based on timestamps; fallback to first 3 if no timestamps
  const actorsInScene = useMemo(() => {
    const withTimestamps = cast.filter(
      (actor) =>
        actor.sceneTimestamps &&
        actor.sceneTimestamps.length > 0 &&
        actor.sceneTimestamps.some(([start, end]) => currentTime >= start && currentTime <= end)
    );
    if (withTimestamps.length > 0) return withTimestamps;
    // Fallback: show up to 3 cast members if no timestamps defined
    return cast.slice(0, 3);
  }, [cast, currentTime]);

  const displayList = activeTab === "in-scene" ? actorsInScene : cast;

  if (!isPaused || cast.length === 0) return null;

  return (
    <AnimatePresence>
      {isPaused && (
        <motion.div
          key="xray-panel"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 z-[55] flex flex-col"
          style={{ maxHeight: "75vh" }}
        >
          {/* ── Header label ── */}
          <div className="flex items-center gap-2 mb-3 px-1">
            <div className="w-1.5 h-1.5 rounded-full bg-sterring-orange animate-pulse" />
            <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">
              X-Ray
            </span>
          </div>

          {/* ── Main card ── */}
          <div
            className="relative w-[300px] sm:w-[340px] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            style={{
              background: "linear-gradient(135deg, rgba(10,10,10,0.92) 0%, rgba(20,20,20,0.88) 100%)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Tab strip */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setActiveTab("in-scene")}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeTab === "in-scene"
                    ? "text-sterring-orange border-b-2 border-sterring-orange -mb-px"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                In Scene
              </button>
              <button
                onClick={() => setActiveTab("cast")}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                  activeTab === "cast"
                    ? "text-sterring-orange border-b-2 border-sterring-orange -mb-px"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                Full Cast
              </button>
            </div>

            {/* Actor list */}
            <div className="overflow-y-auto" style={{ maxHeight: "55vh" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  {displayList.length === 0 ? (
                    <div className="p-6 text-center text-white/40 text-sm">
                      No cast info available
                    </div>
                  ) : (
                    displayList.map((actor) => (
                      <button
                        key={actor.id || actor.name}
                        onClick={() => setSelectedActor(actor)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/8 transition-colors group text-left border-b border-white/5 last:border-0"
                      >
                        {/* Avatar */}
                        {actor.imageUrl ? (
                          <img
                            src={actor.imageUrl}
                            alt={actor.name}
                            className="w-11 h-11 rounded-full object-cover flex-shrink-0 border border-white/20 group-hover:border-sterring-orange/60 transition-colors"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 border border-white/20 group-hover:border-sterring-orange/60 transition-colors">
                            <User className="w-5 h-5 text-white/40" />
                          </div>
                        )}
                        {/* Name & role */}
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-semibold truncate group-hover:text-sterring-orange transition-colors">
                            {actor.name}
                          </p>
                          <p className="text-white/50 text-xs truncate">as {actor.role}</p>
                        </div>
                        {/* Chevron — only if there's profile data */}
                        {(actor.seenIn || actor.age || actor.born) && (
                          <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-sterring-orange transition-colors flex-shrink-0" />
                        )}
                      </button>
                    ))
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-white/5">
              <p className="text-white/25 text-[10px] text-center">
                Powered by <span className="text-white/40">Sterring X-Ray</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Actor Detail Modal ── */}
      <AnimatePresence>
        {selectedActor && (
          <motion.div
            key="actor-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[60] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
            onClick={() => setSelectedActor(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative w-[340px] sm:w-[400px] rounded-2xl overflow-hidden shadow-2xl border border-white/15 mx-4"
              style={{
                background: "linear-gradient(160deg, rgba(15,15,15,0.97) 0%, rgba(25,25,25,0.97) 100%)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedActor(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>

              {/* Hero area */}
              <div className="relative">
                {selectedActor.imageUrl ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={selectedActor.imageUrl}
                      alt={selectedActor.name}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/40 to-transparent" />
                  </div>
                ) : (
                  <div className="h-32 bg-gradient-to-br from-sterring-orange/20 to-transparent flex items-center justify-center">
                    <User className="w-16 h-16 text-white/20" />
                  </div>
                )}

                {/* Name overlay */}
                <div className="px-5 pt-2 pb-4">
                  <h2 className="text-white text-2xl font-black leading-tight">
                    {selectedActor.name}
                  </h2>
                  <p className="text-sterring-orange text-sm font-medium mt-0.5">
                    as <span className="italic">{selectedActor.role}</span>
                  </p>
                </div>
              </div>

              {/* Stats grid */}
              <div className="px-5 pb-4 flex flex-col gap-4">
                {/* Biographical stats */}
                {(selectedActor.age || selectedActor.height || selectedActor.born) && (
                  <div className="grid grid-cols-3 gap-2">
                    {selectedActor.age && (
                      <div className="bg-white/5 rounded-xl p-3 text-center">
                        <Calendar className="w-3.5 h-3.5 text-sterring-orange mx-auto mb-1" />
                        <p className="text-white font-bold text-sm">{selectedActor.age}</p>
                        <p className="text-white/40 text-[10px] uppercase tracking-wide">Age</p>
                      </div>
                    )}
                    {selectedActor.height && (
                      <div className="bg-white/5 rounded-xl p-3 text-center">
                        <Ruler className="w-3.5 h-3.5 text-sterring-orange mx-auto mb-1" />
                        <p className="text-white font-bold text-sm leading-tight">{selectedActor.height.split(" ")[0]}</p>
                        <p className="text-white/40 text-[10px] uppercase tracking-wide">Height</p>
                      </div>
                    )}
                    {selectedActor.born && (
                      <div className="bg-white/5 rounded-xl p-3 text-center">
                        <MapPin className="w-3.5 h-3.5 text-sterring-orange mx-auto mb-1" />
                        <p className="text-white font-bold text-[10px] leading-tight">{selectedActor.born.split(",")[0]}</p>
                        <p className="text-white/40 text-[10px] uppercase tracking-wide">Born</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Birthplace */}
                {selectedActor.birthPlace && (
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-white/30 mt-0.5 flex-shrink-0" />
                    <p className="text-white/60 text-sm">{selectedActor.birthPlace}</p>
                  </div>
                )}

                {/* Seen In */}
                {selectedActor.seenIn && selectedActor.seenIn.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Film className="w-3.5 h-3.5 text-sterring-orange" />
                      <h3 className="text-white/80 text-xs font-bold uppercase tracking-widest">
                        Also Known For
                      </h3>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {selectedActor.seenIn.map((title, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 bg-white/5 hover:bg-white/8 rounded-lg px-3 py-2 transition-colors cursor-default"
                        >
                          <div className="w-1 h-1 rounded-full bg-sterring-orange/70 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{title}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

