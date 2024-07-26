'use client'
import { settingsContext } from "@/context/SettingsContext"
import { useContext } from "react"

//custom hook for using settings context, allows for componets to check the current settings
export function useSettingsContext(){
  const context = useContext(settingsContext);

  if(!context){
    console.log("Settingscontextprovider needs to be wrapped around the navbar in the main layout.tsx file")
  }

  return context
}