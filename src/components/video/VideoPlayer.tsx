import { forwardRef } from "react";
import { VideoElementHandle, VideoPlayerCommonProps } from "./types";
import { CloudflareStreamPlayer } from "./CloudflareStreamPlayer";
import { MuxStreamPlayer } from "./MuxStreamPlayer";

/**
 * Drop-in replacement for a native <video> element that can play from a
 * local file, Cloudflare Stream, or Mux depending on `provider`. The
 * forwarded ref exposes the same play/pause/currentTime/muted surface in all
 * three cases, so existing imperative control code (play(), pause(),
 * .currentTime, .muted, requestFullscreen()) works unchanged regardless of
 * which provider a given piece of content uses.
 */
export const VideoPlayer = forwardRef<VideoElementHandle, VideoPlayerCommonProps>(
  (
    {
      provider = "local",
      src,
      cloudflareUid,
      muxPlaybackId,
      cloudflareToken,
      muxToken,
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
    if (provider === "cloudflare") {
      return (
        <CloudflareStreamPlayer
          ref={ref}
          uid={cloudflareUid}
          token={cloudflareToken}
          className={className}
          loop={loop}
          muted={muted}
          preload={preload}
          disablePictureInPicture={disablePictureInPicture}
          onCanPlay={onCanPlay}
          onPlay={onPlay}
          onPause={onPause}
          onTimeUpdate={onTimeUpdate}
          onContextMenu={onContextMenu}
        />
      );
    }

    if (provider === "mux") {
      return (
        <MuxStreamPlayer
          ref={ref}
          playbackId={muxPlaybackId}
          token={muxToken}
          className={className}
          loop={loop}
          muted={muted}
          preload={preload}
          disablePictureInPicture={disablePictureInPicture}
          onCanPlay={onCanPlay}
          onPlay={onPlay}
          onPause={onPause}
          onTimeUpdate={onTimeUpdate}
          onContextMenu={onContextMenu}
        />
      );
    }

    // "local" — legacy/default behavior, identical to the raw <video> element
    // this replaces.
    return (
      <video
        ref={ref as React.Ref<HTMLVideoElement>}
        src={src}
        className={className}
        loop={loop}
        muted={muted}
        preload={preload}
        playsInline
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture={disablePictureInPicture}
        onCanPlay={onCanPlay}
        onPlay={onPlay}
        onPause={onPause}
        onTimeUpdate={(e) => onTimeUpdate?.(e.currentTarget.currentTime)}
        onContextMenu={onContextMenu}
      />
    );
  }
);
VideoPlayer.displayName = "VideoPlayer";
