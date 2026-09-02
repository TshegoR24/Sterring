import { GenreGridPage } from "@/components/GenreGridPage";
import { categories } from "@/data/content";

const localMoviesCat = categories.find((c) => c.id === "local-movies")!;

const Movies = () => (
  <GenreGridPage
    title="Movies"
    description="Award-winning South African films — from gritty township dramas to heartfelt comedies that put local storytelling on the global map."
    content={localMoviesCat?.content ?? []}
  />
);

export default Movies;
