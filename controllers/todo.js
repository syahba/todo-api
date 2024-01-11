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

const getTodo = async (req, res) => {
  try {
    const { id } = req.user;

    const data = await Todo.find({ userId: id });
    if (data.length == 0) {
      return res.status(404).send({ message: 'No existing data' });
    };

    const result = data.map(v => {
      const obj = {
        id: v._id,
        title: v.title,
        isCompleted: v.isCompleted
      };

      return obj;
    });

    return res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Internal server error' });
  };
};

const getDetailTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Todo.findById(id);
    if (!data) {
      return res.status(404).send({ message: 'Data not found' });
    };

    return res.status(200).send(data);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Internal server error' });
  };
};

module.exports = {
  createTodo,
  getTodo,
  getDetailTodo
};