
import React, { useRef, useEffect, useState } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    // Focus the input when component mounts
    if (searchRef.current) {
      searchRef.current.focus();
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    // Here you would normally handle the search request
  };

  return (
    <div ref={searchRef} className="flex items-center bg-netflix-black/90 border border-netflix-gray/30 rounded-sm overflow-hidden w-[250px]">
      <form onSubmit={handleSubmit} className="flex-1 flex items-center">
        <Search size={18} className="text-netflix-gray ml-2" />
        <input
          type="text"
          placeholder="Titles, people, genres"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-transparent border-none outline-none text-white px-2 py-2 w-full text-sm"
        />
        {searchTerm && (
          <button 
            type="button" 
            onClick={() => setSearchTerm('')} 
            className="text-netflix-gray hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </form>
      <button 
        type="button" 
        onClick={onClose} 
        className="p-2 text-netflix-gray hover:text-white"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default SearchBar;
