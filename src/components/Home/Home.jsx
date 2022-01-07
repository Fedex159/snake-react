import React, { useState, createContext } from "react";
import Game from "../Game/Game";
import Points from "./Points/Points";
import Scale from "./Scale/Scale";
import AudioControl from "./AudioControl/AudioControl";
import s from "./Home.module.css";

export const SoundContext = createContext("Default Value");

function Home() {
  const [points, setPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState(0);
  const [showPoints, setShowPoints] = useState(false);
  const [enableSound, setEnableSound] = useState(true);

  return (
    <div className={s.container}>
      <SoundContext.Provider value={{ enableSound, setEnableSound }}>
        <Scale>
          <Game
            setPoints={setPoints}
            setMaxPoints={setMaxPoints}
            setShowPoints={setShowPoints}
          />
          {showPoints ? <Points points={points} maxPoints={maxPoints} /> : null}
        </Scale>
        <AudioControl />
      </SoundContext.Provider>
    </div>
  );
}

export default Home;
