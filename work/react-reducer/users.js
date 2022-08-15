const { users } = require("./data");
const uuid = require("uuid").v4;

const validateUserName = (username) => {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
};

const createUser = (username) => {
  const id = uuid();
  if (!users[username]) {
    users[username] = { username, id};
  }
  return users[username];
};

const findUser = (username) => {
  if (users[username]) {
    return users[username];
  }
};

module.exports = {
  validateUserName,
  createUser,
  findUser
};