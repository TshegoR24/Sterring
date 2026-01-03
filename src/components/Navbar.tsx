import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-bold text-white tracking-tight">SA Cinema</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                Home
              </a>
              <a href="#" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                Movies
              </a>
              <a href="#" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                Series
              </a>
              <a href="#" className="text-white/90 hover:text-white transition-colors text-sm font-medium">
                Categories
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
