import React from "react";
import gameOverSFX from "../../../assets/sounds/gameOver.mp3";
import s from "./GameOver.module.css";

function GameOver({ setDifficult, setShowPoints }) {
  const audio = new Audio(gameOverSFX);
  audio.play();

  const handleClick = () => {
    setDifficult("");
    setShowPoints(false);
  };

  return (
    <div className={s.container}>
      <h2>Game Over</h2>
      <button onClick={handleClick}>Retry</button>
    </div>
  );
}

export default GameOver;
