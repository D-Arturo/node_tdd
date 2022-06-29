const request = require("supertest");
const app = require("../../app");
const newTodo = require("../mock-data/new-todo.json");

const endpointUrl = "/todos/";

describe(`Given "/todos/" path`, () => {
  it("when POST endpoint is called, then should create a new Todo ", async () => {
    const response = await request(app).post(endpointUrl).send(newTodo);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newTodo.title);
    expect(response.body.done).toBe(newTodo.done);
  });

  it("when POST endpoint is called with missing 'done' field, then a proper error should be displayed ", async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send({ title: "Missing done field" });

    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
      message: "Todo validation failed: done: Path `done` is required.",
    });
  });

  it("when POST endpoint is called with missing 'title' field, then a proper error should be displayed ", async () => {
    const response = await request(app).post(endpointUrl).send({ done: true });

    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
      message: "Todo validation failed: title: Path `title` is required.",
    });
  });

  it("when POST endpoint is called with wrong 'done' type, then a proper error should be displayed ", async () => {
    const response = await request(app)
      .post(endpointUrl)
      .send({ title: "wrong 'done' type", done: "123" });

    expect(response.status).toBe(500);
    console.log(response.body);
    expect(response.body.message).toMatch(/Todo validation failed: done: Cast to Boolean failed/);
  });
});
