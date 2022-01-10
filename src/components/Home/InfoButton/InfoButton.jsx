import React from "react";
import s from "./InfoButton.module.css";

function InfoButton({ setShowInfo }) {
  return (
    <div className={s.container} onClick={() => setShowInfo((prev) => !prev)}>
      ?
    </div>
  );
}

export default InfoButton;
