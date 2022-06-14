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

describe("todoController - createTodo", () => {
  beforeEach(() => {
    request.body = newTodo;
  });

  it("should have a createTodo function", () => {
    expect(typeof todoController.createTodo).toBe("function");
  });

  it("should call todoModel.create", () => {
    todoController.createTodo(request, response, next);
    expect(todoModel.create).toBeCalledWith(newTodo);
  });

  it("should return 201 response code", () => {
    todoController.createTodo(request, response, next);
    expect(response.statusCode).toBe(201);
    //this is to ensure that the response has been sent back and not only set the status but not sent
    expect(response._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", () => {
    //jest framework mockReturnValue function  to mock that specific return value from the function
    todoModel.create.mockReturnValue(newTodo);
    todoController.createTodo(request, response, next);
    //_getJSONData() method from node-mocks-http itself
    expect(response._getJSONData()).toStrictEqual(newTodo);
  });
});
