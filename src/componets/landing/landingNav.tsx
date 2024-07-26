import Link from "next/link"

export default function LandingNav() {
  return (
    <div className="landing-nav">
      <div className="movie-box-title-txt">
        <h1>Movie<span>Box</span></h1>
      </div>
      <div className="landing-nav-btn">
        <Link href="/login">
          <button className="btn btn-danger">Log in</button>
        </Link>
      </div>
    </div>
  )
}