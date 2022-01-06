import React from "react";
import s from "./StartGame.module.css";

const options = [
  { name: "Easy", value: 500 },
  { name: "Medium", value: 200 },
  { name: "Hard", value: 50 },
];

function StartGame({ setDifficult }) {
  const handleClick = (event) => {
    const value = event.target.id.split("_")[1];
    setDifficult(value);
  };

  return (
    <div className={s.container}>
      <h2>Snake React</h2>
      <h4>SELECT DIFFICULT:</h4>
      <div className={s.options}>
        {options.map((o, i) => (
          <span
            key={`${o.name}_${i}`}
            onClick={handleClick}
            id={`${o.name}_${o.value}`}
          >
            {o.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default StartGame;