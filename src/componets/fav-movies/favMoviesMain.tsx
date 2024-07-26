import Image from "next/image";
import star from "@/assets/images/star-solid.svg"

export default function FavMoviesMain() {
  return (
    <div className="saved-movies-page">
      <div className="saved-movies-title">
        <Image src={star} alt="saved movies"></Image>
        <h1>Favorite Movies</h1>
      </div>
      <div className="saved-movies-mid-section">
        <p>You currently do not have any favorite movies</p>
      </div>
    </div>
  )
}