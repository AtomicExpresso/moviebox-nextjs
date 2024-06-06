import Link from "next/link";

export default function Footer(){
  const SupportArr = ['Support', 'Terms', 'Privacy'];
  const CorpArr = ['Contact', 'Investors', 'Jobs'];
  const OtherArr = ['Movies', 'Shows', 'Orginals'];
  const AccountArr = ['Account', 'Billing', 'Forums'];
  
  const LinkGen = ({ArrType}: {ArrType: string[]}) => {
    return (
      <div className="footer-links-container">
        {ArrType.map((item, index) => {
          return (
            <div key={index}>
              <Link href="https://google.com">{item}</Link>
            </div>
          )
        })}
      </div>
    )
  }
  
  return (
    <footer>
      <div className="footer">
        <div>
          <h1>Movie<span>Box</span></h1>
          <p>Better films, today</p>
        </div>
        <div className="footer-list-container">
          <LinkGen ArrType={OtherArr}/>
          <LinkGen ArrType={AccountArr}/>
          <LinkGen ArrType={SupportArr}/>
          <LinkGen ArrType={CorpArr}/>
        </div>
      </div>
    </footer>
  )
}