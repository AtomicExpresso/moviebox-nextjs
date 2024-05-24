'use client'
import ArrowRight from '@/assets/images/right-solid.svg';
import ArrowLeft from '@/assets/images/left-solid.svg'
import { useEffect, useRef, useState } from 'react';
import {dataType} from '@/typeings/types';
import rating from '@/assets/images/Rating.svg';
import Image from 'next/image';


const fetchDataFromAPI = async (url: string, queryParams: string = '') => {
  try {
    const response = await fetch(`${url}${queryParams}`, { method: 'GET', headers: { accept: 'application/json' } });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default function Home() {
  const [data, setData] = useState<dataType[]>([]);
  const [dataGenreAction, setDataGenreAction] = useState<dataType[]>([]);
  const [dataNewMovies, setDataNewMovies] = useState<dataType[]>([]);


  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const popularMovies = await fetchDataFromAPI('https://api.themoviedb.org/3/movie/popular', '?api_key=5864127d28cedcf6e5a23ad38b9d9816');
        setData(popularMovies.results);

        const actionMovies = await fetchDataFromAPI('https://api.themoviedb.org/3/discover/movie', `?api_key=5864127d28cedcf6e5a23ad38b9d9816&with_genres=28`);
        setDataGenreAction(actionMovies.results);

        const newMovies = await fetchDataFromAPI('https://api.themoviedb.org/3/movie/upcoming', `?api_key=5864127d28cedcf6e5a23ad38b9d9816`);
        setDataNewMovies(newMovies.results);

      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAsync();
  }, []);
  
  //Genreates a list of movies from the state arrays
  const CreateNewItems = ({mapTitle}: {mapTitle: dataType[]}) => {
    return mapTitle.map((item) => {
    return (
      <div className='item-movie' key={item.id}>
        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
        <div className='movie-item-info'>
        <h1>{item.title}</h1>
        <div className='movie-item-cat'>
          <Image draggable='false' src={rating} alt='rating'></Image>
          <h2>{item.vote_average}</h2>
          <div className='divider'></div>
        </div>
    </div>
    </div>
    )
  })}

  const CreateMovieCat = ({name, creation}: {name: string, creation: React.ReactNode}) => {
    const [btnArrow, setBtnArrow] = useState(false)

    const scrollElement = useRef(null);

    const scrollArrow = (direct: string) => {
      direct === "right" ? scrollElement.current.scrollLeft += 300 : scrollElement.current.scrollLeft += -300
    }

    return (
      <>
        <div className='item-movie-cat-title'>
          <h1>{name}</h1>
          <hr></hr>
        </div>
        <div className='item-movie-holder' onMouseOver={() => setBtnArrow(true)} onMouseOut={() => setBtnArrow(false)} ref={scrollElement}>
          {creation}
          {btnArrow && 
            <>
            <div className="item-movie-btn-arrow" onClick={() => scrollArrow("right")}>
              <Image draggable='false' src={ArrowRight} alt='scroll right'></Image>
            </div>
            <div className="item-movie-btn-arrow-right" onClick={() => scrollArrow("left")}>
              <Image draggable='false' src={ArrowLeft} alt='scroll left'></Image>
            </div>
            </>
          }
        </div>
      </>
    )
  }

  const RandomFeaturedBG = Math.floor(Math.random() * data.length)
  console.log(data)
  return (
    <div className='discover-page'>
      {data.length > 0 && (
        <div className='featured-movie-banner'>
          <img src={`https://image.tmdb.org/t/p/w500/${data[RandomFeaturedBG].backdrop_path}`} alt="Featured Movie Poster" />
          <div className='featured-movie-info'>
            <h1>{data[RandomFeaturedBG].title}</h1>
            <p>{data[RandomFeaturedBG].overview}</p>
            <div className='featured-movie-btn'>
              <button className='btn btn-danger'>Watch</button>
              <button className='btn btn-light'>Info</button>
            </div>
          </div>
        </div>
      )}
      <CreateMovieCat name='Popular' creation={<CreateNewItems mapTitle={data}/>}/>
      <CreateMovieCat name='New' creation={<CreateNewItems mapTitle={dataNewMovies}/>}/>
      <CreateMovieCat name='Action' creation={<CreateNewItems mapTitle={dataGenreAction}/>}/>
    </div>
  );
}