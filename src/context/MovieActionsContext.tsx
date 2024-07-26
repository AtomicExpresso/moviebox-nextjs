'use client'
import { useReducer, createContext, Dispatch, ReactNode } from "react"

//Typescript types
interface AuthActionType {
  type: "SET_SAVED_MOVIE" | "ADD_SAVED_MOVIE" | "REMOVE_SAVED_MOVIE",
  payload?: any
}

interface StateType {
  saved_movies: any
}

export const movieActionContext = createContext<{
  movieState: StateType;
  dispatchMovies: Dispatch<AuthActionType>
}>({
  movieState: {saved_movies: null},
  dispatchMovies: () => null
})

const movieActionReducer = (state: StateType, action: AuthActionType): StateType => {
  switch(action.type){
    case "SET_SAVED_MOVIE":
      return {saved_movies: action.payload}
    case "ADD_SAVED_MOVIE":
      return {saved_movies: [action.payload, state.saved_movies]}
    case "REMOVE_SAVED_MOVIE":
      return {
        saved_movies: state.saved_movies.filter((movie: any) => movie._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const MovieActionProvider = ({children}: {children: ReactNode }) => {
  const [movieState, dispatchMovies] = useReducer(movieActionReducer, {
    saved_movies: null
  })

  return (
    <movieActionContext.Provider value={{movieState, dispatchMovies}}>
      {children}
    </movieActionContext.Provider>
  )
}