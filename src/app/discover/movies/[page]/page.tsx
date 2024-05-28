'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation'


import DiscoverComp from "@/componets/discover/discoverComp";
import '../../../sass/discoverpage.scss';

export default function Page() {
  const [pageNum, setPageNum] = useState(1);
  const router = useRouter();
  
  function HandlePageNumber(){
    setPageNum(pageNum + 1)
    console.log(pageNum)
    router.push(`/discover/movies/${pageNum}`)
  }

  return (
    <div>
      <DiscoverComp HandlePageNumber={HandlePageNumber}/>
    </div>
  )
};