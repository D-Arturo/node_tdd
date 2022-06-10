const todoModel = require("../model/todo.model");

const createTodo = () => {
    todoModel.create();
};

module.exports = {
    createTodo
}