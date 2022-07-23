import { useState, useEffect } from "react";
import { LOGIN_STATUS, SERVER, CLIENT } from "./constants";
import { fetchLogin, fetchSession, fetchLogout } from "./services";
import "./App.css";
import Login from "./Login";
import Loader from "./Loader";

function App() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);

  function checkForSession() {
    fetchSession()
      .then((session) => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
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
      .then((uname) => {
        setUsername(uname);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
      })
      .catch((err) => {
        setError(err?.error || "ERROR");
      });
  }

  function onLogout() {
    setError("");
    setUsername("");
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    fetchLogout().catch((err) => {
      setError(err?.error || "ERROR");
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
          <Login onLogin={onLogin}></Login>
        )}
      </main>
    </div>
  );
}

export default App;
