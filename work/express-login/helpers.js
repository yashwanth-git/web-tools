const { sessions, users } = require("./data");
const { v4: uuidv4 } = require("uuid");

const validateUserName = (username) => {
  const formattedUname = username.trim().toLowerCase();

  const regex = "^[a-zA-Z0-9]*$";
  const unameRegexCheck = formattedUname.match(regex);

  if (!formattedUname || formattedUname === "dog" || !unameRegexCheck) {
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
  return users[username]
};

const findUser = (username) => {
  if (users[username]) {
    return users[username];
  }
};

const updateMessage = (username, message) => {
  if (users[username]) {
    users[username].message = message;
  }
  return users[username];
};

const helpers = {
  validateUserName,
  createSession,
  isValidSessionId,
  createUser,
  findUser,
  updateMessage,
};

module.exports = helpers;
