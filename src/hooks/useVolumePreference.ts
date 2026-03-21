import { useState, useEffect } from "react";

const STORAGE_KEY = "sterring_muted";

export const useVolumePreference = () => {
  const [isMuted, setIsMutedState] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isMuted));
  }, [isMuted]);

  const setMuted = (muted: boolean) => setIsMutedState(muted);
  const toggleMuted = () => setIsMutedState((prev) => !prev);

  return { isMuted, setMuted, toggleMuted };
};
