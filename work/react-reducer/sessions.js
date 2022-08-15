const { sessions } = require("./data");
const uuid = require("uuid").v4;

const createSession = (username) => {
  const sid = uuid();
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