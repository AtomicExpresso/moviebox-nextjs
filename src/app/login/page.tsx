import LoginMain from "@/componets/login/loginMain";
import '../sass/signuppage.scss' //Login and signup both use the same css
import CheckAccountStatusComponet from "@/componets/main/checkAccountStatusComponet";

export default function page() {
  return (
    <div>
      <LoginMain/>
      <CheckAccountStatusComponet/>
    </div>
  )
}