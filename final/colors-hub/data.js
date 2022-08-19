const { v4: uuidv4 } = require("uuid");

const users = {};

const sessions = {};

const id1 = uuidv4();
const id2 = uuidv4();
const id3 = uuidv4();
const id4 = uuidv4();
const id5 = uuidv4();
const id6 = uuidv4();
const id7 = uuidv4();
const id8 = uuidv4();
const id9 = uuidv4();
const id10 = uuidv4();
const id11 = uuidv4();

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
  [id6]: {
    c1: "#003049",
    c2: "#d62828",
    c3: "#f77f00",
    c4: "#fcbf49",
    username: "Jorts",
    id: id6,
  },
  [id7]: {
    c1: "#8ecae6",
    c2: "#219ebc",
    c3: "#023047",
    c4: "#ffb703",
    username: "Perry",
    id: id7,
  },
  [id8]: {
    c1: "#0081a7",
    c2: "#00afb9",
    c3: "#fdfcdc",
    c4: "#fed9b7",
    username: "Perry",
    id: id8,
  },
  [id9]: {
    c1: "#03071e",
    c2: "#370617",
    c3: "#6a040f",
    c4: "#9d0208",
    username: "Perry",
    id: id9,
  },
  [id10]: {
    c1: "#002642",
    c2: "#840032",
    c3: "#e59500",
    c4: "#e5dada",
    username: "Perry",
    id: id10,
  },
  [id11]: {
    c1: "#0a0908",
    c2: "#22333b",
    c3: "#eae0d5",
    c4: "#c6ac8f",
    username: "Perry",
    id: id11,
  },
};

const data = {
  users,
  sessions,
  colors,
};

module.exports = data;
