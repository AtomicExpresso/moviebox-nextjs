'use client'
import {useAuthContext} from './useAuthContext';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { PassThrough } from 'stream';

//custom hook for checking if the user is logged in as a guest OR an account, if not they will be redirected to the landing page
export function useCheckAccountStatus(){
  const {state} = useAuthContext();
  const path = usePathname();
  const router = useRouter();

  //This is used to prevent client's from accessing pages without logging in
  //(In a real application, this would be done server side)
  useEffect(() => {
    if(path !== '/login' && path !== '/signup'){
      if(!state.user && !state.isGuest){
        return router.push('/landing')
      } 
    }
  }, [path])

  //Check if the client is currently logged in as an account or guest, if they are and try to access the login page, then we redirect them back to home
  useEffect(() => {
    if(path === '/login' || path === '/signup'){
      if(state.user || state.isGuest){
        return router.push('/home')
      }
    }
  }, [path])
}