import MyProfileMain from "@/componets/my-profile/myProfileMain";
import "../sass/myprofilepage.scss";
import CheckAccountStatusComponet from "@/componets/main/checkAccountStatusComponet";

export default function page() {
  return (
    <div>
      <MyProfileMain/>
      <CheckAccountStatusComponet/>
    </div>
  )
}