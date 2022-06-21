const todoModel = require("../model/todo.model");

const createTodo = async (request, response, next) => {
  const createdModel = await todoModel.create(request.body);
  return response.status(201).json(createdModel);
};

module.exports = {
  createTodo,
};
