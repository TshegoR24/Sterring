import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContentRow } from "@/components/ContentRow";
import { GenreFilter } from "@/components/GenreFilter";
import { categories } from "@/data/content";
import { Content } from "@/types/content";
import { Play, Star, LayoutGrid, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

// Pull the Anime category from shared data
const animeCat = categories.find((c) => c.id === "anime")!;

// Hero featured show — first in the list
const hero = animeCat?.content[0];

const Anime = () => {
  const [filtered, setFiltered] = useState<Content[]>(animeCat?.content ?? []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />

      {/* ── Compact Cinematic Hero Section ──────────────────────────────── */}
      <div className="relative w-full h-[50vh] min-h-[360px] max-h-[560px] overflow-hidden">

        {/* Background — real poster of first anime */}
        {hero ? (
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${hero.imageUrl})` }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a003a] via-[#0d0d0d] to-black" />
        )}

        {/* Darkening vignette */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Purple-tinted overlay for anime aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-pink-900/20" />
        {/* Bottom fade to page background */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        {/* Left-side text contrast fade */}
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
              <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-purple-500/20 text-purple-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-purple-400 text-xs font-bold uppercase tracking-[0.2em]">
                Sterring! — Anime
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none mb-3 drop-shadow-xl">
              Anime
            </h1>

            {/* Subtitle */}
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 max-w-md">
              Epic battles, breathtaking worlds, and unforgettable stories — the greatest anime series, all in one place.
            </p>

            {/* CTA — links to first anime's detail page */}
            {hero && (
              <Link to={`/show/${hero.id}`}>
                <motion.button
                  whileHover={{ scale: 1.04, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 px-7 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-sm md:text-base shadow-lg shadow-purple-600/30 transition-all"
                >
                  <Play className="w-5 h-5 fill-white" />
                  Watch {hero.title}
                </motion.button>
              </Link>
            )}

            {/* Stats row */}
            <div className="flex items-center gap-6 mt-5 text-sm text-white/50">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-purple-400 fill-purple-400" />
                <span className="text-white font-semibold">Top Picks</span>
              </div>
              <span>•</span>
              <span>{animeCat?.content.length ?? 0} Series</span>
              <span>•</span>
              <span>Japanese Animation</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Browse Section — overlaps into hero for seamless flow ─────── */}
      <div className="relative z-10 -mt-10 pb-20">
        {/* Section heading */}
        <div className="px-6 sm:px-10 md:px-16 lg:px-20 max-w-[1920px] mx-auto mb-2">
          <div className="flex items-center gap-3">
            <LayoutGrid className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Browse All Anime</h2>
          </div>
        </div>

        {animeCat && (
          <>
            <GenreFilter content={animeCat.content} onFilter={setFiltered} />
            <ContentRow category={{ ...animeCat, content: filtered }} />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Anime;
