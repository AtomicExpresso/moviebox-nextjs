const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {timestamps: true})

//Signup static method
userSchema.statics.signUp = async function(username, email, password) {
  if(!username || !email || !password){
    throw new Error('Please fill in the required fields')
  }

  if(!validator.isEmail(email)){
    throw new Error('Please put a valid email address')
  }

  if(!validator.isStrongPassword(password)){
    throw new Error('Please put a stronger password')
  }

  //Check if account exists
  const exists = await this.findOne({email});
  const checkUsername = await this.findOne({username});

  if(exists){
    throw new Error('Someone already made an account with that email')
  }
  if(checkUsername){
    throw new Error('Username already in use')
  }

  //Hash password
  const salt = bcrypt.genSalt(10);
  const hash = bcrypt.hash(password, salt);

  const user = await this.create({username, email, password: hash});

  return user
}

//Login static method
userSchema.statics.LogIn = async function (username, password) {
  if(!username || !password){
    throw new Error('Please fill in the required fields')
  }

  const user = this.findOne({username});

  if(!user){
    throw new Error('Incorrect username')
  }
  if(!user.password){
    throw new Error('Incorrect password')
  }

  const matchPassword = await bcrypt.compare(password, user.password);

  if(!matchPassword){
    throw new Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model('userModel', userSchema)