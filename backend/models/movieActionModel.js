const mongoose = require('mongoose');

const Schema = mongoose.Schema

const movieActionSchema = new Schema({
  movie_id: {
    type: String,
    required: true
  },
  movie_list: {
    saved: {
      type: Boolean,
      required: true,
      default: false
    },
    fav: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  user_id: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('movieActionModel', movieActionSchema)