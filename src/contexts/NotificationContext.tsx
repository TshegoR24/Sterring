import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { categories } from "@/data/content";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  imageUrl?: string;
  timestamp: number;
  read: boolean;
  contentId?: string;
  contentType?: "movie" | "series";
}

interface NotificationContextType {
  notifications: AppNotification[];
  unreadCount: number;
  add: (n: Omit<AppNotification, "id" | "timestamp" | "read">) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clear: () => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  add: () => {},
  markRead: () => {},
  markAllRead: () => {},
  clear: () => {},
});

const STORAGE_KEY = "sterring_notifications";

// Real "new release" notifications built from the actual catalog — no invented data.
const buildSeedNotifications = (): AppNotification[] => {
  const now = Date.now();
  const seeds: AppNotification[] = [];

  const localMovies = categories.find((c) => c.id === "local-movies")?.content[0];
  if (localMovies) {
    seeds.push({
      id: `seed-movie-${localMovies.id}`,
      title: "New in Movies",
      message: `"${localMovies.title}" just landed — watch it now.`,
      imageUrl: localMovies.imageUrl,
      timestamp: now - 1000 * 60 * 60 * 3,
      read: false,
      contentId: localMovies.id,
      contentType: "movie",
    });
  }

  const localShows = categories.find((c) => c.id === "local-tv-shows")?.content[0];
  if (localShows) {
    seeds.push({
      id: `seed-show-${localShows.id}`,
      title: "New in TV Shows",
      message: `"${localShows.title}" is now streaming.`,
      imageUrl: localShows.imageUrl,
      timestamp: now - 1000 * 60 * 60 * 26,
      read: false,
      contentId: localShows.id,
      contentType: "series",
    });
  }

  const anime = categories.find((c) => c.id === "anime")?.content[0];
  if (anime) {
    seeds.push({
      id: `seed-anime-${anime.id}`,
      title: "New in Anime",
      message: `"${anime.title}" just joined the lineup.`,
      imageUrl: anime.imageUrl,
      timestamp: now - 1000 * 60 * 60 * 50,
      read: true,
      contentId: anime.id,
      contentType: "series",
    });
  }

  return seeds;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fall through to seed
    }
    return buildSeedNotifications();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const add: NotificationContextType["add"] = (n) => {
    const notification: AppNotification = {
      ...n,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
      read: false,
    };
    setNotifications((prev) => [notification, ...prev].slice(0, 30));
  };

  const markRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clear = () => setNotifications([]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, add, markRead, markAllRead, clear }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
