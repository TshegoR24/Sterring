
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const categories = [
  'All', 'Football', 'Basketball', 'Athletics', 'Rugby', 'Cricket', 
  'Boxing', 'MMA', 'Tennis', 'Volleyball', 'Swimming', 'Esports'
];

const CategorySelector: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
      setScrollPosition(containerRef.current.scrollLeft + scrollAmount);
    }
  };

  return (
    <div className="relative my-6 px-4 md:px-12">
      <div className="flex items-center">
        <button 
          onClick={() => handleScroll('left')}
          className={`absolute left-0 z-10 bg-netflix-black/80 p-1 rounded-full backdrop-blur-sm ${scrollPosition <= 0 ? 'opacity-0' : 'opacity-100'}`}
          disabled={scrollPosition <= 0}
        >
          <ChevronLeft size={24} />
        </button>
        
        <div 
          ref={containerRef}
          className="flex overflow-x-auto hide-scrollbar space-x-3 py-2 px-4"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition whitespace-nowrap ${
                selectedCategory === category 
                  ? 'bg-white text-netflix-black' 
                  : 'bg-netflix-dark border border-netflix-gray/30 text-white hover:bg-netflix-gray/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => handleScroll('right')}
          className="absolute right-0 z-10 bg-netflix-black/80 p-1 rounded-full backdrop-blur-sm"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default CategorySelector;
