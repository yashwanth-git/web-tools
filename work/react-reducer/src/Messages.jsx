import "./Messages.css";

const Messages = ({ messages }) => {
  return (
    <ol className="messages">
      {Object.values(messages).length > 0 ? (
        Object.values(messages).map((message) => (
          <li key={message.id}>
            <div className="message">
              <span className="sender-avatar">
                {message.username.charAt(0)}
              </span>
              <div className="message-content">
                <p className="message-sender">{message.username}</p>
                <p className="message-text">{message.message}</p>
              </div>
            </div>
          </li>
        ))
      ) : (
        <div className="no-messages">
          <h2>No Messages Yet</h2>
        </div>
      )}
    </ol>
  );
};

export default Messages;
