import { useReducer, useEffect, useState } from "react";
import reducer, { initialState } from "./reducer";
import { LOGIN_STATUS, CLIENT, SERVER, ACTIONS } from "./constants";

import {
  fetchLogin,
  fetchAdmin,
  fetchSession,
  fetchLogout,
  fetchAddColors,
  fetchColors,
  fetchAddSavedColors,
} from "./services";

import Login from "./Login";
import Navbar from "./Navbar";
import Create from "./Create";

import "./App.css";
import Home from "./Home";
import Saved from "./Saved";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [page, setPage] = useState("home");

  function onNavigate(e) {
    if (
      e.target.classList.value === "navbar-option" ||
      e.target.classList.value === "logo"
    ) {
      setPage(e.target.dataset.page);
    }
  }

  function checkForSession() {
    fetchSession()
      .then((session) => {
        const { username, savedPalettes } = session.userData;
        dispatch({ type: ACTIONS.LOG_IN, username });
        dispatch({ type: ACTIONS.GET_SAVED_COLORS, savedPalettes})
        return fetchColors();
      })
      .then((colors) => {
        const { colorPalettes } = colors;
        dispatch({ type: ACTIONS.REPLACE_COLORS, colorPalettes });
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
    if (username === "admin") {
      fetchAdmin(username)
        .then((users, colors) => {
          dispatch({ type: ACTIONS.ADMIN_LOGIN, users, colors });
        })
        .catch((err) => {
          dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
        });
    } else {
      fetchLogin(username)
        .then(() => {
          dispatch({ type: ACTIONS.LOG_IN, username });
        })
        .catch((err) => {
          dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
        });
    }
  }

  function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT });
    fetchLogout().catch((err) => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
    });
  }

  function onCreateColorPalette(colorPalette) {
    fetchAddColors(colorPalette)
      .then((returnedPalette) => {
        dispatch({ type: ACTIONS.ADD_COLORS, returnedPalette });
        setPage("home");
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onSaveColorPalette(id) {
    fetchAddSavedColors(id)
      .then((savedPalette) => {
        dispatch({ type: ACTIONS.ADD_SAVED_COLORS, savedPalette });
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

  useEffect(() => {
    window.history.pushState({}, "", `/${page}`);
    checkForSession();
  }, [page]);

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
            onNavigate={onNavigate}
            onLogout={onLogout}
          />
          <main className={`main-content ${state.darkTheme ? "dark" : ""}`}>
            {page === "home" && (
              <Home
                colorPalettes={state.colors}
                onSaveColorPalette={onSaveColorPalette}
              />
            )}
            {page === "create" && (
              <Create onCreateColorPalette={onCreateColorPalette} />
            )}
            {page === "saved" && <Saved
                colorPalettes={state.savedColors}
                onSaveColorPalette={onSaveColorPalette}
              />}
            {page === "about" && <h1>About</h1>}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
