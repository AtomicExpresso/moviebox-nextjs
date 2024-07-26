'use client'
import Link from "next/link";
import { useState } from "react";
import { useSignup } from "@/hooks/useSignup";

export default function SignupMain() {  
  const [formState, setFormState] = useState({
    email: "",
    username: "",
    password: ""
  })
  const {signup, error, isLoading} = useSignup()

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

    await signup(formState.email, formState.username, formState.password)
  }
  
  return (
    <div className="signup-main">
      <div className="signup-main-container">
        <h1>Sign up</h1>
        <div className="signup-form">
          <form onSubmit={HandleSubmit}>
            <label htmlFor="email">Email</label>
            <input 
              placeholder="example@google.com"
              name="email"
              value={formState.email}
              onChange={(e) => HandleChange(e)}
              className="form-control"
            ></input>
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
        <p>Already have an account? <Link href="/login">Log in</Link></p>
          {error ?
            <div className="default-error">
              <h1>{error}</h1>
            </div>
          :null}
      </div>
    </div>
  )
}