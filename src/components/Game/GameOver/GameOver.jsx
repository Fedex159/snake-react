import React from "react";
import s from "./GameOver.module.css";

function GameOver({ setDifficult }) {
  return (
    <div className={s.container}>
      <h2>Game Over</h2>
      <button onClick={() => setDifficult("")}>Retry</button>
    </div>
  );
}

export default GameOver;
