//Movie API
const options = { method: 'GET', headers: { accept: 'application/json' } };
const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY as string

//Fetchs data from movie api /
const fetchData = (id: number, incAdult: boolean) => {
  return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbApiKey}&include_adult=${incAdult}`, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data; // Return the data to be used elsewhere if needed
    })
    .catch(error => {
      console.error(error);
      throw error; // Rethrow the error for error handling elsewhere if needed
    });
};

const fetchDataGenrea = (id: number, incAdult: boolean) => {
  return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&with_genres=${id}&include_adult=${incAdult}`, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data; // Return the data to be used elsewhere if needed
    })
    .catch(error => {
      console.error(error);
      throw error; // Rethrow the error for error handling elsewhere if needed
    });
};

const fetchDataNewMovie = (id: number, incAdult: boolean) => {
  return fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbApiKey}&include_adult=${incAdult}`, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data; // Return the data to be used elsewhere if needed
    })
    .catch(error => {
      console.error(error);
      throw error; // Rethrow the error for error handling elsewhere if needed
    });
};

const searchMovie = (id: number, incAdult: boolean) => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}&include_adult=${incAdult}`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data; // Return the data to be used elsewhere if needed
  })
  .catch(error => {
    console.error(error);
    throw error; // Rethrow the error for error handling elsewhere if needed
  });
}

const getCast = (id: number) => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}&language=en-US&append_to_response=credits`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data; // Return the data to be used elsewhere if needed
  })
  .catch(error => {
    console.error(error);
    throw error; // Rethrow the error for error handling elsewhere if needed
  });
}

const getSimilarFilm = (id: number, incAdult: boolean) => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${tmdbApiKey}&&include_adult=${incAdult}`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data; // Return the data to be used elsewhere if needed
  })
  .catch(error => {
    console.error(error);
    throw error; // Rethrow the error for error handling elsewhere if needed
  });
}

const searchByPage = (id: number, incAdult: boolean) => {
  return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&page=${id}&include_adult=${incAdult}`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data; // Return the data to be used elsewhere if needed
  })
  .catch(error => {
    console.error(error);
    throw error; // Rethrow the error for error handling elsewhere if needed
  });
}

const searchByName = (id: string, incAdult: boolean) => {
  return fetch(`https://api.themoviedb.org/3/search/movie?query=${id}&api_key=${tmdbApiKey}&include_adult=${incAdult}`, options)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    return data; // Return the data to be used elsewhere if needed
  })
  .catch(error => {
    console.error(error);
    throw error; // Rethrow the error for error handling elsewhere if needed
  });
}
//===================
//TV SHOWS
const fetchDataTVGenrea = (id: number, incAdult: boolean) => {
  return fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${tmdbApiKey}&with_genres=${id}&include_adult=${incAdult}`, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data; // Return the data to be used elsewhere if needed
    })
    .catch(error => {
      console.error(error);
      throw error; // Rethrow the error for error handling elsewhere if needed
    });
};

const fetchDataTrendingTV = (id: number, incAdult: boolean) => {
  return fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${tmdbApiKey}&include_adult=${incAdult}`, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data; // Return the data to be used elsewhere if needed
    })
    .catch(error => {
      console.error(error);
      throw error; // Rethrow the error for error handling elsewhere if needed
    });
};

const fetchDataTVSeries = (id: number) => {
  return fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${tmdbApiKey}`, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data; // Return the data to be used elsewhere if needed
    })
    .catch(error => {
      console.error(error);
      throw error; // Rethrow the error for error handling elsewhere if needed
    });
};

const fetchDataSimilarTVSeries = (id: number, incAdult: boolean) => {
  return fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${tmdbApiKey}&include_adult=${incAdult}`, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data; // Return the data to be used elsewhere if needed
    })
    .catch(error => {
      console.error(error);
      throw error; // Rethrow the error for error handling elsewhere if needed
    });
};

const fetchDataCreditsTV = (id: number) => {
  return fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${tmdbApiKey}`, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data; // Return the data to be used elsewhere if needed
    })
    .catch(error => {
      console.error(error);
      throw error; // Rethrow the error for error handling elsewhere if needed
    });
};

const fetchDataSeasonsTV = (id: number) => {
  return fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${tmdbApiKey}&language=en-US&append_to_response=episode_groups`, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data; // Return the data to be used elsewhere if needed
    })
    .catch(error => {
      console.error(error);
      throw error; // Rethrow the error for error handling elsewhere if needed
    });
};

const fetchDataSeasonEpisodeTV = (id: number, seasonId: number) => {
  return fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonId}?api_key=${tmdbApiKey}`, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data; // Return the data to be used elsewhere if needed
    })
    .catch(error => {
      console.error(error);
      throw error; // Rethrow the error for error handling elsewhere if needed
    });
};


export {fetchData, searchByName, fetchDataGenrea, fetchDataNewMovie, searchMovie, getCast, getSimilarFilm, searchByPage, fetchDataTVGenrea, fetchDataTrendingTV, fetchDataTVSeries, fetchDataSimilarTVSeries, fetchDataCreditsTV, fetchDataSeasonsTV, fetchDataSeasonEpisodeTV};