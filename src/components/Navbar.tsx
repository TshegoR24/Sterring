import { useState, useRef, useEffect, useCallback } from "react";
import { Search, Menu, LogIn, Home, Clapperboard, Tv, Bookmark, User, LogOut, ChevronDown, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useDownloads } from "@/contexts/DownloadContext";

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/movies", label: "Movies", icon: Clapperboard },
  { to: "/tv-shows", label: "TV Shows", icon: Tv },
  { to: "/anime", label: "Anime", icon: Sparkles },
  { to: "/watchlist", label: "My Watchlist", icon: Bookmark },
  { to: "/downloads", label: "Downloads", icon: Download },
];

export const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { count: downloadCount } = useDownloads();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isHome = location.pathname === "/";

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Transparent-over-hero, solid-on-scroll nav
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 60);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const navIsSolid = isScrolled || !isHome;

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          navIsSolid
            ? "bg-sterring-ink border-b border-white/10"
            : "bg-gradient-to-b from-black/80 via-black/30 to-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8 md:space-x-12">
              <Link to="/" className="text-2xl md:text-3xl font-extrabold tracking-tight hover:opacity-90 transition-opacity duration-200">
                <span className="text-sterring-orange">Sterring</span>
              </Link>

              {/* Desktop nav links */}
              <div className="hidden md:flex items-center space-x-6">
                {navLinks.map(({ to, label }) => {
                  const isActive = location.pathname === to;
                  const badge = to === "/downloads" && downloadCount > 0 ? downloadCount : null;
                  return (
                    <Link
                      key={to}
                      to={to}
                      className={`
                        relative flex items-center gap-1.5 py-2 text-sm font-medium
                        transition-colors duration-150
                        ${isActive ? "text-white" : "text-white/70 hover:text-white"}
                      `}
                    >
                      <span>{label}</span>
                      {badge && (
                        <span className="ml-0.5 min-w-[18px] h-[18px] rounded-sm bg-sterring-orange text-white text-[10px] font-bold flex items-center justify-center px-1">
                          {badge}
                        </span>
                      )}
                      {/* Active indicator */}
                      {isActive && (
                        <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-sterring-orange" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-sm transition-colors duration-150 w-11 h-11"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>

              {isAuthenticated && user ? (
                /* ── Logged-in user dropdown ─────────────────────────────── */
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="hidden sm:flex items-center gap-2 pl-1 pr-3 py-1 rounded-sm bg-white/8 hover:bg-white/12 border border-white/10 transition-colors duration-150"
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-sterring-orange flex items-center justify-center text-white text-xs font-bold">
                      {getInitials(user.name)}
                    </div>
                    <span className="text-white text-sm font-medium max-w-[100px] truncate hidden lg:block">
                      {user.name.split(" ")[0]}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 text-white/60 transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown menu */}
                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 top-full mt-2 w-64 bg-sterring-charcoal border border-white/10 rounded-sm shadow-2xl shadow-black/50 overflow-hidden z-50"
                      >
                        {/* User info */}
                        <div className="px-4 py-3.5 border-b border-white/10">
                          <p className="text-white font-semibold text-sm truncate">{user.name}</p>
                          <p className="text-white/50 text-xs truncate mt-0.5">{user.email}</p>
                        </div>

                        {/* Menu items */}
                        <div className="py-1.5">
                          <Link
                            to="/watchlist"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/8 transition-colors"
                          >
                            <Bookmark className="w-4 h-4 text-white/50" />
                            My Watchlist
                          </Link>
                          <Link
                            to="/downloads"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/8 transition-colors"
                          >
                            <Download className="w-4 h-4 text-white/50" />
                            <span>Downloads</span>
                            {downloadCount > 0 && (
                              <span className="ml-auto min-w-[20px] h-5 rounded-full bg-sterring-orange/20 border border-sterring-orange/40 text-sterring-orange text-[10px] font-bold flex items-center justify-center px-1.5">
                                {downloadCount}
                              </span>
                            )}
                          </Link>
                          <Link
                            to="/movies"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/8 transition-colors"
                          >
                            <Clapperboard className="w-4 h-4 text-white/50" />
                            Browse Movies
                          </Link>
                        </div>

                        {/* Sign out */}
                        <div className="border-t border-white/10 py-1.5">
                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* ── Sign In button (not logged in) ──────────────────────── */
                <Link to="/login">
                  <Button
                    variant="default"
                    className="bg-sterring-orange hover:bg-sterring-orange-dark text-white font-bold rounded-sm px-6 py-2.5 hidden sm:flex items-center gap-2 transition-colors duration-150"
                  >
                    <LogIn className="h-4 w-4" />
                    <span className="text-sm">Sign In</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile bottom navigation (hidden on md+) ─────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-sterring-ink border-t border-white/10">
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
          {/* Mobile user icon */}
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full min-w-0 px-1"
            >
              <div className="w-5 h-5 rounded-full bg-sterring-orange flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">{user ? getInitials(user.name) : "U"}</span>
              </div>
              <span className="text-[10px] font-semibold text-white/40">Sign Out</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex flex-col items-center justify-center gap-0.5 flex-1 h-full min-w-0 px-1"
            >
              <User className="w-5 h-5 text-white/50" />
              <span className="text-[10px] font-semibold text-white/40">Sign In</span>
            </Link>
          )}
        </div>
      </nav>

      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
