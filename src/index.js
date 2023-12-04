require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const botRoutes = require("./routes/botRoutes");
require("./utils/firebase");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors({ origin: ["*"] }));
app.use(bodyParser.json());

app.use("/bot", botRoutes);

app.get("/hello", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${process.env.PORT}`);
  res.send({ message: "Hello, from the server!" });
});


module.exports = app;
