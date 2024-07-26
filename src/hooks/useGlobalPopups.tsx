'use client'
import { popupContext } from "@/context/PopupContext";
import { useContext } from "react";

//Function for using global popups, this is used for displaying popups like the logout popup
export function useGlobalPopups(){
  const context = useContext(popupContext)

  if(!context){
    console.log('globalcontext.Provider must be wrapped around componets in layout.tsx')
  }

  return context
}