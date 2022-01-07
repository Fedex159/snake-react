import React, { useState } from "react";
import s from "./Game.module.css";
import CountDown from "./CountDown/CountDown";
import StartGame from "./StartGame/StartGame";
import Board from "./Board/Board";

function Game() {
  const [difficult, setDifficult] = useState("");
  const [showCountDown, setShowCountDown] = useState(false);

  return (
    <div className={s.container}>
      {showCountDown ? (
        <CountDown setShowCountDown={setShowCountDown} />
      ) : difficult ? (
        <Board difficult={difficult} setDifficult={setDifficult} />
      ) : (
        <StartGame
          setDifficult={setDifficult}
          setShowCountDown={setShowCountDown}
        />
      )}
    </div>
  );
}

export default Game;
