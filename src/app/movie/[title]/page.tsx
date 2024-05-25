'use client'
import { useEffect, useState } from "react";
import {searchMovie} from '@/lib/api';
import {dataType} from '@/typeings/types';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import Star from "@/assets/images/star-solid.svg";
import Image from "next/image";

export default function Page(){
  const [data, setData] = useState<dataType[]>([]);
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
        const searchFilm = await searchMovie(Number(slicePath));
        setData([searchFilm]);

      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAsync();
  }, []);
  console.log(data)
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
              <li><h1>Overview</h1></li>
              <li><h1>Cast</h1></li>
              <li><h1>Similar</h1></li>
            </ul>
          </div>
      : ""}
    </div>
  )
}