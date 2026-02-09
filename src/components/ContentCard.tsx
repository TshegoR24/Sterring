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
      <img
        src={content.imageUrl}
        alt={content.title}
        className="h-[330px] w-full rounded-lg object-cover"
        loading="lazy"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 rounded-lg bg-black/70 opacity-0 group-hover:opacity-100 transition">
        <div className="flex h-full flex-col justify-end p-4">
          <h3 className="text-sm font-semibold">{content.title}</h3>
          <p className="text-xs text-neutral-400">{content.year}</p>
          <button
            className="mt-2 w-fit rounded bg-white px-3 py-1 text-xs text-black"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/movie/${content.id}`);
            }}
          >
            ▶ Play
          </button>
        </div>
      </div>
    </div>
  );
};

