import TvComp from "@/componets/tv/tvComp";
import '@/app/sass/moviepage.scss';
import CheckAccountStatusComponet from "@/componets/main/checkAccountStatusComponet";

export default function Page() {
  return (
    <div>
      <TvComp/>
      <CheckAccountStatusComponet/>
    </div>
  )
}