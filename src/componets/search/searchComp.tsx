'use client'
import { useEffect, useState } from "react";
import { dataType } from "@/typeings/types";
import { searchByName } from "@/lib/api";
import Link from "next/link";

export default function SearchComp(){
  const [search, setSearch] = useState({query: ''});
  const [searchData, setSearchData] = useState<dataType[]>([]);

  function HandleChange(event: any){
    let value = event.target.value;
    let name = event.target.name;

    setSearch(prevState => {
      return {...prevState,
        [name]: value
    }})
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
  }, [search])

  return (
    <div className="search-page">
      <div className="search-page-title" style={searchData.length > 0 ? {marginLeft: 'auto'} : {margin: '19vh 10vw'}}>
        <h1>Movie<span>Box</span></h1>
        <input type="text" className="form-control" placeholder="search...." onChange={HandleChange} name="query"></input>
        {searchData.length <= 0 ? (
          <div>
            <h1>Placeholder</h1>
          </div>
        ) : null}
      </div>
      <div className="discover-page-img-container">
        {search.query.length > 0 ? searchData.map((item, index) => {
          return (
            <div>
              {item.poster_path ? (
                <div className="discover-page-img-item" key={index}>
                  <Link href={`/movie/${item.id}`}>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} draggable='false'></img>
                  </Link>
                </div>
              ) : null}
            </div>
          )
        }) : null}
      </div>
    </div>
  )
}