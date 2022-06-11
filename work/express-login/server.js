const express = require("express");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 3000;

const data = require("./data");
const dataWeb = require("./data-web");

const helpers = require("./helpers");

app.use(express.static("./public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !helpers.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).send(dataWeb.indexPage(data));
    return;
  }
  res.send(dataWeb.indexPage(data, sid));
});

app.get("/error", (req, res) => {
  res.send("Error");
});

app.post("/signup", express.urlencoded({ extended: false }), (req, res) => {
  const { username } = req.body;
  const formattedUname = username.trim().toLowerCase();
  const validUser = helpers.validateUserName(formattedUname);

  if (!validUser) {
    res.status(401).redirect("/error");
    return;
  }

  const sessionId = helpers.createSession(formattedUname);

  res.cookie("sid", sessionId);
  res.redirect("/");
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
