import React from "react";
import arrowsKeys from "../../../assets/imgs/arrowsKeys.png";
import s from "./ArrowsKeys.module.css";

const keys = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];

function ArrowsKeys({ handleKey }) {
  const handleClick = (event) => {
    if (handleKey) {
      handleKey({ key: event.target.value });
    }
  };

  return (
    <div
      className={s.container}
      style={{
        backgroundImage: `url(${arrowsKeys})`,
      }}
    >
      <button
        value={keys[0]}
        className={`${s.btn} ${s.btnUp}`}
        onClick={handleClick}
      ></button>
      <button
        value={keys[1]}
        className={`${s.btn} ${s.btnDown}`}
        onClick={handleClick}
      ></button>
      <button
        value={keys[2]}
        className={`${s.btn} ${s.btnRight}`}
        onClick={handleClick}
      ></button>
      <button
        value={keys[3]}
        className={`${s.btn} ${s.btnLeft}`}
        onClick={handleClick}
      ></button>
    </div>
  );
}

export default ArrowsKeys;
