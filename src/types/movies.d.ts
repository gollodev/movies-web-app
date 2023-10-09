export interface MoviesResult {
  Search: Movie[];
  totalResults: string;
  Response: string;
}

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: Type;
  Poster: string;
}

export enum Type {
  Movie = "movie",
  Series = "series",
}

export type CartState = {
  movie: string
  type: string
  date?: string
  quantity: number
}
