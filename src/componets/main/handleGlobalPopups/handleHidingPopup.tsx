'use client'
import { useGlobalPopups } from "@/hooks/useGlobalPopups";
import LogoutPopup from "../popups/LogoutPopup";
import AddListPopup from "../popups/addListPopup";

//Function for displaying global popups, such as logout and add to list
export function HandleLogoutPopup(){
  const {popupState, dispatchPopup} = useGlobalPopups();

  //Sends a dispatch to the globalpopups context useReducer to hide a popup
  const HidePopup = (HidePopup: any) => {
    dispatchPopup({type: HidePopup})
  }

  return(
    <div>
      {popupState.logout_popup ?
        <div className="default-popup-container">
          <LogoutPopup
            callback={() => HidePopup("LOGOUT_POPUP_HIDE")}
          />
        </div>
        : null}
      {popupState.addlist_popup ?
        <div className="default-popup-container">
          <AddListPopup
            callback={() => HidePopup("ADDLIST_POPUP_HIDE")}
          />
        </div>
      : null}
    </div>
  )
}