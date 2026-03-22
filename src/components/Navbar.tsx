import { useState } from "react";
import { Search, Menu, LogIn, Home, Clapperboard, Tv, Bookmark, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/movies", label: "Movies", icon: Clapperboard },
  { to: "/tv-shows", label: "TV Shows", icon: Tv },
  { to: "/watchlist", label: "My Watchlist", icon: Bookmark },
];

export const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/5 transition-all">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8 md:space-x-12">
              <Link to="/" className="text-3xl md:text-4xl font-black tracking-tighter hover:opacity-90 transition-opacity duration-200">
                <span className="text-sterring-orange">Sterring</span>
                <span className="text-white">!</span>
              </Link>

              {/* Desktop nav links */}
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map(({ to, label, icon: Icon }) => {
                  const isActive = location.pathname === to;
                  return (
                    <Link
                      key={to}
                      to={to}
                      className={`
                        flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium
                        transition-all duration-200 relative group
                        ${isActive
                          ? "text-sterring-orange bg-sterring-orange/10"
                          : "text-white/80 hover:text-white hover:bg-white/8"
                        }
                      `}
                    >
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                          isActive ? "text-sterring-orange" : "text-white/60 group-hover:text-white"
                        }`}
                      />
                      <span>{label}</span>
                      {/* Active indicator */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute -bottom-px left-0 right-0 h-0.5 bg-sterring-orange rounded-full"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Actions - Mobile optimized */}
            <div className="flex items-center space-x-2 md:space-x-4">
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
                    className="bg-sterring-orange hover:bg-sterring-orange/90 text-white font-semibold rounded-lg px-6 py-2.5 hidden sm:flex items-center gap-2 transition-all duration-200 shadow-lg"
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

      {/* ── Mobile bottom navigation (hidden on md+) ─────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around h-16 px-2">
          {navLinks.map(({ to, label, icon: Icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full min-w-0 px-1 transition-colors"
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${
                    isActive ? "text-sterring-orange" : "text-white/50"
                  }`}
                />
                <span
                  className={`text-[10px] font-semibold truncate max-w-[60px] ${
                    isActive ? "text-sterring-orange" : "text-white/40"
                  }`}
                >
                  {label === "My Watchlist" ? "Watchlist" : label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute top-0 left-0 right-0 h-0.5 bg-sterring-orange rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
