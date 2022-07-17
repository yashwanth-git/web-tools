import React, { useState } from "react";
import "./Form.css";
import "./Game.css";
import compare from "./compare";

function Game() {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  const [gameStat, setGameStat] = useState({class: '', message: ''});

  const secretWord = "recat";
  const inputHandler = (e) => {
    setWord(e.target.value);
    setError("");
    setGameStat({});
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (word.trim().length === 0) {
      setError("The word cannot be empty");
    } else if (word.length !== 5) {
      setError(`The ${word} is not valid`);
    } else {
      const commonWords = compare(secretWord, word.toLowerCase());
      if (commonWords > 0) {
        setGameStat({
          class: "warning",
          message: `${word} had ${commonWords} letter in common`,
        });
      }
      if (secretWord === word.toLowerCase()) {
        setGameStat({
          class: "success",
          message: `${word} is the secret word`,
        });
      }
    }
  };
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
        {gameStat.message && <span className={gameStat.class}>{gameStat.message}</span>}
      </div>
    </div>
  );
}

export default Game;
