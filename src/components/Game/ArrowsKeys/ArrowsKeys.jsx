import React, { useState, useEffect } from "react";
import arrowsKeys from "../../../assets/imgs/arrowsKeys.png";
import s from "./ArrowsKeys.module.css";

const keys = ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"];

function ArrowsKeys({ handleKey, keyOn }) {
  const [key, setKey] = useState(null);

  const handleClick = (event) => {
    if (handleKey) {
      handleKey({ key: event.target.value });
    }
  };

  useEffect(() => {
    setKey(keyOn);
  }, [keyOn]);

  useEffect(() => {
    if (key) {
      setTimeout(() => {
        setKey(null);
      }, [100]);
    }
  }, [key]);

  return (
    <div
      className={s.container}
      style={{
        backgroundImage: `url(${arrowsKeys})`,
      }}
    >
      <button
        value={keys[0]}
        className={`${s.btn} ${s.btnUp} ${keys[0] === key && s.btnOn}`}
        onClick={handleClick}
      ></button>
      <button
        value={keys[1]}
        className={`${s.btn} ${s.btnDown} ${keys[1] === key && s.btnOn}`}
        onClick={handleClick}
      ></button>
      <button
        value={keys[2]}
        className={`${s.btn} ${s.btnRight} ${keys[2] === key && s.btnOn}`}
        onClick={handleClick}
      ></button>
      <button
        value={keys[3]}
        className={`${s.btn} ${s.btnLeft} ${keys[3] === key && s.btnOn}`}
        onClick={handleClick}
      ></button>
    </div>
  );
}

export default ArrowsKeys;
