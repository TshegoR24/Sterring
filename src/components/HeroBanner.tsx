
import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';

// Featured content for the banner
const featuredContent = [
  {
    id: 1,
    title: 'African Champions League Final',
    description: 'The biggest club competition in African football reaches its climax as two giants battle for continental supremacy.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2936&auto=format&fit=crop',
    category: 'Football'
  },
  {
    id: 2,
    title: 'Lagos Marathon 2023',
    description: 'Follow the thrilling race through the streets of Lagos as elite runners compete for glory.',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=2940&auto=format&fit=crop',
    category: 'Athletics'
  },
  {
    id: 3,
    title: 'Basketball Africa League Finals',
    description: 'The continent\'s premier basketball competition comes to an exciting conclusion.',
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2869&auto=format&fit=crop',
    category: 'Basketball'
  }
];

const HeroBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const featured = featuredContent[currentIndex];
  
  useEffect(() => {
    // Auto-rotate featured content
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredContent.length);
      setIsLoaded(false);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    // Preload image and set loaded state
    const img = new Image();
    img.src = featured.image;
    img.onload = () => setIsLoaded(true);
  }, [currentIndex, featured.image]);

  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ backgroundImage: `url(${featured.image})` }}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 netflix-gradient" />
      
      {/* Content */}
      <div className="container mx-auto px-4 h-full flex items-end pb-16 md:pb-24 relative z-10">
        <div className="w-full md:w-1/2 animate-fade-in">
          <span className="inline-block text-netflix-red font-medium text-sm md:text-base mb-2">
            {featured.category}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 text-shadow">
            {featured.title}
          </h1>
          <p className="text-sm md:text-base text-white/80 mb-6 max-w-lg text-shadow">
            {featured.description}
          </p>
          
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 bg-white text-netflix-black px-6 py-2 rounded font-medium transition hover:bg-white/90">
              <Play size={20} />
              <span>Play</span>
            </button>
            <button className="flex items-center gap-2 bg-netflix-gray/30 text-white px-6 py-2 rounded font-medium backdrop-blur-sm transition hover:bg-netflix-gray/40">
              <Info size={20} />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Pagination Indicators */}
      <div className="absolute bottom-6 right-6 flex space-x-2">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
