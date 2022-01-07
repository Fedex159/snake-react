import React from "react";
import s from "./StartGame.module.css";

const options = [
  { name: "Easy", value: 200 },
  { name: "Medium", value: 100 },
  { name: "Hard", value: 50 },
];

function StartGame({ setDifficult, setShowCountDown }) {
  const handleClick = (event) => {
    const value = event.target.id.split("_")[0];
    const option = options.find((o) => o.name === value);

    setDifficult(option ? option.value : "100");
    setShowCountDown(true);
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
