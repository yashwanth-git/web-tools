const { players } = require("./game-data");

const createSecretWord = (words) => {
  const secretWord = getRandomWord(words);
  return secretWord;
};

const getRandomWord = (words) => {
  return words[Math.floor(Math.random() * words.length)];
};

const gameHelpers = {
    createSecretWord,
}

module.exports = gameHelpers;