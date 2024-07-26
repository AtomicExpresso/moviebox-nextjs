import MovieCategory from "@/componets/films/movieCatergory";
import '../sass/moviespage.scss';
import CheckAccountStatusComponet from "@/componets/main/checkAccountStatusComponet";

export default function Page() {
  return (
    <div>
      <MovieCategory/>
      <CheckAccountStatusComponet/>
    </div>
  )
}