import { useState, useEffect } from "react";
import {
  LOGIN_STATUS,
  WORD_STATUS,
  SERVER,
  CLIENT,
  MESSAGES,
} from "./constants";
import {
  fetchLogin,
  fetchSession,
  fetchLogout,
  fetchWord,
} from "./services";
import "./App.css";
import Login from "./Login";
import Loader from "./Loader";
import Navbar from "./Navbar";
import Word from "./Word";

function App() {
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [wordStatus, setWordStatus] = useState(WORD_STATUS.PENDING);

  function checkForSession() {
    fetchSession()
      .then((session) => {
        const { userData } = session;
        setUserDetails({
          username: userData.username,
          word: userData.word,
        });
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setWordStatus(WORD_STATUS.IS_AVAILABLE);
      })
      .catch((err) => {
        if (err?.error === SERVER.AUTH_MISSING) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      });
  }

  function onLogin(username) {
    fetchLogin(username)
      .then((user) => {
        const { userData } = user;
        setUserDetails(userData);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setWordStatus(WORD_STATUS.IS_AVAILABLE);
      })
      .catch((err) => {
        setError(MESSAGES[err?.error] || "ERROR");
      });
  }

  function onUpdateWord(word) {
    setWordStatus(WORD_STATUS.PENDING);
    fetchWord(word)
      .then((user) => {
        const { userData } = user;
        setUserDetails({
          username: userData.username,
          word: userData.word,
        });
        setWordStatus(WORD_STATUS.IS_AVAILABLE);
      })
      .catch((err) => {
        setError(MESSAGES[err?.error] || "ERROR");
      });
  }

  function onLogout() {
    setError("");
    setUserDetails({});
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout().catch((err) => {
      setError(MESSAGES[err?.error] || "ERROR");
    });
  }

  useEffect(() => {
    checkForSession();
  }, []);
  return (
    <div className="app">
      <main>
        {loginStatus === LOGIN_STATUS.PENDING && <Loader></Loader>}
        {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && (
          <Login onLogin={onLogin} error={error}></Login>
        )}
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <>
            <Navbar username={userDetails.username} onLogout={onLogout} />
            {wordStatus === WORD_STATUS.PENDING && <Loader></Loader>}
            <Word
              onUpdateWord={onUpdateWord}
              word={userDetails.word}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
