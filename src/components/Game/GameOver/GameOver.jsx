import React, { useContext } from "react";
import gameOverSFX from "../../../assets/sounds/gameOver.mp3";
import { SoundContext } from "../../Home/Home";
import s from "./GameOver.module.css";

function GameOver({ setDifficult, setShowPoints }) {
  const { enableSound } = useContext(SoundContext);
  const audio = new Audio(gameOverSFX);

  if (enableSound) audio.play();

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
