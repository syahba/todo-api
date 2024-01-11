const express = require('express');
const { registerUser, loginUser, getDetailUser, deleteUser } = require('../controllers/user');
const { verifyToken } = require('../middlewares/auth');
const user = express.Router();

// endpoints
user.post('/users/signup', registerUser);
user.post('/users/signin', loginUser);
user.get('/users', verifyToken, getDetailUser);
user.delete('/users', verifyToken, deleteUser);

module.exports = user;