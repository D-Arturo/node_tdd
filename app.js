const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const mongodb = require("./mongodb/mongodb.connection");

const app = express();
mongodb.connect();

app.use(express.json());

app.use("/todos", todoRoutes);

//Error handler according to Express
app.use((error, request, response, next) => {
  response.status(500).json({message: error.message})
});

app.get("/", (request, response) => {
  response.json("TDD here we go");
});

module.exports = app;
