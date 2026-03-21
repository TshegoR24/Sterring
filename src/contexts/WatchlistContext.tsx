import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Content } from "@/types/content";

interface WatchlistContextType {
  items: Content[];
  add: (content: Content) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  toggle: (content: Content) => void;
}

const WatchlistContext = createContext<WatchlistContextType>({
  items: [],
  add: () => {},
  remove: () => {},
  has: () => false,
  toggle: () => {},
});

const STORAGE_KEY = "sterring_watchlist";

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Content[]>(() => {
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

  const add = (content: Content) => {
    setItems((prev) => (prev.some((i) => i.id === content.id) ? prev : [...prev, content]));
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const has = (id: string) => items.some((i) => i.id === id);

  const toggle = (content: Content) => {
    has(content.id) ? remove(content.id) : add(content);
  };

  return (
    <WatchlistContext.Provider value={{ items, add, remove, has, toggle }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => useContext(WatchlistContext);
