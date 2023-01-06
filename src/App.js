import "./App.css";
import Opening from "./components/Opening";
import Game from "./components/game";
import React from "react";
function App() {
  const [start, setStart] = React.useState(false);
  function startGame() {
    setStart(true);
  }
  return (
    <div className="app">
      <div className="blob"></div>
      <div className="blob-2"></div>
      {start ? <Game /> : <Opening startGame={startGame} />}
    </div>
  );
}

export default App;
