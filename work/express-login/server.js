const express = require("express");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const PORT = 3000;

const data = require("./data");
const dataWeb = require("./data-web");

app.use(express.static("./public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  const sid = req.cookies.sid;
  res.send(dataWeb.indexPage(data, sid));
});

app.get("/error", (req, res) => {
  res.send("Error");
});

app.post("/signup", express.urlencoded({ extended: false }), (req, res) => {
  const { username } = req.body;
  const formattedUname = username.trim().toLowerCase();

  const regex = '^[a-zA-Z0-9]*$';
  const unameRegexCheck = formattedUname.match(regex);

  if (!formattedUname || formattedUname === "dog" || !unameRegexCheck) {
    res.status(401).redirect("/error");
    return;
  }

  const sid = uuidv4();
  const { sessions } = data;
  sessions[sid] = { username };

  res.cookie("sid", sid);
  res.redirect("/");
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
