import SettingsComp from "@/componets/settings/settingsComp";
import '../sass/settingsPage.scss';
import CheckAccountStatusComponet from "@/componets/main/checkAccountStatusComponet";

export default function page(){
  return (
    <div>
      <SettingsComp/>
      <CheckAccountStatusComponet/>
    </div>
  )
}