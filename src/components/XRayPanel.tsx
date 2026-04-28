import { motion, AnimatePresence } from "framer-motion";
import { CastMember } from "@/types/content";
import { useState, useMemo } from "react";
import { User } from "lucide-react";

interface XRayPanelProps {
  cast: CastMember[];
  currentTime: number;
  isPaused: boolean;
}

export const XRayPanel = ({ cast, currentTime, isPaused }: XRayPanelProps) => {
  const [selectedActorId, setSelectedActorId] = useState<string | null>(null);

  // Determine actors currently "in scene" based on timestamps
  const actorsInScene = useMemo(() => {
    return cast.filter((actor) => {
      if (!actor.sceneTimestamps || actor.sceneTimestamps.length === 0) return true; // If no timestamps, assume they are relevant to show
      return actor.sceneTimestamps.some(
        ([start, end]) => currentTime >= start && currentTime <= end
      );
    });
  }, [cast, currentTime]);

  // Use the selected actor or default to the first one in scene
  const selectedActor = useMemo(() => {
    if (selectedActorId) {
      return cast.find((c) => c.id === selectedActorId || c.name === selectedActorId);
    }
    return actorsInScene.length > 0 ? actorsInScene[0] : null;
  }, [cast, actorsInScene, selectedActorId]);

  if (!isPaused || actorsInScene.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      {isPaused && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="absolute left-10 top-1/2 -translate-y-1/2 z-50 flex"
        >
          {/* Main Info Card */}
          {selectedActor && (
            <div className="bg-black/60 backdrop-blur-xl border-2 border-white/80 rounded-2xl p-6 w-[350px] shadow-2xl flex flex-col gap-4 text-white">
              
              {/* Header: Photo, Name, Role */}
              <div className="flex items-center gap-4 border-b border-white/20 pb-4">
                {selectedActor.imageUrl ? (
                  <img
                    src={selectedActor.imageUrl}
                    alt={selectedActor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/40"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/40">
                    <User className="w-8 h-8 text-white/60" />
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-lg leading-tight">{selectedActor.name}</h3>
                  <p className="text-white/70 text-sm">Portrays: {selectedActor.role}</p>
                </div>
              </div>

              {/* Body: Stats */}
              <div className="flex flex-col gap-3 text-sm">
                {selectedActor.seenIn && selectedActor.seenIn.length > 0 && (
                  <div>
                    <span className="font-bold block mb-1">Seen in</span>
                    <ul className="text-white/80 space-y-0.5">
                      {selectedActor.seenIn.map((show, idx) => (
                        <li key={idx}>{show}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedActor.age && (
                  <div>
                    <span className="font-bold block">Age </span>
                    <span className="text-white/80">{selectedActor.age}</span>
                  </div>
                )}
                
                {selectedActor.height && (
                  <div>
                    <span className="font-bold block">Height </span>
                    <span className="text-white/80">{selectedActor.height}</span>
                  </div>
                )}
                
                {selectedActor.born && (
                  <div>
                    <span className="font-bold block">Born </span>
                    <span className="text-white/80">
                      {selectedActor.born}
                      {selectedActor.birthPlace && <><br />{selectedActor.birthPlace}</>}
                    </span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-2 text-xs text-white/50 border-t border-white/20 pt-3">
                Images provided by <strong className="text-white/70">IMDb</strong>
              </div>
            </div>
          )}

          {/* Navigation/Tabs (like the bottom buttons in the screenshot) */}
          <div className="absolute -bottom-16 left-0 flex gap-2">
            <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold text-white flex items-center gap-2 transition-colors border border-white/30">
              <span className="w-2 h-2 bg-sterring-orange rounded-full animate-pulse"></span>
              In scene
            </button>
            <button className="bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-sm text-white flex items-center gap-2 transition-colors border border-white/10">
              <User className="w-4 h-4" />
              Cast
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
