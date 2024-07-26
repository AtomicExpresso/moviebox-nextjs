<h1 align="center">🍿 MovieBox</h1>

<p align="center">A feature-rich Full-Stack movie and show info platform. This project was developed using Next.js, Node.js, MongoDB, Mongoose, Express.js, TypeScript, SASS, and Bootstrap. The platform integrates with the TMDB (The Movie Database) API for movie data</p>

<p align="center"><a href="https://moviebox-nextjs-qdnyfio8x-atomics-projects-e6f17228.vercel.app/"><img src="https://img.shields.io/badge/Live preview-1DA1F2?style=for-the-badge&logoColor=white"></img></a>

##

## ⚙️ Features

### - Account system with Authentication
Users can create an account, login or signup as a guest

#### - Movies & Shows page
Page's displaying a list of movies and shows seperated by different genere's, such as Action, Animation, Documentery, Etc.

#### - Discover page
Use's pagination and allows you to explore many diffrent movie titles and shows, also has a search bar to find a specific film

#### - Settings menu
The settings menu allows you to change the websites theme(Dark/light mode) and filter out specific content. Changes are saved in localstorage and load when ever you visit the website again

#### - Data & film info
Each movie and show displays various metrics showing, the rating, cast, description, run time, etc. Addittionaly, it will also display similar films and shows to the one your currently viewing.

#### - show info
For shows, you can view a list of seasons and episodes with information about each episode

#### - Mobile support and responsive design
Project also has mobile support

## Tech-Stack 📝
- Typescript
- Next.js
- React.js
- Bootstrap
- Sass
- Node.js
- Express.js
- MongoDB with mongoose

## Quickstart 👍
If you want to host this project locally, you will need to register your own API key on the <a href="https://www.themoviedb.org/?language=en-US">TMDB api website</a> (It's free at the moment)

1 ) Clone this repo locally:

```
git clone https://github.com/AtomicExpresso/moviebox-nextjs.git
```

2 ) Setting up the project:
```
cd moviebox-nextjs
Npm install
```
3) Create a .env file in the src folder

   Put your api key in NEXT_PUBLIC_TMBDB_API and put your mongoDB atlas uri in MONGO_URI

```
NEXT_PUBLIC_TMDB_API_KEY = your key

MONGO_URI= Your mongo uri
PORT= 4000
SECRET= Can be anything you want
```

4 ) Setting up dev server:

```
Npm run dev
Npm run server
```

Server should now be running at localhost


##
<p align="center">Be sure to 🌟the repo if you found this project useful or helpful</p>
