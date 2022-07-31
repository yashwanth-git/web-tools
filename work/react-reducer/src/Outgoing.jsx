import "./Outgoing.css";

const Outgoing = () => {
  return (
    <div className="outgoing">
      <form className="chat-send-form">
        <input
          type="text"
          className="to-send"
          name="message"
          placeholder="Type your message"
        />
        <button type="submit" className="send-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default Outgoing;
