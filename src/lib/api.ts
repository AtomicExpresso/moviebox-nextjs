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

const fetchDataGenreaAction = (id: number) => {
  return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=5864127d28cedcf6e5a23ad38b9d9816&with_genres=28`, options)
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

export {fetchData, fetchDataGenreaAction, fetchDataNewMovie};