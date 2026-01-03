import { Navbar } from "@/components/Navbar";
import { HeroBanner } from "@/components/HeroBanner";
import { ContentRow } from "@/components/ContentRow";
import { Footer } from "@/components/Footer";
import { categories } from "@/data/content";

const Index = () => {
  const featuredContent = categories.find((cat) => cat.id === "featured")?.content[0];
  const contentCategories = categories.filter((cat) => cat.id !== "featured");

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      {featuredContent && <HeroBanner content={featuredContent} />}
      <div className="mt-12 pb-12">
        {contentCategories.map((category) => (
          <ContentRow key={category.id} category={category} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Index;
