import { useParams, useNavigate } from "react-router-dom";
import { Play, ArrowLeft, Star, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { allContent, categories } from "@/data/content";
import { ContentCard } from "@/components/ContentCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = allContent.find((m) => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
          <Button onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  // Find similar movies (same genre)
  const similarMovies = allContent
    .filter(
      (m) =>
        m.id !== movie.id &&
        m.genres.some((genre) => movie.genres.includes(genre))
    )
    .slice(0, 6);

  // Mock rating (in a real app, this would come from the data)
  const rating = 8.5;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        </div>

        <div className="relative h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6 text-white hover:bg-white/10"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6 text-white/90">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{rating}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{movie.year}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.duration}</span>
                </div>
                <span>•</span>
                <span>{movie.rating}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-white/20 text-white rounded-full text-sm backdrop-blur-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 text-lg px-8 py-6 rounded-full font-semibold"
                  onClick={() => {
                    // In a real app, this would open the video player
                    alert("Video player would open here");
                  }}
                >
                  <Play className="mr-2 h-5 w-5" fill="black" />
                  Play Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/20 text-white border-white/30 hover:bg-white/30 text-lg px-8 py-6 rounded-full backdrop-blur-sm font-semibold"
                >
                  Add to Watchlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Synopsis */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Synopsis</h2>
          <p className="text-white/80 text-lg leading-relaxed max-w-3xl">
            {movie.description}
          </p>
        </div>

        {/* Video Player Placeholder */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Watch Trailer</h2>
          <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                size="lg"
                className="bg-white/20 hover:bg-white/30 text-white border-white/30 backdrop-blur-sm"
                onClick={() => alert("Trailer would play here")}
              >
                <Play className="mr-2 h-6 w-6" fill="white" />
                Play Trailer
              </Button>
            </div>
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-full object-cover opacity-30"
            />
          </div>
        </div>

        {/* Similar Movies */}
        {similarMovies.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Similar Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {similarMovies.map((item) => (
                <ContentCard
                  key={item.id}
                  content={item}
                  className="w-full"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MovieDetail;
