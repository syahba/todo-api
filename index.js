const express = require('express');
const app = express();
const mongoose = require('mongoose');
const user = require('./routes/user');
const todo = require('./routes/todo');
require('dotenv').config();

const port = process.env.PORT || 3000;
console.log(process.env.PORT);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  };
};

app.use(express.json()); // parsing requests
app.get('/', (req, res) => {
  res.json({ message: 'Conneced' });
});

// routes
app.use(user);
app.use(todo);

// connect to the database before listening
connectDB().then(() => {
  console.log('tes masuk');
  app.listen(port, () => {
    console.log(`Listening for requests on port ${port}`);
  });
});