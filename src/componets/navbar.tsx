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


export default function NavBar(){ 
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

  return (
    <div className="navbar">
      <ul>
        <li style={pathname === '/' ? activeStyle : defaultStyle}><Link href="/"><Image alt="home" src={Home}></Image></Link></li>
        <li style={pathname === '/discover' ? activeStyle : defaultStyle}><Link href="/discover"><Image alt="discover" src={Globe}></Image></Link></li>
        <li style={pathname === '/movies' ? activeStyle : defaultStyle}><Link href="/movies"><Image alt="Movies" src={Film}></Image></Link></li>
        <li style={pathname === '/shows' ? activeStyle : defaultStyle}><Link href="/shows"><Image alt="Tv shows" src={Tv}></Image></Link></li>
        <li style={pathname === '/shows' ? activeStyle : defaultStyle}><Link href="/shows"><Image alt="Search" src={Search}></Image></Link></li>
        <li style={pathname === '/shows' ? activeStyle : defaultStyle}><Link href="/shows"><Image alt="Gear" src={Gear}></Image></Link></li>
      </ul>
    </div>
  )
}