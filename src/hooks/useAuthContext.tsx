'use client'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//Custom hook for using authcontext, this is used for authentication and handles functions like logout, login, etc. If a user isnt logged in, then they wont be able to save movies
export function useAuthContext() {
  const context = useContext(AuthContext)

  if(!context){
    console.log('Authcontextprovider needs to be wrapped in the main layout.tsx file')
  }

  return context
}