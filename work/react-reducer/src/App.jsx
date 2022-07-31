import { useReducer, useEffect } from "react";
import reducer, { initialState } from "./reducer";
import { LOGIN_STATUS, CLIENT, SERVER, ACTIONS } from "./constants";
import {
  fetchLogin,
  fetchSession,
  fetchLogout,
  fetchUsers,
  fetchMessages,
  fetchAddMessage,
} from "./services";

import Login from "./Login";
import Navbar from "./Navbar";
import UsersList from "./UsersList";
import Messages from "./Messages";
import Outgoing from "./Outgoing";
import Loader from "./Loader";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function checkForSession() {
    fetchSession()
      .then((session) => {
        const { username } = session.userData;
        dispatch({ type: ACTIONS.LOG_IN, username });
        dispatch({ type: ACTIONS.START_LOADING_USERS });
        return fetchUsers();
      })
      .then((users) => {
        const usersList = users.users;
        dispatch({ type: ACTIONS.UPDATE_USERS, usersList });
        dispatch({ type: ACTIONS.START_LOADING_MESSAGES });
        return fetchMessages();
      })
      .then((messages) => {
        const { messagesList } = messages;
        dispatch({ type: ACTIONS.LOAD_MESSAGES, messagesList });
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          dispatch({ type: ACTIONS.LOG_OUT });
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      });
  }

  function onLogin(username) {
    fetchLogin(username)
      .then(() => {
        dispatch({ type: ACTIONS.LOG_IN, username });
        dispatch({ type: ACTIONS.START_LOADING_USERS });
        return fetchUsers();
      })
      .then((users) => {
        const usersList = users.users;
        dispatch({ type: ACTIONS.UPDATE_USERS, usersList });
        dispatch({ type: ACTIONS.START_LOADING_MESSAGES });
        return fetchMessages();
      })
      .then((messages) => {
        const { messagesList } = messages;
        dispatch({ type: ACTIONS.LOAD_MESSAGES, messagesList });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onAddMessage(message) {
    fetchAddMessage(state.username, message)
      .then((msg) => {
        const { newMessage } = msg;
        dispatch({ type: ACTIONS.ADD_MESSAGE, newMessage });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT });
    fetchLogout().catch((err) => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
    });
    console.log(state);
  }

  function checkForMessages() {
    fetchMessages()
      .then((messages) => {
        const { messagesList } = messages;
        dispatch({ type: ACTIONS.LOAD_MESSAGES, messagesList });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  setInterval(() => {
    if (state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN) {
      checkForMessages();
    }
  }, 5000);

  useEffect(() => {
    checkForSession();
  }, []);

  return (
    <div className="app">
      <main>
        {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
          <Login onLogin={onLogin} error={state.error} />
        )}
        {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <>
            <Navbar username={state.username} onLogout={onLogout} />
            <div className="messages-container">
              <UsersList users={state.users} />
              <Messages messages={state.messages} />
              <Outgoing onAddMessage={onAddMessage} />
            </div>
          </>
        )}
        {state.loginStatus === LOGIN_STATUS.PENDING && <Loader />}
      </main>
    </div>
  );
}

export default App;
