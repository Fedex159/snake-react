import React, { useEffect, useState, useContext } from "react";
import beepSFX from "../../../assets/sounds/beep.mp3";
import { SoundContext } from "../../Home/Home";
import s from "./CountDown.module.css";

const audioBeep = new Audio(beepSFX);

function CountDown({ setShowCountDown }) {
  const [value, setValue] = useState(3);
  const { enableSound } = useContext(SoundContext);

  if (enableSound) audioBeep.play();

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
