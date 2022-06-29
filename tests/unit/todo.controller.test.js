const todoController = require("../../controllers/todo.controller");
const todoModel = require("../../model/todo.model");
const httpMocks = require("node-mocks-http");
const newTodo = require("../mock-data/new-todo.json");
const allTodos = require("../mock-data/all-todos.json");

//We expect mongoose to work, we focus in test our code. That's why the mock
todoModel.create = jest.fn();
todoModel.find = jest.fn();

let request, response, next;

beforeEach(() => {
  request = httpMocks.createRequest();
  response = httpMocks.createResponse();
  next = jest.fn();
});

describe("todoController.getTodos", () => {
  it("should have a getTodos function", () => {
    expect(typeof todoController.getTodos).toBe("function");
  });

  it("should call todoModel.find", () => {
    todoController.getTodos(request, response, next);
    expect(todoModel.find).toBeCalledWith({});
  });

  it("should return 200 response code and return all todos", async () => {
    await todoController.getTodos(request, response, next);
    todoModel.find.mockReturnValue(allTodos);
    expect(response.statusCode).toBe(200);
    expect(response._isEndCalled()).toBeTruthy();
    expect(response._getJSONData()).toStrictEqual(allTodos);
  });
});

describe("todoController.createTodo", () => {
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

  it("should return 201 response code", async () => {
    await todoController.createTodo(request, response, next);
    expect(response.statusCode).toBe(201);
    //this is to ensure that the response has been sent back and not only set the status but not sent
    expect(response._isEndCalled()).toBeTruthy();
  });

  it("should return json body in response", async () => {
    //jest framework mockReturnValue function  to mock that specific return value from the function
    todoModel.create.mockReturnValue(newTodo);
    await todoController.createTodo(request, response, next);
    //_getJSONData() method from node-mocks-http itself
    expect(response._getJSONData()).toStrictEqual(newTodo);
  });

  it("should handle errors", async () => {
    const errorMessage = {
      message: "Todo validation failed: done: Path `done` is required.",
    };
    todoModel.create.mockReturnValue(Promise.reject(errorMessage));
    await todoController.createTodo(request, response, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
