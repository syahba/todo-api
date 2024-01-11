const express = require('express');
const { registerUser, loginUser } = require('../controllers/user');
const user = express.Router();

// endpoints
user.post('/users/signup', registerUser);
user.post('/users/signin', loginUser);

module.exports = user;