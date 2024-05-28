'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation';
import Image from "next/image";
import Home from '@/assets/images/home-solid.svg';
import Globe from '@/assets/images/globe-solid.svg';
import Film from '@/assets/images/film-solid.svg';
import Tv from '@/assets/images/tv-solid.svg';
import Search from '@/assets/images/search-solid.svg';
import Gear from '@/assets/images/gear-solid.svg';
import { useState } from "react";


export default function NavBar(){ 
  const [context, setContext] = useState(false);
  const [contextText, seContextText] = useState("Home");
  const pathname  = usePathname();

  const activeStyle = {
    color: 'white',
    fontWeight: '800',
    backgroundColor: '#3f4045'
  }
  const defaultStyle = {
    color: 'white',
    fontWeight: '400'
  }

  function changeContext(text: string, show: boolean){
    setContext(show)
    seContextText(text)
  }

  function LinkCreation({Title, Path, Img, Identify}: {Title: string, Path: string, Img: string, Identify:string}){

    return (
      <div id={Identify} className="nav-list-item" style={pathname === Path ? activeStyle : defaultStyle}>
        <Link href={Path} onMouseEnter={() => changeContext(Title, true)} onMouseLeave={() => changeContext("", false)}>
            <Image alt={Title} src={Img}></Image>
        </Link>
          {contextText === Title && context ? 
              <div className="navbar-context">
                <h1>{contextText}</h1>
              </div>
            : ''}
      </div>
    )
  }

  return (
    <div className="navbar">
      <ul>
        <LinkCreation Title="home" Path="/" Img={Home} Identify="nav-home"/>
        <LinkCreation Title="discover" Path="/discover/movies/1" Img={Globe} Identify="nav-globe"/>
        <LinkCreation Title="movies" Path="/movies" Img={Film} Identify="nav-film"/>
        <LinkCreation Title="shows" Path="/shows" Img={Tv} Identify="nav-tv"/>
        <LinkCreation Title="search" Path="/search" Img={Search} Identify="nav-search"/>
        <LinkCreation Title="settings" Path="/settings" Img={Gear} Identify="nav-settings"/>
      </ul>
    </div>
  )
}