const todoController = require("../../controllers/todo.controller");
const todoModel = require("../../model/todo.model");

//We expect mongoose to work, we focus in test our code. That's why the mock
todoModel.create = jest.fn();

describe("todoController - createTodo",() => {
    it("should have a createTodo function", () => {
        expect(typeof todoController.createTodo).toBe("function");
    });

    it("should call todoModel.create", () => {
        todoController.createTodo();
        expect(todoModel.create).toBeCalled();
    })
})