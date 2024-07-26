import Link from "next/link"

export default function LandingMain({guestLogin}: {guestLogin: Function}){
  
  return (
    <div className="landing-main">
        <h1>Unlimited Movies, Shows and more</h1>
        <p>Watch anywhere. cancel anytime</p>
        <div className="landing-btn">
          <Link href="/signup">
            <button className="btn btn-danger">Sign up</button>
          </Link>
          <button 
            className="btn btn-light" 
            onClick={() => guestLogin()}>
            Join as Guest
          </button>
      </div>
    </div>
  )
}