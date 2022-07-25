import { useState } from "react";
import "./Form.css";
const Message = ({ onUpdateMessage, message }) => {
  const [userMessage, setUserMessage] = useState("");

  const inputHandler = (e) => {
    setUserMessage(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (userMessage) {
      onUpdateMessage(userMessage);
      setUserMessage('');
    }
  };

  return (
    <div className="update-container">
      <div className="user-message">
        <p>
          <span className="message-label">Word</span>
          <span className="message-content">
            {!message ? "No word has been updated" : message}
          </span>
        </p>
      </div>
      <div className="update-form">
        <h1 className="update-title">Update Word</h1>
        <form onSubmit={submitHandler}>
          <div className="input-field">
            <input
              type="text"
              id="message"
              className="message"
              value={userMessage}
              onInput={inputHandler}
              name="message"
              placeholder=" "
            />
            <label htmlFor="message">Word</label>
          </div>
          <button className="update-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Message;
