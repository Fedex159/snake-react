import React, { useState, createContext } from "react";
import Game from "../Game/Game";
import Points from "./Points/Points";
import Scale from "./Scale/Scale";
import AudioControl from "./AudioControl/AudioControl";
import s from "./Home.module.css";

export const SoundContext = createContext("Default Value");
export const PointsContext = createContext("Default Value");
export const DifficultContext = createContext("Default Value");

function Home() {
  const [points, setPoints] = useState(0);
  const [maxPoints, setMaxPoints] = useState({ Easy: 0, Medium: 0, Hard: 0 });
  const [difficult, setDifficult] = useState(null);
  const [showPoints, setShowPoints] = useState(false);
  const [enableSound, setEnableSound] = useState(true);

  return (
    <div className={s.container}>
      <SoundContext.Provider value={{ enableSound, setEnableSound }}>
        <Scale>
          <PointsContext.Provider
            value={{ setPoints, setMaxPoints, setShowPoints }}
          >
            <DifficultContext.Provider value={{ difficult, setDifficult }}>
              <Game />
            </DifficultContext.Provider>
          </PointsContext.Provider>
          {showPoints ? (
            <Points
              points={points}
              maxPoints={maxPoints}
              difficult={difficult}
            />
          ) : null}
        </Scale>
        <AudioControl />
      </SoundContext.Provider>
    </div>
  );
}

export default Home;
