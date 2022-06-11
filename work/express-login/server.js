const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000;

const data = require("./data");
const dataWeb = require("./data-web");

const helpers = require("./helpers");

app.use(express.static("./public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  const sid = req.cookies.sid;
  if (sid && !helpers.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).send(dataWeb.indexPage(data));
    return;
  }

  const { username } = data.sessions[sid] || {};
  const userData = helpers.findUser(username);

  res.send(dataWeb.indexPage(data, userData));
  return;
});

app.get("/error", (req, res) => {
  res.send("Error");
});

app.post("/signup", express.urlencoded({ extended: false }), (req, res) => {
  const { username, message } = req.body;
  if (username) {
    const formattedUname = username.trim().toLowerCase();
    const validUser = helpers.validateUserName(formattedUname);

    if (!validUser) {
      res.status(401).redirect("/error");
      return;
    }

    const sessionId = helpers.createSession(formattedUname);
    helpers.createUser(formattedUname);
    res.cookie("sid", sessionId);
    res.redirect("/");
  } 
  
  else if (message) {
    const sid = req.cookies.sid;
    const { username } = data.sessions[sid];
    helpers.updateMessage(username, message);
    res.redirect("/");
  } 
  
  else {
    res.redirect("/");
  }
});

app.post("/logout", express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  delete data.sessions[sid];
  res.clearCookie("sid");
  res.redirect("/");
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
