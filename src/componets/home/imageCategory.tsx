import MovieCatBG from '@/assets/images/movie-cat-bg.webp';
import ShowCatBG from '@/assets/images/movie-cat-show-bg.webp';
import ShowCatTrending from '@/assets/images/movie-cat-trending-bg.webp';

import Image from 'next/image';

export default function ImageCategory(){
  const arr = [{
    name: 'Trending',
    img: ShowCatTrending
  },
  {
    name: 'Movies',
    img: MovieCatBG
  },
  {
    name: 'Shows',
    img: ShowCatBG
  },
]
  
  return (
    <div>
      <div className='image-catergoy-container'>
        {arr ? arr.map((item, index) => {
            return (
            <div className="image-catergoy-item" key={index}>
              <Image draggable='false' src={item.img} alt={item.name}></Image>
              <h1>{item.name}</h1>
            </div>
            )
          })
          : null}
      </div>
    </div>
  )
}