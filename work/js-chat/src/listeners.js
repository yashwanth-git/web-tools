import render from "./render";
import {
  fetchAddMessage,
  fetchLogin,
  fetchLogout,
  fetchMessages,
  fetchUsers,
} from "./services";
import state, {
  login,
  logout,
  updateMessages,
  setError,
  updateUsers,
  waitOnUsers,
  waitOnMessages,
  waitOnLogin,
} from "./state";

const appEl = document.querySelector("#chat-app");
function checkForMessages() {
  fetchUsers()
    .then((users) => {
      updateUsers(users.users);
      render({ state, appEl });
      waitOnMessages();
      return fetchMessages();
    })
    .catch((err) => {
      console.log(err);
    })
    .then((messages) => {
      const { messagesList } = messages;
      updateMessages(messagesList);
      render({ state, appEl });
      const scrollDiv = document.querySelector(".messages");
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
      const inputEl = document.querySelector(".to-send");
      inputEl.focus();
    })
    .catch((err) => {
      console.log(err);
    });
}

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
        waitOnUsers();
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
        waitOnMessages();
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
        const inputEl = document.querySelector(".to-send");
        inputEl.focus();
        const scrollDiv = document.querySelector(".messages");
        scrollDiv.scrollTop = scrollDiv.scrollHeight;
        setInterval(checkForMessages, 5000);
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
          const inputEl = document.querySelector(".to-send");
          inputEl.focus();
        })
        .catch((err) => {
          logout();
          setError(err?.error || "ERROR");
          render({ state, appEl });
        });
    }
  });
}
