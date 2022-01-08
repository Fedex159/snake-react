import React from "react";
import s from "./Points.module.css";

function Points({ points, maxPoints, difficult }) {
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
