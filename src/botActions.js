require("dotenv").config();
const axios = require("axios");
const { usersEaten, friends, PRICE_PER_LUNCH } = require("./botHelpers");
const db = require("./utils/firebase");
const {
  collection,
  addDoc,
  getDocs,
  arrayUnion,
  updateDoc,
  doc,
  setDoc,
  getDoc,
  arrayRemove,
  deleteDoc,
  serverTimestamp,
  query,
} = require("firebase/firestore");

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}`;

const sendMsg = (chatId, text) => {
  return axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text,
  });
};

const createUser = async (chatId, name) => {
  try {
    const ID = chatId.toString();
    const capName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    const docSnap = await getDoc(doc(db, "users", ID));
    if (docSnap.exists()) {
      const name = docSnap.data().userName;
      return await sendMsg(
        chatId,
        `User already created by Name : ${name}.\nTry with another phone!`
      );
    } else {
      const data = {
        userName: capName,
        userId: chatId,
        createdAt: serverTimestamp(),
      };
      const userDocRef = doc(db, "users", ID);
      await setDoc(userDocRef, data);

      await sendMsg(
        chatId,
        `User created by ID : ${ID} and Name : ${capName}. \nStore this ID Somewhere safe, it will be used for further purpose.`
      );
      await sendMsg(
        chatId,
        `You can now add your friends to the directory by simply using /add command. i.e. /add dixit, dev.`
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const getDirectory = async (chatId) => {
  try {
    const ID = chatId.toString();
    const docSnap = await getDoc(doc(db, "users", ID));
    const dir = docSnap.data().directory;
    const len = Object.keys(dir).length;
    let names = "\n";
    dir.forEach((name) => {
      names += name + "\n";
    });
    await sendMsg(chatId, `Your directory has ${len} names, which are : ${names}`);
  } catch (error) {
    console.error(error);
  }
};

const report = (chatId) => {
  const totalExpense = Object.keys(usersEaten).length * PRICE_PER_LUNCH;
  const reportText = Object.keys(usersEaten).join("\n");

  sendMsg(
    chatId,
    `Friends who ate today:\n${reportText}\n\nTotal Expense: ${totalExpense}`
  );
};

const add = (chatId, names) => {
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

const callItADay = async (chatId) => {
  try {
    const usersEatenList = Object.keys(usersEaten);
    const totalExpense = usersEatenList.length * PRICE_PER_LUNCH;
    const data = {
      date: serverTimestamp(), // Use server timestamp
      users_eaten: usersEatenList,
      total_amount: totalExpense,
      chatId: chatId,
    };
    // Add report to Firestore
    const reportRef = collection(db, "records"); // Firestore assigns a unique ID to the doc
    await addDoc(reportRef, data);
    const ID = chatId.toString();
    const userRef = doc(db, "users", ID);
    await updateDoc(userRef, { directory: arrayUnion(...usersEatenList) });

    // Clear the local tracking object after saving to Firestore
    for (let user in usersEaten) {
      delete usersEaten[user];
    }
    // Inform the user
    await sendMsg(
      chatId,
      "Today's report has been saved and the list has been reset for the next day."
    );
  } catch (error) {
    console.error("Error saving the report to Firestore:", error);
    await sendMsg(
      chatId,
      "An error occurred while saving the report to the database."
    );
  }
};

module.exports = {
  report,
  add,
  sendMsg,
  callItADay,
  createUser,
  add,
  getDirectory,
};
