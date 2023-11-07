require("dotenv").config();
const axios = require("axios");
const { usersEaten, friends, PRICE_PER_LUNCH } = require("./botHelpers");
const Report = require("./models/report");

// const TELEGRAM_API = `https://api.telegram.org/bot`;
const TELEGRAM_API = `https://api.telegram.org/bot/${process.env.TELEGRAM_TOKEN}`;

const callItADay = async (chatId) => {
  try {
    const usersEatenList = Object.keys(usersEaten);
    const totalExpense = usersEatenList.length * PRICE_PER_LUNCH;

    // Creating a new report instance
    const report = new Report({
      users_eaten: usersEatenList,
      total_amount: totalExpense,
    });

    // Saving the report to the database
    await report.save();

    // Resetting the usersEaten for the next day
    for (let user in usersEaten) {
      delete usersEaten[user];
    }

    // Inform the user
    await sendMsg(
      chatId,
      "Today's report has been saved and the list has been reset for the next day."
    );
  } catch (error) {
    console.error("Error saving the report:", error);
    // Handle error, inform the user
    await sendMsg(chatId, "An error occurred while saving the report.");
  }
};

const sendMsg = (chatId, text) => {
  return axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text,
  });
};

const report = (chatId) => {
  const totalExpense = Object.keys(usersEaten).length * PRICE_PER_LUNCH;
  const reportText = Object.keys(usersEaten).join("\n");

  sendMsg(
    chatId,
    `Friends who ate today:\n${reportText}\n\nTotal Expense: ${totalExpense}`
  );
};

const addNames = (chatId, names) => {
  names.split(",").forEach((name) => {
    const trimmedName = name.trim();
    const capName =
      trimmedName.charAt(0).toUpperCase() + trimmedName.slice(1).toLowerCase();
    if (friends.includes(capName)) {
      usersEaten[capName] = true;
    }
  });

  sendMsg(chatId, `Marked ${names} as eaten today.`);
};

module.exports = {
  report,
  addNames,
  sendMsg,
  callItADay,
};
