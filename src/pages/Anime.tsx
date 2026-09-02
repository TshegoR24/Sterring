import { GenreGridPage } from "@/components/GenreGridPage";
import { categories } from "@/data/content";

const animeCat = categories.find((c) => c.id === "anime")!;

const Anime = () => (
  <GenreGridPage
    title="Anime"
    description="Epic battles, breathtaking worlds, and unforgettable stories — the greatest anime series, all in one place."
    content={animeCat?.content ?? []}
    accentClassName="text-purple-400"
  />
);

export default Anime;
