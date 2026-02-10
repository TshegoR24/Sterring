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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="max-w-[1920px] mx-auto px-8 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-16">
              <Link to="/" className="text-4xl font-black tracking-tighter hover:opacity-80 transition-opacity">
                <span className="text-sterring-orange">Sterring</span>
                <span className="text-white">!</span>
              </Link>
              <div className="hidden md:flex items-center space-x-10">
                <Link
                  to="/"
                  className="text-white text-base font-semibold hover:text-sterring-orange transition-smooth relative group"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sterring-orange group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  to="/movies"
                  className="text-white/70 text-base font-medium hover:text-white transition-smooth relative group"
                >
                  Movies
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link
                  to="/categories"
                  className="text-white/70 text-base font-medium hover:text-white transition-smooth relative group"
                >
                  Categories
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-5">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:scale-110 rounded-full transition-smooth w-11 h-11"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:scale-110 rounded-full md:hidden transition-smooth w-11 h-11"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <Link to="/login">
                <Button
                  variant="default"
                  className="bg-sterring-orange hover:bg-sterring-orange/90 hover:scale-105 text-white font-semibold rounded-lg px-7 py-2.5 hidden sm:flex items-center gap-2 transition-smooth shadow-lg"
                >
                  <LogIn className="h-4 w-4" />
                  <span className="text-sm">Sign In</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};


