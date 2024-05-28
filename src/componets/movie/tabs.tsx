'use client'
import { useState } from "react"
import {castType} from '@/typeings/types';

interface Props {
  castData: castType[];
}

const Tabs: React.FC<Props> = ({castData}) => {
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
              <div style={curTab === 'Similar' ? ActiveStyle : DefaultStyle}>
                <button onClick={() => setCurTab('Similar')}>
                  <h1>Similar</h1>
                </button>
              </div>
            </ul>
            {castData.length > 0 && curTab === 'Overview' ? 
            <div className="movie-page-info-overview-container">
              <h1>Description</h1>
              <p>{castData[0].overview}</p>
              <div className="movie-page-info-card-container">
                <div className="movie-page-info-card">
                  <h1>Director</h1>
                  <h2>{castData[0].credits.crew[0].name}</h2>
                </div>
                <div className="movie-page-info-card">
                  <h1>Country</h1>
                  <h2>{castData[0].origin_country[0]}</h2>
                </div>
                <div className="movie-page-info-card">
                  <h1>Genres</h1>
                  <div className="movie-page-info-card-nested-container">
                  {castData[0].genres.map(item => {
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
          </div>
  )
}

export default Tabs