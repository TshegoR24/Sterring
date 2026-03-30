import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MovieDetail from "./pages/MovieDetail";
import TVShowDetail from "./pages/TVShowDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Watchlist from "./pages/Watchlist";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import { WatchlistProvider } from "./contexts/WatchlistContext";
import { ContinueWatchingProvider } from "./contexts/ContinueWatchingContext";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <WatchlistProvider>
          <ContinueWatchingProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/show/:id" element={<TVShowDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/movies" element={<Movies />} />
                <Route path="/tv-shows" element={<TVShows />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </ContinueWatchingProvider>
        </WatchlistProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
