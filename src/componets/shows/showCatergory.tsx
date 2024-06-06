'use client'
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {fetchDataTrendingTV, fetchDataTVGenrea} from '@/lib/api';
import {dataType, settingFormType} from '@/typeings/types';
import defaultsettings from "@/data/defaultsettings";
import ArrowRight from '@/assets/images/right-solid.svg';
import ArrowLeft from '@/assets/images/left-solid.svg';
import rating from '@/assets/images/rating.svg';
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
  const [showGenereData, setShowGenreDate] = useState({
    actionAdventureShows: [],
    comedyShows: [],
    crimeShows: [],
    dramaShows: [],
    realityShows: [],
    animationShows: []
  })
  const [dataNewMovies, setDataNewMovies] = useState<dataType[]>([]);
  const getSettings = window?.localStorage?.getItem("user") ? localStorage.getItem('Settings') : null
  const [settingsData, setSettingsData] = useState<settingFormType>(getSettings ? JSON.parse(getSettings) : defaultsettings)

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const [
          trendingShows,
          actionAdventureShows,
          comedyShows,
          crimeShows,
          dramaShows,
          realityShows,
          animationShows
        ] = await Promise.all([
          fetchDataTrendingTV(11, settingsData["adult-content"]),
          fetchDataTVGenrea(10759, settingsData["adult-content"]),
          fetchDataTVGenrea(35, settingsData["adult-content"]),
          fetchDataTVGenrea(80, settingsData["adult-content"]),
          fetchDataTVGenrea(18, settingsData["adult-content"]),
          fetchDataTVGenrea(10764, settingsData["adult-content"]),
          fetchDataTVGenrea(16, settingsData["adult-content"])
        ]);
  
        setData(trendingShows.results);
  
        setShowGenreDate(prevState => ({
          ...prevState,
          actionAdventureShows: actionAdventureShows.results,
          comedyShows: comedyShows.results,
          crimeShows: crimeShows.results,
          dramaShows: dramaShows.results,
          realityShows: realityShows.results,
          animationShows: animationShows.results
        }));
  
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchDataAsync();
  }, []);
  
  //Genreates a list of movies from the state arrays
  const CreateNewItems = ({mapTitle}: {mapTitle: dataType[]}) => {
    return mapTitle.map((item, index) => {
    return (
      <div key={index}>
      {item.poster_path ? <Link href={`/tv/${item.id}`} key={item.id}>
        <div className='item-movie'>
          <img alt={item.name} draggable='false' src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
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
    </div>
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
        <CreateMovieCat  img={Fighter} name='Action/Adventure' creation={<CreateNewItems mapTitle={showGenereData.actionAdventureShows}/>}/>
        <CreateMovieCat  img={History} name='Animation' creation={<CreateNewItems mapTitle={showGenereData.animationShows}/>}/>
        <CreateMovieCat  img={Comedy} name='Comedy' creation={<CreateNewItems mapTitle={showGenereData.comedyShows}/>}/>
        <CreateMovieCat  img={Horror} name='Crime' creation={<CreateNewItems mapTitle={showGenereData.crimeShows}/>}/>
        <CreateMovieCat  img={Scifi} name='Drama' creation={<CreateNewItems mapTitle={showGenereData.dramaShows}/>}/>
        <CreateMovieCat  img={Family} name='Reality' creation={<CreateNewItems mapTitle={showGenereData.realityShows}/>}/>
      </div>
    </div>
  )
}