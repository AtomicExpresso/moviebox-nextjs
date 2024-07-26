'use client'
import { useCheckAccountStatus } from "@/hooks/useCheckAccountStatus";

//Checks the account status, if a user isn't logged in as a guest or account then they will be redirected to the landing page
//Tried doing this also with the useAuthContext hook but it would cause an infinite loop
export default function CheckAccountStatusComponet(){
  useCheckAccountStatus()
  return <></>
}