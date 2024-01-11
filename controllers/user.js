const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Todo = require('../models/todo');
require('dotenv').config();

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (/\s/.test(username)) {
      return res.status(400).send({ message: 'Username cannot contain spaces' });
    };

    const hashedPassword = bcrypt.hashSync(password, 10);

    const data = await User.findOne({ username });
    if (data) {
      return res.status(409).send({ message: 'User already exists' });
    };

    const payload = {
      username,
      password: hashedPassword
    };
    await User.create(payload);

    return res.status(201).send({ message: 'Success created user' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Internal server error' });
  };
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const data = await User.findOne({ username });
    if (!data) {
      return res.status(401).send({ message: 'User is not registered' });
    };

    const checkPassword = bcrypt.compareSync(password, data.password);
    if (!checkPassword) {
      return res.status(401).send({ message: 'Wrong password'});
    };

    const payload = {
      id: data.id,
      username,
      password
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY);

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Internal server error' });
  };
};

const getDetailUser = async (req, res) => {
  try {
    const { id } = req.user;

    const data = await User.findById(id);
    if (!data) {
      return res.status(404).send({ message: 'User not found' });
    };

    return res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Internal server error' });
  };
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.user;

    const data = await User.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).send({ message: 'User not found' });
    };

    await Todo.deleteMany({ userId: id });

    return res.status(200).send({ message: 'Success deleted user' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Internal server error' });
  };
};

module.exports = {
  registerUser,
  loginUser,
  getDetailUser,
  deleteUser
};