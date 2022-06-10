const todoModel = require("../model/todo.model");

const createTodo = (request, response, next) => {
    todoModel.create(request.body);
};

module.exports = {
    createTodo
}