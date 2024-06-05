'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import gear from '@/assets/images/gear-solid.svg';
import palette from '@/assets/images/palette-solid.svg';
import lock from '@/assets/images/lock-solid.svg';
import wallet from '@/assets/images/wallet-solid.svg';
import info from '@/assets/images/info-question-solid.svg';
import QuestionMark from '@/assets/images/circle-question-solid.svg';

interface settingFormType {
  "adult-content": boolean,
  "2-FA": boolean,
  "dark-mode": boolean,
  "notification": boolean,
  "password-res-reminder": boolean,
}

export default function SettingsComp(){
  const arr = [{name: "General", icon: gear}, {name: "Appearance", icon: palette}, {name: "Security", icon: lock}, {name: "Billing", icon: wallet}, {name: "About", icon: info}];

  const [curSetting, setcurSetting] = useState("General");
  const [showTooltip, setShowTooltip] = useState(false);

  //Stores current settings in LocalStorage
  const storeSettings = localStorage.getItem('Settings');

  const [formVar, setFormVar] = useState<settingFormType>(
  storeSettings
  ? JSON.parse(storeSettings) as settingFormType 
  : {
    "adult-content": false,
    "2-FA": false,
    "dark-mode": true,
    "notification": true,
    "password-res-reminder": true,
  });
  
  localStorage.setItem('Settings', JSON.stringify(formVar))

  //Handles any change that is made to the settings
  function HandleChange(event: any){
    const {name, checked} = event.target;
  
    setFormVar(prevState => ({
      ...prevState,
      [name]: checked
    }))

    localStorage.removeItem("Settings");
    localStorage.setItem('Settings', JSON.stringify(formVar))
  }

  const ActiveStyle = {
    backgroundColor: '#042633',
    borderRight: 'solid 2px white'
  }

  const DefaultStyle = {
    backgroundColor: 'transparent'
  }

  function ConstructComponet({title, compType, compName}: {title: string, compType: string, compName: string}){
    return (
      <div className="settings-componet">
        <div className="settings-componet-tooltip" onMouseOver={() => setShowTooltip(true)} onMouseOut={() => setShowTooltip(false)}>
          <Image src={QuestionMark} alt="tooltip" draggable='false'/>
          {showTooltip ?
            <div className="tooltip">
              <h1>This is a tooltip!</h1>
            </div>
          : null}
        </div>
        <h3>{title}</h3>
        <div className="settings-inner-componet">
          {compType === 'checkbox' ?
            <div className="form-check form-switch">
              <input name={compName} className="form-check-input" type="checkbox" onChange={(e) => HandleChange(e)} checked={formVar[compName]} role="switch"></input>
            </div>
          : null}
          {compType === 'button' ?
            <button className="btn btn-light">Open</button>
          : null}
        </div>
      </div>
    )
  }
  
  return (
    <div className="settings-page">
      <div className="settings-title">
        <h1>Settings</h1>
      </div>
      <div className="settings-category-container">
        <div className="settings-row">
          {arr.map((item, index) => {
            return (
              <div key={index}>
                <button onClick={() => setcurSetting(item.name)}>
                  <div style={curSetting === item.name ? ActiveStyle : DefaultStyle} className="settings-page-item">
                  <Image src={item.icon} alt={item.name}></Image>
                  <h2>{item.name}</h2>
                </div>
                </button>
              </div>
            )
          })}
        </div>
        <div className="settings-current">
          <h1>{curSetting}</h1>
          {curSetting === 'General' ?
            <div className="settings-componet-container">
              <ConstructComponet title="Notifications" compType="checkbox" compName="notification"/>
              <ConstructComponet title="Adult content" compType="checkbox" compName="adult-content"/>
            </div>
          : null}
          {curSetting === 'Appearance' ?
            <div className="settings-componet-container">
              <ConstructComponet title="Dark mode" compType="checkbox" compName="dark-mode"/>
            </div>
          : null}
          {curSetting === 'Security' ?
            <div className="settings-componet-container">
              <ConstructComponet title="2-FA" compName="2-FA" compType="checkbox"/>
              <ConstructComponet title="Password reset reminders" compName="password-res-reminder" compType="checkbox"/>
            </div>
          : null}
          {curSetting === 'Billing' ?
            <div className="settings-componet-container">
              <ConstructComponet title="Information" compType="button" compName={''}/>
              <ConstructComponet title="Billing cycle" compType="button" compName={''}/>
              <ConstructComponet title="Subscription" compType="button" compName={''}/>
            </div>
          : null}
          {curSetting === 'About' ?
            <div className="settings-componet-container">
              <h3>MovieBox</h3>
              <p>Project developed and designed by <a href="https://pumped.dev">@Pumpedpixel</a> using <a href="https://www.themoviedb.org/">TMDB API</a> for movie data</p>
              <p>Please note that this is only a concept project, none of the movies here are streamable. Additonally, All data is gathered from third-party sources, i do not take credit for any of the movies, shows, or data related to the films featured on this concept website.</p>
            </div>
          : null}
        </div>
      </div>
    </div>
  );
};