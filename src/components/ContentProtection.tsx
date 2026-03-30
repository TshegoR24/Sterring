import { ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

/**
 * ContentProtection — wraps video/media areas with DRM-lite client-side protections:
 * 1. Disables right-click context menu
 * 2. Renders a transparent watermark with the user's email
 * 3. Adds CSS class that prevents screenshots on some screen-capture tools
 * 4. Blocks keyboard shortcuts for dev tools / print screen
 */
interface ContentProtectionProps {
  children: ReactNode;
  className?: string;
}

export const ContentProtection = ({ children, className = "" }: ContentProtectionProps) => {
  const { user } = useAuth();

  // Block common keyboard shortcuts on the page when content is mounted
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Block PrintScreen
      if (e.key === "PrintScreen") {
        e.preventDefault();
        navigator.clipboard.writeText("").catch(() => {});
      }
      // Block Ctrl+S (save page)
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
      }
      // Block Ctrl+Shift+I (dev tools — deterrent only)
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className={`content-protected relative ${className}`}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}

      {/* Watermark overlay — visible but non-intrusive */}
      {user && (
        <div
          className="absolute inset-0 z-[5] pointer-events-none overflow-hidden select-none"
          aria-hidden="true"
        >
          <div className="watermark-grid">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="text-white/[0.04] text-xs font-mono tracking-wider rotate-[-25deg] whitespace-nowrap"
              >
                {user.email}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Invisible anti-capture overlay — this div with mix-blend-mode and
          backdrop-filter can cause some basic screen-recorders to capture black */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          backdropFilter: "brightness(1.001)",
          WebkitBackdropFilter: "brightness(1.001)",
        }}
        aria-hidden="true"
      />
    </div>
  );
};
