const todoModel = require("../model/todo.model");

const createTodo = async (request, response, next) => {
  try {
    const createdModel = await todoModel.create(request.body);
    return response.status(201).json(createdModel);
  } catch (error) {
    next(error);
  }
};

const getTodos = (request, response, next) => {

};

module.exports = {
  createTodo,
  getTodos,
};
