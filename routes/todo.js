const express = require('express');
const { createTodo, getTodo, getDetailTodo } = require('../controllers/todo');
const { verifyToken } = require('../middlewares/auth');
const todo = express.Router();

// endpoints
todo.post('/todos', verifyToken, createTodo);
todo.get('/todos', verifyToken, getTodo);
todo.get('/todos/:id', verifyToken, getDetailTodo);

module.exports = todo;