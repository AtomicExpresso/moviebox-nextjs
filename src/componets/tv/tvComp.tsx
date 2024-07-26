'use client'
import { useEffect, useState } from "react";
import {fetchDataTVSeries, fetchDataCreditsTV, fetchDataSimilarTVSeries, fetchDataSeasonsTV} from '@/lib/api';
import {dataType, castType, settingFormType} from '@/typeings/types';
import { usePathname } from 'next/navigation';
import { useSettingsContext } from "@/hooks/useSettingsContext";

import Tabs from "./tabs";
import Similar from "./similiar";
import TvSeasons from "./tvSeasons";

import Link from "next/link";
import Star from "@/assets/images/star-solid.svg";
import Image from "next/image";
import bars from "@/assets/images/icons/bars-solid.svg"


export default function TvComp(){
  //Data states, Holds the JSON data fetched from the api
  const [data, setData] = useState<dataType[]>([]);
  const [castData, setCastData] = useState<castType[]>([]);
  const [similarData, setSimilarData] = useState<dataType[]>([]);
  const [seasons, setSeasons] = useState<dataType[]>([]);
  const settingsData = useSettingsContext()

  const pathname = usePathname();
  const slicePath = pathname.split("/")[2];

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const [searchShow, fetchSeasons, fetchCast, fetchSimilarShows] = await Promise.all([
          fetchDataTVSeries(Number(slicePath)),
          fetchDataSeasonsTV(Number(slicePath)),
          fetchDataCreditsTV(Number(slicePath)),
          fetchDataSimilarTVSeries(Number(slicePath), settingsData["adult-content"])
        ])

        setData([searchShow]);
        setSeasons([fetchSeasons]);
        setCastData([fetchCast]);
        setSimilarData([fetchSimilarShows.results]);

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
            <img src={`https://image.tmdb.org/t/p/w500/${data[0].poster_path}`} alt="tv show"></img>
          </div>
          <div style={{color: "white"}}>
          <h1>{data[0].name}</h1>
          <div className="movie-page-info">
            <h2>{data[0].first_air_date.split("-")[0]}</h2>
            <h2>•</h2>
            <h2>{data[0].number_of_seasons} seasons</h2>
            <h2>•</h2>
            <Image draggable='false' src={Star} alt="rating"></Image>
            <h2>{data[0].vote_average.toFixed(2)}</h2>
          </div>
          <p>{data[0].overview}</p>
          <div className="movie-page-btn">
            <button className="btn btn-danger">Play</button>
              <Link href={data[0].homepage}>
                <button className="btn btn-light" id="more-info-btn">More Info</button>
              </Link>
              <div className="movie-more-options-btn">
              <button className="btn btn-light">
                <Image src={bars} alt="add movie to list"></Image>
              </button>
            </div>
          </div>
        </div>
        </div>
      : ''}
      {data.length > 0 ? 
          <Tabs castData={castData} data={data}/>
      : ""}
      {seasons.length > 0 ? 
          <TvSeasons season={seasons}/>
      : ""}
      {similarData.length > 0 ?
          <Similar similarData={similarData}/>
      : ""}
    </div>
  )
}