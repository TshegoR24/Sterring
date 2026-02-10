import { useState } from "react";
import { Search, Menu, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8 md:space-x-16">
              <Link to="/" className="text-3xl md:text-4xl font-black tracking-tighter hover:opacity-90 transition-opacity duration-200">
                <span className="text-sterring-orange">Sterring</span>
                <span className="text-white">!</span>
              </Link>
              <div className="hidden md:flex items-center space-x-10">
                <Link
                  to="/"
                  className="text-white text-base font-medium hover:text-sterring-orange transition-colors duration-200 relative group"
                >
                  Home
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sterring-orange group-hover:w-full transition-all duration-250 ease-out"></span>
                </Link>
                <Link
                  to="/movies"
                  className="text-white/90 text-base font-medium hover:text-white transition-colors duration-200 relative group"
                >
                  Movies
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sterring-orange group-hover:w-full transition-all duration-250 ease-out"></span>
                </Link>
                <Link
                  to="/series"
                  className="text-white/90 text-base font-medium hover:text-white transition-colors duration-200 relative group"
                >
                  Series
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sterring-orange group-hover:w-full transition-all duration-250 ease-out"></span>
                </Link>
              </div>
            </div>

            {/* Actions - Mobile optimized */}
            <div className="flex items-center space-x-3 md:space-x-5">
              <ThemeToggle />
              <motion.div
                whileHover={{ scale: 1.08, transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] } }}
                whileTap={{ scale: 0.96 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 rounded-full transition-all duration-200 w-11 h-11"
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.08, transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] } }}
                whileTap={{ scale: 0.96 }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10 rounded-full transition-all duration-200 w-11 h-11 md:hidden"
                  aria-label="Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </motion.div>
              <Link to="/login">
                <motion.div
                  whileHover={{
                    scale: 1.04,
                    y: -1,
                    transition: { duration: 0.2, ease: [0.34, 1.56, 0.64, 1] }
                  }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Button
                    variant="default"
                    className="bg-sterring-orange hover:bg-sterring-orange/90 text-white font-semibold rounded-lg px-7 py-2.5 hidden sm:flex items-center gap-2 transition-all duration-200 shadow-lg"
                  >
                    <LogIn className="h-4 w-4" />
                    <span className="text-sm">Sign In</span>
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};


