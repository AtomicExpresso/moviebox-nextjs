'use client'
import { useState } from "react";

export default function SearchComp(){
  const [search, setSearch] = useState({query: ''})

  function HandleChange(event: any){
    let value = event.target.value;
    let name = event.target.name;

    setSearch(prevState => {
      return {...prevState,
        [name]: value
    }})
  }

  return (
    <div>
      <h1>MovieBox</h1>
      <input type="text" onChange={HandleChange} name="query"></input>
    </div>
  )
}