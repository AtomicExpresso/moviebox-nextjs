'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

import DiscoverComp from "@/componets/discover/discoverComp";
import '../../../sass/discoverpage.scss';

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  let slicepath = pathname.split("/")[3]

  function HandlePageNumber(){
    router.push(`/discover/movies/${Number(slicepath) + 1}`)
  }

  function HandlePrevPageNumber(){
    router.push(`/discover/movies/${Number(slicepath) - 1}`)
  }

  return (
    <div>
      <DiscoverComp HandlePageNumber={HandlePageNumber} slicePath={slicepath} HandlePrevPageNumber={HandlePrevPageNumber}/>
    </div>
  )
};