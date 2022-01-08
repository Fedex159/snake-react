import React, { useContext, useEffect } from "react";
import soundOn from "../../../assets/imgs/soundOn.png";
import soundOff from "../../../assets/imgs/soundOff.png";
import { StateGlobal } from "../../Context/Context";
import s from "./AudioControl.module.css";

function AudioControl() {
  const { enableSound, setEnableSound } = useContext(StateGlobal);

  useEffect(() => {
    const listener = (event) => {
      if (event.keyCode === 77) {
        setEnableSound((prev) => !prev);
      }
    };

    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [setEnableSound]);

  return (
    <div className={s.container}>
      <img
        src={enableSound ? soundOn : soundOff}
        alt="sound"
        onClick={() => setEnableSound((prev) => !prev)}
      />
    </div>
  );
}

export default AudioControl;
