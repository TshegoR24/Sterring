import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Content } from "@/types/content";

/* ─── localStorage key ───────────────────────────────────────────────────── */
const DL_KEY = "sterring_downloads_v2";

interface DownloadedItem {
  content: Content;
  downloadedAt: number; // timestamp
}

const readStorage = (): DownloadedItem[] => {
  try {
    return JSON.parse(localStorage.getItem(DL_KEY) || "[]");
  } catch {
    return [];
  }
};

const writeStorage = (items: DownloadedItem[]) => {
  localStorage.setItem(DL_KEY, JSON.stringify(items));
};

/* ─── Context shape ──────────────────────────────────────────────────────── */
interface DownloadContextValue {
  downloads: DownloadedItem[];
  add: (content: Content) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
  count: number;
}

const DownloadContext = createContext<DownloadContextValue | null>(null);

/* ─── Provider ───────────────────────────────────────────────────────────── */
export const DownloadProvider = ({ children }: { children: ReactNode }) => {
  const [downloads, setDownloads] = useState<DownloadedItem[]>(readStorage);

  const add = useCallback((content: Content) => {
    setDownloads((prev) => {
      if (prev.some((d) => d.content.id === content.id)) return prev;
      const next = [{ content, downloadedAt: Date.now() }, ...prev];
      writeStorage(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setDownloads((prev) => {
      const next = prev.filter((d) => d.content.id !== id);
      writeStorage(next);
      return next;
    });
  }, []);

  const has = useCallback(
    (id: string) => downloads.some((d) => d.content.id === id),
    [downloads]
  );

  return (
    <DownloadContext.Provider
      value={{ downloads, add, remove, has, count: downloads.length }}
    >
      {children}
    </DownloadContext.Provider>
  );
};

/* ─── Hook ───────────────────────────────────────────────────────────────── */
export const useDownloads = () => {
  const ctx = useContext(DownloadContext);
  if (!ctx) throw new Error("useDownloads must be used inside DownloadProvider");
  return ctx;
};
