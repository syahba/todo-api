const express = require('express');
const { registerUser, loginUser, getDetailUser } = require('../controllers/user');
const { verifyToken } = require('../middlewares/auth');
const user = express.Router();

// endpoints
user.post('/users/signup', registerUser);
user.post('/users/signin', loginUser);
user.get('/users', verifyToken, getDetailUser);

module.exports = user;