import { SERVER } from "./constants";
import render from "./render";
import {
  fetchAddMessage,
  fetchLogin,
  fetchLogout,
  fetchMessages,
  fetchUsers,
} from "./services";
import { login, logout, updateMessages, setError, updateUsers } from "./state";

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
        return fetchUsers();
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
        render({ state, appEl });
      })
      .then((users) => {
        updateUsers(users.users);
        render({ state, appEl });
        return fetchMessages();
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
        logout();
      })
      .then((messages) => {
        const { messagesList } = messages;
        updateMessages(messagesList);
        render({ state, appEl });
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
        logout();
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
    if (message) {
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
          const { messagesList } = messages;
          updateMessages(messagesList);
          render({ state, appEl });
          const scrollDiv = document.querySelector(".messages");
          scrollDiv.scrollTop = scrollDiv.scrollHeight;
        })
        .catch((err) => {
          logout();
          setError(err?.error || "ERROR");
          render({ state, appEl });
        });
    }
  });
}
