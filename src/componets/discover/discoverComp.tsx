'use client'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'
import { dataType } from "@/typeings/types";
import { fetchData } from "@/lib/api";
import Link from "next/link";
import GenereButtons from "../home/genreButtons";


export default function DiscoverComp({HandlePageNumber}: {HandlePageNumber: Function}){
  const [data, setData] = useState<dataType[]>([]);

  useEffect(() => {
    const FetchDataAsync = async () => {
      try {
        const fetchMovies = await fetchData(11);
        setData(fetchMovies.results);

      } catch (error) {
        console.error(error);
      }
    }

    FetchDataAsync();

  }, [setData]);

  return (
    <div className="discover-page">
      <div className="discover-page-title">
        <h1>Discover</h1>
        <input className="form-control" placeholder="Search...."></input>
      </div>
      <div className="genra-btn-container">
        <GenereButtons/>
      </div>
      <div className="discover-page-img-container">
        {data.map((item, index) => {
          return (
            <div className="discover-page-img-item" key={index}>
              <Link href={`/movie/${item.id}`}>
                <img draggable='false' src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
              </Link>
            </div>
          )
        })
        }
      </div>
      <div className="discover-page-bottom">
        <button onClick={() => HandlePageNumber()} className="btn btn-danger">Next Page</button>
      </div>
    </div>
  )
}