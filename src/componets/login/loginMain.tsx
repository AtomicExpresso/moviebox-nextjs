'use client'
import Link from "next/link"
import { useState } from "react"
import { useLogin } from "@/hooks/useLogin"

export default function LoginMain() {  
  const [formState, setFormState] = useState({
    username: "",
    password: ""
  })
  const {login, error, isLoading} = useLogin();

  const HandleChange = (e: any) => {
    const {name, value} = e.target
    
    setFormState(prevState => {
      const newState = {
        ...prevState,
        [name]: value
      }

      return newState
    })
  }

  const HandleSubmit = async (e: any) => {
    e.preventDefault();

    await login(formState.username, formState.password);
  }
  
  return (
    <div className="signup-main">
      <div className="signup-main-container">
        <h1>Login</h1>
        <div className="signup-form">
          <form onSubmit={HandleSubmit}>
            <label htmlFor="username">Username</label>
            <input 
              placeholder="Your username"
              name="username"
              value={formState.username}
              onChange={(e) => HandleChange(e)}
              className="form-control"
            ></input>
            <label htmlFor="password">Password</label>
            <input 
              placeholder="password"
              name="password"
              value={formState.password}
              onChange={(e) => HandleChange(e)}
              className="form-control"
            ></input>
            <button disabled={isLoading} type="submit" className="btn btn-danger">Submit</button>
          </form>
        </div>
        <p>Dont have an account? <Link href="/signup">Sign up</Link></p>
        {error ?
            <div className="default-error">
              <h1>{error}</h1>
            </div>
          :null}
      </div>
    </div>
  )
}