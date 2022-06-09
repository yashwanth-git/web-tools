const express = require('express');
const cookieParser = require("cookie-parser")
const app = express();
const PORT = 3000;

const data = require("./data");
const dataWeb = require("./data-web")

app.use(express.static('./public'));
app.use(cookieParser())

app.get("/", (req, res) =>{
    const cookie = res.cookie.username;
    if(!cookie){
        res.send(dataWeb.indexPage())
    }
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))