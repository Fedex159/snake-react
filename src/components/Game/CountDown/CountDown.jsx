import React, { useEffect, useState } from "react";
import s from "./CountDown.module.css";

function CountDown({ setShowCountDown }) {
  const [value, setValue] = useState(3);

  useEffect(() => {
    let interval = null;

    if (value > 0) {
      interval = setInterval(() => {
        setValue((prev) => prev - 1);
      }, 1000);
    }

    if (value === 0) {
      clearInterval(interval);
      setTimeout(() => {
        setShowCountDown(false);
      }, 100);
    }

    return () => clearInterval(interval);
  }, [value, setShowCountDown]);

  return <div className={s.container}>{value ? value : "GO!"}</div>;
}

export default CountDown;
