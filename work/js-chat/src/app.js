import render from "./render";
import state, { login, logout, setError, waitOnLogin } from "./state";
import { abilityToLogin, abilityToLogout } from "./listeners";
import { fetchSession } from "./services";
import { SERVER, CLIENT } from "./constants";
const appEl = document.querySelector("#chat-app");

render({ state, appEl });
abilityToLogin({ state, appEl });
abilityToLogout({ state, appEl });
checkForSession();

function checkForSession() {
  fetchSession()
    .then((session) => {
      login(session.userData.username);
      render({ state, appEl });
    })
    .catch((err) => {
      if (err?.error === SERVER.AUTH_MISSING) {
        return Promise.reject({ error: CLIENT.NO_SESSION });
      }
      return Promise.reject(err);
    });
}
