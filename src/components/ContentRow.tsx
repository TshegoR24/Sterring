import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ContentCard from './ContentCard';
import { Content } from '../types/content';

interface ContentRowProps {
  title: string;
  contents: Content[];
}

const ContentRow: React.FC<ContentRowProps> = ({ title, contents }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollRow = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      setIsScrolling(true);
      const scrollAmount = direction === 'left' ? -rowRef.current.clientWidth * 0.75 : rowRef.current.clientWidth * 0.75;
      
      rowRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      setTimeout(() => {
        setIsScrolling(false);
        checkScrollPosition();
      }, 500);
    }
  };

  const checkScrollPosition = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  return (
    <div className="relative py-6 group">
      <h2 className="text-xl md:text-2xl font-medium mb-4 px-4 md:px-12">{title}</h2>
      
      <div className="relative">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button 
            onClick={() => scrollRow('left')} 
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
            disabled={isScrolling || !showLeftArrow}
          >
            <ChevronLeft size={24} />
          </button>
        )}
        
        {/* Content Row */}
        <div 
          ref={rowRef} 
          className="flex overflow-x-scroll hide-scrollbar gap-2 px-4 md:px-12"
          onScroll={checkScrollPosition}
        >
          {contents.map((content) => (
            <div key={content.id} className="flex-shrink-0 w-[200px] md:w-[240px]">
              <ContentCard content={content} />
            </div>
          ))}
        </div>
        
        {/* Right Arrow */}
        {showRightArrow && (
          <button 
            onClick={() => scrollRow('right')} 
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-black/50 rounded-full p-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
            disabled={isScrolling || !showRightArrow}
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ContentRow;
