import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface WatchProgress {
  id: string;
  title: string;
  imageUrl: string;
  type: "movie" | "series";
  progressSeconds: number;
  durationSeconds: number;
  timestamp: number; // Date.now() when last watched
}

interface ContinueWatchingContextType {
  items: WatchProgress[];
  upsert: (progress: WatchProgress) => void;
  remove: (id: string) => void;
}

const ContinueWatchingContext = createContext<ContinueWatchingContextType>({
  items: [],
  upsert: () => {},
  remove: () => {},
});

const STORAGE_KEY = "sterring_continue_watching";
const MAX_ITEMS = 10;

export const ContinueWatchingProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<WatchProgress[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const upsert = (progress: WatchProgress) => {
    setItems((prev) => {
      const filtered = prev.filter((i) => i.id !== progress.id);
      // Most recently watched first, capped at MAX_ITEMS
      return [progress, ...filtered].slice(0, MAX_ITEMS);
    });
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <ContinueWatchingContext.Provider value={{ items, upsert, remove }}>
      {children}
    </ContinueWatchingContext.Provider>
  );
};

export const useContinueWatching = () => useContext(ContinueWatchingContext);
