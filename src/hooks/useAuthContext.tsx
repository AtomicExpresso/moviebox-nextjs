'use client'
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuthContext() {
  const context = useContext(AuthContext)

  if(!context){
    console.log('Authcontextprovider needs to be wrapped in the main layout.tsx file')
  }

  return context
}