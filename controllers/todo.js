const Todo = require("../models/todo");

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.user;

    const payload = {
      title,
      description: description ? description : '',
      isCompleted: false,
      userId: id
    };

    await Todo.create(payload);
    
    return res.status(201).send({ message: 'Success created todo' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Internal server error' });
  };
};

module.exports = {
  createTodo
};