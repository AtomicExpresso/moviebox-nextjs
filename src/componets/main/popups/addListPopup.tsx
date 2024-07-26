'use client'
import { useAuthContext } from "@/hooks/useAuthContext";
import { useState } from "react";

//Popup for adding films to lists (Like favriote movies and saved movies)
export default function AddListPopup({callback}: {callback: Function}){  
  const {state} = useAuthContext();
  const [formState, setFormState] = useState<any>({
    fav_movies: false,
    saved_movies: false
  });

  //Fetch movie id from url
  const path = window.location.href.split('/')[4]

  const handleChange = (e: any) => {
    const {value, name} = e.target

    setFormState((prevState: any) => {
      const newState = {
        ...prevState, 
        [name]: !prevState[name]
      }

      return newState
    })
  }

  //Handles submiting the form
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const movie = {
      movie_id: path, 
      movie_list: {
        saved_movies: formState.saved_movies, 
        fav_movies: formState.fav_movies
    }}

    const response = await fetch('http://localhost:4000/api/movieActions/savedMovie', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers:{
        'Content-Type': 'application/json'
      }
    })
  }
  
  return (
    <div className="default-popup">
      <h1>Add to list</h1>
      {state.user ?
        <div>
          <form onSubmit={handleSubmit}>
            <div className="addlistpopup-list-item-container">
              <div className="addlistpopup-list-item">
                <div className="list-row">
                  <h1>Fav Movies</h1>
                </div>
                <input 
                  type="checkbox"
                  name="fav_movies"
                  value={formState.fav_movies}
                  defaultChecked={formState.fav_movies}
                  onChange={(e) => handleChange(e)}
                  ></input>
              </div>
              <div className="addlistpopup-list-item">
                <div className="list-row">
                  <h1>Saved Movies</h1>
                </div>
                <input 
                  type="checkbox"
                  value={formState.saved_movies}
                  name="saved_movies"
                  defaultChecked={formState.saved_movies}
                  onChange={(e) => handleChange(e)}
                ></input>
              </div>
            </div>
            <div className="default-popup-btn">
              <button 
                className="btn btn-light"
                onClick={(e) => handleSubmit(e)}
                type="submit"
              >
                Done
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => callback()}
                type="button"
              >
                Exit
              </button>
            </div>
          </form>
        </div>
      : 
        <div>
          <p>You must be logged into an account to access lists</p>
        </div>
      }
    </div>
  )
}