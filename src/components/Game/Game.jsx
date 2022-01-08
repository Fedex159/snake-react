import React, { useState, useContext } from "react";
import s from "./Game.module.css";
import CountDown from "./CountDown/CountDown";
import StartGame from "./StartGame/StartGame";
import { StateGlobal } from "../Context/Context";
import Board from "./Board/Board";

function Game() {
  const [showCountDown, setShowCountDown] = useState(false);
  const { difficult } = useContext(StateGlobal);

  return (
    <div className={s.container}>
      {showCountDown ? (
        <CountDown setShowCountDown={setShowCountDown} />
      ) : difficult ? (
        <Board />
      ) : (
        <StartGame setShowCountDown={setShowCountDown} />
      )}
    </div>
  );
}

export default Game;
