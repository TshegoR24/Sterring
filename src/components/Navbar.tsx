import React, { useEffect, useState } from 'react';
import { Search, Bell, Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-inmotion-dark' : 'bg-gradient-to-b from-inmotion-dark/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center">
              <span className="text-inmotion-accent text-3xl font-display font-bold tracking-tight">InMotion</span>
            </a>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a className="text-inmotion-light hover:text-inmotion-accent text-sm font-medium transition" href="/live">Live</a>
              <a className="text-inmotion-light hover:text-inmotion-accent text-sm font-medium transition" href="/shows">Shows</a>
              <a className="text-inmotion-light hover:text-inmotion-accent text-sm font-medium transition" href="/films">Films</a>
              <a className="text-inmotion-light hover:text-inmotion-accent text-sm font-medium transition" href="/documentaries">Documentaries</a>
              <a className="text-inmotion-light hover:text-inmotion-accent text-sm font-medium transition" href="/my-list">My List</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              {showSearch ? (
                <div className="absolute right-0 top-0 animate-fade-in">
                  <SearchBar onClose={() => setShowSearch(false)} />
                </div>
              ) : (
                <button 
                  className="text-inmotion-light hover:text-inmotion-accent transition"
                  onClick={() => setShowSearch(true)}
                >
                  <Search size={20} />
                </button>
              )}
            </div>
            
            <button className="text-inmotion-light hover:text-inmotion-accent transition hidden md:block">
              <Bell size={20} />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-inmotion-accent flex items-center justify-center text-inmotion-dark cursor-pointer">
                <span className="font-medium">A</span>
              </div>
              <button className="md:hidden text-inmotion-light" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-inmotion-dark absolute w-full animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4 pb-4">
              <a className="text-inmotion-light hover:text-inmotion-accent transition" href="/live">Live</a>
              <a className="text-inmotion-light hover:text-inmotion-accent transition" href="/shows">Shows</a>
              <a className="text-inmotion-light hover:text-inmotion-accent transition" href="/films">Films</a>
              <a className="text-inmotion-light hover:text-inmotion-accent transition" href="/documentaries">Documentaries</a>
              <a className="text-inmotion-light hover:text-inmotion-accent transition" href="/my-list">My List</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
