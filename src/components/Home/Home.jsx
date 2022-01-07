import React, { useState } from "react";
import Game from "../Game/Game";
import Points from "./Points/Points";
import Scale from "./Scale/Scale";
import AudioControl from "./AudioControl/AudioControl";
import s from "./Home.module.css";

function Home() {
  const [points, setPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [enableSound, setEnableSound] = useState(true);

  return (
    <div className={s.container}>
      <Scale>
        <Game
          setPoints={setPoints}
          setMaxPoints={setMaxPoints}
          setShowPoints={setShowPoints}
          enableSound={enableSound}
        />
        {showPoints ? <Points points={points} maxPoints={maxPoints} /> : null}
      </Scale>
      <AudioControl enableSound={enableSound} setEnableSound={setEnableSound} />
    </div>
  );
}

export default Home;
