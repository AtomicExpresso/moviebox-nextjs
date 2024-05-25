'use client'
import ArrowRight from '@/assets/images/right-solid.svg';
import ArrowLeft from '@/assets/images/left-solid.svg'
import { useEffect, useRef, useState } from 'react';
import {dataType} from '@/typeings/types';
import rating from '@/assets/images/Rating.svg';
import Image from 'next/image';
import Star from '@/assets/images/star-solid.svg';
import Fighter from '@/assets/images/fighter-solid.svg';
import Ticket from '@/assets/images/ticket-solid.svg';
import {fetchData, fetchDataGenreaAction, fetchDataNewMovie} from '@/lib/api';
import Link from 'next/link';

export default function Home() {
  const [data, setData] = useState<dataType[]>([]);
  const [dataGenreAction, setDataGenreAction] = useState<dataType[]>([]);
  const [dataNewMovies, setDataNewMovies] = useState<dataType[]>([]);


  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const popularMovies = await fetchData(11);
        setData(popularMovies.results);

        const actionMovies = await fetchDataGenreaAction(11);
        setDataGenreAction(actionMovies.results);

        const newMovies = await fetchDataNewMovie(11);
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
      <Link href={`/movie/${item.id}`}>
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
    </Link>
    )
  })}

  //Renders each movie category for the home page
  const CreateMovieCat = ({name, creation, img}: {name: string, creation: React.ReactNode, img: string}) => {

    //For scroll arrows
    const [btnArrow, setBtnArrow] = useState(false)
    const scrollElement = useRef(null);
    const scrollArrow = (direct: string) => {
      direct === "right" ? scrollElement.current.scrollLeft += 300 : scrollElement.current.scrollLeft += -300
    }

    return (
      <>
        <div className='item-movie-cat-title'>
          <div className='item-movie-cat-title-row'>
            <Image alt={name} src={img}></Image>
            <h1>{name}</h1>
          </div>
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
  return (
    <div className='discover-page'>
      {data.length > 0 && (
        <div className='featured-movie-banner'>
          <img src={`https://image.tmdb.org/t/p/w500/${data[RandomFeaturedBG].backdrop_path}`} alt="Featured Movie Poster" />
          <div className='featured-movie-info'>
            <h1>{data[RandomFeaturedBG].title}</h1>
            <p>{data[RandomFeaturedBG].overview}</p>
            <div className='featured-movie-btn'>
              <Link href={`/movie/${data[RandomFeaturedBG].id}`}><button className='btn btn-danger'>Watch</button></Link>
              <button className='btn btn-light'>Info</button>
            </div>
          </div>
        </div>
      )}
      <CreateMovieCat img={Star} name='Popular' creation={<CreateNewItems mapTitle={data}/>}/>
      <CreateMovieCat img={Ticket} name='New' creation={<CreateNewItems mapTitle={dataNewMovies}/>}/>
      <CreateMovieCat  img={Fighter} name='Action' creation={<CreateNewItems mapTitle={dataGenreAction}/>}/>
    </div>
  );
}