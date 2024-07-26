import SignupMain from "@/componets/signup/signupMain";
import '../sass/signuppage.scss';
import CheckAccountStatusComponet from "@/componets/main/checkAccountStatusComponet";

export default function page(){
  return (
    <div>
      <SignupMain/>
      <CheckAccountStatusComponet/>
    </div>
  )
}