'use client'
import { useEffect, useState, useRef } from "react";
import {searchMovie, getCast, getSimilarFilm} from '@/lib/api';
import {dataType, castType} from '@/typeings/types';
import { usePathname } from 'next/navigation';
import ArrowRight from '@/assets/images/right-solid.svg';
import ArrowLeft from '@/assets/images/left-solid.svg';
import Link from "next/link";
import Star from "@/assets/images/star-solid.svg";
import Image from "next/image";

export default function Page(){
  //Data states, Holds the JSON data fetched from the api
  const [data, setData] = useState<dataType[]>([]);
  const [castData, setCastData] = useState<castType[]>([]);
  const [similarData, setSimilarData] = useState<dataType[]>([]);

  const [curTab, setCurTab] = useState('Overview');
  const [btnArrow, setBtnArrow] = useState(false);

  const scrollElement = useRef(null);

  const pathname = usePathname();
  const slicePath = pathname.split("/")[2];

  const scrollArrow = (direct: string) => {
    direct === "right" ? scrollElement.current.scrollLeft += 300 : scrollElement.current.scrollLeft += -300
  }

  //In the json doc, Runtime is counted in minutes, so this code gets the
  //Amount of hours and minutes from it
  const ChangeTime = (time: number) => {
    let convert = Math.floor(time / 60)
    let minute = Math.floor(time % 60)
    return `${convert}h ${minute}m`
  }

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const searchFilm = await searchMovie(Number(slicePath));
        setData([searchFilm]);

        const fetchCast = await getCast(Number(slicePath));
        setCastData([fetchCast]);

        const fetchSimilarFilms = await getSimilarFilm(Number(slicePath));
        setSimilarData([fetchSimilarFilms.results]);

      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAsync();
  }, []);

  //====Active Tab Styles====
  const ActiveStyle = {
    color: 'white',
    fontWeight: '800',
    borderBottom: 'solid 2px #dc3546'
  }

  const DefaultStyle = {
    color: 'white',
    fontWeight: '400'
  }

  return (
    <div className="movie-page-container">
      {data.length > 0 ? 
      <div className="movie-page">
          <div className="movie-page-poster">
            <img src={`https://image.tmdb.org/t/p/w500/${data[0].poster_path}`}></img>
          </div>
          <div style={{color: "white"}}>
          <h1>{data[0].title}</h1>
          <div className="movie-page-info">
            <h2>{data[0].release_date.split("-")[0]}</h2>
            <h2>•</h2>
            <h2>{ChangeTime(data[0].runtime)}</h2>
            <h2>•</h2>
            <Image draggable='false' src={Star} alt="rating"></Image>
            <h2>{data[0].vote_average.toFixed(2)}</h2>
          </div>
          <p>{data[0].overview}</p>
          <div className="movie-page-btn">
            <button className="btn btn-danger">Play</button>
              <Link href={`https://www.imdb.com/title/${data[0].imdb_id}/`}>
                <button className="btn btn-light">More Info</button>
              </Link>
          </div>
        </div>
        </div>
      : ''}
      {data.length > 0 ? 
          <div className="movie-page-tabs">
            <ul>
              <div style={curTab === 'Overview' ? ActiveStyle : DefaultStyle}>
                <button onClick={() => setCurTab('Overview')}>
                  <h1>Overview</h1>
                </button>
              </div>
              <div style={curTab === 'Cast' ? ActiveStyle : DefaultStyle}>
                <button onClick={() => setCurTab('Cast')}>
                  <h1>Cast</h1>
                </button>
              </div>
              <div style={curTab === 'Similar' ? ActiveStyle : DefaultStyle}>
                <button onClick={() => setCurTab('Similar')}>
                  <h1>Similar</h1>
                </button>
              </div>
            </ul>
            {castData.length > 0 && curTab === 'Overview' ? 
            <div className="movie-page-info-overview-container">
              <h1>Description</h1>
              <p>{castData[0].overview}</p>
              <div className="movie-page-info-card-container">
                <div className="movie-page-info-card">
                  <h1>Director</h1>
                  <h2>{castData[0].credits.crew[0].name}</h2>
                </div>
                <div className="movie-page-info-card">
                  <h1>Country</h1>
                  <h2>{castData[0].origin_country[0]}</h2>
                </div>
                <div className="movie-page-info-card">
                  <h1>Genres</h1>
                  <div className="movie-page-info-card-nested-container">
                  {castData[0].genres.map(item => {
                    return (
                      <div className="movie-page-info-card-nested" key={item.id}>
                        <h3>{item.name}</h3>
                      </div>
                    )
                  })}
                  </div>
                </div>
              </div>
            </div> 
            : ''}
          </div>
      : ""}
      {similarData.length > 0 ?
        <div className="movie-page-similar">
           <h1>Similar</h1>
           <div style={{position: 'relative'}} onMouseOver={() => setBtnArrow(true)} onMouseOut={() => setBtnArrow(false)}>
            <div className="move-page-similar-img-container" ref={scrollElement}>
              {similarData[0].map((item) => {
                return (
                  <div key={item.id} className="movie-page-similar-imgs">
                    <Link href={`/movie/${item.id}`}>
                      <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
                    </Link>
                  </div>
                  )
                })}
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
        </div>
      : ""}
    </div>
  )
}