'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { settingFormType } from "@/typeings/types";
import defaultsettings from "@/data/defaultsettings";
import Image from "next/image";
import Home from '@/assets/images/home-solid.svg';
import Globe from '@/assets/images/globe-solid.svg';
import Film from '@/assets/images/film-solid.svg';
import Tv from '@/assets/images/tv-solid.svg';
import Search from '@/assets/images/search-solid.svg';
import Gear from '@/assets/images/gear-solid.svg';
import { useEffect, useState } from "react";

export default function NavBar(){ 
  const pathname  = usePathname();
  let getSettings;
  useEffect(() => {
    getSettings = localStorage.getItem('Settings');
  }, [])

  const [settingsData, setSettingsData] = useState<settingFormType>(getSettings ? JSON.parse(getSettings) : defaultsettings);

  useEffect(() => {
    const root = document?.getElementById('root');

    if(root){
      if (settingsData['dark-mode']) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      } 
    }

  }, [settingsData])

  const activeStyle = {
    color: 'white',
    fontWeight: '800',
    backgroundColor: settingsData["dark-mode"] ? '#3f4045' : '#a32531'
  }
  const defaultStyle = {
    color: 'white',
    fontWeight: '400'
  }

  function LinkCreation({Title, Path, Img, Identify}: {Title: string, Path: string, Img: string, Identify:string}){

    return (
      <div id={Identify} className="nav-list-item" style={pathname === Path ? activeStyle : defaultStyle}>
        <Link href={Path}>
            <Image alt={Title} src={Img}></Image>
        </Link>
      </div>
    )
  }

  return (
    <div className="navbar">
      <ul>
        <LinkCreation Title="home" Path="/" Img={Home} Identify="nav-home"/>
        <LinkCreation Title="movies" Path="/movies" Img={Film} Identify="nav-film"/>
        <LinkCreation Title="shows" Path="/shows" Img={Tv} Identify="nav-tv"/>
        <LinkCreation Title="discover" Path="/discover/movies/1" Img={Globe} Identify="nav-globe"/>
        <LinkCreation Title="search" Path="/search" Img={Search} Identify="nav-search"/>
        <LinkCreation Title="settings" Path="/settings" Img={Gear} Identify="nav-settings"/>
      </ul>
    </div>
  )
}