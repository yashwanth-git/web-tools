const uuid = require("uuid").v4;

const users = {};

const sessions = {};

const id = uuid();

const messagesList = {
};

const data = {
  users,
  sessions,
  messagesList,
};

module.exports = data;