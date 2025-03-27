import React, { useState } from 'react';
import { Play, ThumbsUp, Plus, MoreVertical, Circle } from 'lucide-react';
import { Content } from '../types/content';

interface ContentCardProps {
  content: Content;
}

const ContentCard: React.FC<ContentCardProps> = ({ content }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="relative group rounded-md overflow-hidden cursor-pointer card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="aspect-video bg-netflix-dark relative overflow-hidden">
        <img 
          src={content.image} 
          alt={content.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Live Badge */}
        {content.live && (
          <div className="absolute top-2 left-2 bg-netflix-red px-2 py-0.5 rounded-sm text-xs font-semibold flex items-center gap-1">
            <Circle size={6} className="fill-current animate-pulse-subtle" />
            LIVE
          </div>
        )}
        
        {/* Duration Badge */}
        {content.duration && !content.live && (
          <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 rounded-sm text-xs">
            {content.duration}
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute bottom-0 w-full p-3 bg-gradient-to-t from-black/90 to-transparent">
            <div className="flex items-center gap-2 mb-2">
              <button className="bg-white text-netflix-black rounded-full p-1.5 transition hover:bg-white/90">
                <Play size={16} className="fill-current" />
              </button>
              <button className="bg-netflix-dark/80 text-white rounded-full p-1.5 border border-white/30 transition hover:border-white">
                <Plus size={16} />
              </button>
              <button className="bg-netflix-dark/80 text-white rounded-full p-1.5 border border-white/30 transition hover:border-white">
                <ThumbsUp size={16} />
              </button>
              <div className="flex-grow"></div>
              <button className="bg-netflix-dark/80 text-white rounded-full p-1.5 border border-white/30 transition hover:border-white">
                <MoreVertical size={16} />
              </button>
            </div>
            
            {/* Content Info */}
            <div className="flex items-center text-xs gap-2 text-white/80">
              {content.views && <span>{content.views} views</span>}
            </div>
          </div>
        </div>
      </div>
      
      {/* Title */}
      <h3 className="mt-2 text-sm font-medium line-clamp-1">{content.title}</h3>
    </div>
  );
};

export default ContentCard;
