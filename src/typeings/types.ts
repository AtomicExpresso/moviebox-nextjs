export interface dataType {
  title: string;
  original_name: string;
  name: string;
  first_air_date: string; //show
  number_of_seasons: string; //show
  homepage: string; //show
  created_by: {
    name: string;
    id: number;
    credit_id: number;
  }[]; //show
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
  map: React.FC;
  origin_country: string[];
  genres: {
    id: number,
    name: string
  }[];
}

export interface castType {
  title: string;
  id: number;
  overview: string;
  origin_country: string;
  genres: {
    id: number,
    name: string
  }[];
  cast: {
    name: string;
    profile_path: string;
    character: string;
    id: number;
  }[];
  credits: {
    crew: {
      name: string;
      job: string;
      profile_path: string;
      id: number;
    };
    cast: {
      name: string;
      character: string;
      profile_path: string;
      cast_id: number;
      }
    };
  }