import render from "./render";
import {
  fetchAddMessage,
  fetchLogin,
  fetchLogout,
  fetchMessages,
} from "./services";
import { login, logout, updateMessages, setError } from "./state";

export function abilityToLogin({ state, appEl }) {
  appEl.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!e.target.classList.contains("login-form-wrap")) {
      return;
    }
    const username = document.querySelector(".username").value;
    fetchLogin(username)
      .then((res) => {
        login(username);
        render({ state, appEl });
        return fetchMessages();
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
        render({ state, appEl });
      })
      .then((messages) => {
        console.log(messages);
        const { messagesList } = messages;
        updateMessages(messagesList);
        console.log(state);
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
  });
}

export function abilityToLogout({ state, appEl }) {
  appEl.addEventListener("click", (e) => {
    if (!e.target.classList.contains("logout-btn")) {
      return;
    }
    logout();
    render({ state, appEl });
    fetchLogout().catch((err) => {
      setError(err?.error || "ERROR");
      render({ state, appEl });
    });
  });
}

export function abilityToAddMessage({ state, appEl }) {
  appEl.addEventListener("click", (e) => {
    if (!e.target.classList.contains("send-btn")) {
      return;
    }
    const message = document.querySelector(".to-send").value;
    console.log(message);
    if (message) {
      console.log(message, state.username);
      fetchAddMessage(state.username, message)
        .then((message) => {
          render({ state, appEl });
          return fetchMessages();
        })
        .catch((err) => {
          console.log(err);
          setError(err?.error || "ERROR");
          render({ state, appEl });
        })
        .then((messages) => {
          console.log(messages);
          const { messagesList } = messages;
          updateMessages(messagesList);
          console.log(state);
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
  });
}
