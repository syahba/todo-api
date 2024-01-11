const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./routes/user');
const todo = require('./routes/todo');
require('dotenv').config();

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});

app.use(express.json()); // parsing request

// connect to database
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', () => console.log('We are connected'));

// routes
app.use(user);
app.use(todo);