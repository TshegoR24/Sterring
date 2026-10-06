// The subset of HTMLMediaElement that the rest of the app relies on
// (MovieDetail, TVShowDetail) for custom play/pause/mute/fullscreen controls
// and progress tracking. Both Cloudflare Stream's <stream> element and Mux's
// <mux-player> element implement this same surface, so existing calling code
// barely has to change when switching providers — it was written against the
// native <video> element originally, and this interface is a formalization
// of exactly what it uses.
export interface VideoElementHandle {
  // Typed as always returning a Promise (matching real HTMLVideoElement,
  // Cloudflare Stream, and Mux Player behavior) rather than `Promise<void> | void`
  // — a `void` union doesn't narrow on `!== undefined` checks, which breaks the
  // .then()/.catch() chains in MovieDetail/TVShowDetail that rely on that guard.
  play: () => Promise<void>;
  pause: () => void;
  readonly paused: boolean;
  readonly duration: number;
  currentTime: number;
  volume: number;
  muted: boolean;
  readonly readyState: number;
  requestFullscreen?: () => Promise<void> | void;
  addEventListener: (type: string, listener: EventListenerOrEventListenerObject, options?: AddEventListenerOptions | boolean) => void;
  removeEventListener: (type: string, listener: EventListenerOrEventListenerObject, options?: EventListenerOptions | boolean) => void;
}

export type VideoProvider = "local" | "cloudflare" | "mux";

export interface VideoPlayerCommonProps {
  provider?: VideoProvider;
  /** Local file path or full URL — used when provider is "local" (legacy/default). */
  src?: string;
  /** Cloudflare Stream video UID — used when provider is "cloudflare". */
  cloudflareUid?: string;
  /** Mux playback ID — used when provider is "mux". */
  muxPlaybackId?: string;
  /** Signed JWT for private Cloudflare Stream videos. Omit for public videos. */
  cloudflareToken?: string;
  /** Signed playback token for private Mux videos. Omit for public playback IDs. */
  muxToken?: string;

  className?: string;
  loop?: boolean;
  muted?: boolean;
  preload?: "auto" | "metadata" | "none";
  disablePictureInPicture?: boolean;

  onCanPlay?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
  onContextMenu?: (e: React.MouseEvent) => void;
}
