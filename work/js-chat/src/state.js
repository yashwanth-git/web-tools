import { MESSAGES } from "./constants";

const state = {
  messages: {},
  isLoggedIn: false,
  isLoginPending: true,
  isMessagePending: true,
  username: "",
  error: "",
};

export const waitOnLogin = () => {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = "";
  state.messages = {};
  state.error = "";
};

export const login = (username) => {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = "";
};

export const logout = () => {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = "";
  state.messages = {};
  state.error = "";
};

export const setError = (error) => {
  console.log(error);
  if (!error) {
    state.error = "";
    return;
  }
  state.error = MESSAGES[error] || MESSAGES.default;
};

export default state;
