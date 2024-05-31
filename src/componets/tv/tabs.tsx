'use client'
import { useState, useRef } from "react";
import {castType, dataType} from '@/typeings/types';
import Image from 'next/image';

import ArrowRight from '@/assets/images/right-solid.svg';
import ArrowLeft from '@/assets/images/left-solid.svg';

interface Props {
  castData: castType[];
  data: dataType[];
}

const Tabs: React.FC<Props> = ({castData, data}) => {
  const [curTab, setCurTab] = useState('Overview');

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

    const [btnArrow, setBtnArrow] = useState(false);

    const scrollElement = useRef<HTMLDivElement>(null);
  
    const scrollArrow = (direct: string) => {
      direct === "right" ? scrollElement.current!.scrollLeft += 300 : scrollElement.current!.scrollLeft += -300
    }
  
    console.log(castData)
  return (
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
              <div style={curTab === 'Ratings' ? ActiveStyle : DefaultStyle}>
                <button onClick={() => setCurTab('Ratings')}>
                  <h1>Ratings</h1>
                </button>
              </div>
            </ul>
            {castData.length > 0 && curTab === 'Overview' ? 
            <div className="movie-page-info-overview-container">
              <h1>Description</h1>
              <p>{data[0].overview}</p>
              <div className="movie-page-info-card-container">
                <div className="movie-page-info-card">
                  <h1>Created by</h1>
                  <h2>{data[0].created_by[0] ? data[0].created_by[0].name : 'N/A'}</h2>
                </div>
                <div className="movie-page-info-card">
                  <h1>Country</h1>
                  <h2>{data[0].origin_country[0]}</h2>
                </div>
                <div className="movie-page-info-card">
                  <h1>Genres</h1>
                  <div className="movie-page-info-card-nested-container">
                  {data[0].genres.map(item => {
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
            {castData.length > 0 && curTab === 'Cast' ?
              <div className="movie-page-info-overview-container">
                <h1>Cast</h1>
                <div style={{position: 'relative'}} onMouseOver={() => setBtnArrow(true)} onMouseOut={() => setBtnArrow(false)}>
                <div className="cast-container" ref={scrollElement}>
                  {castData[0].cast.map((item: any, index: number) => {
                        return (
                          <div>
                          {item.profile_path ?
                            <div className="cast-item-container" key={index}>
                            <img draggable='false' src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}></img>
                            <h1>{item.name}</h1>
                            <h2>{item.character}</h2>
                          </div>
                          : null}
                        </div>
                        )
                      })
                    }
                  </div>
                  {castData[0].cast.length > 5 ? btnArrow && 
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
            : ''}
          </div>
  )
}

export default Tabs