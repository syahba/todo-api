const express = require('express');
const { createTodo, getTodo, getDetailTodo, updateTodo, deleteTodo, deleteAllTodo } = require('../controllers/todo');
const { verifyToken } = require('../middlewares/auth');
const todo = express.Router();

// endpoints
todo.post('/todos', verifyToken, createTodo);
todo.get('/todos', verifyToken, getTodo);
todo.get('/todos/:id', verifyToken, getDetailTodo);
todo.patch('/todos/:id', verifyToken, updateTodo);
todo.delete('/todos/:id', verifyToken, deleteTodo);
todo.delete('/todos', verifyToken, deleteAllTodo);

module.exports = todo;