'use client'
import { useState, useRef, useEffect } from "react";
import { fetchDataSeasonEpisodeTV } from "@/lib/api";
import { usePathname } from 'next/navigation';
import { dataType } from "@/typeings/types";

export default function TvSeasonsEpisodes({season, shown, selectSeason, handleShownFn}: {season: any[], shown: any, selectSeason: number, handleShownFn: Function}){

  const [curSeason, setCurSeason] = useState(`Season ${selectSeason}`);
  const [seasonEpisodeData, setSeasonEpisodeData] = useState<dataType[]>([]);

  //current url path, fetches the id from the address bar
  const pathname = usePathname();
  const slicePath = pathname.split("/")[2];

  async function FetchSeasonEpisodes(seasonId: number){
    try {
      const FetchEpisodeData = await fetchDataSeasonEpisodeTV(Number(slicePath), seasonId)
      setSeasonEpisodeData([FetchEpisodeData])
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    FetchSeasonEpisodes(selectSeason)
  }, [shown])

  const ActiveStyle = {
    color: '#dc3546',
    fontWeight: '800',
    fontSize: '22px'
  }

  const DefaultStyle = {
    color: 'white',
    fontWeight: '400',
    fontSize: '20px'
  }

  const wrapperRef: React.RefObject<HTMLDivElement> | null = useRef(null);

  //Handles when parent is clicked but not the wrapper ref
  function HandleClick(e: any){
    if(wrapperRef?.current && !wrapperRef?.current.contains(e.target as Node)){
      handleShownFn()
    } else {
      return
    }
  }

  return(
    <div className="show-seasons-episodes-outer-container" onClick={e => HandleClick(e)}>
      {shown ?
        <div className="show-seasons-episodes-container" ref={wrapperRef}>
          <div className="show-seasons-episodes-title-container">
            {season[0].seasons.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <button onClick={() => {setCurSeason(`Season ${item.season_number}`); FetchSeasonEpisodes(item.season_number);}}>
                    <h2 style={curSeason === item.name ? ActiveStyle : DefaultStyle}>{item.name}</h2>
                  </button>
                </div>
              )
            })}
          </div>
          <div className="show-seasons-episode-container">
            <h1>Episodes</h1>
            <div className="season-episodes-list">
              {seasonEpisodeData.length > 0 ? seasonEpisodeData[0].episodes.map((item: any, index: number) => {
                  return ( 
                    <div key={index}>
                    {item.still_path ? <div className="season-episode-item-container">
                      <div>
                        <img src={`https://image.tmdb.org/t/p/w500/${item.still_path}`} alt="tv episode"></img>
                      </div>
                      <div>
                        <h1>S{item.season_number} E{item.episode_number} <span>-</span> {item.name}</h1>
                        <p>{item.overview}</p>
                      </div>
                    </div> : null}
                  </div>
                  )
              })
              : null}
            </div>
          </div>
        </div>
      : null}
    </div>
  )
}