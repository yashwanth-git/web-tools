const uuid = require("uuid").v4;
const data = require("./data");

const { messagesList } = data;

function addMessage(username, message) {
  const id = uuid();
  messagesList[id] = {
    id,
    username,
    message,
  };
  return messagesList;
}
module.exports = {
  addMessage,
};
