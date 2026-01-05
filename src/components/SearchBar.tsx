import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Content } from "@/types/content";
import { useNavigate } from "react-router-dom";
import { allContent } from "@/data/content";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchBar = ({ isOpen, onClose }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Content[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 0) {
      setIsSearching(true);
      const filtered = allContent.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.genres.some((genre) => genre.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered.slice(0, 8));
      setIsSearching(false);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleResultClick = (content: Content) => {
    navigate(`/movie/${content.id}`);
    setQuery("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 pt-20">
        <div className="relative">
          <div className="relative flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-white/60" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search for movies, genres, actors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-12 py-6 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15"
            />
            <button
              onClick={onClose}
              className="absolute right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {query.trim().length > 0 && (
            <div className="mt-4 bg-black/80 backdrop-blur-md rounded-lg border border-white/10 max-h-[60vh] overflow-y-auto">
              {isSearching ? (
                <div className="p-8 text-center text-white/60">Searching...</div>
              ) : results.length > 0 ? (
                <div className="p-2">
                  {results.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleResultClick(item)}
                      className="w-full flex items-center gap-4 p-3 hover:bg-white/10 rounded-lg transition-colors text-left"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-16 h-24 object-cover rounded"
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{item.title}</h3>
                        <p className="text-white/60 text-sm line-clamp-1">{item.description}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-white/50">
                          <span>{item.year}</span>
                          <span>•</span>
                          <span>{item.rating}</span>
                          <span>•</span>
                          <span>{item.genres[0]}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-white/60">
                  No results found for "{query}"
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
