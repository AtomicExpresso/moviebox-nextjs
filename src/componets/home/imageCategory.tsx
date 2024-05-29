import MovieCatBG from '@/assets/images/movie-cat-bg.webp';
import ShowCatBG from '@/assets/images/movie-cat-show-bg.webp';
import ShowCatTrending from '@/assets/images/movie-cat-trending-bg.webp';
import Link from 'next/link';
import Image from 'next/image';

export default function ImageCategory(){
  const arr = [{
    name: 'Trending',
    img: ShowCatTrending,
    routerPath: '/discover/movies/1'
  },
  {
    name: 'Movies',
    img: MovieCatBG,
    routerPath: '/movies'
  },
  {
    name: 'Shows',
    img: ShowCatBG,
    routerPath: '/shows'
  },
]
  
  return (
    <div>
      <div className='image-catergoy-container'>
        {arr ? arr.map((item, index) => {
            return (
            <div className="image-catergoy-item" key={index}>
              <Link href={`${item.routerPath}`}>
                <Image draggable='false' src={item.img} alt={item.name}></Image>
                <h1>{item.name}</h1>
              </Link>
            </div>
            )
          })
          : null}
      </div>
    </div>
  )
}