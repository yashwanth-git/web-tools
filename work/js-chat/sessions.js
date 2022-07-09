const { sessions, users } = require("./data");
const { v4: uuidv4 } = require("uuid");

const validateUserName = (username) => {
  const regex = "^[a-zA-Z0-9]*$";
  const unameRegexCheck = username.match(regex);

  if (!username || !unameRegexCheck) {
    return false;
  } else {
    return true;
  }
};

const createSession = (username) => {
  const sid = uuidv4();
  sessions[sid] = { username };
  return sid;
};

const isValidSessionId = (sid) => {
  return sessions[sid];
};

const createUser = (username, message = "") => {
  if (!users[username]) {
    users[username] = { username, message };
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
  createSession,
  isValidSessionId,
  createUser,
  findUser,
};
