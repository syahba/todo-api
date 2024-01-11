const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  isCompleted: { type: Boolean, default: false },
  userId: { type: String, required: true }
}, {
  timestamps: true,
  versionKey: false
});

const Todo = mongoose.model('todos', todoSchema);

module.exports = Todo;