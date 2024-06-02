'use client'
import { useState } from "react";
import Image from "next/image";
import gear from '@/assets/images/gear-solid.svg';
import palette from '@/assets/images/palette-solid.svg';
import lock from '@/assets/images/lock-solid.svg';
import wallet from '@/assets/images/wallet-solid.svg';
import info from '@/assets/images/info-question-solid.svg';

export default function SettingsComp(){
  const arr = [{name: "General", icon: gear}, {name: "Appearance", icon: palette}, {name: "Security", icon: lock}, {name: "Billing", icon: wallet}, {name: "About", icon: info}];
  const [curSetting, setcurSetting] = useState("General");

  const ActiveStyle = {
    backgroundColor: '#042633',
    borderRight: 'solid 2px white'
  }

  const DefaultStyle = {
    backgroundColor: 'transparent'
  }

  function ConstructComponet({title, compType}: {title: string, compType: string}){
    return (
      <div className="settings-componet">
        <h3>{title}</h3>
        <div className="settings-inner-componet">
          {compType === 'checkbox' ?
            <input type="checkbox"></input>
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
          {arr.map(item => {
            return (
              <button onClick={() => setcurSetting(item.name)}>
                <div style={curSetting === item.name ? ActiveStyle : DefaultStyle} className="settings-page-item">
                <Image src={item.icon} alt={item.name}></Image>
                <h2>{item.name}</h2>
              </div>
              </button>
            )
          })}
        </div>
        <div className="settings-current">
          <h1>{curSetting}</h1>
          {curSetting === 'General' ?
            <div className="settings-componet-container">
              <ConstructComponet title="Notifications" compType="checkbox"/>
              <ConstructComponet title="Adult content" compType="checkbox"/>
            </div>
          : null}
          {curSetting === 'Appearance' ?
            <div className="settings-componet-container">
              <ConstructComponet title="Dark mode" compType="checkbox"/>
            </div>
          : null}
          {curSetting === 'Security' ?
            <div className="settings-componet-container">
              <ConstructComponet title="2-FA" compType="checkbox"/>
              <ConstructComponet title="Password reset reminders" compType="checkbox"/>
            </div>
          : null}
          {curSetting === 'Billing' ?
            <div className="settings-componet-container">
              <ConstructComponet title="Information" compType="button"/>
              <ConstructComponet title="Billing cycle" compType="button"/>
              <ConstructComponet title="Subscription" compType="button"/>
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