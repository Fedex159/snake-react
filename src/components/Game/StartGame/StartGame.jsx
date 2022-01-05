import React from "react";
import s from "./StartGame.module.css";

const options = ["Easy", "Medium", "Hard"];

function StartGame() {
  return (
    <div className={s.container}>
      <h2>Snake React</h2>
      <h4>SELECT DIFFICULT:</h4>
      <div className={s.options}>
        {options.map((o, i) => (
          <span key={`${o}_${i}`}>{o}</span>
        ))}
      </div>
    </div>
  );
}

export default StartGame;
