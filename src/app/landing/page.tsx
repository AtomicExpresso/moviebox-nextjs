'use client'

import LandingMain from "@/componets/landing/landingMain";
import LandingNav from "@/componets/landing/landingNav";
import LandingSecondSection from "@/componets/landing/landingSecondSection";
import LandingThirdSection from "@/componets/landing/landingThirdSection";
import { useAuthContext } from "@/hooks/useAuthContext";
import { redirect } from 'next/navigation';
import '../sass/landingpage.scss';
import { useEffect, useState } from "react";
import GuestLoginPopup from "@/componets/main/popups/guestLoginPopup";

export default function Page(){
  const {state, dispatch} = useAuthContext();
  const [popupState, setPopupState] = useState({
    guestLoginPopup: false
  })

  useEffect(() => {
    if(popupState.guestLoginPopup){
      console.log('ye')
      document.getElementById('root')?.classList.add('disable')
      window.scrollTo(0, 0);
    } else {
      document.getElementById('root')?.classList.remove('disable')
    }
  }, [popupState])

  const guestLogin = () => {
    setPopupState(prevState => {
      const newState = {
        guestLoginPopup: !prevState.guestLoginPopup
      }
      return newState
    })
  }


  
  return (
    <div className="landing-page">
      {state.isGuest || state.user ?
        redirect('/home')
      : 
        <div>
          {popupState.guestLoginPopup ?
            <div className="default-popup-container">
              <GuestLoginPopup
                callback={guestLogin}
              />
            </div>
          : null}
          <div className="landing-page-main-sections">
            <LandingNav/>
            <LandingMain
              guestLogin={guestLogin}
            />
          </div>
          <div>
            <LandingSecondSection/>
          </div>
          <div>
            <LandingThirdSection/>
          </div>
        </div>
      }
  </div>
  )
}