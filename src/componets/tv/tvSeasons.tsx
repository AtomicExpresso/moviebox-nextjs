'use client'
import Image from "next/image";
import { useState, useRef } from "react";
import TvSeasonsEpisodes from "./tvSeasonEpisodes";
import ArrowRight from '@/assets/images/right-solid.svg';
import ArrowLeft from '@/assets/images/left-solid.svg';

export default function TvSeasons({season}: {season: any}){
  const [showEpisodePopup, setShowEpisodePopup] = useState(false)
  const [btnArrow, setBtnArrow] = useState(false);

  const scrollElement = useRef<HTMLDivElement>(null);

  const scrollArrow = (direct: string) => {
    direct === "right" ? scrollElement.current!.scrollLeft += 300 : scrollElement.current!.scrollLeft += -300
  }

  return (
    <div className="movie-page-similar">
      <h1>Seasons</h1>
      {season[0].seasons.length > 0 && showEpisodePopup ?
        <div>
          <TvSeasonsEpisodes season={season} shown={showEpisodePopup}/>
        </div>
      : null}
      <div style={{position: 'relative'}} onMouseOver={() => setBtnArrow(true)} onMouseOut={() => setBtnArrow(false)}>
        <div className="move-page-similar-img-container" ref={scrollElement}>
            {season[0].seasons.map((item: any, index: any) => {
              return (
                <div key={index} className="movie-page-similar-imgs">
                  <button onClick={() => setShowEpisodePopup(prevState => !prevState)}>
                    <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} alt={item.name}></img>
                  </button>
                </div>
              )
            })
            }
          </div>
          {season[0].seasons.length > 0 && btnArrow ? 
            <>
            <div className="item-movie-btn-arrow" onClick={() => scrollArrow("right")}>
              <Image draggable='false' src={ArrowRight} alt='scroll right'></Image>
            </div>
            <div className="item-movie-btn-arrow-right" onClick={() => scrollArrow("left")}>
              <Image draggable='false' src={ArrowLeft} alt='scroll left'></Image>
            </div>
            </>
      : null}
      </div>
    </div>
  )
}