'use client'
import { useAuthContext } from "@/hooks/useAuthContext"

export default function GuestLoginPopup({callback}: {callback: Function}) {
  const {dispatch} = useAuthContext()

  //Handles the dispatch and re-enables scrolling
  const handleDispatch = () => {
    dispatch({type: 'GUEST_LOGIN', payload: null});
    document.getElementById('root')?.classList.remove('disable');
  }
  
  return (
    <div className="default-popup">
      <h1>Login in as Guest?</h1>
      <p>Logging in as a guest will allow you to access content. However, you wont be able to save or rate movies.</p>
      <div className="default-popup-btn">
        <button 
          className="btn btn-light"
          onClick={() => handleDispatch()}
        >
          Let&apos;s go
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