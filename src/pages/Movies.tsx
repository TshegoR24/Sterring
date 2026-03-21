import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContentRow } from "@/components/ContentRow";
import { categories } from "@/data/content";
import { Clapperboard, Play, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Pull the Local Movies category from shared data
const localMoviesCat = categories.find((c) => c.id === "local-movies")!;

// Pick the hero feature from the first Local Movie entry
const hero = localMoviesCat?.content[0];

const Movies = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* ── Cinematic Hero Section ────────────────────────────────────────── */}
      <div className="relative w-full h-[70vh] min-h-[480px] max-h-[800px] overflow-hidden">

        {/* Background — real poster of first Local Movie */}
        {hero ? (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${hero.imageUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a00] via-[#0d0d0d] to-black" />
        )}

        {/* Darkening vignette so text stays readable */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Bottom fade into page background */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        {/* Left-side text-contrast fade */}
        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/70 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-end pb-14 px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-2xl"
          >
            {/* Badge */}
            <div className="flex items-center gap-2.5 mb-5">
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-sterring-orange/20 text-sterring-orange">
                <Clapperboard className="w-5 h-5" />
              </div>
              <span className="text-sterring-orange text-xs font-bold uppercase tracking-[0.2em]">
                Sterring! — Local Cinema
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none mb-3 drop-shadow-xl">
              Movies
            </h1>

            {/* Subtitle */}
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              Award-winning South African films — from gritty township dramas to
              heartfelt comedies that put local storytelling on the global map.
            </p>

            {/* CTA — links to first film */}
            {hero && (
              <Link to={`/movie/${hero.id}`}>
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-sterring-orange hover:bg-sterring-orange/90 text-white font-bold rounded-xl text-base md:text-lg shadow-lg shadow-sterring-orange/30 transition-all"
                >
                  <Play className="w-5 h-5 fill-white" />
                  Watch {hero.title}
                </motion.button>
              </Link>
            )}

            {/* Stats row */}
            <div className="flex items-center gap-6 mt-8 text-sm text-white/50">
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

      {/* ── Content Rows ────────────────────────────────────────────────── */}
      <div className="relative z-10 pb-20 mt-4">

        {localMoviesCat && (
          <ContentRow category={localMoviesCat} />
        )}

      </div>

      <Footer />
    </div>
  );
};

export default Movies;
