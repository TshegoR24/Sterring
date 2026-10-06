import { forwardRef } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { VideoElementHandle } from "./types";

interface MuxStreamPlayerProps {
  playbackId?: string;
  /** Signed playback token for private videos. Omit for public playback IDs. */
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

// @mux/mux-player-react forwards its ref to the underlying <mux-player>
// element, which implements the same play/pause/currentTime/muted surface
// as a native <video> element — so this cast is accurate, not a hack.
export const MuxStreamPlayer = forwardRef<VideoElementHandle, MuxStreamPlayerProps>(
  (
    {
      playbackId,
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
    ref
  ) => {
    if (!playbackId) return null;

    // MuxPlayer's props don't include onContextMenu directly, so the
    // suppression is applied to a wrapping div instead — same visual result.
    return (
      <div onContextMenu={onContextMenu} className={className}>
        <MuxPlayer
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- mux-player-react's
          // ref type is its own element type, but it implements VideoElementHandle at runtime.
          ref={ref as any}
          playbackId={playbackId}
          tokens={token ? { playback: token } : undefined}
          streamType="on-demand"
          loop={loop}
          muted={muted}
          preload={preload}
          disablePictureInPicture={disablePictureInPicture}
          className="w-full h-full"
          // Hide Mux's own control bar — the app renders its own custom controls
          // on top, same as it already does for the native <video> element.
          style={{ ["--controls" as string]: "none" }}
          onCanPlay={onCanPlay}
          onPlay={onPlay}
          onPause={onPause}
          onTimeUpdate={(e) => onTimeUpdate?.((e.target as HTMLMediaElement).currentTime)}
        />
      </div>
    );
  }
);
MuxStreamPlayer.displayName = "MuxStreamPlayer";
