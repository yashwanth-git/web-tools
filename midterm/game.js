const { players } = require("./game-data");

const playGame = (username, guess) => {
  const playerDetails = getPlayer(username);
  
  playerDetails.stepsCount += 1;

  const history = createHistory(playerDetails.secretWord, guess);
  if (history.match === playerDetails.secretWord.length) {
    playerDetails.isMatch = true;
  }
  playerDetails.history.push(history);
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
  return {
    word: `${guess}`,
    match,
    status: `${match > 0 ? "valid" : "invalid"}`,
  };
};

const gameHelpers = {
  createSecretWord,
  getPlayer,
  playGame
};

module.exports = gameHelpers;
