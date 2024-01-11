const Todo = require("../models/todo");

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { id } = req.user;

    if (!title || !description) {
      return res.status(400).send({ message: 'Invalid data' });
    };

    const payload = {
      title,
      description: description ? description : '',
      isCompleted: false,
      userId: id
    };

    await Todo.create(payload);
    
    return res.status(201).send({ message: 'Success created data' });
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

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Todo.findByIdAndUpdate(id, req.body);
    if (!data) {
      return res.status(404).send({ message: 'Data not found' });
    };

    return res.status(200).send({ message: 'Success updated data' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Internal server error' });
  };
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Todo.findByIdAndDelete(id);
    if (!data) {
      return res.status(404).send({ message: 'Data not found' });
    };

    return res.status(200).send({ message: 'Success deleted data' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Internal server error' });
  };
};

const deleteAllTodo = async (req, res) => {
  try {
    const { id } = req.user;

    const { deletedCount } = await Todo.deleteMany({ userId: id });
    if (deletedCount == 0) {
      return res.status(404).send({ message: 'No existing data' });
    }

    return res.status(200).send({ message: 'Success deleted all data' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Internal server error' });
  };
};

module.exports = {
  createTodo,
  getTodo,
  getDetailTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodo
};