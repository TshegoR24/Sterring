import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';

// Featured content for the banner
const featuredContent = [
  {
    id: 1,
    title: 'Premier League: Arsenal vs Chelsea',
    description: 'Watch the biggest match of the season live as two football giants battle for supremacy.',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2024&auto=format&fit=crop',
    category: 'Live Games'
  },
  {
    id: 2,
    title: 'The Science of Champions',
    description: 'An exclusive documentary exploring the cutting-edge technology behind modern sports.',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop',
    category: 'Documentaries'
  },
  {
    id: 3,
    title: 'Rising Stars: Next Generation',
    description: 'Follow the journey of young athletes as they chase their dreams of becoming champions.',
    image: 'https://images.unsplash.com/photo-1585201731775-0597e1be4bfb?q=80&w=2070&auto=format&fit=crop',
    category: 'Original Shows'
  }
];

const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered]);

  const currentContent = featuredContent[currentSlide];

  return (
    <div 
      className="relative h-[70vh] w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={currentContent.image}
          alt={currentContent.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-inmotion-dark via-inmotion-dark/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-12">
          <div className="max-w-2xl space-y-4 animate-fade-in">
            <span className="inline-block px-3 py-1 bg-inmotion-accent text-inmotion-dark text-sm font-medium rounded-full">
              {currentContent.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white">
              {currentContent.title}
            </h1>
            <p className="text-lg md:text-xl text-inmotion-light">
              {currentContent.description}
            </p>
            <div className="flex space-x-4 pt-4">
              <button className="flex items-center space-x-2 bg-inmotion-accent text-inmotion-dark px-6 py-3 rounded-lg font-medium hover:bg-inmotion-accent/90 transition">
                <Play size={20} />
                <span>Start Watching</span>
              </button>
              <button className="flex items-center space-x-2 bg-inmotion-dark/50 text-white px-6 py-3 rounded-lg font-medium hover:bg-inmotion-dark/70 transition backdrop-blur-sm">
                <Info size={20} />
                <span>More Info</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              currentSlide === index ? 'bg-inmotion-accent' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
