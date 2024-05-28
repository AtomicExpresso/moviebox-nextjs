'use client'
import {dataType} from '@/typeings/types';
import { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import ArrowRight from '@/assets/images/right-solid.svg';
import ArrowLeft from '@/assets/images/left-solid.svg';

interface Props {
  similarData: dataType[];
}

const Similar: React.FC<Props> = ({similarData}) => {
  
  const [btnArrow, setBtnArrow] = useState(false);

  const scrollElement = useRef(null);

  const scrollArrow = (direct: string) => {
    direct === "right" ? scrollElement.current.scrollLeft += 300 : scrollElement.current.scrollLeft += -300
  }


  return (
    <div className="movie-page-similar">
    <h1>Similar</h1>
    <div style={{position: 'relative'}} onMouseOver={() => setBtnArrow(true)} onMouseOut={() => setBtnArrow(false)}>
     <div className="move-page-similar-img-container" ref={scrollElement}>
       {similarData[0].map((item: any) => {
         return (
           <div key={item.id} className="movie-page-similar-imgs">
             <Link href={`/movie/${item.id}`}>
               <img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}></img>
             </Link>
           </div>
           )
         })}
     </div>
     {btnArrow && 
           <>
           <div className="item-movie-btn-arrow" onClick={() => scrollArrow("right")}>
             <Image draggable='false' src={ArrowRight} alt='scroll right'></Image>
           </div>
           <div className="item-movie-btn-arrow-right" onClick={() => scrollArrow("left")}>
             <Image draggable='false' src={ArrowLeft} alt='scroll left'></Image>
           </div>
           </>
     }
     </div>
 </div>
  )
}

export default Similar