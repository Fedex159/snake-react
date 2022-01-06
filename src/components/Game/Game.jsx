import React from "react";
import s from "./Game.module.css";
// import StartGame from "./StartGame/StartGame";
import Board from "./Board/Board";

function Game() {
  return (
    <div className={s.container}>
      {/* <StartGame /> */}
      <Board />
    </div>
  );
}

export default Game;
