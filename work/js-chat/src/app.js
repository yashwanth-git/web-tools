import render from "./render";
import state, {
  login,
  logout,
  setError,
  updateMessages,
  waitOnLogin,
} from "./state";
import { abilityToLogin, abilityToLogout } from "./listeners";
import { fetchMessages, fetchSession } from "./services";
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
      return fetchMessages();
    })
    .catch((err) => {
      if (err?.error === SERVER.AUTH_MISSING) {
        return Promise.reject({ error: CLIENT.NO_SESSION });
      }
      return Promise.reject(err);
    })
    .then((messages) => {
      const { messagesList } = messages;
      updateMessages(messagesList);
      render({ state, appEl });
    })
    .catch((err) => {
      if (err?.error == CLIENT.NO_SESSION) {
        logout();
        render({ state, appEl });
        return;
      }
      setError(err?.error || "ERROR");
      render({ state, appEl });
    });
}
