import React from "react";
import s from "./Game.module.css";
import StartGame from "./StartGame/StartGame";

function Game() {
  return (
    <div className={s.container}>
      <StartGame />
    </div>
  );
}

export default Game;
