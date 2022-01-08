import React, { useContext } from "react";
import Game from "../Game/Game";
import Points from "./Points/Points";
import Scale from "./Scale/Scale";
import AudioControl from "./AudioControl/AudioControl";
import { StateGlobal } from "../Context/Context";
import s from "./Home.module.css";

function Home() {
  const { showPoints } = useContext(StateGlobal);

  return (
    <div className={s.container}>
      <Scale>
        <Game />
        {showPoints ? <Points /> : null}
      </Scale>
      <AudioControl />
    </div>
  );
}

export default Home;
