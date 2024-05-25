export interface dataType {
  title: string
  adult: boolean;
  id: number;
  belongs_to_collection: any; // Define this type based on the actual data structure
  budget: number;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  release_date: string;
  runtime: number;
  imdb_id: string;
  genres: {
    id: number,
    name: string
  }[];
}
