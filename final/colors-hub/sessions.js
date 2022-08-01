const { sessions } = require("./data");
const { v4: uuidv4 } = require("uuid");

const createSession = (username) => {
  const sid = uuidv4();
  sessions[sid] = { username };
  return sid;
};

const isValidSessionId = (sid) => {
  return sessions[sid];
};

module.exports = {
  createSession,
  isValidSessionId
};