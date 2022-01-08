import React, { useContext } from "react";
import gameOverSFX from "../../../assets/sounds/gameOver.mp3";
import { StateGlobal } from "../../Context/Context";
import s from "./GameOver.module.css";

function GameOver() {
  const { enableSound, setShowPoints, setPoints, setMaxPoints, setDifficult } =
    useContext(StateGlobal);
  const audio = new Audio(gameOverSFX);

  if (enableSound) audio.play();

  const handleClick = () => {
    setDifficult((difficult) => {
      setPoints((points) => {
        setMaxPoints((max) => {
          const newMax = {
            ...max,
            [difficult.name]:
              points > max[difficult.name] ? points : max[difficult.name],
          };
          return newMax;
        });
        return 0;
      });

      return null;
    });

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
