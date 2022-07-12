const uuid = require("uuid").v4;

const users = {};

const sessions = {};

const id1 = uuid();
const id2 = uuid();

const messagesList = {
  [id1]: {
    username: "Yash",
    message: "Wassup?",
  },
  [id2]: {
    username: "Jorts",
    message: "Nothing much bud!",
  },
};

const data = {
  users,
  sessions,
  messagesList,
};

module.exports = data;
