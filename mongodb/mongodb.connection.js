const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://SuperTestUser:SuperTestUser1@todo-tdd.smjmncm.mongodb.net/?retryWrites=true&w=majority"
    );
  } catch (err) {
    console.error(err);
    console.error("Error connecting to MongoDB");
  }
}

module.exports = {connect}
