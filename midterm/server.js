const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000;

const game = require("./game-data");
const gameWeb = require("./game-web");

const wordsList = require("./words");
const words = Object.values(wordsList);

const helpers = require("./helpers");
const gameHelpers = require("./game");

app.use(express.static("./public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  const sid = req.cookies.sid;
  if (sid && !helpers.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).send(gameWeb.getError());
    return;
  }
  const { username } = game.sessions[sid] || {};
  const playerData = helpers.findPlayer(username);

  if (playerData && playerData.secretWord === "") {
    playerData.secretWord = gameHelpers.createSecretWord(words);
    console.log(
      `New Game:\nPlayer: ${playerData.username} | SecretWord: ${playerData.secretWord}`
    );
  } 
  // else if (playerData) {
  //   console.log(
  //     `Game Running:\nPlayer: ${playerData.username} | SecretWord: ${playerData.secretWord}`
  //   );
  // }
  res.send(gameWeb.gamePage(playerData, words));
});

app.post("/new-game", (req, res) => {
  const sid = req.cookies.sid;
  if (sid && !helpers.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).send(gameWeb.getError());
    return;
  }
  const { username } = game.sessions[sid] || {};

  delete game.players[username];
  helpers.createPlayer(username);
  res.redirect("/");
});

app.post("/login", express.urlencoded({ extended: false }), (req, res) => {
  const { username } = req.body;
  if (username) {
    const formattedUname = username.trim().toLowerCase();
    const validUser = helpers.validateUserName(formattedUname);

    if (!validUser) {
      res.status(401).send(gameWeb.getError());
      return;
    }

    const sessionId = helpers.createSession(formattedUname);
    helpers.createPlayer(formattedUname);
    res.cookie("sid", sessionId);
    res.redirect("/");
  } else {
    res.status(401).send(gameWeb.getError());
  }
});

app.post("/logout", express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  delete game.sessions[sid];
  res.clearCookie("sid");
  res.redirect("/");
});

app.post("/guess", express.urlencoded({ extended: false }), (req, res) => {
  const { guess } = req.body;
  if (guess) {
    const sid = req.cookies.sid;
    const { username } = game.sessions[sid];
    let playerDetails;
    playerDetails = gameHelpers.getPlayer(username);
    if (!playerDetails.isMatch) {
      gameHelpers.playGame(username, guess);
    }
    playerDetails = gameHelpers.getPlayer(username);
    res.redirect("/");
  } else {
    res.redirect("/");
  }
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
