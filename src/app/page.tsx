'use client'

import fetchData from '@/lib/api';
import { useEffect, useState } from 'react';
import {dataType} from '@/typeings/types';
import rating from '@/assets/images/Rating.svg';
import Image from 'next/image';

export default function Home() {
  const [data, setData] = useState<dataType>({
  title: '',
  adult: false,
  belongs_to_collection: null,
  budget: 0,
  poster_path: '',
  vote_average: 0,
  genres: []})
  
  useEffect(() => {
    const fetchAsyncData = async () => {
      const fetchedData = await fetchData(14);
        setData(fetchedData);
    }

    fetchAsyncData();
  }, [])
  return (
    <div className='item-movie-holder'>
      <div className='item-movie'>
        <img src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}></img>
        <div className='movie-item-info'>
          <h1>{data.title}</h1>
          <div className='movie-item-cat'>
            <Image draggable='false' src={rating} alt='rating'></Image>
            <h2>{data.vote_average}</h2>
            <div className='divider'></div>
            <h3>{data.genres.map(item => item.name)}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}