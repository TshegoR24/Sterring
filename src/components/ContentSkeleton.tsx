import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContentSkeletonProps {
  className?: string;
  count?: number;
}

const shimmer = {
  initial: { x: "-100%" },
  animate: { x: "100%" },
  transition: { repeat: Infinity, repeatType: "loop" as const, duration: 1.4 },
};

export const ContentSkeletonCard = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "relative w-[140px] sm:w-[180px] md:w-[220px] lg:w-[240px] flex-none rounded-lg overflow-hidden bg-neutral-800",
      className
    )}
  >
    <div className="w-full h-[280px] sm:h-[300px] md:h-[330px] lg:h-[360px] relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
        {...shimmer}
      />
    </div>
  </div>
);

export const ContentSkeleton = ({ count = 5, className }: ContentSkeletonProps) => (
  <div className={cn("flex gap-2 sm:gap-3 md:gap-4 overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12", className)}>
    {Array.from({ length: count }).map((_, i) => (
      <ContentSkeletonCard key={i} />
    ))}
  </div>
);
