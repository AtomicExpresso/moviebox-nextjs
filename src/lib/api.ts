//Movie API
const options = { method: 'GET', headers: { accept: 'application/json' } };

//Fetchs data from movie api
const fetchData = (id: number) => {
  return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=5864127d28cedcf6e5a23ad38b9d9816`, options)
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

const fetchDataGenrea = (id: number) => {
  return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5864127d28cedcf6e5a23ad38b9d9816&with_genres=${id}`, options)
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

const fetchDataNewMovie = (id: number) => {
  return fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=5864127d28cedcf6e5a23ad38b9d9816`, options)
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

const searchMovie = (id: number) => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5864127d28cedcf6e5a23ad38b9d9816`, options)
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
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=5864127d28cedcf6e5a23ad38b9d9816&language=en-US&append_to_response=credits`, options)
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

const getSimilarFilm = (id: number) => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=5864127d28cedcf6e5a23ad38b9d9816&`, options)
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

const searchByPage = (id: number) => {
  return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5864127d28cedcf6e5a23ad38b9d9816&page=${id}`, options)
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

const searchByName = (id: string) => {
  return fetch(`https://api.themoviedb.org/3/search/movie?query=${id}&api_key=5864127d28cedcf6e5a23ad38b9d9816`, options)
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
const fetchDataTVGenrea = (id: number) => {
  return fetch(`https://api.themoviedb.org/3/discover/tv?api_key=5864127d28cedcf6e5a23ad38b9d9816&with_genres=${id}`, options)
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

const fetchDataTrendingTV = (id: number) => {
  return fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=5864127d28cedcf6e5a23ad38b9d9816`, options)
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
  return fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=5864127d28cedcf6e5a23ad38b9d9816`, options)
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

const fetchDataSimilarTVSeries = (id: number) => {
  return fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=5864127d28cedcf6e5a23ad38b9d9816`, options)
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
  return fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=5864127d28cedcf6e5a23ad38b9d9816`, options)
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
  return fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=5864127d28cedcf6e5a23ad38b9d9816&language=en-US&append_to_response=episode_groups`, options)
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


export {fetchData, searchByName, fetchDataGenrea, fetchDataNewMovie, searchMovie, getCast, getSimilarFilm, searchByPage, fetchDataTVGenrea, fetchDataTrendingTV, fetchDataTVSeries, fetchDataSimilarTVSeries, fetchDataCreditsTV, fetchDataSeasonsTV};