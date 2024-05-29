'use client'
import { useState, useEffect } from "react";
import { dataType } from "@/typeings/types";
import { searchByPage, searchByName } from "@/lib/api";
import Link from "next/link";

export default function DiscoverComp({HandlePageNumber, HandlePrevPageNumber, slicePath}: {HandlePageNumber: Function, HandlePrevPageNumber: Function, slicePath: string}){
  const [data, setData] = useState<dataType[]>([]);
  const [searchData, setSearchData] = useState<dataType[]>([]);
  const [search, setSearch] = useState({query: ''});

  function HandleChange(event: any){
    let value = event.target.value;
    let name = event.target.name;

    setSearch(prevState => {
      return {...prevState,
      [name]: value
    }
    })
  }

  useEffect(() => {
    const FetchDataAsync = async () => {
      try {
        const fetchMovieName = await searchByName(search.query);
        setSearchData(fetchMovieName.results);

      } catch (error) {
        console.error(error);
      }
    }

    FetchDataAsync();

  }, [search]);

  useEffect(() => {
    const FetchDataAsync = async () => {
      try {
        const fetchMovies = await searchByPage(Number(slicePath));
        setData(fetchMovies.results);
      } catch (error) {
        console.error(error);
      }
    }

    FetchDataAsync();

  }, [setData]);

  console.log(searchData)

  return (
    <div className="discover-page">
      <div className="discover-page-title">
        <h1>Discover</h1>
        <input type="text" name="query" onChange={HandleChange} className="form-control" placeholder="Search...."></input>
      </div>
      <div className="discover-page-title">
        <h3>{`Page ${slicePath}`}</h3>
      </div>
      <div className="discover-page-img-container">
        {search.query.length <= 0 ? data.map((item, index) => {
          return (
            <>
            {item.poster_path ? <div className="discover-page-img-item" key={index}>
              <Link href={`/movie/${item.id}`}>
                <img draggable='false' src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
              </Link>
            </div> : null}
            </>
          )
        }) : searchData.map((item, index) => {
          return (
            <>
              {item.poster_path ? <div className="discover-page-img-item" key={index}>
                <Link href={`/movie/${item.id}`}>
                  <img draggable='false' src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
                </Link>
              </div> : null}
            </>
          )})}
      </div>
      <div className="discover-page-bottom">
        {Number(slicePath) > 1 ? 
          <div>
            <button className="btn btn-light" onClick={() => HandlePrevPageNumber()}>Previous</button>
          </div>
        : null}
        {search.query.length <= 0 ? <button onClick={() => HandlePageNumber()} className="btn btn-danger">Next</button> : null}
      </div>
    </div>
  )
}