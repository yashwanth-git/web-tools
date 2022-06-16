const { sessions, players } = require("./game-data");
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

const createPlayer = (username) => {
  if (!players[username]) {
    players[username] = {
      username,
      secretWord: "",
      history: [],
      stepsCount: 0,
      inGame: true,
      isMatch: false
    };
  }
  return players[username];
};

const findPlayer = (username) => {
  if (players[username]) {
    return players[username];
  }
};

const helpers = {
  validateUserName,
  createSession,
  isValidSessionId,
  createPlayer,
  findPlayer,
};

module.exports = helpers;
