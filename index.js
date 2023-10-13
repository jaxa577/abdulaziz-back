const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config");
app.use(express.json());
app.use(cors());
let PORT = process.env.PORT || 3000;

const TelegramBot = require("node-telegram-bot-api");

const telegramBot = new TelegramBot(process.env.TOKEN);

const keys = [
  "fio",
  "todos",
  "startDate",
  "addMessage",
  "endDate",
  "hourly",
  "userName",
];

const none = "Неизвестно";

function newMessageOptions(body) {
  console.log(body);
  if (!body || typeof body != "object" || keys.some((key) => !body[key])) {
    return undefined;
  }

  return {
    ...body,
  };
}

function sendMessage(messageOptions) {
  try {
    telegramBot.sendMessage(
      -1001983249310,
      `
Student's full name:   ${messageOptions.todos || none}

Student's age: ${messageOptions.fio || none}

Student's english level:   ${messageOptions.startDate || none}

Student's math level:   ${messageOptions.endDate || none}

Student's phone number: ${messageOptions.hourly || none}

Student's telegram user-name: ${messageOptions.userName || none}

Student's additional message: ${messageOptions.addMessage || none}

        `
    );
  } catch (e) {
    console.log(e);
  }
}

app.post("/send", (req, res) => {
  try {
    console.log(req.body);
    const messageOptions = newMessageOptions(req.body);
    // if (!messageOptions) {
    //   res.status(400);
    //   return res.send("incorrect request");
    // }
    sendMessage(messageOptions);
    res.send({});
  } catch (error) {
    res.status(400);
    return res.send("incorrect request");
  }
});

app.listen(PORT, () => {
  console.log("server start " + PORT);
});
