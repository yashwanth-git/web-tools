import "./App.css";
import { useState } from "react";
import Login from "./Login";
import Game from "./Game";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="app">
      <div className="heading">
        <h1>Guessing Game</h1>
      </div>
      {!isLoggedIn ? (
        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <Game />
      )}
    </div>
  );
}

export default App;
