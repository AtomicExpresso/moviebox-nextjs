import Link from 'next/link';
import {dataType} from '@/typeings/types';

interface Props {
  data: dataType[];
}

const FeaturedImage: React.FC<Props> = ({data}) => {
  //Genrates a random number from 0 to the length of the data state array. This is used
  //to display a random featured image
  const RandomFeaturedBG = Math.floor(Math.random() * data.length)
  return (
    <div className='discover-page'>
      {data.length > 0 && (
        <div className='featured-movie-banner'>
          <img src={`https://image.tmdb.org/t/p/w500/${data[RandomFeaturedBG].backdrop_path}`} alt="Featured Movie Poster" />
          <div className='featured-movie-info'>
            <h1>{data[RandomFeaturedBG].title}</h1>
            <p>{data[RandomFeaturedBG].overview}</p>
            <div className='featured-movie-btn'>
              <Link href={`/movie/${data[RandomFeaturedBG].id}`}><button className='btn btn-danger'>Watch</button></Link>
              <button className='btn btn-light'>Info</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeaturedImage