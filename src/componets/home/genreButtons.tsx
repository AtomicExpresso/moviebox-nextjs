import JsonData from '../../../public/genres.json'

interface ParseJson {
  "movies": {
    "genres": {
      "name": string;
      "id": number;
    }[];
  };
  "shows": {
    "genres": {
      "name": string;
      "id": number;
    }[];
  };
}

export default function GenereButtons(){
  const ParseJson: ParseJson = JsonData

  return (
    <div className='genre-btn-container'>
      {ParseJson.movies.genres.map((item: any) => {
          return(
            <div className='genre-btn'>
              <h1>{item.name}</h1>
            </div>
          )
        })
      }
    </div>
  )
}