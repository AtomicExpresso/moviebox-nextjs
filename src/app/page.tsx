'use client'

import './sass/moviespage.scss';
import {useAuthContext} from "../hooks/useAuthContext";
import { redirect } from 'next/navigation'

//Checks if the user is logged in or signed in as a guest, if not we redirect them to the landing page
export default function Page() {  
  const {state} = useAuthContext();

  return (
    <div>
      {state.isGuest || state.user ?
        redirect('/home')
      :
        redirect('/landing')
      }
    </div>
  )
}