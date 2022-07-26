import { useState } from "react";
import "./Form.css";
const Word = ({ onUpdateWord, word }) => {
  const [userWord, setUserWord] = useState("");

  const inputHandler = (e) => {
    setUserWord(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (userWord) {
      onUpdateWord(userWord);
      setUserWord('');
    }
  };

  return (
    <div className="update-container">
      <div className="user-word">
        <p>
          <span className="word-label">Word</span>
          <span className="word-content">
            {!word ? "No word has been updated" : word}
          </span>
        </p>
      </div>
      <div className="update-form">
        <h1 className="update-title">Update Word</h1>
        <form onSubmit={submitHandler}>
          <div className="input-field">
            <input
              type="text"
              id="word"
              className="word"
              value={userWord}
              onInput={inputHandler}
              name="word"
              placeholder=" "
            />
            <label htmlFor="word">Word</label>
          </div>
          <button className="update-btn">Update</button>
        </form>
      </div>
    </div>
  );
};

export default Word;
