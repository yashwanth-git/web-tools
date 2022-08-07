const { v4: uuidv4 } = require("uuid");
const { colors } = require("./data");

function getAllColors() {
  return colors;
}

function createColors(username, colorPalette) {
  const id = uuidv4();
  const { c1, c2, c3, c4 } = colorPalette;
  colors[id] = { c1, c2, c3, c4, username, id };
  return colors[id];
}

function getColorsByUser(username) {
  return colors[username];
}

module.exports = {
  getAllColors,
  createColors,
  getColorsByUser,
};
