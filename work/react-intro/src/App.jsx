import "./App.css";
import { useState } from "react";
import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="app">
      {!isLoggedIn && <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
    </div>
  );
}

export default App;
