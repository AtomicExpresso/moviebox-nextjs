'use client'
import { createContext, ReactNode, useReducer, Dispatch } from "react";

//Typescript types
interface ActionType {
  type: 'LOGOUT_POPUP_SHOW' | "LOGOUT_POPUP_HIDE" | "ADDLIST_POPUP_SHOW" | "ADDLIST_POPUP_HIDE"
}

interface StateType{
  logout_popup: boolean,
  addlist_popup: boolean,
  disableBackground: boolean
}

export const popupContext = createContext<{
  popupState: StateType;
  dispatchPopup: Dispatch<ActionType>;
}>({
  popupState: {logout_popup: false, addlist_popup: false, disableBackground: false},
  dispatchPopup: () => null
});

//Reducer's dispatch function, used for changing the display status from the dispatch type (Ex. LOGOUT_POPUP_HIDE => Hide logout popup)
const popupReducer = (state: StateType, action: ActionType) => {
  //Disables screen scrolling and brings client to top of the page
  const disableScroll = () => {
    document.getElementById('root')?.classList.add('disable');
    window.scrollTo(0, 0)
  }
  //Re-enables screen scrolling
  const enableScroll = () => {
    document.getElementById('root')?.classList.remove('disable');
  }

  //Shows the desired popup
  const showPopup = (changePopup: string) => {
    disableScroll();
    
    const popup = changePopup

    return {
      ...state,
      [popup]: true,
      disableBackground: true
    }
  }

  //Hides the desired popup
  const hidePopup = (changePopup: string) => {
    enableScroll();

    const popup = changePopup

    return {
      ...state,
      [popup]: false,
      disableBackground: false
    }
  }

  switch(action.type){
    case "LOGOUT_POPUP_SHOW": return showPopup("logout_popup")
    case "LOGOUT_POPUP_HIDE": return hidePopup("logout_popup")
    case "ADDLIST_POPUP_SHOW": return showPopup("addlist_popup")
    case "ADDLIST_POPUP_HIDE": return hidePopup("addlist_popup")
    default:
      return state
    }
  }

//Used for manageing global popups (Like displaying the logout popup)
export function PopupContextProvider({children}: {children: ReactNode}){
  const [popupState, dispatchPopup] = useReducer(popupReducer, {
    logout_popup: false,
    addlist_popup: false,
    disableBackground: false
  })

  return (
    <popupContext.Provider value={{popupState, dispatchPopup}}>
      {children}
    </popupContext.Provider>
  )
}