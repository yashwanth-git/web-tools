import render from "./render";
import state, { login, logout, setError } from "./state";
import { abilityToLogin } from "./listeners";
const appEl = document.querySelector("#chat-app");

render({ state, appEl });
abilityToLogin({ state, appEl });
