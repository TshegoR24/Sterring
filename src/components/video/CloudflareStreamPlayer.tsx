import { forwardRef, useEffect, useRef, useState } from "react";
import { VideoElementHandle } from "./types";

const SDK_URL = "https://embed.cloudflarestream.com/embed/sdk.latest.js";

// Cloudflare's <stream> custom element self-registers once this script runs.
// Shared across every player instance on the page so we only ever load it once.
let sdkPromise: Promise<void> | null = null;
function loadCloudflareStreamSdk(): Promise<void> {
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${SDK_URL}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = SDK_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Cloudflare Stream SDK"));
    document.head.appendChild(script);
  });
  return sdkPromise;
}

interface CloudflareStreamPlayerProps {
  /** Video UID for public videos, or omit and pass `token` for signed/private videos. */
  uid?: string;
  /** Signed playback token — takes priority over `uid` when both are present. */
  token?: string;
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

export const CloudflareStreamPlayer = forwardRef<VideoElementHandle, CloudflareStreamPlayerProps>(
  (
    {
      uid,
      token,
      className,
      loop,
      muted,
      preload = "auto",
      disablePictureInPicture,
      onCanPlay,
      onPlay,
      onPause,
      onTimeUpdate,
      onContextMenu,
    },
    forwardedRef
  ) => {
    const elRef = useRef<HTMLElement & VideoElementHandle>(null);
    const [sdkReady, setSdkReady] = useState(false);

    useEffect(() => {
      let cancelled = false;
      loadCloudflareStreamSdk().then(() => {
        if (!cancelled) setSdkReady(true);
      });
      return () => {
        cancelled = true;
      };
    }, []);

    useEffect(() => {
      if (typeof forwardedRef === "function") {
        forwardedRef(elRef.current);
      } else if (forwardedRef) {
        forwardedRef.current = elRef.current;
      }
    }, [forwardedRef, sdkReady]);

    useEffect(() => {
      const el = elRef.current;
      if (!el) return;
      const handleTimeUpdate = () => onTimeUpdate?.(el.currentTime);
      if (onCanPlay) el.addEventListener("canplay", onCanPlay);
      if (onPlay) el.addEventListener("play", onPlay);
      if (onPause) el.addEventListener("pause", onPause);
      if (onTimeUpdate) el.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        if (onCanPlay) el.removeEventListener("canplay", onCanPlay);
        if (onPlay) el.removeEventListener("play", onPlay);
        if (onPause) el.removeEventListener("pause", onPause);
        if (onTimeUpdate) el.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }, [sdkReady, onCanPlay, onPlay, onPause, onTimeUpdate]);

    if (!sdkReady || (!uid && !token)) return null;

    // Cloudflare's <stream> element accepts either a video UID (public) or a
    // signed token (private) in the same `src` attribute.
    return (
      // @ts-expect-error -- <stream> is a custom element registered by Cloudflare's SDK, not a typed JSX intrinsic
      <stream
        ref={elRef}
        src={token || uid}
        loop={loop}
        muted={muted}
        preload={preload}
        controls={false}
        className={className}
        disablepictureinpicture={disablePictureInPicture ? "" : undefined}
        onContextMenu={onContextMenu}
      />
    );
  }
);
CloudflareStreamPlayer.displayName = "CloudflareStreamPlayer";
