import React, { useContext } from "react";
import { StateGlobal } from "../../Context/Context";
import s from "./Points.module.css";

function Points() {
  const { points, maxPoints, difficult } = useContext(StateGlobal);

  return (
    <div className={s.container}>
      <h3>{points}</h3>
      <h3>
        {difficult ? `${difficult.name} ${maxPoints[difficult.name]}` : null}
      </h3>
    </div>
  );
}

export default Points;
