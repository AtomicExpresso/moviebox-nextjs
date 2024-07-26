'use client'
import { useAuthContext } from "@/hooks/useAuthContext";
import Link from "next/link";
import star from '@/assets/images/rating.svg';
import Ticket from '@/assets/images/ticket-solid.svg'
import Image from "next/image";

const defaultPfp = "https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?t=st=1721064077~exp=1721067677~hmac=d126273d9a771d6a52fb77d176ca0792e9da806707c99dbf626bdd52a98dfb3b&w=740"


export default function MyProfileMain() {
  const {state} = useAuthContext();

  return (
    <div className="myprofile-main-section">
      <div className="myprofile-banner">
        <div className="myprofile-welcome-image">
          <img src={defaultPfp}></img>
        </div>
      </div>
      <div className="myprofile-welcome-section">
          <div className="myprofile-welcome">
            {state.user ?
              <h1>Welcome, {state.user.user.username}</h1>
            : state.isGuest ?
              <h1>Welcome, Guest</h1>
            : <h1>Loading...</h1>}
          </div>
      </div>
      <div className="myprofile-list-section">
        <h1>My List's</h1>
        <hr></hr>
        <div className="myprofile-list-section-items">
          {state.user ?
            <>
              <div className="myprofile-list-section-item">
                <Link href="my-profile/fav-movies">
                  <button>
                    <Image src={star} alt="fav movies"></Image>
                    <h2>Favriote Movies</h2>
                  </button>
                </Link>
              </div>
              <div className="myprofile-list-section-item">
                <Link href="my-profile/saved-movies">
                  <button>
                    <Image src={Ticket} alt="Saved movies"></Image>
                    <h2>Saved Movies</h2>
                  </button>
                </Link>
              </div>
            </>
          : <p>You must be logged into an account to view your lists</p>}
        </div>
      </div>
    </div>
  )
}