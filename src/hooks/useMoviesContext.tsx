import { movieActionContext } from "@/context/MovieActionsContext";
import React, {useContext} from 'react'

//Hook used to use the movie action context (For performing actions like saving and favoriting a movie)
export default function useMovieActionContext(){
  const context = useContext(movieActionContext)

  if(!context){
    throw Error('useMovieActionContext must be wrapped around the main layout file')
  }

  return context
}