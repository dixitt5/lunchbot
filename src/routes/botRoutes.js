require("dotenv").config();
const express = require("express");
const {
  report,
  addNames,
  sendMsg,
  callItADay,
  createUser,
} = require("../botActions");

const router = express.Router();

router.post("/webhook", (req, res) => {
  const chatId = req.body.message.chat.id;
  const receivedText = req.body.message.text;

  if (receivedText.startsWith("/add")) {
    const names = receivedText.split("/add")[1].trim();
    addNames(chatId, names);
  } else if (receivedText === "/report") {
    report(chatId);
  } else if (receivedText === "/callitaday") {
    callItADay(chatId);
  } else if (receivedText.startsWith("/create")) {
    const name = receivedText.split("/create")[1].trim();
    createUser(chatId, name);
  } else {
    sendMsg(chatId, "Unsupported command!");
  }

  res.sendStatus(200);
});

module.exports = router;
