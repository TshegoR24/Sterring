export interface CastMember {
  id?: string;
  name: string;
  role: string;
  imageUrl?: string;
  seenIn?: string[];
  age?: number | string;
  height?: string;
  born?: string;
  birthPlace?: string;
  sceneTimestamps?: [number, number][];
}

export interface Filmmaker {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  awards?: string[];
  contentIds: string[]; // IDs of content they worked on
}

export interface Content {
  id: string;
  title: string;
  description: string;
  synopsis?: string;
  type: "movie" | "series";
  genres: string[];
  year: number;
  rating: string;
  duration: string;
  imageUrl: string;
  /** Local file path or full URL. Used when videoProvider is "local" (default) or unset. */
  videoUrl?: string;
  /** Which backend serves the full playback video. Defaults to "local" for existing content. */
  videoProvider?: "local" | "cloudflare" | "mux";
  /** Cloudflare Stream video UID. Required when videoProvider is "cloudflare". */
  cloudflareUid?: string;
  /** Mux playback ID. Required when videoProvider is "mux". */
  muxPlaybackId?: string;
  videoStart?: number;
  videoEnd?: number;
  featured?: boolean;
  director?: string; // Could link to Filmmaker
  cast?: CastMember[];
  creativeStatement?: string;
}

export interface Category {
  id: string;
  name: string;
  content: Content[];
}
