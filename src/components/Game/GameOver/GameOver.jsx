import React, { useContext, useEffect } from "react";
import gameOverSFX from "../../../assets/sounds/gameOver.mp3";
import { StateGlobal } from "../../Context/Context";
import { addToLocalStorage } from "../../../utils";
import s from "./GameOver.module.css";

function GameOver() {
  const { enableSound, setShowPoints, setPoints, setMaxPoints, setDifficult } =
    useContext(StateGlobal);

  useEffect(() => {
    const audio = new Audio(gameOverSFX);

    if (enableSound) audio.play();

    setDifficult((difficult) => {
      setPoints((points) => {
        setMaxPoints((max) => {
          const newMax = {
            ...max,
            [difficult.name]:
              points > max[difficult.name] ? points : max[difficult.name],
          };
          addToLocalStorage("maxPoints", newMax);
          return newMax;
        });
        return points;
      });

      return difficult;
    });
    // eslint-disable-next-line
  }, []);

  const handleClick = () => {
    setShowPoints(false);
    setPoints(0);
    setDifficult(null);
  };

  return (
    <div className={s.container}>
      <h2>Game Over</h2>
      <button onClick={handleClick}>Retry</button>
    </div>
  );
}

export default GameOver;
