import { Play } from "lucide-react";
import { Content } from "@/types/content";
import { cn } from "@/lib/utils";

interface ContentCardProps {
  content: Content;
  className?: string;
}

export const ContentCard = ({ content, className }: ContentCardProps) => {
  return (
    <div
      className={cn(
        "group relative flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-105",
        className
      )}
    >
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-900 shadow-lg">
        <img
          src={content.imageUrl}
          alt={content.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="bg-white rounded-full p-4 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl">
            <Play className="h-7 w-7 text-black ml-1 stroke-[3]" />
          </div>
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-white font-medium text-sm line-clamp-1 group-hover:text-white/80 transition-colors">
          {content.title}
        </h3>
        <p className="text-white/60 text-xs mt-1">{content.year}</p>
      </div>
    </div>
  );
};

