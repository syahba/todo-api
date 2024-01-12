const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./routes/user');
const todo = require('./routes/todo');
require('dotenv').config();

const port = process.env.PORT || 3000;
console.log(process.env.PORT);

const connectDB = async () => {
  console.log('function connect db');
  try {
    console.log('about to try mongoose connection');
    const conn = await mongoose.createConnection(process.env.DB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  };
};

app.use(express.json()); // parsing requests
app.get('/', (req, res) => {
  console.log('this is entry point');
  res.json({ message: 'Conneced' });
});

// routes
app.use(user);
app.use(todo);

// connect to the database before listening
connectDB().then(() => {
  console.log('db connected, now listening');
  app.listen(port, () => {
    console.log(`Listening for requests on port ${port}`);
  });
});