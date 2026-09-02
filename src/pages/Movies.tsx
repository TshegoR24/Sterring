import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContentRow } from "@/components/ContentRow";
import { GenreFilter } from "@/components/GenreFilter";
import { categories } from "@/data/content";
import { Content } from "@/types/content";
import { Clapperboard, Play, Star, Film } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

// Pull the Local Movies category from shared data
const localMoviesCat = categories.find((c) => c.id === "local-movies")!;

// Pick the hero feature from the first Local Movie entry
const hero = localMoviesCat?.content[0];

const Movies = () => {
  const [filtered, setFiltered] = useState<Content[]>(localMoviesCat?.content ?? []);

  return (
    <div className="min-h-screen bg-sterring-ink text-white">
      <Navbar />

      {/* ── Compact Cinematic Hero Section ──────────────────────────────── */}
      <div className="relative w-full h-[50vh] min-h-[360px] max-h-[560px] overflow-hidden">

        {/* Background — real poster of first Local Movie */}
        {hero ? (
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${hero.imageUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a00] via-[#0d0d0d] to-black" />
        )}

        {/* Darkening vignette so text stays readable */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Bottom fade into page background */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-sterring-ink to-transparent" />
        {/* Left-side text-contrast fade */}
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/70 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-end pb-10 px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex items-center justify-center w-9 h-9 rounded-sm bg-sterring-orange/15 text-sterring-orange">
                <Clapperboard className="w-5 h-5" />
              </div>
              <span className="text-sterring-orange text-xs font-bold uppercase tracking-[0.2em]">
                Sterring! — Local Cinema
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-none mb-3 drop-shadow-xl">
              Movies
            </h1>

            {/* Subtitle */}
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 max-w-md">
              Award-winning South African films — from gritty township dramas to
              heartfelt comedies that put local storytelling on the global map.
            </p>

            {/* CTA — links to first film */}
            {hero && (
              <Link to={`/movie/${hero.id}`}>
                <button className="inline-flex items-center gap-3 px-7 py-3.5 bg-sterring-orange hover:bg-sterring-orange-dark text-white font-bold rounded-sm text-sm md:text-base transition-colors duration-150">
                  <Play className="w-5 h-5 fill-white" />
                  Watch {hero.title}
                </button>
              </Link>
            )}

            {/* Stats row */}
            <div className="flex items-center gap-6 mt-5 text-sm text-white/50">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-sterring-orange fill-sterring-orange" />
                <span className="text-white font-semibold">IMDb Top Picks</span>
              </div>
              <span>•</span>
              <span>{localMoviesCat?.content.length ?? 0} Local Films</span>
              <span>•</span>
              <span>South African Cinema</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Browse Section — overlaps into hero for seamless flow ─────── */}
      <div className="relative z-10 -mt-10 pb-20">
        {/* Section heading */}
        <div className="px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1920px] mx-auto mb-2">
          <div className="flex items-center gap-3"> 
            <Film className="w-5 h-5 text-sterring-orange" />
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Browse All Movies</h2>
          </div>
        </div>

        {localMoviesCat && (
          <>
            <GenreFilter content={localMoviesCat.content} onFilter={setFiltered} />
            <ContentRow
              category={{ ...localMoviesCat, content: filtered }}
            />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Movies;
