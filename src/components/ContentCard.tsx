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
        "group relative min-w-[200px] md:min-w-[240px] cursor-pointer overflow-hidden rounded-md",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index ? index * 0.05 : 0 }}
      whileHover={{ scale: 1.03 }}
      onClick={() => navigate(`/movie/${content.id}`)}
    >
      {/* Thumbnail - Strong and clear */}
      <div className="relative overflow-hidden rounded-md bg-neutral-900">
        <motion.img
          src={content.imageUrl}
          alt={content.title}
          className="h-[300px] md:h-[340px] w-full object-cover"
          loading="lazy"
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        />

        {/* Subtle overlay on hover */}
        <motion.div
          className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"
          initial={false}
        />
      </div>

      {/* Hover Overlay - Spotify-style subtle reveal */}
      <motion.div
        className="absolute inset-0 rounded-md bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end p-4"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          <h3 className="text-base md:text-lg font-bold text-white mb-1 line-clamp-2">
            {content.title}
          </h3>
          <div className="flex items-center gap-2 text-xs md:text-sm text-white/70 mb-3">
            <span>{content.year}</span>
            {content.genres && content.genres[0] && (
              <>
                <span className="w-1 h-1 rounded-full bg-white/50" />
                <span>{content.genres[0]}</span>
              </>
            )}
          </div>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)" }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 w-full rounded-md bg-white/95 px-4 py-2 text-sm md:text-base text-black font-semibold transition-all duration-200 shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/movie/${content.id}`);
            }}
          >
            <Play className="h-4 w-4 fill-black" />
            Play
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Shadow enhancement */}
      <div className="absolute inset-0 rounded-md shadow-md group-hover:shadow-2xl transition-shadow duration-300 pointer-events-none" />
    </motion.div>
  );
};

