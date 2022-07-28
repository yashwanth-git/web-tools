import React, { useState }  from "react";
import "./Form.css";

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
    const patternCheck = "^[a-zA-Z0-9]*$";
    const unameRegexCheck = formattedUname.match(patternCheck);
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
      <div className="login-container">
        <div className="login-form">
          <h2 className="login-title">Login</h2>
          <form>
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
            <button onClick={submitHandler} className="login-btn">
              Login
            </button>
          </form>
          {error && <span className="error-msg">{error}</span>}
        </div>
      </div>
  );
}

export default Login;
