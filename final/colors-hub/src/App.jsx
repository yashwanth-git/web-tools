import { useReducer, useEffect, useState } from "react";
import reducer, { initialState } from "./reducer";
import { LOGIN_STATUS, CLIENT, SERVER, ACTIONS } from "./constants";

import {
  fetchLogin,
  fetchSession,
  fetchLogout,
  fetchAddColors,
  fetchColors,
  fetchAddSavedColors,
  fetchRemoveSavedColors,
  fetchRemoveUserColor,
} from "./services";

import Login from "./Login";
import Navbar from "./Navbar";
import Create from "./Create";
import Home from "./Home";
import Saved from "./Saved";
import MyColors from "./MyColors";
import About from "./About";
import Loader from "./Loader";

import "./App.css";

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
        const { username, savedPalettes, userPalettes } = session.userData;
        dispatch({ type: ACTIONS.LOG_IN, username });
        dispatch({ type: ACTIONS.COLORS_PENDING });
        dispatch({ type: ACTIONS.GET_SAVED_COLORS, savedPalettes });
        dispatch({ type: ACTIONS.GET_USER_COLORS, userPalettes });
        return fetchColors();
      })
      .then((results) => {
        const { colorPalettes, next, lastPage, currentPage } = results;
        dispatch({ type: ACTIONS.PAGE, next, currentPage, lastPage });
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
    fetchLogin(username)
      .then(() => {
        dispatch({ type: ACTIONS.LOG_IN, username });
        dispatch({ type: ACTIONS.COLORS_PENDING });
        return fetchColors();
      })
      .then((results) => {
        const { colorPalettes, next, lastPage, currentPage } = results;
        dispatch({ type: ACTIONS.PAGE, next, currentPage, lastPage });
        dispatch({ type: ACTIONS.REPLACE_COLORS, colorPalettes });
        setPage("home");
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
    setPage("");
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

  function onRemoveSavedColorPalette(id) {
    fetchRemoveSavedColors(id)
      .then((removedPalettedId) => {
        dispatch({ type: ACTIONS.REMOVE_SAVED_COLOR, removedPalettedId });
        checkForSession();
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  function onRemoveUserColor(id) {
    fetchRemoveUserColor(id)
      .then((removedPalettedId) => {
        dispatch({ type: ACTIONS.REMOVE_USER_COLOR, removedPalettedId });
        checkForSession();
      })
      .catch((err) => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error });
      });
  }

  const onChangeMode = () => {
    dispatch({ type: ACTIONS.TOGGLE_MODE });
  };

  const onPageChange = (e) => {
    if (e.target.classList.contains("pages")) {
      const current = e.target.dataset.page;

      fetchColors(current)
        .then((results) => {
          const { colorPalettes, next, currentPage, lastPage } = results;

          dispatch({ type: ACTIONS.PAGE, currentPage, next, lastPage });
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
    if (e.target.dataset.move === "left") {
      const newPage = state.currentPage - 1;
      if (!newPage < 1) {
        fetchColors(newPage)
          .then((results) => {
            const { colorPalettes, next, currentPage, lastPage } = results;

            dispatch({ type: ACTIONS.PAGE, currentPage, next, lastPage });
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
    }
    if (e.target.dataset.move === "right") {
      const newPage = state.currentPage + 1;
      if (newPage <= state.lastPage) {
        fetchColors(newPage)
          .then((results) => {
            const { colorPalettes, next, currentPage, lastPage } = results;

            dispatch({ type: ACTIONS.PAGE, currentPage, next, lastPage });
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
    }
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
              <>
                {state.isColorsPending && <Loader />}
                <Home
                  colorPalettes={state.colors}
                  savedPalettes={state.savedColors}
                  onSaveColorPalette={onSaveColorPalette}
                  currentPage={state.currentPage}
                  lastPage={state.lastPage}
                  nextPage={state.nextPage}
                  onPageChange={onPageChange}
                />
              </>
            )}
            {page === "create" && (
              <Create onCreateColorPalette={onCreateColorPalette} />
            )}
            {page === "saved" && (
              <Saved
                colorPalettes={state.savedColors}
                onRemoveSavedColorPalette={onRemoveSavedColorPalette}
              />
            )}
            {page === "user-colors" && (
              <MyColors
                colorPalettes={state.userColors}
                onRemoveUserColor={onRemoveUserColor}
              />
            )}
            {page === "about" && <About />}
          </main>
        </>
      )}
    </div>
  );
}

export default App;
