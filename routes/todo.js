const express = require('express');
const { createTodo } = require('../controllers/todo');
const { verifyToken } = require('../middlewares/auth');
const todo = express.Router();

// endpoints
todo.post('/todos', verifyToken, createTodo);

module.exports = todo;