const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10); // hashing password with bcrypt

    const data = await User.findOne({ username });

    if (!data) {
      const payload = {
        username,
        password: hashedPassword
      };

      await User.create(payload);

      res.status(201).send({ message: 'User created' });
    } else {
      res.status(409).send({ message: 'User already exists' });
    };
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: 'Internal server error' });
  };
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const data = await User.findOne({ username });
    if (data) {
      const checkPassword = bcrypt.compareSync(password, data.password);

      if (checkPassword) {
        const payload = {
          id: data.id,
          username,
          password
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY);

        res.status(200).json({ token });
      } else {
        res.status(401).send('Wrong password');
      };
    } else {
      res.status(401).send({ message: 'User is not registered' });
    };
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: 'Internal server error' });
  };
};

module.exports = {
  registerUser,
  loginUser
};