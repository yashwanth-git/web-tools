const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 3000;

const data = require("./data");
const sessions = require("./sessions");
const users = require("./users");

app.use(cookieParser());
app.use(express.static("./build"));
app.use(express.json());

app.get("/api/v1/session", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const { username } = data.sessions[sid] || {};
  const userData = users.findUser(username);
  res.json({ userData });
});

app.post("/api/v1/session", (req, res) => {
  const { username } = req.body;
  if (username) {
    const formattedUname = username.trim().toLowerCase();
    const validUser = users.validateUserName(formattedUname);

    if (!validUser) {
      res.status(401).json({ error: "auth-insufficient" });
      return;
    }

    if (formattedUname === "dog") {
      res.status(403).json({ error: "auth-insufficient" });
      return;
    }

    const sessionId = sessions.createSession(username);
    const userData = users.createUser(username);
    res.cookie("sid", sessionId);
    res.json({ userData });
  } else {
    res.status(400).json({ error: "required-username" });
    return;
  }
});

app.delete("/api/v1/session", (req, res) => {
  const sid = req.cookies.sid;
  const { username } = sessions.isValidSessionId(sid);
  if (sid || sessions.isValidSessionId(sid)) {
    const userData = users.findUser(username);
    delete data.sessions[sid];
    res.clearCookie("sid");
  }

  res.json({ username });
});

app.post("/api/v1/message", (req, res) => {
  const { message } = req.body;
  if (message) {
    const sid = req.cookies.sid;
    const { username } = data.sessions[sid];
    const userData = users.updateMessage(username, message);
    res.status(200).json({userData});
  }
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
