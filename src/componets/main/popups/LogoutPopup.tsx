'use client'
import { useAuthContext } from "@/hooks/useAuthContext"

export default function LogoutPopup({callback}: {callback: Function}) {
  const {dispatch} = useAuthContext()

  //Handles the dispatch and re-enables scrolling
  const handleDispatch = () => {
    dispatch({type: 'LOGOUT', payload: null});
  }
  
  return (
    <div className="default-popup">
      <h1>Logout?</h1>
      <p>Are you sure you want to logout?</p>
      <div className="default-popup-btn">
        <button 
          className="btn btn-light"
          onClick={() => handleDispatch()}
        >
          Confirm
        </button>
        <button 
          className="btn btn-danger" 
          onClick={() => callback()}
        >
          Exit
        </button>
      </div>
    </div>
  )
}