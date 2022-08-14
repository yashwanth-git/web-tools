const { v4: uuidv4 } = require("uuid");

const users = {};

const sessions = {};

const id1 = uuidv4();
const id2 = uuidv4();
const id3 = uuidv4();
const id4 = uuidv4();
const id5 = uuidv4();

const colors = {
  [id1]: {
    c1: "#264653",
    c2: "#2a9d8f",
    c3: "#e9c46a",
    c4: "#f4a261",
    username: "Yash",
    id: id1,
  },
  [id2]: {
    c1: "#cdb4db",
    c2: "#ffc8dd",
    c3: "#ffafcc",
    c4: "#bde0fe",
    username: "Yash",
    id: id2,
  },
  [id3]: {
    c1: "#ccd5ae",
    c2: "#e9edc9",
    c3: "#fefae0",
    c4: "#faedcd",
    username: "Yash",
    id: id3,
  },
  [id4]: {
    c1: "#264653",
    c2: "#2a9d8f",
    c3: "#e9c46a",
    c4: "#f4a261",
    username: "Yash",
    id: id4,
  },
  [id5]: {
    c1: "#606c38",
    c2: "#283618",
    c3: "#fefae0",
    c4: "#dda15e",
    username: "Yash",
    id: id5,
  },
};

const data = {
  users,
  sessions,
  colors,
};

module.exports = data;
