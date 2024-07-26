'use client'
import { useState, useEffect } from "react";
import { settingFormType } from "@/typeings/types";

import Image from "next/image";
import gear from '@/assets/images/gear-solid.svg';
import palette from '@/assets/images/palette-solid.svg';
import lock from '@/assets/images/lock-solid.svg';
import wallet from '@/assets/images/wallet-solid.svg';
import info from '@/assets/images/info-question-solid.svg';
import QuestionMark from '@/assets/images/circle-question-solid.svg';
import defaultsettings from "@/data/defaultsettings";


//Type Script types
interface ConstructTabType {
  title: string, 
  compType: string, 
  compName: string, 
  toolTipContent: string
}

export default function SettingsComp(){
  const arr = [
    {name: "General", icon: gear}, 
    {name: "Appearance", icon: palette}, 
    {name: "Security", icon: lock}, 
    {name: "Billing", icon: wallet}, 
    {name: "About", icon: info}];

  const [curSetting, setcurSetting] = useState("General");
  const [formVar, setFormVar] = useState<settingFormType>(defaultsettings);

    //Stores current settings in LocalStorage
    useEffect(() => {
      if (typeof window !== 'undefined') {
        // Code here will only run on the client
        const savedSettings = localStorage.getItem('Settings');
        if (savedSettings) {
          setFormVar(JSON.parse(savedSettings));
        }
      }
    }, []);

  //Handles any change that is made to the settings
  function HandleChange(event: any){
    const {name, checked} = event.target;
  
    setFormVar(prevState => {
      const newState = { ...prevState, [name]: checked };
      localStorage.setItem('Settings', JSON.stringify(newState));
      return newState;
    })
  }

  const ActiveStyle = {
    backgroundColor: formVar["dark-mode"] ? '#042633' : '#dc3546',
    borderRight: formVar["dark-mode"] ? 'solid 2px white' : 'solid 2px black',
    color: 'white'
  }

  const DefaultStyle = {
    backgroundColor: 'transparent',
    color: formVar["dark-mode"] ? 'white' : 'black'
  }

  //Builds the items that are within the tab, including the tooltips
  function ConstructComponet({title, compType, compName, toolTipContent}: ConstructTabType){
    const [showTooltip, setshowTooltip] = useState(false);

    return (
      <div className="settings-componet">
        <div className="settings-componet-tooltip">
          <Image src={QuestionMark} alt="tooltip" draggable='false' 
            onMouseOver={() => setshowTooltip(true)}
            onMouseOut={() => setshowTooltip(false)}
          />
          {showTooltip ?
            <div className="tooltipz">
              <p>{toolTipContent}</p>
            </div>
          : null}
        </div>
        <h3>{title}</h3>
        <div className="settings-inner-componet">
          {compType === 'checkbox' ?
            <div className="form-check form-switch">
              <input name={compName} className="form-check-input" type="checkbox" onChange={(e) => HandleChange(e)} checked={(formVar as any)[compName]} role="switch"></input>
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
        {/* This is for building the content of each tab*/}
        <div className="settings-current">
          <h1>{curSetting}</h1>
          {curSetting === 'General' ?
            <div className="settings-componet-container">
              <ConstructComponet 
                title="Notifications" 
                compType="checkbox" 
                compName="notification" 
                toolTipContent="Determines if you recieve notifications (Concept)"/>
              <ConstructComponet 
                title="Adult content" 
                compType="checkbox" 
                compName="adult-content" 
                toolTipContent="This setting allows you to hide or show NSFW content"/>
            </div>
          : null}
          {curSetting === 'Appearance' ?
            <div className="settings-componet-container">
              <ConstructComponet 
                title="Dark mode" 
                compType="checkbox" 
                compName="dark-mode" 
                toolTipContent="Change theme from dark or light"/>
            </div>
          : null}
          {curSetting === 'Security' ?
            <div className="settings-componet-container">
              <ConstructComponet 
                title="2-FA" 
                compName="2-FA" 
                compType="checkbox" 
                toolTipContent="Two factor authentication for a more secure account (Concept)"/>
              <ConstructComponet 
                title="Secure reminders" 
                compName="password-res-reminder" 
                compType="checkbox" 
                toolTipContent="Sends you a password reset reminder every 60 days (Concept)"/>
            </div>
          : null}
          {curSetting === 'Billing' ?
            <div className="settings-componet-container">
              <ConstructComponet 
                title="Information" 
                compType="button" 
                compName={''} 
                toolTipContent="Shows billing information, such as address, zip, etc (Concept)"/>
              <ConstructComponet 
                title="Billing cycle" 
                compType="button" 
                compName={''} 
                toolTipContent="Shows your current billing cycle (Concept)"/>
              <ConstructComponet 
                title="Subscription" 
                compType="button" 
                compName={''} 
                toolTipContent="Subscription status (Concept)"/>
            </div>
          : null}
          {curSetting === 'About' ?
            <div className="settings-componet-container">
              <h3>MovieBox</h3>
              <p>Project developed and designed by <a href="https://pumped.dev">@Pumpedpixel</a></p>
              <p>Credits: <a href="https://www.themoviedb.org/">TMDB API</a> for movie data</p>
              <p>Please note that this is only a concept project, none of the movies here are streamable. Additonally, All data is gathered from third-party sources, i do not take credit or responsabilty for any of the movies, shows, or data related to the films featured on this concept website.</p>
            </div>
          : null}
        </div>
      </div>
    </div>
  );
};