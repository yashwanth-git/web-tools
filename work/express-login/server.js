const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 3000;

const data = require("./data");
const dataWeb = require("./data-web");

app.use(express.static("./public"));
app.use(cookieParser());

app.get("/", (req, res) => {
  const cookie = res.cookie.username;
  res.send(dataWeb.indexPage(data, cookie));
});

app.get("/error", (req, res) => {
  res.send("Error");
});

app.post("/signup", express.urlencoded({ extended: false }), (req, res) => {
  const { username } = req.body;
  const formattedUname = username.trim().toLowerCase();

  const regex = /[A-Z][a-z][0-9]/g;
  const unameRegexCheck = formattedUname.match(regex);

  if (!formattedUname || formattedUname === "dog" || !unameRegexCheck) {
    res.status(401).redirect("/error");
    return;
  }
  res.redirect("/");
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
