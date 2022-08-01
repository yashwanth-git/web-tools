import { useReducer, useEffect } from "react";
import reducer, { initialState } from "./reducer";
import { LOGIN_STATUS, CLIENT, SERVER, ACTIONS } from "./constants";

import { fetchLogin, fetchSession } from "./services";

import Login from "./Login";
import Navbar from "./Navbar";

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
      .then(() => {
        dispatch({ type: ACTIONS.LOG_IN, username });
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  const onChangeMode = () => {
    dispatch({ type: ACTIONS.TOGGLE_MODE });
  };

  useEffect(() => {
    checkForSession();
  }, []);

  return (
    <div className="app">
      {state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
        <Login onLogin={onLogin} error={state.error} />
      )}
      {state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
        <>
          <Navbar
            username={state.username}
            onChangeMode={onChangeMode}
            darkTheme={state.darkTheme}
          />
          <main className={`main-content ${state.darkTheme ? "dark" : ""}`}>
            <h1>Hello</h1>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
