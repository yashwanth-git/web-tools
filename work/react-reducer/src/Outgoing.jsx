import "./Outgoing.css";
import { useState } from "react";

const Outgoing = ({ onAddMessage }) => {
  const [message, setMessage] = useState("");

  const inputHandler = (e) => {
    setMessage(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onAddMessage(message);
    setMessage("");
  };
  return (
    <div className="outgoing">
      <form className="chat-send-form" onSubmit={submitHandler}>
        <input
          type="text"
          className="to-send"
          name="message"
          placeholder="Type your message"
          value={message}
          onInput={inputHandler}
        />
        <button type="submit" className="send-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default Outgoing;
