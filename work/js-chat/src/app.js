import render from "./render";
import state, {
  login,
  logout,
  setError,
  updateMessages,
  updateUsers,
  waitOnLogin,
} from "./state";
import {
  abilityToAddMessage,
  abilityToLogin,
  abilityToLogout,
} from "./listeners";
import { fetchMessages, fetchSession, fetchUsers } from "./services";
import { SERVER, CLIENT } from "./constants";
const appEl = document.querySelector("#chat-app");

render({ state, appEl });
abilityToLogin({ state, appEl });
abilityToLogout({ state, appEl });
abilityToAddMessage({ state, appEl });
checkForSession();

function checkForSession() {
  fetchSession()
    .then((session) => {
      console.log(session);
      login(session.userData.username);
      render({ state, appEl });
      return fetchUsers();
    })
    .catch((err) => {
      if (err?.error === SERVER.AUTH_MISSING) {
        return Promise.reject({ error: CLIENT.NO_SESSION });
      }
      return Promise.reject(err);
    })
    .then((users) => {
      console.log(users);
      updateUsers(users.users);
      render({ state, appEl });
      return fetchMessages();
    })
    .catch((err) => {
      logout();
      render({ state, appEl });
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
    });
}
