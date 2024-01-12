const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./routes/user');
const todo = require('./routes/todo');
require('dotenv').config();

const port = process.env.PORT || 3000;
console.log(process.env.PORT);

// connect to database
console.log('trying to connect');
mongoose.connect(process.env.DB_URL);
console.log('now checking connection');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', () => console.log('We are connected'));

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

app.use(express.json()); // parsing request
app.get('/', (req, res) => {
  console.log('success get');
  res.json({ message: 'First connection is made' });
})

// routes
app.use(todo);
app.use(user);