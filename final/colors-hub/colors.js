const { v4: uuidv4 } = require("uuid");
const { colors } = require("./data");

function getAllColors() {
  return colors;
}

function createColors(username, colorPalette) {
  const id = uuidv4();
  colors[username] = {
    ...colors[username],
    [id]: {
      colorPalette,
    },
  };
  return colors[username][id];
}

function getColorsByUser(username) {
  return colors[username]
}

module.exports = {
  getAllColors,
  createColors,
  getColorsByUser,
};
