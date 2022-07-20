const uuid = require("uuid").v4;

const users = {};

const sessions = {};

const id1 = uuid();
const id2 = uuid();

const messagesList = {
  [id1]: {
    username: "ChatBot",
    message: "Welcome to the Group Chat! Let the conversation begin",
  }
};

const data = {
  users,
  sessions,
  messagesList,
};

module.exports = data;
