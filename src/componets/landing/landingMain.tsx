export default function LandingMain({signup, login, guestLogin}: {signup: Function, login: Function, guestLogin: Function}){
  
  return (
    <div className="landing-main">
      <h1>Unlimited Movies, Shows and more</h1>
      <p>Watch anywhere. cancel anytime</p>
      <div className="landing-btn">
        <button className="btn btn-danger">Sign up</button>
        <button 
          className="btn btn-light" 
          onClick={() => guestLogin()}>
          Join as Guest
        </button>
      </div>
    </div>
  )
}