'use client'

import LandingMain from "@/componets/landing/landingMain";
import LandingNav from "@/componets/landing/landingNav";
import LandingSecondSection from "@/componets/landing/landingSecondSection";
import LandingThirdSection from "@/componets/landing/landingThirdSection";
import { useAuthContext } from "@/hooks/useAuthContext";
import { redirect } from 'next/navigation';
import '../sass/landingpage.scss';
import { useEffect, useState } from "react";
import GuestLoginPopup from "@/componets/landing/popups/guestLoginPopup";

export default function Page(){
  const {state, dispatch} = useAuthContext();
  const [popupState, setPopupState] = useState({
    signupPopup: false,
    loginPopup: false,
    guestLoginPopup: false
  })

  const signup = () => {
    setPopupState(prevState => {
      const newState = {
        signupPopup: !prevState.signupPopup,
        loginPopup: false,
        guestLoginPopup: false
      }

      return newState
    })
  }

  const login = () => {
    setPopupState(prevState => {
      const newState = {
        signupPopup: false,
        loginPopup: !prevState.loginPopup,
        guestLoginPopup: false
      }

      return newState
    })
  }

  useEffect(() => {
    if(popupState.guestLoginPopup || popupState.loginPopup || popupState.signupPopup){
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
        signupPopup: false,
        loginPopup: false,
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
                guestLogin={guestLogin}
              />
            </div>
          : null}
          <div className="landing-page-main-sections">
            <LandingNav/>
            <LandingMain
              signup={signup}
              login={login}
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