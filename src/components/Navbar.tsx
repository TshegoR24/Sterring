import { useState } from "react";
import { Search, Menu, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-2xl font-bold text-white tracking-tight hover:text-white/80 transition-colors">
                SA Cinema
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link to="/" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                  Home
                </Link>
                <Link to="/movies" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                  Movies
                </Link>
                <Link to="/categories" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                  Categories
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full md:hidden"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 hidden sm:flex items-center gap-2"
                onClick={() => navigate("/login")}
              >
                <LogIn className="h-4 w-4" />
                <span className="text-sm">Sign In</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

