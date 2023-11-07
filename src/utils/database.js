// database.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/tiffinBot", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("We're connected to the database!");
});

module.exports = db;
