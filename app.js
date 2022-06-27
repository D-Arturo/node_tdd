const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const mongodb = require("./mongodb/mongodb.connection");

const app = express();
mongodb.connect();

app.use(express.json());

app.use("/todos", todoRoutes);

app.get("/", (request, response) => {
  response.json("TDD here we go");
});

module.exports = app;
