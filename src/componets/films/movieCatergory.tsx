'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {fetchData, fetchDataGenrea, fetchDataNewMovie} from '@/lib/api';
import {dataType} from '@/typeings/types';
import ArrowRight from '@/assets/images/right-solid.svg';
import ArrowLeft from '@/assets/images/left-solid.svg';
import rating from '@/assets/images/Rating.svg';
import Star from '@/assets/images/star-solid.svg';
import Fighter from '@/assets/images/fighter-solid.svg';
import Comedy from '@/assets/images/comedy-solid.svg';
import Family from '@/assets/images/family-solid.svg';
import Ticket from '@/assets/images/ticket-solid.svg';
import Horror from '@/assets/images/ghost-solid.svg';
import Scifi from '@/assets/images/rocket-solid.svg';
import History from '@/assets/images/book-solid.svg';
import FeaturedImage from "./featuredImage";

export default function MovieCategory() {
  const [data, setData] = useState<dataType[]>([]);
  const [movieGenreData, setMovieGenreDate] = useState({
    actionMovies: [],
    comedyMovies: [],
    horrorMovies: [],
    scifiMovies: [],
    familyMovies: [],
    historyMovies: []
  })
  const [dataNewMovies, setDataNewMovies] = useState<dataType[]>([]);


  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const [
          popularMovies,
          actionMovies,
          comedyMovies,
          horrorMovies,
          scifiMovies,
          familyMovies,
          historyMovies,
          newMovies
        ] = await Promise.all([
          fetchData(11),
          fetchDataGenrea(28),
          fetchDataGenrea(35),
          fetchDataGenrea(27),
          fetchDataGenrea(878),
          fetchDataGenrea(10751),
          fetchDataGenrea(36),
          fetchDataNewMovie(11)
        ]);
  
        setData(popularMovies.results);
  
        setMovieGenreDate(prevState => ({
          ...prevState,
          actionMovies: actionMovies.results,
          comedyMovies: comedyMovies.results,
          horrorMovies: horrorMovies.results,
          scifiMovies: scifiMovies.results,
          familyMovies: familyMovies.results,
          historyMovies: historyMovies.results
        }));
  
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
      <>
      {item.poster_path ? <Link href={`/movie/${item.id}`} key={item.id}>
        <div className='item-movie'>
          <img draggable='false' src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
          <div className='movie-item-info'>
          <h1>{item.title}</h1>
          <div className='movie-item-cat'>
            <Image draggable='false' src={rating} alt='rating'></Image>
            <h2>{item.vote_average}</h2>
            <div className='divider'></div>
          </div>
        </div>
        </div>
    </Link> : null}
    </>
    )
  })}

  //Renders each movie category for the home page
  const CreateMovieCat = ({name, creation, img}: {name: string, creation: React.ReactNode, img: string}) => {

    //For scroll arrows
    const [btnArrow, setBtnArrow] = useState(false)
    const scrollElement = useRef<HTMLDivElement>(null);
    
    const scrollArrow = (direct: string) => {
      direct === "right" ? scrollElement.current!.scrollLeft += 300 : scrollElement.current!.scrollLeft += -300
    }

    return (
      <>
        <div className='item-movie-cat-title' key={name}>
          <div className='item-movie-cat-title-row'>
            <Image alt={name} src={img} draggable='false'></Image>
            <h1>{name}</h1>
          </div>
          <hr></hr>
        </div>
        <div className='item-movie-holder-content' style={{position: 'relative'}} onMouseOver={() => setBtnArrow(true)} onMouseOut={() => setBtnArrow(false)}>
        <div className='item-movie-holder' ref={scrollElement}>
          {creation}
        </div>
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
  
  return (
    <div>
      <div>
        <FeaturedImage data={data}/>
      </div>
      <div>
        <CreateMovieCat img={Star} name='Popular' creation={<CreateNewItems mapTitle={data}/>}/>
        <CreateMovieCat img={Ticket} name='New' creation={<CreateNewItems mapTitle={dataNewMovies}/>}/>
        <CreateMovieCat  img={Fighter} name='Action' creation={<CreateNewItems mapTitle={movieGenreData.actionMovies}/>}/>
        <CreateMovieCat  img={Comedy} name='Comedy' creation={<CreateNewItems mapTitle={movieGenreData.comedyMovies}/>}/>
        <CreateMovieCat  img={Horror} name='Horror' creation={<CreateNewItems mapTitle={movieGenreData.horrorMovies}/>}/>
        <CreateMovieCat  img={Scifi} name='Sci-fi' creation={<CreateNewItems mapTitle={movieGenreData.scifiMovies}/>}/>
        <CreateMovieCat  img={Family} name='Family' creation={<CreateNewItems mapTitle={movieGenreData.familyMovies}/>}/>
        <CreateMovieCat  img={History} name='History' creation={<CreateNewItems mapTitle={movieGenreData.historyMovies}/>}/>
      </div>
    </div>
  )
}