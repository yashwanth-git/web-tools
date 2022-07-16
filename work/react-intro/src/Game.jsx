import React, { useState } from "react";
import "./Form.css";

function Game() {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");

  const inputHandler = (e) => {
      setWord(e.target.value);
      setError(false);
  }

  const submitHandler = (e) => {
      e.preventDefault();
      console.log(word.trim().length)
      if(word.trim().length === 0){
          setError("The word cannot be empty");
      }
      else if(word.length !== 5){
          setError(`The ${word} is not valid`);
      }
  }
  return (
    <div className="game-container">
      <div className="game-form">
        <h2 className="game-title">Game</h2>
        <form method="POST">
          <div className="input-field">
            <input
              type="text"
              className="word"
              name="word"
              value={word}
              onInput={inputHandler}
              placeholder=" "
            />
            <label htmlFor="word">Word</label>
          </div>
          <button onClick={submitHandler} className="guess-btn">
            Guess
          </button>
        </form>
        {error && <span className="error-msg">{error}</span>}
      </div>
    </div>
  );
}

export default Game;
