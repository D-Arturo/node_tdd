const todoModel = require("../model/todo.model");

const createTodo = async (request, response, next) => {
  try {
    const createdModel = await todoModel.create(request.body);
    return response.status(201).json(createdModel);
  } catch (error) {
    next(error);
  }
};

const getTodos = async (request, response, next) => {
  const allTodos = await todoModel.find({});
  return response.status(200).json(allTodos);
};

module.exports = {
  createTodo,
  getTodos,
};
