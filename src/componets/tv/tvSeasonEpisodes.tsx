export default function TvSeasonsEpisodes({season, shown}: {season: any[], shown: any}){
  const root: HTMLElement | null = document.getElementById('root');

  shown ? root?.classList.add('popup') : root?.classList.remove('popup');
  
  return(
    <div className="show-seasons-episodes-outer-container">
      {shown ?
        <div className="show-seasons-episodes-container">
          <div className="show-seasons-episodes-title-container">
            {season[0].seasons.map((item: any, index: number) => {
              return (
                <div key={index}>
                  <button>
                    <h2>{item.name}</h2>
                  </button>
                </div>
              )
            })}
          </div>
          <div className="show-seasons-episode-container">
            <h1>Episodes</h1>
          </div>
        </div>
      : null}
    </div>
  )
}