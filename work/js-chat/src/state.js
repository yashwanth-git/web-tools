import { MESSAGES } from "./constants";

const state = {
  messages: {},
  users: {},
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

export const waitOnMessages = () => {
  state.messages = {};
  state.isMessagePending = true;
  state.error = "";
};

export const updateMessages = (messages) => {
  state.messages = messages;
  state.isMessagePending = false;
  state.error = "";
};

export const updateUsers = (users) => {
  state.users = users;
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

export const setMessages = () => {
  state.isLoggedIn = true;
  state.error = "";
};

export default state;
