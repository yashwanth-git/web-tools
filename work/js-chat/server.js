const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));