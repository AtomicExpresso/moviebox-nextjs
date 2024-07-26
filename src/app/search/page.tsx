import SearchComp from "@/componets/search/searchComp";
import '../sass/discoverpage.scss';
import '../sass/searchpage.scss';
import CheckAccountStatusComponet from "@/componets/main/checkAccountStatusComponet";

export default function page(){
  return(
    <div>
      <SearchComp/>
      <CheckAccountStatusComponet/>
    </div>
  )
}