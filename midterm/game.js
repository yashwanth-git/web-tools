"use strict";
const { players } = require("./game-data");

const playGame = (username, guess) => {
  const playerDetails = getPlayer(username);
  const historyWords = playerDetails.history.map((h) => h.word);
  if (!historyWords.includes(guess.toLowerCase())) {
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

const findStatus = (match, guess, secret) =>{
  if(match === secret.length && guess.toLowerCase() !== secret.toLowerCase()){
    return "Incorrect"
  }
  else if(match === secret.length && guess.toLowerCase() === secret.toLowerCase()){
    return "Correct"
  }
  else if(match>0){
    return "Valid"
  }
  else{
    return "Invalid"
  }
}

const createHistory = (secret, guess) => {
  const match = compare(secret, guess);
  const valid = findStatus(match, guess, secret);
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
