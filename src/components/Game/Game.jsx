import React, { useState } from "react";
import s from "./Game.module.css";
import StartGame from "./StartGame/StartGame";
import Board from "./Board/Board";

function Game() {
  const [difficult, setDifficult] = useState("");

  return (
    <div className={s.container}>
      {difficult ? (
        <Board difficult={difficult} />
      ) : (
        <StartGame setDifficult={setDifficult} />
      )}
    </div>
  );
}

export default Game;
