'use client'
import { createContext, useReducer, useEffect, Dispatch, ReactNode } from "react";

//Typescript types
interface AuthStateType {
  isGuest: boolean,
  user: any
}
interface AuthActionType {
  type: 'GUEST_LOGIN' | 'LOGIN' | 'LOGOUT'
  payload?: any
}

export const AuthContext = createContext<{
  state: AuthStateType;
  dispatch: Dispatch<AuthActionType>;
}>({
  state: { isGuest: false, user: null },
  dispatch: () => null, //Dispatch needs to return a function by default. if the context is consumed in a different file but no dispatch is provided it would throw an error without this.
});

const AuthReducer = (state: AuthStateType, action: AuthActionType): AuthStateType => {
  switch(action.type){
    case 'GUEST_LOGIN':
      return {isGuest: true, user: null}
    case 'LOGIN':
      return {isGuest: false, user: action.payload}
    case 'LOGOUT':
      return {isGuest: false, user: null}
    default:
      return state
  }
}

export const AuthContextProvider = ({children}: {children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    isGuest: false,
    user: null
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')

    if(user){
      dispatch({type: 'LOGIN', payload: user})
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}