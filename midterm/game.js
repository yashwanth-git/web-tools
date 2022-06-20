"use strict";
const { players } = require("./game-data");

const playGame = (username, guess) => {
  const playerDetails = getPlayer(username);
  const historyWords = playerDetails.history.map((h) => h.word);
  if (!historyWords.includes(guess.toLowerCase())) {
    //Checks if guess is from the list
    const history = createHistory(playerDetails.secretWord, guess);
    if (
      history.match === playerDetails.secretWord.length &&
      playerDetails.secretWord.toLowerCase() === history.word.toLowerCase()
    ) {
      playerDetails.isMatch = true;
    }
    if (history.match > 0) {
      playerDetails.validGuessCount += 1;
    }
    playerDetails.history.push(history);
  }
};

const createSecretWord = (words) => {
  const secretWord = getRandomWord(words);
  return secretWord;
};

const getRandomWord = (words) => {
  return words[Math.floor(Math.random() * words.length)];
};

const getPlayer = (username) => {
  if (players[username]) {
    return players[username];
  }
};

const compare = (secret, guess) => {
  let match = 0;
  const givenWord = secret.toLowerCase().split("");
  const guessedWord = guess.toLowerCase().split("");

  guessedWord.forEach((letter) => {
    if (givenWord.includes(letter)) {
      match++;
      givenWord.splice(givenWord.indexOf(letter), 1);
    }
  });
  return match;
};

const createHistory = (secret, guess) => {
  const match = compare(secret, guess);
  const valid =
    match === secret.length && guess.toLowerCase() !== secret.toLowerCase()
      ? "Incorrect"
      : match > 0
      ? "Valid"
      : "Invalid";
  return {
    word: `${guess}`,
    match,
    valid,
  };
};

const gameHelpers = {
  createSecretWord,
  getPlayer,
  playGame,
};

module.exports = gameHelpers;
