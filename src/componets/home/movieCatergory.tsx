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
import FeaturedImage from "./featuredImage";

export default function MovieCategory() {
  const [data, setData] = useState<dataType[]>([]);
  const [dataGenreAction, setDataGenreAction] = useState<dataType[]>([]);
  const [dataGenreComedy, setDataGenreComedy] = useState<dataType[]>([]);
  const [dataGenreFamily, setDataGenreFamily] = useState<dataType[]>([]);
  const [dataNewMovies, setDataNewMovies] = useState<dataType[]>([]);


  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const popularMovies = await fetchData(11);
        setData(popularMovies.results);

        const actionMovies = await fetchDataGenrea(28);
        setDataGenreAction(actionMovies.results);

        const comedyMovies = await fetchDataGenrea(35);
        setDataGenreComedy(comedyMovies.results);

        const familyMovies = await fetchDataGenrea(10751);
        setDataGenreFamily(familyMovies.results);

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
        <CreateMovieCat  img={Fighter} name='Action' creation={<CreateNewItems mapTitle={dataGenreAction}/>}/>
        <CreateMovieCat  img={Comedy} name='Comedy' creation={<CreateNewItems mapTitle={dataGenreComedy}/>}/>
        <CreateMovieCat  img={Family} name='Family' creation={<CreateNewItems mapTitle={dataGenreFamily}/>}/>
      </div>
    </div>
  )
}