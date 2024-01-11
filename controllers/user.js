const bcrypt = require('bcrypt');
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

module.exports = {
  registerUser
};