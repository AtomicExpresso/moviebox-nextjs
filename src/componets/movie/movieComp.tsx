'use client'
import { useEffect, useState } from "react";
import {searchMovie, getCast, getSimilarFilm} from '@/lib/api';
import {dataType, castType, settingFormType} from '@/typeings/types';
import defaultsettings from "@/data/defaultsettings";
import { usePathname } from 'next/navigation';
import Tabs from "@/componets/movie/tabs";
import Similar from "@/componets/movie/similiar";

import Link from "next/link";
import Star from "@/assets/images/star-solid.svg";
import Image from "next/image";

export default function MovieComp(){
  //Data states, Holds the JSON data fetched from the api
  const [data, setData] = useState<dataType[]>([]);
  const [castData, setCastData] = useState<castType[]>([]);
  const [similarData, setSimilarData] = useState<dataType[]>([]);
  const getSettings = window?.localStorage?.getItem("user") ? localStorage.getItem('Settings') : null
  const [settingsData, setSettingsData] = useState<settingFormType>(getSettings ? JSON.parse(getSettings) : defaultsettings)

  const pathname = usePathname();
  const slicePath = pathname.split("/")[2];

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
        const [searchFilm, fetchCast, fetchSimilarFilms] = await Promise.all([
          searchMovie(Number(slicePath), settingsData["adult-content"]),
          getCast(Number(slicePath)),
          getSimilarFilm(Number(slicePath), settingsData["adult-content"]),

        ])

        setData([searchFilm]);
        setCastData([fetchCast]);
        setSimilarData([fetchSimilarFilms.results]);

      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAsync();
  }, []);

  return (
    <div className="movie-page-container">
      {data.length > 0 ? 
      <div className="movie-page">
          <div className="movie-page-poster">
            <img src={`https://image.tmdb.org/t/p/w500/${data[0].poster_path}`} alt="movie poster"></img>
          </div>
          <div style={{color: "white"}} className="movie-page-overview">
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
                <button className="btn btn-light" id="more-info-btn">More Info</button>
              </Link>
          </div>
        </div>
        </div>
      : ''}
      {data.length > 0 ? 
          <Tabs castData={castData}/>
      : ""}
      {similarData.length > 0 ?
          <Similar similarData={similarData}/>
      : ""}
    </div>
  )
}