const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;

const data = require("./data");
const sessions = require("./sessions");

app.use(cookieParser());
app.use(express.static("./public"));
app.use(express.json());

app.get("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  if (sid && !sessions.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).json({ error: "auth-missing" });
    return;
  }

  const { username } = data.sessions[sid] || {};
  const userData = sessions.findUser(username);

  res.json({ userData });
});

app.post("/api/session", (req, res) => {
  const { username } = req.body;
  if (username) {
    const formattedUname = username.trim().toLowerCase();
    const validUser = sessions.validateUserName(formattedUname);

    if (!validUser) {
      res.status(401).json({ error: "Username invalid" });
      return;
    }

    if (formattedUname === "dog") {
      res.status(403).json({ error: "Auth forbidden" });
      return;
    }

    const sessionId = sessions.createSession(formattedUname);
    const userData = sessions.createUser(formattedUname);
    res.cookie("sid", sessionId);
    res.json({ userData });
  } else {
    res.status(400).json({ error: "Auth insufficient" });
  }
});

app.delete("/api/session", (req, res) => {
  const sid = req.cookies.sid;
  const { username } = sessions.isValidSessionId(sid);
  if (sid && sessions.isValidSessionId(sid)) {
    delete data.sessions[sid];
    res.clearCookie("sid");
  }

  res.json({ username });
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
