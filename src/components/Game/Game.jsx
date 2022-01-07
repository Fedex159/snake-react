import React, { useState } from "react";
import s from "./Game.module.css";
import CountDown from "./CountDown/CountDown";
import StartGame from "./StartGame/StartGame";
import Board from "./Board/Board";

function Game({ setPoints, setMaxPoints, setShowPoints, enableSound }) {
  const [difficult, setDifficult] = useState("");
  const [showCountDown, setShowCountDown] = useState(false);

  return (
    <div className={s.container}>
      {showCountDown ? (
        <CountDown
          setShowCountDown={setShowCountDown}
          enableSound={enableSound}
        />
      ) : difficult ? (
        <Board
          difficult={difficult}
          setDifficult={setDifficult}
          setPoints={setPoints}
          setMaxPoints={setMaxPoints}
          setShowPoints={setShowPoints}
          enableSound={enableSound}
        />
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
