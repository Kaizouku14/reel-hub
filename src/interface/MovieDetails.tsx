export interface MovieDetails {
  id: number;
  original_title: string;
  poster_path: string;
  backdrop_path : string;
  original_language : string;
  genre_ids : number[];
  overview : string;
  release_date : string;
  vote_average : number;
}