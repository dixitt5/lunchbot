const axios = require('axios');
const { usersEaten, friends, PRICE_PER_LUNCH } = require('./botHelpers');

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}`;

const sendMsg = (chatId, text) => {
    return axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text
    });
};

const report = chatId => {
    const totalExpense = Object.keys(usersEaten).length * PRICE_PER_LUNCH;
    const reportText = Object.keys(usersEaten).join("\n");

    sendMsg(chatId, `Friends who ate today:\n${reportText}\n\nTotal Expense: ${totalExpense}`);
};

const addNames = (chatId, names) => {
    names.split(',').forEach(name => {
        const trimmedName = name.trim();
        if (friends.includes(trimmedName)) {
            usersEaten[trimmedName] = true;
        }
    });

    sendMsg(chatId, `Marked ${names} as eaten today.`);
};

module.exports = {
    report,
    addNames,
    sendMsg
};
