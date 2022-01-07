import React, { useContext } from "react";
import soundOn from "../../../assets/imgs/soundOn.png";
import soundOff from "../../../assets/imgs/soundOff.png";
import { SoundContext } from "../Home";
import s from "./AudioControl.module.css";

function AudioControl() {
  const { enableSound, setEnableSound } = useContext(SoundContext);
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
