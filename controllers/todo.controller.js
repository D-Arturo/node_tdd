const todoModel = require("../model/todo.model");

const createTodo = (request, response, next) => {
  const createdModel = todoModel.create(request.body);
  return response.status(201).json(createdModel);
};

module.exports = {
  createTodo,
};
