const express = require('express');
const { registerUser } = require('../controllers/user');
const user = express.Router();

// endpoints
user.post('/users/signup', registerUser);

module.exports = user;