import { Content } from "@/types/content";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface ContentCardProps {
  content: Content;
  className?: string;
  index?: number;
}

export const ContentCard = ({ content, className, index }: ContentCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      className={cn(
        "group relative w-[140px] sm:w-[180px] md:w-[220px] lg:w-[240px] flex-none cursor-pointer overflow-hidden rounded-lg",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        delay: index ? Math.min(index * 0.05, 0.3) : 0,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{
        scale: 1.04,
        transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }
      }}
      onClick={() => navigate(content.type === "series" ? `/show/${content.id}` : `/movie/${content.id}`)}
    >
      {/* Thumbnail — fixed size box, image always fills with object-cover */}
      <div className="relative w-full h-[280px] sm:h-[300px] md:h-[330px] lg:h-[360px] overflow-hidden rounded-lg bg-neutral-900 flex-shrink-0">
        <motion.img
          src={content.imageUrl}
          alt={content.title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          loading="lazy"
        />

        {/* Subtle darkening on hover */}
        <motion.div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300"
          initial={false}
        />
      </div>

      {/* Hover Overlay - Apple TV-style refined reveal */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-t from-black via-black/85 to-transparent flex flex-col justify-end p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.05, duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-1 line-clamp-2 leading-tight">
            {content.title}
          </h3>
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/75 mb-2 md:mb-3 font-medium">
            <span>{content.year}</span>
            {content.genres && content.genres[0] && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/60 hidden sm:inline" />
                <span className="hidden sm:inline">{content.genres[0]}</span>
              </>
            )}
          </div>
          <motion.button
            whileHover={{
              scale: 1.04,
              y: -1,
              backgroundColor: "rgba(255,255,255,1)",
              transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }
            }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center justify-center gap-1.5 md:gap-2 w-full rounded-lg bg-white/95 px-3 md:px-4 py-2.5 md:py-3 text-sm md:text-base text-black font-semibold transition-all duration-200 shadow-lg min-h-[44px]"
            onClick={(e) => {
              e.stopPropagation();
              navigate(content.type === "series" ? `/show/${content.id}` : `/movie/${content.id}`);
            }}
          >
            <Play className="h-4 w-4 fill-black" />
            Play
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Shadow enhancement - Apple TV depth */}
      <div className="absolute inset-0 rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300 pointer-events-none" />
    </motion.div>
  );
};

