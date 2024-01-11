const express = require('express');
const { createTodo, getTodo } = require('../controllers/todo');
const { verifyToken } = require('../middlewares/auth');
const todo = express.Router();

// endpoints
todo.post('/todos', verifyToken, createTodo);
todo.get('/todos', verifyToken, getTodo);

module.exports = todo;