import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { HeroCarousel } from "@/components/HeroCarousel";
import { ContentRow } from "@/components/ContentRow";
import { Footer } from "@/components/Footer";
import { categories } from "@/data/content";

const Index = () => {
  const featuredCategory = categories.find((cat) => cat.id === "featured");
  const contentCategories = categories.filter((cat) => cat.id !== "featured");

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white relative overflow-hidden">
      {/* Layered background for depth */}
      <div className="fixed inset-0 bg-gradient-to-b from-black via-neutral-900/50 to-black pointer-events-none z-0" />
      <div className="fixed inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none z-0" />
      
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
      <div className="relative z-10 mt-8 pb-16">
        {contentCategories.map((category, index) => (
          <ContentRow key={category.id} category={category} />
        ))}
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;

