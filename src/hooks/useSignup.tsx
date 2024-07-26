'use client'
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation"

//Custom hook for signing up a user, after they signup it adds their account info to the database and logs them in
export function useSignup() {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(null);
  const {dispatch} = useAuthContext();
  const router = useRouter();

  const signup = async (email: string, username: string, password: string) => {
    const response = await fetch('http://localhost:4000/api/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, username, password})
    })

    const data = await response.json();

    console.log(JSON.stringify({email, username, password}))

    if(!response.ok){
      setIsLoading(false)
      setError(data)
    }
    if(response.ok){
      //Save user to local storage. To prevent having to log in
      localStorage.setItem('user', JSON.stringify(data));

      dispatch({type: 'LOGIN', payload: data});

      setIsLoading(false)
      router.push('/home')
    }
  }

  return {error, isLoading, signup}
} 