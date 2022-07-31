import { useReducer, useEffect } from "react";
import reducer, { initialState } from "./reducer";
import { LOGIN_STATUS, CLIENT, SERVER, ACTIONS } from "./constants";
import { fetchLogin, fetchSession, fetchLogout } from "./services";

import Login from "./Login";
import Navbar from "./Navbar";
import UsersList from "./UsersList";
import Messages from "./Messages";
import Outgoing from "./Outgoing";

import "./App.css";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  function checkForSession() {
    fetchSession()
      .then((session) => {
        const { username } = session.userData;
        dispatch({ type: ACTIONS.LOG_IN, username });
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
      .then((res) => {
        dispatch({ type: ACTIONS.LOG_IN, username });
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
  }

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
              {/* <UsersList />
              <Messages /> */}
              <Outgoing />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
