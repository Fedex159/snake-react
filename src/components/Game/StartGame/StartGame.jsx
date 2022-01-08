import React, { useContext } from "react";
import { StateGlobal } from "../../Context/Context";
import s from "./StartGame.module.css";

const options = [
  { name: "Easy", value: 200 },
  { name: "Medium", value: 100 },
  { name: "Hard", value: 50 },
];

function StartGame({ setShowCountDown }) {
  const { setDifficult } = useContext(StateGlobal);

  const handleClick = (event) => {
    const option = options.find((o) => o.name === event.target.value);

    setDifficult(option);
    setShowCountDown(true);
  };

  return (
    <div className={s.container}>
      <h2>Snake React</h2>
      <h4>SELECT DIFFICULT:</h4>
      <div className={s.options}>
        {options.map((o, i) => (
          <button key={`${o.name}_${i}`} onClick={handleClick} value={o.name}>
            {o.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default StartGame;
