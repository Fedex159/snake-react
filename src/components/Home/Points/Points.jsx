import React from "react";
import s from "./Points.module.css";

function Points({ points, maxPoints }) {
  return (
    <div className={s.container}>
      <h3>{points}</h3>
      <h3>{maxPoints}</h3>
    </div>
  );
}

export default Points;
