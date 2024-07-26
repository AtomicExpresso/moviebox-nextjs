'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useState } from "react";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useSettingsContext } from "@/hooks/useSettingsContext";
import { useGlobalPopups } from "@/hooks/useGlobalPopups";
import useOutsideClick from "@/hooks/useOutsideClick";

import Image from "next/image";
import Home from '@/assets/images/home-solid.svg';
import Globe from '@/assets/images/globe-solid.svg';
import Film from '@/assets/images/film-solid.svg';
import Tv from '@/assets/images/tv-solid.svg';
import Search from '@/assets/images/search-solid.svg';
const defaultPfp = "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1721064077~exp=1721067677~hmac=d126273d9a771d6a52fb77d176ca0792e9da806707c99dbf626bdd52a98dfb3b&w=740"

export default function NavBar(){ 
  const {state} = useAuthContext(); //For checking the users login status
  const settingsData = useSettingsContext(); //For checking the current settings
  const pathname  = usePathname(); //For checking the current url path
  const profileRef = useOutsideClick(() => setProfileClickPopup(false)); //Custom hook that detects if a click as made outside of the element, it takes a callback function as an argument 
  const {popupState, dispatchPopup} = useGlobalPopups();

  const [profileClickPopup, setProfileClickPopup] = useState(false);

  const activeStyle = {
    color: 'white',
    fontWeight: '800',
    backgroundColor: settingsData["dark-mode"] ? '#3f4045' : '#a32531'
  }
  const defaultStyle = {
    color: 'white',
    fontWeight: '400'
  }

  //Element constructor for creating navbar link elements
  function LinkCreation({Title, Path, Img, Identify}: {Title: string, Path: string, Img: string, Identify:string}){
    return (
      <div id={Identify} className="nav-list-item" style={pathname === Path ? activeStyle : defaultStyle}>
        <Link href={Path}>
          <button disabled={popupState.disableBackground}>
            <Image alt={Title} src={Img}></Image>
          </button>
        </Link>
      </div>
    )
  }
  
  return (
    <div className="navbar">
      {state.user || state.isGuest ?
        <ul>
          <LinkCreation Title="home" Path="/" Img={Home} Identify="nav-home"/>
          <LinkCreation Title="movies" Path="/movies" Img={Film} Identify="nav-film"/>
          <LinkCreation Title="shows" Path="/shows" Img={Tv} Identify="nav-tv"/>
          <LinkCreation Title="discover" Path="/discover/movies/1" Img={Globe} Identify="nav-globe"/>
          <LinkCreation Title="search" Path="/search" Img={Search} Identify="nav-search"/>
          <div className="navbar-pfp" ref={profileRef}>
            <button 
              disabled={popupState.disableBackground} 
              onClick={() => setProfileClickPopup(true)}>
              <img src={defaultPfp} alt="pfp"></img>
            </button>
            {profileClickPopup ?
              <div className="default-mini-popup navbar-mini-popup">
                <Link href="/my-profile">
                  <button 
                    disabled={popupState.disableBackground}>
                    My profile
                  </button>
                </Link>
                <Link href="/settings">
                  <button 
                    disabled={popupState.disableBackground}>
                    Settings
                  </button>
                </Link>
                <button 
                  disabled={popupState.disableBackground} 
                  onClick={() => dispatchPopup({type: 'LOGOUT_POPUP_SHOW'})}>
                  Logout
                </button>
              </div>
            : null}
          </div>
        </ul> 
      : null}
    </div>
  )
}