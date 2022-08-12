const { users } = require("./data");

const validateUserName = (username) => {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
};

const createUser = (username, word = "") => {
  if (!users[username]) {
    users[username] = { username, word };
  }
  return users[username];
};

const findUser = (username) => {
  if (users[username]) {
    return users[username];
  }
};

const updateWord = (username, word) => {
  if (users[username]) {
    users[username].word = word;
  }
  return users[username];
};

module.exports = {
  validateUserName,
  createUser,
  findUser,
  updateWord
};
