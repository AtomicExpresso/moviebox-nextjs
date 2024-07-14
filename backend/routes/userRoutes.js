const express = require('express');
const router = express.Router();
const { signUpUser, logInUser } = require('../controllers/userController');

//Signup user
router.post('/', signUpUser);

//Login user
router.post('/', logInUser);


module.exports = router