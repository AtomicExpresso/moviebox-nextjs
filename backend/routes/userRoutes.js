const express = require('express');
const router = express.Router();
const { signUpUser, logInUser } = require('../controllers/userController');

//Signup user
router.post('/signup', signUpUser);

//Login user
router.post('/login', logInUser);


module.exports = router