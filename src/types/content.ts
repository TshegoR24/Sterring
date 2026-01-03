export type ContentType = "movie" | "series";

export type Genre =
  | "Drama"
  | "Comedy"
  | "Thriller"
  | "Action"
  | "Romance"
  | "Historical"
  | "Crime"
  | "Documentary"
  | "Family"
  | "Horror"
  | "Sci-Fi";

export interface Content {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  genres: Genre[];
  year: number;
  rating: string;
  duration: string;
  imageUrl: string;
  featured?: boolean;
  category?: string;
}

export interface Category {
  id: string;
  name: string;
  content: Content[];
}

