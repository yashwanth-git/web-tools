import { useState, useEffect } from "react";
import {
  LOGIN_STATUS,
  MESSAGE_STATUS,
  SERVER,
  CLIENT,
  MESSAGES,
} from "./constants";
import {
  fetchLogin,
  fetchSession,
  fetchLogout,
  fetchMessage,
} from "./services";
import "./App.css";
import Login from "./Login";
import Loader from "./Loader";
import Navbar from "./Navbar";
import Message from "./Message";

function App() {
  const [userDetails, setUserDetails] = useState({});
  const [error, setError] = useState("");
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [messageStatus, setMessageStatus] = useState(MESSAGE_STATUS.PENDING);

  function checkForSession() {
    fetchSession()
      .then((session) => {
        const { userData } = session;
        setUserDetails({
          username: userData.username,
          message: userData.message,
        });
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        setMessageStatus(MESSAGE_STATUS.IS_AVAILABLE);
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
        setMessageStatus(MESSAGE_STATUS.IS_AVAILABLE);
      })
      .catch((err) => {
        setError(MESSAGES[err?.error] || "ERROR");
      });
  }

  function onUpdateMessage(message) {
    setMessageStatus(MESSAGE_STATUS.PENDING);
    fetchMessage(message)
      .then((user) => {
        const { userData } = user;
        setUserDetails({
          username: userData.username,
          message: userData.message,
        });
        setMessageStatus(MESSAGE_STATUS.IS_AVAILABLE);
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
            {messageStatus === MESSAGE_STATUS.PENDING && <Loader></Loader>}
            <Message
              onUpdateMessage={onUpdateMessage}
              message={userDetails.message}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
