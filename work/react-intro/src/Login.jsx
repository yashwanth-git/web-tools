import React from "react";
import { useState } from "react";
import "./Login.css";

function Login({setIsLoggedIn}) {
  const [error, setError] = useState("");
  const [username, setUserName] = useState("");

  const inputHandler = (e) => {
    setUserName(e.target.value);
    setError(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formattedUname = username.trim().toLowerCase();
    const regex = "^[a-zA-Z0-9]*$";
    const unameRegexCheck = formattedUname.match(regex);
    if (username === "dog") {
      setError("The user is not valid");
      setUserName('')
      return;
    }
    if(!unameRegexCheck || !formattedUname){
        setError("Invalid username. Username should contain valid characters")
        setUserName('')
        return;
    }
    setIsLoggedIn(true);
  };

  return (
    <>
      <div className="heading">
        <h1>Guessing Game</h1>
      </div>
      <div className="login-container">
        <div className="login-form">
          <h2 className="login-title">Login</h2>
          <form method="POST" action="./login">
            <div className="input-field">
              <input
                type="text"
                className="username"
                name="username"
                value={username}
                onInput={inputHandler}
                placeholder=" "
              />
              <label htmlFor="username">Username</label>
            </div>
            <button type="submit" onClick={submitHandler} className="login-btn">
              Login
            </button>
          </form>
          {error && <span class="error-msg">{error}</span>}
        </div>
      </div>
    </>
  );
}

export default Login;
