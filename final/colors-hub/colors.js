const { v4: uuidv4 } = require("uuid");
const { colors } = require("./data");

function getAllColors() {
  return colors;
}

function createColors(username, colorPalette) {
    colors[username][uuidv4()] = colorPalette;
}

function getColorsByUser(username){
    const colorPalettes = Object.values(colors[usernaem]);
    return colorPalettes;
}

module.exports = {
    getAllColors,
    createColors,
    getColorsByUser
}
