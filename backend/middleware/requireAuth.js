const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

//Middleware to require authorization for perfroming movie actions (Saving, fav)
const requireAuth = async (req, res, next) => {
  //Verify that authorization was included in request headers
  const {authorization} = req.headers

  //Check if the authorization is present in req header
  if(!authorization){
    return res.status(401).json({error: 'Authorization is required'})
  }

  //Extract the token from the header (Format for JWT is "Bearer <token>")
  const token = authorization.split(' ')[1];

  try {
    //Verify that the token is legit
    const {_id} = jwt.verify(token, process.env.SECRET);

    //Query the database to find if a user matches that id
    req.user = await userModel.findOne({_id}).select('_id');

    next()
  } catch (error) {
    res.status(401).json({error: 'Request not authorized'})
  }
}
module.exports = requireAuth