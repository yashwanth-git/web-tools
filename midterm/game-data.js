"use-strict";
const wordsList = require("./words");

const players = {
};

const sessions = {};

const words = Object.values(wordsList);

const game = {
  players,
  sessions,
  words
};



module.exports = game;
