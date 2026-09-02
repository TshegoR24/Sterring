import { GenreGridPage } from "@/components/GenreGridPage";
import { categories } from "@/data/content";

const localTVShowsCat = categories.find((c) => c.id === "local-tv-shows")!;

const TVShows = () => (
  <GenreGridPage
    title="TV Shows"
    description="Iconic South African series — from hilarious sitcoms to groundbreaking dramas that shaped the nation's television landscape."
    content={localTVShowsCat?.content ?? []}
  />
);

export default TVShows;
