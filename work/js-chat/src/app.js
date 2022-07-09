import render from "./render";
import state, { login, logout, setError } from "./state";
const appEl = document.querySelector("#chat-app");

render({ state, appEl });
