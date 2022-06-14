const express = require("express");

const app = express();

app.get("/", (request, response) => {
    response.json("TDD here we go")
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
})

module.exports = app;