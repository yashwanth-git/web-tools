const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

app.get("/api/v1/hello", (req, res) => {
    res.json({hello: true});
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));