const express = require("express");
const app = express();
const PORT = 3000;

const gameData = require("./game-data");
const gameWeb = require("./game-web");

app.use(express.static('./public'));

app.get("/", (req, res) => {
    res.send(gameWeb.gamePage(gameData));
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
