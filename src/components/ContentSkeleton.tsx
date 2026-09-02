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
      "relative w-[130px] sm:w-[170px] md:w-[210px] lg:w-[230px] flex-none rounded-sm overflow-hidden bg-sterring-charcoal",
      className
    )}
  >
    <div className="w-full h-[195px] sm:h-[255px] md:h-[315px] lg:h-[345px] relative overflow-hidden">
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
