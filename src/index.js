require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const botRoutes = require("./routes/botRoutes");
require("./utils/firebase");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/bot", botRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.use("/hello", (req, res) => {
  res.send({ message: "Hello World!" });
});

module.exports = app;
