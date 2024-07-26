const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');
const {getAllSavedMovie, postSavedMovie, deleteSavedMovie, getAllFavMovie, postFavMovie, deleteFavMovie} = require('../controllers/movieActionController')

//Use middleware
router.use(requireAuth);

//=====================
//Handle saveing movies

//GET all saved movies
router.get('/savedMovie', getAllSavedMovie);

//POST saved movie
router.post('/savedMovie', postSavedMovie);

//DELETE saved movie
router.delete('/savedMovie/:id', deleteSavedMovie);

//======================
//Handle fav movies

//GET ALL fav movies
router.get('/favMovies', getAllFavMovie);

//POST fav movie
router.post('/favMovies', postFavMovie);

//DELETE fav movie
router.delete('/favMovies', deleteFavMovie);

module.exports = router