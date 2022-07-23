import { useState } from "react";
import "./Form.css";

function Login({ onLogin, error }) {
  const [username, setUserName] = useState("");

  const inputHandler = (e) => {
    setUserName(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (username) {
      onLogin(username);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-title">Login</h2>
        <form onSubmit={submitHandler}>
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
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        {error && <span className="error-msg">{error}</span>}
      </div>
    </div>
  );
}

export default Login;
