const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel')

//CREATE a token for user session
const createToken = (_id) => {
  return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'})
}

//SignUp user
const signUpUser = async (req, res) => {
  const {username, email, password} = req.body
  
  try {
    const user = await userModel.signUp(username, email, password);
    const token = createToken(user._id);

    res.status(200).json({username, email, password, token})
  } catch(error) {
    return res.status(400).json({error: error.message})
  }
}


//Login user 
const logInUser = async (req, res) => {
  const {username, password} = req.body;

  try {
    const user = await userModel.logIn(username, password);
    const token = createToken(user._id);

    res.status(200).json({user, token});
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
}

module.exports = {signUpUser, logInUser}