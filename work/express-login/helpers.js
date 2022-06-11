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
  return sessions[sid]
};

const findUser = (username) =>{
  let userData;
  if (users[username]) {
    userData = users[username];
  } else {
    users[username] = { username };
    userData = users[username];
  }
  return userData;
}

const helpers = {
  validateUserName,
  createSession,
  isValidSessionId,
  findUser
};

module.exports = helpers;
