import 'dotenv/config';
//Fetches from TMDB Api
//This is used for getting movie data

//Movie API
const options = { method: 'GET', headers: { accept: 'application/json' } };
const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY

//Fetch most popular movies
const fetchData = async (id: number, incAdult: boolean) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&include_adult=${incAdult}`, options);

    const data = await response.json();

    return data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Fetch by movie genera
const fetchDataGenrea = async (id: number, incAdult: boolean) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&with_genres=${id}&include_adult=${incAdult}`, options);

    const data = await response.json();

    return data
  } catch(error) {
    console.error(error);
    throw error;
  }
};

//Fetch latest new movies
const fetchDataNewMovie = async (id: number, incAdult: boolean) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbApiKey}&include_adult=${incAdult}`, options);

    const data = await response.json()

    return data
  } catch (error){
    console.error(error);
    throw error;
  }
};

//Fetch a specific movie, this is used to display the movie data when a user clicks on a movie
const searchMovie = async (id: number, incAdult: boolean) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}&include_adult=${incAdult}`, options);

    const data = await response.json();

    return data
  } catch (error){
    console.error(error);
    throw error;
  }
}

//Fetch the cast from the movie
const getCast = async (id: number) => {

  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}&language=en-US&append_to_response=credits`, options);

    const data = await response.json();

    return data
  } catch (error){
    console.error(error);
    throw error;
  }
}

//Fetch similar films
const getSimilarFilm = async (id: number, incAdult: boolean) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${tmdbApiKey}&&include_adult=${incAdult}`, options);

    const data = await response.json();

    return data
  } catch (error){
    console.error(error);
    throw error;
  }
}

//Fetch pages of movies
const searchByPage = async (id: number, incAdult: boolean) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&page=${id}&include_adult=${incAdult}`, options)

    const data = await response.json();
    
    return data
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//Search a movie by its name
const searchByName = async (id: string, incAdult: boolean) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${id}&api_key=${tmdbApiKey}&include_adult=${incAdult}`, options);

    const data = await response.json();

    return data
  } catch (error){
    console.error(error);
    throw error;
  }
}

//===================
//TV SHOWS

//Fetch tv show by its genera
const fetchDataTVGenrea = async (id: number, incAdult: boolean) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${tmdbApiKey}&with_genres=${id}&include_adult=${incAdult}`, options)

    const data = await response.json();

    return data
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//Fetch trending shows
const fetchDataTrendingTV = async (id: number, incAdult: boolean) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${tmdbApiKey}&include_adult=${incAdult}`, options)

    const data = response.json()

    return data
  } catch(error){
    console.error(error);
    throw error;
  }
};

//Fetch specifc series
const fetchDataTVSeries = async (id: number) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${tmdbApiKey}`, options)

    const data = response.json()

    return data
  } catch(error){
    console.error(error);
    throw error;
  }
};

//Fetch simlar tv shows
const fetchDataSimilarTVSeries = async (id: number, incAdult: boolean) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${tmdbApiKey}&include_adult=${incAdult}`, options)

    const data = response.json()

    return data
  } catch(error){
    console.error(error);
    throw error;
  }
};

//Find the credits of the show
const fetchDataCreditsTV = async (id: number) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${tmdbApiKey}`, options)

    const data = response.json()

    return data
  } catch(error){
    console.error(error);
    throw error;
  }
};

//Find all the seasons of the show
const fetchDataSeasonsTV = async (id: number) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${tmdbApiKey}&language=en-US&append_to_response=episode_groups`, options)

    const data = response.json()

    return data
  } catch(error){
    console.error(error);
    throw error;
  }
};

//Find the info about a specifc episode from the show
const fetchDataSeasonEpisodeTV = async (id: number, seasonId: number) => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonId}?api_key=${tmdbApiKey}`, options)

    const data = response.json()

    return data
  } catch(error){
    console.error(error);
    throw error;
  }
};


export {fetchData, searchByName, fetchDataGenrea, fetchDataNewMovie, searchMovie, getCast, getSimilarFilm, searchByPage, fetchDataTVGenrea, fetchDataTrendingTV, fetchDataTVSeries, fetchDataSimilarTVSeries, fetchDataCreditsTV, fetchDataSeasonsTV, fetchDataSeasonEpisodeTV};