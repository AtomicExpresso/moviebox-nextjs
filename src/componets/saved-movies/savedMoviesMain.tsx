import Image from "next/image";
import film from "@/assets/images/film-solid.svg"

export default function SavedMoviesMain() {
  return (
    <div className="saved-movies-page">
      <div className="saved-movies-title">
        <Image src={film} alt="saved movies"></Image>
        <h1>Saved Movies</h1>
      </div>
      <div className="saved-movies-mid-section">
        <p>You currently do not have any saved movies</p>
      </div>
    </div>
  )
}