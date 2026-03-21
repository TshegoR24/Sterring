import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ContentRow } from "@/components/ContentRow";
import { ContinueWatchingRow } from "@/components/ContinueWatchingRow";
import { Footer } from "@/components/Footer";
import { categories } from "@/data/content";

const Index = () => {
  const featuredCategory = categories.find((cat) => cat.id === "featured");
  const contentCategories = categories.filter((cat) => cat.id !== "featured");

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      {featuredCategory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <HeroCarousel featuredContent={featuredCategory.content} />
        </motion.div>
      )}

      {/* Content Rows */}
      <div className="relative z-10 mt-8 pb-20">
        {/* Continue Watching — only visible after user has played something */}
        <ContinueWatchingRow />

        {contentCategories.map((category) => (
          <ContentRow key={category.id} category={category} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Index;


