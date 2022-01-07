import React from "react";
import soundOn from "../../../assets/imgs/soundOn.png";
import soundOff from "../../../assets/imgs/soundOff.png";
import s from "./AudioControl.module.css";

function AudioControl({ enableSound, setEnableSound }) {
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
