import Frame4 from '../../assets/images/landing/Frame4.png'
import Image from 'next/image'

export default function LandingSecondSection(){
  return (
    <div className="landing-second-section">
      <div className="landing-second-section-text">
        <h1>Watch Anywhere</h1>
        <p>Stream unlimites movies and TV showson your 
        Phone, Laptop, Teblet, and TV.</p>
      </div>
      <div>
        <Image draggable="false" src={Frame4} alt="Watch anywhere"></Image>
      </div>
    </div>
  )
}