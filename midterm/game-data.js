"use-strict";
const players = {
  jorts: {
    username: "jorts",
    secretWord: "",
    history: [],
    stepsCount: 0,
    isMatch: false,
  },
};

const session = {};

const game = {
  players,
  session,
};

module.exports = game;
