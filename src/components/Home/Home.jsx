import React, { useContext, useState } from "react";
import Game from "../Game/Game";
import Points from "./Points/Points";
import Scale from "./Scale/Scale";
import AudioControl from "./AudioControl/AudioControl";
import InfoButton from "./InfoButton/InfoButton";
import Info from "./Info/Info";
import { StateGlobal } from "../Context/Context";
import s from "./Home.module.css";

function Home() {
  const { showPoints } = useContext(StateGlobal);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className={s.container}>
      <Scale>
        <Game />
        {showPoints ? <Points /> : null}
        {showInfo ? <Info setShowInfo={setShowInfo} /> : null}
      </Scale>
      <AudioControl />
      <InfoButton setShowInfo={setShowInfo} />
    </div>
  );
}

export default Home;
