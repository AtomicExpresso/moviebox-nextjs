'use client'
import { useAuthContext } from "@/hooks/useAuthContext";
import MovieCategory from "@/componets/home/movieCatergory";
import '../sass/moviespage.scss';
import { redirect } from "next/navigation";

export default function Page() {
  const {state} = useAuthContext();

  return (
    <div>
      {state.isGuest || state.user ?
        <MovieCategory/>
      : 
        redirect('/landing')
      }
    </div>
  )
}