import MovieComp from "@/componets/movie/movieComp";
import '@/app/sass/moviepage.scss';
import CheckAccountStatusComponet from "@/componets/main/checkAccountStatusComponet";

export default function Page(){
  return (
    <div>
      <MovieComp/>
      <CheckAccountStatusComponet/>
    </div>
  )
}