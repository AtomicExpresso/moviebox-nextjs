'use client'

import fetchData from '@/lib/api';
import { useEffect, useState } from 'react';
import {dataType} from '@/typeings/types';
import rating from '@/assets/images/Rating.svg';
import Image from 'next/image';

export default function Home() {
  const [data, setData] = useState<dataType[]>([])
  
  useEffect(() => {
    const fetchAsyncData = async () => {
      const fetchedData = await fetchData(14);
        setData(fetchedData.results);
    }

    fetchAsyncData();
  }, [])

  const CreateItems = () => {
    return data.map((item, i) => {
    return (
      <div className='item-movie' key={item.id}>
        <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
        <div className='movie-item-info'>
        <h1>{item.title}</h1>
        <div className='movie-item-cat'>
          <Image draggable='false' src={rating} alt='rating'></Image>
          <h2>{item.vote_average}</h2>
          <div className='divider'></div>
          {/* <h3>{item.genres.map(item => item.name)}</h3> */}
        </div>
    </div>
    </div>
    )
  })}

  return (
    <div className='discover-page'>
      <h1>Popular</h1>
      <hr></hr>
      <div className='item-movie-holder'>
        <CreateItems/>
      </div>
    </div>
  );
}