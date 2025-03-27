
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
        isScrolled ? 'bg-netflix-black' : 'bg-gradient-to-b from-netflix-black/80 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <a href="/" className="flex items-center">
              <span className="text-netflix-red text-3xl font-bold">AFRISPORT</span>
            </a>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a className="text-netflix-lightgray hover:text-white text-sm transition" href="/">Home</a>
              <a className="text-netflix-lightgray hover:text-white text-sm transition" href="/live">Live</a>
              <a className="text-netflix-lightgray hover:text-white text-sm transition" href="/categories">Categories</a>
              <a className="text-netflix-lightgray hover:text-white text-sm transition" href="/my-list">My List</a>
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
                  className="text-netflix-lightgray hover:text-white transition"
                  onClick={() => setShowSearch(true)}
                >
                  <Search size={20} />
                </button>
              )}
            </div>
            
            <button className="text-netflix-lightgray hover:text-white transition hidden md:block">
              <Bell size={20} />
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded bg-netflix-red flex items-center justify-center text-white cursor-pointer">
                <span className="font-medium">A</span>
              </div>
              <button className="md:hidden text-netflix-lightgray" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-netflix-black absolute w-full animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4 pb-4">
              <a className="text-netflix-lightgray hover:text-white transition" href="/">Home</a>
              <a className="text-netflix-lightgray hover:text-white transition" href="/live">Live</a>
              <a className="text-netflix-lightgray hover:text-white transition" href="/categories">Categories</a>
              <a className="text-netflix-lightgray hover:text-white transition" href="/my-list">My List</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
