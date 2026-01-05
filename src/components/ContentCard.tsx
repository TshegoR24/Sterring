import { Play } from "lucide-react";
import { Content } from "@/types/content";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface ContentCardProps {
  content: Content;
  className?: string;
  index?: number;
}

export const ContentCard = ({ content, className }: ContentCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "group relative min-w-[220px] cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-10",
        className
      )}
      onClick={() => navigate(`/movie/${content.id}`)}
    >
      {/* Poster Image */}
      <div className="relative h-[330px] w-full rounded-lg overflow-hidden bg-gray-900">
        <img
          src={content.imageUrl}
          alt={content.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />

        {/* Hover Overlay - Netflix-style */}
        <div className="absolute inset-0 rounded-lg bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex h-full flex-col justify-end p-4">
            <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">
              {content.title}
            </h3>
            <p className="text-xs text-neutral-400 mb-3">
              {content.year} • {content.rating} • {content.genres[0]}
            </p>
            <button
              className="mt-2 w-fit rounded bg-white px-3 py-1.5 text-xs text-black font-semibold hover:bg-neutral-200 transition-colors flex items-center gap-1.5"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/movie/${content.id}`);
              }}
            >
              <Play className="h-3 w-3" fill="black" />
              Play
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
