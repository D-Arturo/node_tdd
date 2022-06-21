const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";

describe(`Given "/todos/" path`, () => {
  it("when POST endpoint is called, then should create a new Todo ", async () => {
    const response = await request(app)
    .post(endpointUrl)
    .send(newTodo);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });
});
