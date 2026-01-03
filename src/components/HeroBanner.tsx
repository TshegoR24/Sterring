import { Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Content } from "@/types/content";

interface HeroBannerProps {
  content: Content;
}

export const HeroBanner = ({ content }: HeroBannerProps) => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${content.imageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>
      
      <div className="relative h-full flex items-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 w-full">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg leading-tight">
              {content.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 drop-shadow-md line-clamp-3 max-w-xl">
              {content.description}
            </p>
            <div className="flex items-center space-x-4 mb-6">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 rounded-full font-semibold"
              >
                <Play className="mr-2 h-5 w-5" />
                Play
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-lg px-8 py-6 rounded-full backdrop-blur-sm font-semibold"
              >
                <Info className="mr-2 h-5 w-5" />
                More Info
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-white/80 text-sm">
              <span>{content.year}</span>
              <span>•</span>
              <span>{content.rating}</span>
              <span>•</span>
              <span>{content.duration}</span>
              <span>•</span>
              <span>{content.genres.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

