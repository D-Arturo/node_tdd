const todoController = require("../../controllers/todo.controller");
const todoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");

//We expect mongoose to work, we focus in test our code. That's why the mock
todoModel.create = jest.fn();

let request, response, next;

beforeEach(() => {
    request = httpMocks.createRequest();
    response = httpMocks.createResponse();
    next = null;
});

describe("todoController - createTodo",() => {
    it("should have a createTodo function", () => {
        expect(typeof todoController.createTodo).toBe("function");
    });

    it("should call todoModel.create", () => {
        request.body = newTodo;
        todoController.createTodo(request, response, next);
        expect(todoModel.create).toBeCalledWith(newTodo);
    });
})