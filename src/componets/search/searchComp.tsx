'use client'
import { useEffect, useState } from "react";
import { dataType, settingFormType } from "@/typeings/types";
import { searchByName } from "@/lib/api";
import searchIcon from "@/assets/images/search-solid.svg";
import Image from "next/image";
import Link from "next/link";
import defaultsettings from "@/data/defaultsettings";

export default function SearchComp(){
  const getSettings = window?.localStorage?.getItem("user") ? localStorage.getItem('Settings') : null

  const [search, setSearch] = useState({query: ''});
  const [searchData, setSearchData] = useState<dataType[]>([]);
  const [settingsData, setSettingsData] = useState<settingFormType>(getSettings ? JSON.parse(getSettings) : defaultsettings)

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
        const fetchMovieName = await searchByName(search.query, settingsData["adult-content"]);
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
        <div className="search-box-container">
          <input type="text" className="form-control" onChange={HandleChange} name="query"></input>
          {search.query.length === 0 ?
            <Image src={searchIcon} alt="search"></Image>
          : null}
        </div>
        {searchData.length <= 0 ? (
          <div className="search-filter-container">
            <div className="filter-btn-row">
              <div className="filter-item">
                <label htmlFor="film-type">Film type:</label>
                <select name="film-type" className="form-select">
                  <option>Any</option>
                  <option>Movie</option>
                  <option>Show</option>
                </select>
              </div>
              <div className="filter-item">
                <label htmlFor="film-type">Genre:</label>
                <select name="film-type" className="form-select">
                  <option>Any</option>
                  <option>Movie</option>
                  <option>Show</option>
                </select>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="discover-page-img-container">
        {search.query.length > 0 ? searchData.map((item, index) => {
          return (
            <div key={index}>
              {item.poster_path ? (
                <div className="discover-page-img-item">
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