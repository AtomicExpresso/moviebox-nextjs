'use client'
import { useState } from "react"

export default function LandingThirdSection(){
  const BuildListItem = ({title, info, index}: {title: string, info: string, index: number}) => {
    //Handles opening and closing a tab
    const [listState, setListState] = useState(false);

    return (
      <div key={index} className="faq-list-item">
        <button onClick={() => setListState(prevState => !prevState)}>
          <h1>{title}</h1>
          {listState ?
            (
              <div className="faq-content">
                <hr></hr>
                {info.split('|').map((para, index) => {
                  return (
                    <p key={index}>{para}</p>
                  )
                })}
              </div>
            )
          : null}
        </button>
      </div>
    )
  }
  
  return (
    <div className="landing-third-section">
      <div className="landing-third-section-title">
        <h1>Frequent Questions</h1>
      </div>
      <div className="landing-faq-list">
        <BuildListItem
          title="What is movieBox?"
          info="MovieBox is a full-stack practice project i built, you can find more info on the github page"
          index={0}
        />
        <BuildListItem
          title="Where can i use this?"
          info="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Phasellus vestibulum lorem sed risus | Massa massa ultricies mi quis hendrerit dolor magna eget. Cursus sit amet dictum sit amet justo donec enim diam. Eu non diam phasellus vestibulum lorem. Mi proin sed libero enim sed faucibus turpis"
          index={1}
        />
        <BuildListItem
          title="How to cancel subscription?"
          info="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Phasellus vestibulum lorem sed risus | Massa massa ultricies mi quis hendrerit dolor magna eget. Cursus sit amet dictum sit amet justo donec enim diam. Eu non diam phasellus vestibulum lorem. Mi proin sed libero enim sed faucibus turpis"
          index={2}
        />
      </div>
    </div>
  )
}