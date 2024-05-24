export interface dataType {
  title: string
  adult: boolean;
  belongs_to_collection: any; // Define this type based on the actual data structure
  budget: number;
  poster_path: string;
  vote_average: number;
  genres: {
    id: number,
    name: string
  }[];
}
