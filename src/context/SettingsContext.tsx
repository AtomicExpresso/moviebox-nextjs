'use client'
import {createContext, useEffect, useState, ReactNode} from 'react';
import { settingFormType } from "@/typeings/types";
import defaultsettings from "@/data/defaultsettings";


export const settingsContext = createContext(defaultsettings);

//Context for handleing settings
export function SettingsContextProvider({children}: {children: ReactNode}){
  const [settingsData, setSettingsData] = useState<settingFormType>(defaultsettings);

  //Fetch settings from local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSettings = localStorage.getItem('Settings');
      if (savedSettings) {
        setSettingsData(JSON.parse(savedSettings));
      }
    }
  }, []);

  //Apply dark or light mode to the root element
  useEffect(() => {
    const root = document?.getElementById('root');

    if(root){
      if (settingsData['dark-mode']) {
        root.classList.add('dark');
        root.classList.remove('light');
      } else {
        root.classList.add('light');
        root.classList.remove('dark');
      } 
    }

  }, [settingsData])

  return (
    <settingsContext.Provider value={{...settingsData}}>
      {children}
    </settingsContext.Provider>
  )
}