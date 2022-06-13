const todoModel = require("../model/todo.model");

const createTodo = (request, response, next) => {
  todoModel.create(request.body);
  return response.status(201).send();
};

module.exports = {
  createTodo,
};
