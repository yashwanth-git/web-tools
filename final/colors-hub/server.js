const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT || 3000;

const data = require("./data");
const sessions = require("./sessions");
const users = require("./users");
const colors = require("./colors");
const { paginate } = require("./pagination");

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
  const savedCopy = userData.savedPalettes;

  Object.keys(savedCopy).forEach((palette) => {
    if (!data.colors[palette]) {
      delete userData.savedPalettes[palette];
    }
  });
  
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
    userData.online = true;
    res.cookie("sid", sessionId);
    res.json({ userData });
  } else {
    res.status(400).json({ error: "required-username" });
    return;
  }
});

app.post("/api/v1/users/saved-colors", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const { username } = data.sessions[sid] || {};
  const userData = users.findUser(username);
  const { paletteId } = req.body;
  userData.savedPalettes[paletteId] = data.colors[paletteId];
  res.json(userData.savedPalettes);
  return;
});

app.delete("/api/v1/users/saved-colors", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const { username } = data.sessions[sid] || {};
  const userData = users.findUser(username);
  const { paletteId } = req.body;
  delete userData.savedPalettes[paletteId];
  res.json(paletteId);
  return;
});

app.delete("/api/v1/users/user-colors", (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions.isValidSessionId(sid)) {
    res.clearCookie("sid");
    res.status(401).json({ error: "auth-missing" });
    return;
  }
  const { username } = data.sessions[sid] || {};
  const userData = users.findUser(username);
  const { paletteId } = req.body;
  delete data.colors[paletteId];
  delete userData.userPalettes[paletteId];
  res.json(paletteId);
  return;
});

app.delete("/api/v1/session", (req, res) => {
  const sid = req.cookies.sid;
  const { username } = sessions.isValidSessionId(sid);
  if (sid || sessions.isValidSessionId(sid)) {
    const userData = users.findUser(username);
    userData.online = false;
    delete data.sessions[sid];
    res.clearCookie("sid");
  }

  res.json({ username });
});

app.get("/api/v1/colors", paginate(data.colors), (req, res) => {
  const sid = req.cookies.sid;
  const { username } = sessions.isValidSessionId(sid);
  if (sid || users.findUser(username)) {
    res.status(200).json(res.paginatedResults);
  } else {
    res.status(401).json({ error: "auth-insufficient" });
  }
});

app.post("/api/v1/colors", (req, res) => {
  const { colorPalette } = req.body;
  if (colorPalette) {
    const sid = req.cookies.sid;
    const { username } = sessions.isValidSessionId(sid);
    if (sid || users.findUser(username)) {
      const colPalette = colors.createColors(username, colorPalette);
      const userData = users.findUser(username);
      userData.userPalettes[colPalette.id] = colPalette;
      res.json({ colPalette });
    } else {
      res.status(401).json({ error: "auth-insufficient" });
    }
  } else {
    res.status(400).json({ error: "required-colors" });
  }
});

app.get("*", (req, res) => {
  res.sendFile("./build/index.html");
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
