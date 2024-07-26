'use client'
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation"


//Custom login hook that logs the user in and saves their user to local storage
export function useLogin() {
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<any>(null);
  const {dispatch} = useAuthContext();
  const router = useRouter();

  const login = async (username: string, password: string) => {
    setError(null);
    setIsLoading(true);
    
    const response = await fetch('http://localhost:4000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    });

    const data = await response.json()

    if(!response.ok){
      setIsLoading(false)
      setError(data.error)
    }
    if(response.ok){
      localStorage.setItem('user', JSON.stringify(data));

      dispatch({type: 'LOGIN', payload: data})

      setIsLoading(false)
      router.push('/home'); //Redirect user after they successfully logged in
    }
  }

  return {error, isLoading, login}
}