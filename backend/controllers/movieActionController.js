const mongoose = require('mongoose');
const movieActionModel = require('../models/movieActionModel');

//===================
//Handle saved movies

const getAllSavedMovie = async (req, res) => {
  try {
    const user_id = req.user._id
    const savedMovies = await movieActionModel.find({user_id}).sort({createdAt: -1});
  
    res.status(200).json(savedMovies)
  } catch(error) {
    res.status(500).json({error: 'Failed to fetch saved movies'})
  }
}

const postSavedMovie = async (req, res) => {
  const {movie_id, movie_list} = req.body

  const {
    saved_movie,
    fav_movie
  } = movie_list

  if(!movie_id || !movie_list){
    return res.status(400).json({error: 'An error occured trying to perform an action'})
  }

  try {
    const user_id = req.user_id
    const movie = await movieActionModel.create({
      movie_id, 
      movie_list: {
        saved_movie,
        fav_movie
    },
      user_id
    })

    res.status(201).json(movie)
  } catch (error) {
    return res.status(400).json({error: 'An error occured'})
  }
}

const deleteSavedMovie = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({error: 'Movie could not be found'})
  }

  const movie = await movieActionModel.findOneAndDelete({_id: id});

  if(!movie){
    return res.status(400).json({error: 'Movie could not be deleted'})
  }

  res.status(200).json(movie)
}

//=================
//Handle fav movies

const getAllFavMovie = async (req, res) => {
  try {
    const user_id = req.user._id
    const favMovies = await movieActionModel.find({user_id}).sort({createdAt: -1});
  
    res.status(200).json(favMovies)
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch fav movies'})
  }
}

const postFavMovie = async (req, res) => {
  const {movie_id, movie_list} = req.body
  const {
    saved_movie,
    fav_movie
  } = movie_list

  if(!movie_id || !movie_list){
    return res.status(400).json({error: 'An error occured trying to perform an action'})
  }

  try {
    const user_id = req.user._id
    const movie = await movieActionModel.create({
      movie_id,
      movie_list: {
        saved_movie,
        fav_movie
      },
      user_id
    })

    res.status(200).json(movie)
  } catch (error) {
    res.status(400).json({error: 'An error occured'})
  }
}

const deleteFavMovie = async (req, res) => {
  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'could not find the movie'})
  }

  const movie = await movieActionModel.findOneAndDelete({_id: id});

  if(!movie){
    return res.status(404).json({error: 'Movie could not be deleted'})
  }

  res.status(200).json(movie)
}

module.exports = {getAllSavedMovie, postSavedMovie, deleteSavedMovie, getAllFavMovie, postFavMovie, deleteFavMovie}